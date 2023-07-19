import mongoose, { Schema } from "mongoose"

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

export {
    Parking,
    IPark,
}