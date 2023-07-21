import mongoose from "mongoose";
/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URL || "");
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});