const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/Cart'
const cors = require('cors');
// var bodyParser = require("body-parser");

// to start express frame work we use
const app = express();

// connectig with database mongoose
mongoose.connect(url, { useNewUrlParser: true }, (e) => {
  if (!e) {
    console.log("......Dbconnected........");
  }
  else {
    console.log("......Db Not connected........");

  }
})

app.use(express.json());
app.use(cors());
const cartRouter = require('./routers/cart')
app.use('/cart', cartRouter);


app.listen(5000, () => {
  console.log("......server started @ port 9000.......");
})