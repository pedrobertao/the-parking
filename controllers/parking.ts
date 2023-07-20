import { Response, Request } from "express"
import { Parking, IPark, calcTimeOnParking } from "../models/Parking"
import { isValidPlate } from "../utils/utils"
import * as ErrorMsg from "../constants/errors"
import dayjs from "dayjs"

const postParking = async (req: Request, res: Response) => {
    try {
        const plate: string = req.body.plate

        if (!isValidPlate(plate)) {
            return res.status(400).json({
                success: false,
                message: "Invalid plate"
            })
        }

        if (!plate) {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.PLATE_NOT_REGISTERED
            })
        }

        const userDB = await Parking.findOne({ plate }).exec()
        if (userDB) {
            if (userDB.paid && userDB.left) {
                await Parking.insertMany([{
                    left: false,
                    paid: false,
                    paidAmount: 0,
                    plate: plate
                }])
                return res.status(200).json({
                    success: true,
                    plate: plate
                })
            }

            if (!userDB.paid && !userDB.left) {
                return res.status(400).json({
                    success: true,
                    message: "Car hasn't paid yet"
                })
            }

            if (userDB.paid && !userDB.left) {
                return res.status(400).json({
                    success: true,
                    message: "Car hasn't left yet"
                })
            }

        } else {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.PLATE_NOT_REGISTERED
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
            message: "User hasn't paid yet"
        })
    }


    if (user.paid && user.left) {
        return res.status(200).json({
            success: true,
            message: "User already left"
        })
    }

    try {
        await Parking.findByIdAndUpdate(userId, { left: true })
        return res.status(200).json({
            success: true,
            message: "User left"
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
            message: "Invalid amount"
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
                message: "User already paid"
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

        userHistory.map(user => {
            const time = calcTimeOnParking(user.paid, user.createdAt, user.whenPaid)
            return {
                id: user.id,
                paid: user.paid,
                left: user.left,
                paidAmount: user.paidAmount,
                time
            }
        })

        return res.status(200).json({
            success: true,
            user: userHistory
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
                    id: u.id,
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


export {
    postParking,
    putParkingOut,
    putParkingPay,
    getByPlate,
    getParkingPlates
}