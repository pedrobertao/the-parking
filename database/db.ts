import mongoose from "mongoose";

const connectDB = async () => {
    console.log("Trying to connect to DB")
    const serverSelectionTimeoutMS = 5000;
    for (let i = 0; i < 3; ++i) {
        try {
            await mongoose.connect(process.env.MONGO_URL || "", {
                serverSelectionTimeoutMS,
                appName: "Parking App",
            });
            break;
        } catch (err) {
            if (i >= 2) {
                throw err;
            }
        }
    }
    console.log("Connected to DB")

};

export default connectDB;


