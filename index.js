import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import AuthRoute from "./Routes/AuthRoute/AuthRoute.js"
import postrouter from "./Routes/PostRoute.js"
import path from "path";


// import Userroute from "./Routes/UserRoute/Userroute.js";
// import { CorsOptions   } from "cors";
import cors from "cors";
import UploadRoute from "./Routes/UploadRoute.js"
import userroute from "./Routes/UserRoute/Userroute.js"
// import userroute from "./Routes/UserRoute/Userroute.js"
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mernsocial", {
//   useFindAndModify: false, // To handle deprecation warning regarding findAndModify
//   useNewUrlParser: true, // This is not needed starting from Node.js Driver version 4.0.0
//   useUnifiedTopology: true, // This is not needed starting from Node.js Driver version 4.0.0
});
app.use(cors());


app.get("/",(req,res)=>{
  app.use(express.static(path.resolve(__dirname,"client","build")));
  app.sendFile(path.resolve(__dirname,"client","build","index.js"));

})



//image for public
app.use(express.static("public"))
app.use("/images",express.static("images"))



// Get the default connection
const db = mongoose.connection;

// Listen for the connected event
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Listen for the error event
db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Set up a basic route

app.use("/a",(req,res)=>{
    res.send("hello")
})
app.use("/auth",AuthRoute)

app.use("/user",userroute)

app.use("/posts",postrouter)
app.use("/upload",UploadRoute)



// Start the server
const PORT =5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import AuthRoute from "./Routes/AuthRoute/AuthRoute.js";
// import postrouter from "./Routes/PostRoute.js";
// import path from "path";

// const app = express();

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/mernsocial", {
//   //   useFindAndModify: false, // To handle deprecation warning regarding findAndModify
//   //   useNewUrlParser: true, // This is not needed starting from Node.js Driver version 4.0.0
//   //   useUnifiedTopology: true, // This is not needed starting from Node.js Driver version 4.0.0
// });

// app.use(express.static(path.resolve(__dirname, "client", "build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

// // Serve static files from the 'client/build' directory
// app.use(express.static(path.resolve(__dirname, "client", "build")));

// //image for public
// app.use(express.static("public"));
// app.use("/images", express.static("images"));

// // Get the default connection
// const db = mongoose.connection;

// // Listen for the connected event
// db.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

// // Listen for the error event
// db.on("error", (err) => {
//   console.error(`MongoDB connection error: ${err}`);
// });

// // Set up a basic route

// app.use("/auth", AuthRoute);

// app.use("/posts", postrouter);

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
