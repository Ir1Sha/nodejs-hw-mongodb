import mongoose from 'mongoose';

export async function initMongoConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error.message);
    process.exit(1);
  }
}
