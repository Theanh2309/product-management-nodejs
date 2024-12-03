// cau hinh express
const express = require("express");
const app = express();
const port = 3000;

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
