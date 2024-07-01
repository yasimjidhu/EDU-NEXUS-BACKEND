import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const connectDB = async () => {
  const MONGO_URI = process.env.CONTENT_MANAGEMENT_DB_URI || 'mongodb://localhost:27017/Users';

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'Content-mgt' 
    });
    console.log('content DB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
