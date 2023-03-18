const express = require("express");
const app = express();
const fs = require("fs");
// const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// const users = [];

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));

app.use(cookieParser("NotSoSecret"));
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.render("login.ejs", { message: req.flash("message") });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { message: req.flash("message") });
});

app.post("/login", (req, res) => {
  console.log("inside login post");
  let email = req.body.email;
  let password = req.body.password;
  let data = [];
  fs.readFile("./users.json", "utf-8", (err, userData) => {
    if (err) {
      console.log(err);
    } else {
      try {
        data = JSON.parse(userData);
      } catch {
        console.log("Error parsing file");
      }
    }
    let userExists = "false";
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === email) {
        userExists = "true";
          if (data[i].password === password) {
            res.render("homepg.ejs", { name: data[i].name });
          } else {
            req.flash("message", "Password entered is incorrect.");
            res.redirect("/login");
          }
        break;
      }
    }
    if (userExists === "false") {
      req.flash(
        "message",
        "No user exists with that email. Please enter a valid email address."
      );
      res.redirect("/login");
    }
  });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", { message: req.flash("message") });
});

app.post("/signup", async (req, res) => {
  try {
    let userObj = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    if (userObj.password !== userObj.confirmPassword) {
      req.flash(
        "message",
        "The passwords don't match. Please Enter the same password."
      )
      res.redirect("/signup");
    } else {
      let data = [];
      fs.readFile("./users.json", "utf-8", (err, userData) => {
        if (err) {
          console.log(err);
        } else {
          try {
            console.log("Inside");
            data = JSON.parse(userData);
            data.push(userObj);
            console.log(data);
            fs.writeFile(
              "./users.json",
              JSON.stringify(data, null, 2),
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("File succesfully written");
                }
              }
            );
          } catch (err) {
            console.log("Error parsing JSON file:" + err);
          }
        }
      });
      res.redirect("/login");
    }
  } catch (err) {
    console.log("Throws error", err);
    res.redirect("/signup");
  }
});

app.listen(8000, () => {
  console.log(
    "Server connected at port number 8000 with url 'http://localhost:8000/'"
  );
});
