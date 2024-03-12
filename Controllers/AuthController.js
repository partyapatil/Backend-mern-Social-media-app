import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
const keyy="mern";
import jwt from 'jsonwebtoken';



// Registering a new User
export const registerUser = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  const {username} = req.body
  const a=20;
  // console.log(a)
  try {
    // addition new
    // const oldUser = await UserModel.findOne({ username });

    // if (oldUser)
    // console.log("already")
    // return res.status(400).json({ message: "Username is already taken. Please choose a different username." });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },keyy
    ,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})


        if(user)
        {
            const validity = await bcrypt.compare(password, user.password)

            if(!validity){
              res.send(400).json("Wrong Password")
            }else{
              const token = jwt.sign(
                { username: user.username, id: user._id },keyy
              ,
                { expiresIn: "1h" }
              )
            res.status(200).json({user,token})
          }


        }
        else{
            res.status(404).json("User does not exists okkkkkkkkkkkkkkkk")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}