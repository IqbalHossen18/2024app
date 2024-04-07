
import { connectToDatabase } from '../../mongodbclients/mongodb.js';
import User from '../../models/Users.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email } = req.body;

        try {
            // Connect to the database
            const client = await connectToDatabase();

            // Access the database instance
            const db = client.connection.db;

            // Access the 'users' collection
            const collection = db.collection('logindata');

            // Check if the email already exists in the database
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists. Please use another email address.' });
            }

            // Create a new user instance using the User model
            const user = new User({
                name,
                email
            });

            // Save the user to the 'users' collection
            await collection.insertOne(user);

            res.status(201).json({ message: 'User submitted successfully', data: user });
        } catch (error) {
            console.error('Error submitting user:', error);
            res.status(500).json({ message: 'Error submitting user' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}



// import User from '../../models/Users.js';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       const { name, email } = req.body;
  
//       try {
//         // Create a new user instance using the User model
//         const user = new User({
//           name,
//           email
//         });
  
//         // Save the user to the database using Mongoose
//         // await user.save();
  
//         res.status(201).json({ message: 'User submitted successfully', data: user });
//       } catch (error) {
//         console.error('Error submitting user:', error);
//         res.status(500).json({ message: 'Error submitting user' });
//       }
//     } else {
//       res.status(405).json({ message: 'Method Not Allowed' });
//     }
//   }
 
// import { connectToDatabase } from '../../mongodbclients/mongodb.js';
// import User from '../../models/Users.js';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { name, email } = req.body;

//         try {
//             // Connect to the database
//             const client = await connectToDatabase();

//             // Access the database instance
//             const db = client.connection.db;

//             // Access the 'users' collection
//             const collection = db.collection('users');

//             // Create a new user instance using the User model
//             const user = new User({
//                 name,
//                 email
//             });

//             // Save the user to the 'users' collection
//             await collection.insertOne(user);

//             res.status(201).json({ message: 'User submitted successfully', data: user });
//         } catch (error) {
//             console.error('Error submitting user:', error);
//             res.status(500).json({ message: 'Error submitting user' });
//         }
//     } else {
//         res.status(405).json({ message: 'Method Not Allowed' });
//     }
// }
