import { Response, Request } from "express"
import { Parking, IPark, IUserHistory } from "../models/Parking"
import { isValidPlate, calcTimeOnParking } from "../utils/utils"
import * as ErrorMsg from "../constants/errors"
import dayjs from "dayjs"

const postParking = async (req: Request, res: Response) => {
    try {
        const plate: string = req.body.plate

        if (!isValidPlate(plate)) {
            return res.status(400).json({
                success: false,
                message: ErrorMsg.INVALID_PLATE
            })
        }

        if (!plate) {
            return res.status(400).json({
                success: false,
                message: ErrorMsg.PLATE_NOT_REGISTERED
            })
        }

        const userDB = await Parking.findOne({ plate }).exec()
        if (userDB) {
            if (!userDB.paid && !userDB.left) {
                return res.status(400).json({
                    success: false,
                    message: ErrorMsg.CAR_REGISTERED_NOT_PAY

                })
            }

            if (userDB.paid && !userDB.left) {
                return res.status(400).json({
                    success: false,
                    message: ErrorMsg.CAR_REGISTERED_NOT_LEFT
                })
            }

            return res.status(200).json({
                success: true,
                message: ErrorMsg.CAR_ALREADY_USED
            })

        } else {
            const parkingInserted = await Parking.insertMany([{
                left: false,
                paid: false,
                paidAmount: 0,
                plate: plate
            }])

            return res.status(200).json({
                success: true,
                plate: plate,
                id: parkingInserted[0]._id.toString(),
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}


const putParkingOut = async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await Parking.findById(userId).exec()

    if (!user) {
        return res.status(404).json({
            success: false,
            message: ErrorMsg.USER_NOT_SIGNED
        })
    }

    if (!user.paid) {
        return res.status(400).json({
            success: false,
            message: ErrorMsg.USER_NO_PAID
        })
    }


    if (user.paid && user.left) {
        return res.status(400).json({
            success: false,
            message: ErrorMsg.USER_LEFT
        })
    }

    try {
        await Parking.findByIdAndUpdate(userId, { left: true })
        return res.status(200).json({
            success: true,
            message: ErrorMsg.USER_LEFT
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const putParkingPay = async (req: Request, res: Response) => {
    const userId = req.params.id
    const amount: number = req.body.amount

    if (amount <= 0 || amount > 1000000) {
        return res.status(400).json({
            success: false,
            message: ErrorMsg.INVALID_AMOUNT
        })
    }
    try {

        const user = await Parking.findById(userId).exec()

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.USER_NOT_SIGNED
            })
        }

        if (user.paid) {
            return res.status(400).json({
                success: false,
                message: ErrorMsg.USER_ALREADY_PAID
            })
        }

        await Parking.findByIdAndUpdate(userId, {
            paid: true,
            paidAmount: amount,
            whenPaid: dayjs(),
        })

        return res.status(200).json({
            success: true,
            id: userId
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}



const getByPlate = async (req: Request, res: Response) => {
    const plate = req.params.plate

    if (!plate) {
        return res.status(500).json({
            success: false,
            message: ErrorMsg.PLATE_NOT_REGISTERED
        })
    }

    try {
        const userHistory = await Parking.find({ plate })
        if (!userHistory) {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.USER_NOT_SIGNED
            })
        }

        const parsedUserHistory: IUserHistory[] = []
        userHistory.map(user => {
            const time = calcTimeOnParking(user.paid, user.createdAt, user.whenPaid)
            parsedUserHistory.push({
                id: user._id.toString(),
                paid: user.paid,
                left: user.left,
                plate: user.plate,
                paidAmount: user.paidAmount,
                time
            })
        })


        return res.status(200).json({
            success: true,
            user: parsedUserHistory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}


const getParkingPlates = async (_: Request, res: Response) => {
    try {
        const users = await Parking.find({})
        let usersParsed: IPark[] = []

        if (users) {
            usersParsed = users.map(u => {
                const time = calcTimeOnParking(u.paid, u.createdAt, u.whenPaid)
                return {
                    id: u._id.toString(),
                    paid: u.paid,
                    left: u.left,
                    paidAmount: u.paidAmount,
                    plate: u.plate,
                    time,
                }
            })
        }

        return res.status(200).json({
            success: true,
            users: usersParsed,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const dropDB = async () => {
    await Parking.deleteMany({})
}

export {
    postParking,
    putParkingOut,
    putParkingPay,
    getByPlate,
    getParkingPlates,
    dropDB
}