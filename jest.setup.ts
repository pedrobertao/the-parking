import mongoose from "mongoose";
import { dropDB } from "./controllers/parking"

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/parking');
});


afterAll(async () => {
    await dropDB()
    await mongoose.connection.close();
});