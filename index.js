const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const CRUD = require("./models/CRUD");
const authDB = require("./models/authDB");

const app = express();
app.use(cors());
app.use(express.json())

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//defining authentication routes for homepage 
app.route("/")
    .get(async (req,res) => {
        res.status(200).json( await CRUD.Read() )
    })
    .post((req,res) => {
        
        res.status(200).json( {name: req.body.name , password:req.body.password } )
    })


app.route("/login")
    .post(async(req,res) => {
        console.log(req.body.from_name);
        console.log(req.body.from_password);
    })

 app.route("/register")
    .post(async(req,res) => {
        res.status(200).json(await authDB.Register(req.body));

    })

//defining authentication routes for homepage 
app.route("/addTask")
    .post(async(req,res) => {
        res.status(200).json(await CRUD.Create(req.body));
    })

//defining authentication routes for delete 
app.route("/delete/:id")
    .delete(async(req,res) => {
        const id = (req.params.id);
        res.status(200).json({id: await CRUD.Delete(id)});
    })
app.route("/update/:id/:status")
    .patch(async(req,res) => {
        const id = (req.params.id);
        const status = (req.params.status);
        CRUD.Upadte(id,status)
        res.status(200).json({id: id , status  : status});
    })




//started server on port 5000
app.listen("5000",() => {
    console.log("server is listeing on port 5000");
})