import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const expiry= 30 * 24 * 60 * 60 * 1000;

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

        res.cookie("access_token", token, { httpOnly: true, maxAge: expiry }).status(201).json({ message: 'Registeration Successful!', "userData": newUser});
        

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
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
        res.cookie("access_token",token,{httpOnly: true, maxAge: expiry }).status(200).json({message: "Login Successful!","userData": userExist});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const setTheme=async(req,res)=>{
    try {
        const {theme}=req.body;
        const userId=req.params.id;
        const userExist=await User.findOne({_id: userId});
        
        if(!userExist) return;

        userExist.theme=theme;
        await userExist.save();

        return res.status(200).json({theme:theme, message: "Updated"});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({ message: "User Not Found!" });
        }

        const token=jwt.sign({id: userExist._id},process.env.JWT_SECRET,{expiresIn: "1h"});


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.APP_PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            text: `Hello ${userExist.name},

            Please click the link below to reset your password:
            https://notes-app-zgkw.onrender.com/reset-password/${userExist._id}/${token}

            Thank you`

          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
            return res.status(200).json({name:userExist.name,message: "Success"});

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export const resetPasswort=async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;

    try {

        if(password.length<6){
            return res.status(400).json({ message: 'Password must be atleast 6 characters long!' });
        }

        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            
            if(err){
                return res.status(400).json({message: "Invalid Token"});
            }
            
            bcryptjs.hash(password, 10).
            then(hash=>{
                User.findByIdAndUpdate({_id:id},{password: hash}).
                then(send=>res.status(200).json({message: "Password Updated Successfully!"}))
            })
    
            
        })
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }

}
// export const resetPasswort=async(req,res)=>{
//     const {id,token}=req.params;
//     const {password}=req.body;

//     try {

//         if(password.length<6){
//             return res.status(400).json({ message: 'Password must be atleast 6 characters long!' });
//         }

//         const decode=jwt.verify(token,process.env.JWT_SECRET);

//         const user=await User.findOne({_id:id});

//         const hashedPassword = bcryptjs.hashSync(password, 10);

//         user.password=hashedPassword;

//         await user.save();

//         return res.status(200).json({name:user.name});
        
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error!' });
//     }

// }