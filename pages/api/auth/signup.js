import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectToDatabase();
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({ message: 'User created!' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
}
