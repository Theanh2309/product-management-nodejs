// cau hinh express
const express = require("express");

require("dotenv").config();

const database = require("./config/databse");

const app = express();
const port = process.env.PORT;

// import routes
const route = require("./routes/client/index.route");

// ham connect da duoc export
// goi den ham connect da dinh nghia truoc do de ket noi toi db
database.connect();

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
