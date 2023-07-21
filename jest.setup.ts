import mongoose from "mongoose";
/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/parking');
});

/* Closing database connection after each test. */
afterAll(async () => {
    await mongoose.connection.close();
});