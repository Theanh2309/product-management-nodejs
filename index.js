// cau hinh express
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
// const multer = require("multer");

require("dotenv").config();

const database = require("./config/databse");

const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

// ghi de phuong thuc
app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use((req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted: \n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

// import routes client
const route = require("./routes/client/index.route");
// import routes admin
const routeAdmin = require("./routes/admin/index.route");

// ham connect da duoc export
// goi den ham connect da dinh nghia truoc do de ket noi toi db
database.connect();

// config pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// flash(cu phap moi)
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// biến này sẽ tồn tại trong tất cả file PUG(taoj ra bieens toan cuc cho PUG)

// config static file(chi dung choPUG)(duoi local)
// app.use(express.static("public"));
// ?khi day len online=> thay doi duong dan,(phai dung tu thu muc goc => public) vi online ko hieu thu muc public
app.use(express.static(`${__dirname}/public`));


// config route client + admin
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
