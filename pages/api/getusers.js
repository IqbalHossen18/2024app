// pages/api/users.js

// import { connectToDatabase } from '../../mongodbclients/mongodb.js';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = mongoose.connection;

      if (db.readyState !== 1) {
        throw new Error('MongoDB client is not connected');
      }

      const collection = db.collection('logindata'); // Use your collection name

      // Query all users from the database
      const users = await collection.find({}).toArray();

      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
