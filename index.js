// cau hinh express
const express = require("express");

require("dotenv").config();

const database = require("./config/databse");

const app = express();
const port = process.env.PORT;

// import routes client
const route = require("./routes/client/index.route");
// import routes admin
const routeAdmin = require("./routes/admin/index.route");

// ham connect da duoc export
// goi den ham connect da dinh nghia truoc do de ket noi toi db
database.connect();

// config pug
app.set("views", "./views");
app.set("view engine", "pug");

// config static file
app.use(express.static("public"));

// config route client + admin
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
