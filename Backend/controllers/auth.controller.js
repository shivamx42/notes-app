import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
        const token=jwt.sign({id: newUser._id,name: newUser.name},process.env.JWT_SECRET);

        res.cookie("access_token", token, { httpOnly: true }).status(201).json({ message: 'Registeration Successful!', "userData": newUser});
        

    } catch (error) {
        console.error('Error in registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({ message: "User Not Found!" });
        }

        const checkPassword=bcryptjs.compareSync(password, userExist.password);

        if(!checkPassword){
            return res.status(400).json({ message: "Invalid Password!" });
        }

        const token=jwt.sign({id: userExist._id,name: userExist.name},process.env.JWT_SECRET);
        res.cookie("access_token",token,{httpOnly: true}).status(200).json({message: "Login Successfull!","userData": userExist});

    } catch (error) {
        
    }
}