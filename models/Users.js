import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email uniqueness
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the User model with the schema
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
