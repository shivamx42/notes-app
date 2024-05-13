import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { name, email, password, notes_list } = req.body;
        const findUser = await User.findOne({ email });

        if (findUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        else if(password.length<6){
            return res.status(400).json({ message: 'Password must be atleast 6 characters long!' });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, notes_list });
        await newUser.save();
        return res.status(201).json({ message: 'Registered Successfully!' });
    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
