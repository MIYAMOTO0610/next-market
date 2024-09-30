import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://smiyamoto610:VSBs3NPpRxYHSO3o@cluster0.x2xhi.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Success: Connected to MongoDB");
    } catch {
        console.log("Failed: Failed to connect to MongoDB");
        throw new Error();
    }
}

export default connectDB;
