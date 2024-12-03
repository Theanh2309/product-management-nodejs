// cau hinh express
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

// import routes
const route = require("./routes/client/index.route");

// config pug
app.set("views", "./views");
app.set("view engine", "pug");

// config route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
