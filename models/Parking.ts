import mongoose, { Schema } from "mongoose"

const ParkingSchema = new Schema({
    plate: { type: String, required: true },
    paidAmount: { type: Number, required: true, default: 0.0 },
    paid: { type: Number, required: true, default: 0 },
    left: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const Parking = mongoose.model('Parking', ParkingSchema);

export {
    Parking
}