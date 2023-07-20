import mongoose, { Schema } from "mongoose"
import dayjs from 'dayjs'

interface IPark {
    id: string
    time: string
    paid: boolean
    left: boolean
    paidAmount: number
}


const ParkingSchema = new Schema({
    plate: { type: String, required: true },
    paidAmount: { type: Number, required: true, default: 0.0 },
    paid: { type: Boolean, required: true, default: false },
    left: { type: Boolean, default: false },
    whenPaid: { type: Date }
}, {
    timestamps: true,
});

const Parking = mongoose.model('Parking', ParkingSchema);


const calcTimeOnParking = (paid: boolean, whenCreated: Date, whenPaid: Date | undefined): string => {
    const now = dayjs()

    if (!whenPaid) {
        return ""
    }

    const timeDif = paid ? dayjs(whenPaid) : now
    const time = `${timeDif.diff(dayjs(whenCreated), 'minute')} minutes`
    return time
}

export {
    Parking,
    IPark,
    calcTimeOnParking
}