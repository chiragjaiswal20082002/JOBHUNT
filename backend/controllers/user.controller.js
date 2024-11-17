import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
// import cloudResponse from "clo"


export const register=async(req,res)=>
{
    const {fullname,email,phoneNumber,password,role}=req.body;
    try
    {
    if(!fullname || !email || !phoneNumber || !password || !role)
    {
      
        return res.status(400).json({
            message:"Something is missing",
            success:false
        });
    };


    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

    
    let user=await User.findOne({email});
    if(user)
    {
        return res.status(400).json({
            message:'User already exist with this email.',
            success:false,
        });
    };
    const hashedPassword= await bcrypt.hash(password,10);
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url
        },
    });

    return res.status(201).json({
        message:"Account created successfully.",
        success:true
    });
   }  
    catch(error)
    {
       console.log("error");
    }

}

//now for login

export const login =async(req,res)=>
{
    
    try{
        const {email,password,role} = req.body;

        if(!email || !password || !role)
            {
               
                return res.status(400).json({
                    message:"Something is missing",
                    success:false
                });
            };
      let user= await User.findOne({email});
      if(!user)
      {
        return res.status(400).json({
            message:"incorrect email or password.",
            success:false,
        });
      };
      const isPasswordMatch= await bcrypt.compare(password,user.password);
      if(!isPasswordMatch)
      {
        return res.status(400).json({
            message:"incorrect email or password.",
            success:false,
        });
      };
      //check role is correct or not 
      if(role!=user.role)
      {
        return res.status(400).json({
            message:"Account doesn't exist with current role.",
            success:false,

        });
      };

    const tokenData={
        userId:user._id
    }
    const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
     

    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
    })
      
    }
    catch(error)
    {
      console.log("errror");
    }
}


export const logout=async (req,res)=>
{
    try{
        return res.status(200).cookie("token","",{maxage:0}).json({
            message:"logged out successfully.",
            success:true
        })
    }
    catch(error)
    {
      console.log("errror");
    }

}

export const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      const file = req.file;
      // console.log(file);

      // cloudinary wala part
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

  
      if (!fullname || !email || !phoneNumber || !bio || !skills) {
        return res.status(400).json({
          message: "Something is missing",
          success: false
        });
      }
  
      // Convert skills into an array
      const skillsArray = skills ? skills.split(",") : [];
  
      // Check if userId is set by middleware
      const userId = req.id;
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
          success: false
        });
      }
  
      // Update user properties if they exist
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skillsArray.length) user.profile.skills = skillsArray;
  

      //resume comes later

      if(cloudResponse)
      {
        user.profile.resume=cloudResponse.secure_url //save the cloudinary url
        user.profile.resumeOriginalName=file.originalname // save the original filename
      }
      // Save user changes
      await user.save();
  
      // Return updated user
      return res.status(200).json({
        message: "Profile updated successfully.",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile
        },
        success: true
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({
        message: "An error occurred while updating the profile.",
        success: false
      });
    }
  };
  