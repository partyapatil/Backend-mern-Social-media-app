import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).jsozn(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user)=>{
      const {password, ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const updateUser=async(req,res)=>{
    const id=req.params.id
const key="mern";
    const{_id,currentuseradminstatus,password}=req.body


    if(_id===id||currentuseradminstatus==="true"){
try{
  if (password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);
  }
  // have to change this
  const user = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  const token = jwt.sign(
    { username: user.username, id: user._id },key
   ,
    { expiresIn: '365d'}
  );
  console.log({user, token})
  res.status(200).json({user, token});
} catch (error) {
  console.log("Error agya hy")
  res.status(500).json(error);
}
} else {
res
  .status(403)
  .json("Access Denied! You can update only your own Account.");
}
};


 export const deleteuser=async(req,res)=>{
    let data=await UserModel.findOneAndDelete(req.params.id)

if(data){
res.send("item deleted")
}else{
    res.send("somthing went wrong")
}

}

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id)
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};
  
  // UnFollow a User
  export const UnFollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
  
    if(_id === id)
    {
      res.status(403).json("Action Forbidden")
    }
    else{
      try {
        const unFollowUser = await UserModel.findById(id)
        const unFollowingUser = await UserModel.findById(_id)
  
  
        if (unFollowUser.followers.includes(_id))
        {
          await unFollowUser.updateOne({$pull : {followers: _id}})
          await unFollowingUser.updateOne({$pull : {following: id}})
          res.status(200).json("Unfollowed Successfully!")
        }
        else{
          res.status(403).json("You are not following this User")
        }
      } catch (error) {
        res.status(500).json(error)
      }
    }
  };
  
  

















