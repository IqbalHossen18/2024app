// path/to/mongodb.js

import mongoose from 'mongoose';

let cachedPromise = null;

export async function connectToDatabase() {
  if (cachedPromise) {
    return cachedPromise;
  }

  try {
    const uri = process.env.MONGODB_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const promise = mongoose.connect(uri, options);
    cachedPromise = promise;
    return promise;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
