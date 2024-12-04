// cau hinh express
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// import routes
const route = require("./routes/client/index.route");

// connect to db
mongoose.connect("mongodb://localhost:27017/product-management");

// config pug
app.set("views", "./views");
app.set("view engine", "pug");

// config static file
app.use(express.static("public"));

// config route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
