const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = require("../server/env.js");
const fileUpload = require("express-fileupload");
const Uf = require("./models/fileUpload");
app.use("/uploads", express.static("uploads"));
app.use(cors());
const Reg = require("./models/registration");
//mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Affid", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//mongoose.connect('mongodb+srv://paradiseliving:dhavalani@cluster0.jk2jf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true })
mongoose.connection.on("connected", () => {
  console.log("database connected");
});
mongoose.connection.on("error", () => {
  console.log("error");
});

app.use(express.json());

//template upload
app.use(fileUpload());

app.post("/uploadfile", (req, res) => {
    
        const file = new Uf({
          _id: new mongoose.Types.ObjectId(),
          fileName: req.body.fileName,
          templateTitle: req.body.templateTitle
        });
        file
          .save()
          .then((result) => {
            
            res.json({ msg: "successful" });
            console.log(result);
          })
          .catch((err) => {
           
            result.json({ msg: "error" });
            console.log(err);
          });
    
    });
 
// get Docs 
const doc = require('./models/fileUpload');
app.get("/getDocs", (req, res) => {
  doc.find()
    .exec()
    .then((result) => {
      res.send(result);
    });
});

// signup

app.post("/signup", (req,res)=>{
  console.log(req.body.username);
  console.log(req.body.email);
  console.log(req.body.password);
  
  Reg.findOne({ username: req.body.username }).then((userExist) => {
    if (userExist) {
      res.send({ msg: "exist" });
      return res.status(422).json({ error: "Email already exist!!" });
    }

    const reg = new Reg({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
    });
    reg
      .save()
      .then((result) => {
        res.json({ msg: "successful" });
        console.log(result);
        
      })
      .catch((err) => {
        res.json({ msg: "error" });
        console.log(err);
      });
  });
})

// login

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    const userLogin = await Reg.findOne({
      username: username,
      password: password,
    })
    .then(result=>{
      if(result!=null) {
        res.json({msg: "successful"})
        
      }
      else{
        res.json({msg: 'invalid'})
      }
       console.log(result)
    })
    .catch(err=>{
      res.json({msg: 'invalid'})
    })
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT);