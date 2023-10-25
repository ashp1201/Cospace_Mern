import express from 'express';
import User from '../Model/user.model.js'; // Import the User model

const router = express.Router();

// Endpoint to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
     // Retrieve all users from the database
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;