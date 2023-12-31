const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.set('view engine', 'ejs');
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/gisUser');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled




//For User
const UserSchema = new mongoose.Schema ({
  email: String,
  password: String
});


const User = mongoose.model("User", UserSchema);

app.get("/userDetail", function(req, res){
    User.find().then((users) => {
        res.send(users)
    });
});


app.post("/userDetail", function(req, res){
const user = new User({ 
    email: req.body.email,
    password: req.body.password
  });

  user.save().then(() => console.log('User Saved'));
  res.send({ status: "ok" });


});

app.post("/userLogin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user with the provided email and password
      const user = await User.findOne({ email, password });
  
      if (user) {
        // User found, login successful
        res.json({ status: 'ok', message: 'Login successful' });
      } else {
        // User not found or invalid credentials
        res.json({ status: 'error', message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  
//For GISDetails
const GisInfoSchema = new mongoose.Schema ({
  title: String,
  surveyNumber: String,
  lotNumber: String,
  owner: String,
  coordinates: [String]


});


const GisInfo = mongoose.model("GisInfo", GisInfoSchema);

app.get("/GisDetail", function(req, res){
  GisInfo.find().then((GisInfo) => {
        res.send(GisInfo)
    });
});


app.post("/GisDetail", function(req, res){
const gisInfo = new Gis({ 
    title: req.body.title,
    surveyNumber: req.body.surveyNumber,
    lotNumber: req.body.lotNumber,
    owner: req.body.owner,
    coordinates: req.body.coordinates
  });

  gisInfo.save().then(() => console.log('Lot Saved'));
  res.send({ status: "ok" });


});


app.listen(5000, function() {
    console.log("Server started on port 5000");
  });
  

}