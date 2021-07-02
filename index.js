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

// app.post('/apideleteurl', newUrl.deleteBm)

app.post('/apideleteurl', (req, res) => {
  newUrl.deleteBm(req.body)
  console.log('Try to delete,',req.body)
})


// app.listen(3000, () => console.log("Server Up and running"));

app.listen(process.env.PORT || 3000, () => console.log("Server Up and running"));