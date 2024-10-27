import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectToDatabase();
        const { email, password, username } = req.body;

        // Check if required fields are provided
        if (!email || !password || !username) {
            return res.status(422).json({ message: 'Missing required fields' });
        }

        // Check if user with the same email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(422).json({ message: 'User with this email already exists!' });
        }

        // Check if user with the same username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(422).json({ message: 'Username already in use!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const user = new User({
            email,
            username, // Add username to the user model
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({ message: 'User created!' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
