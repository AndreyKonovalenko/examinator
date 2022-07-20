import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'prod',
    });
    console.log(
      `MongoDB Connected! db:${conn.connection.name}  host:${conn.connection.host}`
        .cyan.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
