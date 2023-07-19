import { Response, Request } from "express"
import { Parking, IPark } from "../models/Parking"
import * as ErrorMsg from "../constants/errors"
import dayjs from "dayjs"


const postParking = async (req: Request, res: Response) => {
    try {
        const plate: string = req.body.plate

        if (!plate) {
            return res.status(400).json({
                success: false,
                message: ErrorMsg.PLATE_NOT_REGISTERED
            })
        }


        const plateDB = await Parking.findOne({ plate }).exec()
        if (plateDB) {
            return res.status(400).json({
                success: false,
                message: ErrorMsg.PLATE_NOT_REGISTERED
            })
        }

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

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

const putParkingOut = async (req: Request, res: Response) => {
    const plate: string = req.params.id
    const user = await Parking.findOne({ plate }).exec()

    if (!user) {
        return res.status(404).json({
            success: false,
            message: ErrorMsg.USER_NOT_SIGNED
        })
    }

    if (user.left) {
        return res.status(404).json({
            success: false,
            message: "User already left"
        })
    }

    try {

        await Parking.findOneAndUpdate({ plate }, { left: true })
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
    const userId: string = req.params.id
    const amount: number = req.body.amount

    try {
        const user = await Parking.findById(userId).exec()

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.USER_NOT_SIGNED
            })
        }

        if (user.paid) {
            return res.status(404).json({
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


        const user = await Parking.findOne({ plate: plate })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: ErrorMsg.USER_NOT_SIGNED
            })
        }

        const userParsed = {
            id: user.id,
            time: user.updatedAt,
            paid: user.paid,
            left: user.left,
            paidAmount: user.paidAmount
        }

        return res.status(200).json({
            success: true,
            user: userParsed
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}



const getParkingPlates = async (req: Request, res: Response) => {
    try {
        const users = await Parking.find({})
        let usersParsed: IPark[] = []

        if (users) {
            usersParsed = users.map(u => {
                const now = dayjs()
                const whenCreated = dayjs(u.createdAt)
                const whenPaid = dayjs(u.whenPaid)

                const timeDif = u.paid ? whenPaid : now
                const time = `${timeDif.diff(whenCreated, 'minute')} minutes`

                return {
                    id: u.id, time,
                    paid: u.paid,
                    left: u.left,
                    paidAmount: u.paidAmount,
                    plate: u.plate,
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