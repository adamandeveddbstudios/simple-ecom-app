import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export async function connectToDb() {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return mongoose.connection.db; // Return the db object if already connected
  }

  try {
    const conn = await mongoose.connect(
      'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD+ '@cluster0.rr3aw.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0'
    ); 
    isConnected = true; // Set the connection status to true
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn.connection.db; // Return the db object after a successful connection
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
