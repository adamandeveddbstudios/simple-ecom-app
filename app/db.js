import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export async function connectToDb() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return mongoose.connection.db; // Return the db object if already connected
  }

  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI
    );
    isConnected = true; // Set the connection status to true
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection.db; // Return the db object after a successful connection
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
