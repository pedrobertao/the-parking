import { Response, Request } from "express"


const postParking = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
    })
}

const putParkingOut = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
    })
}

const putParkingPay = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
    })
}


const getByPlate = async (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
    })
}


export {
    postParking,
    putParkingOut,
    putParkingPay,
    getByPlate
}