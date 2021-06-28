// lib and imports
const express = require("express");
const app = express();

const myFirstCOntroller = require("./controllers/controller")

const newUrl = require("./controllers/controller")

// app setup
app.use(express.json())
app.use("/static", express.static("public"));
app.set("view engine", "ejs");


// pages
app.get('/',(req, res) => {
  res.render('home.ejs');
});


// Create here your api setup

app.post('/apiurldb', (req,res) => {
  newUrl.addUrlDb(req.body)
  console.log('Hello from brain')
})


app.post('/apigeturl', newUrl.getUrl)

app.listen(3000, () => console.log("Server Up and running"));
