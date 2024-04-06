import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("we are connected successfully to database");
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

export default connectDB;
