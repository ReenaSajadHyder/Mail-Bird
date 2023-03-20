const express = require("express");
const app = express();
const fs = require("fs");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

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
            res.render("homepg.ejs");
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
    let data = [];
    let userExists = "false";
    fs.readFile("./users.json", "utf-8",(err,userData) => {
      if(err){
        console.log(err);
      }
      else{
        console.log("inside");
        data = JSON.parse(userData);
        for (let i = 0; i < data.length; i++){
          if(data[i].email === userObj.email){
            userExists = "true";
            console.log(userExists);
          }
        }
        if(userExists === "true"){
          console.log("Inside user exists true");
          req.flash(
            "message",
            "The email you entered is already in use. Please enter a different email id."
          )
          res.redirect("/signup");
        }
        else {
          console.log("Inside user exists false");
          if (userObj.password !== userObj.confirmPassword) {
            req.flash(
              "message",
              "The passwords don't match. Please Enter the same password again."
            )
            res.redirect("/signup");
          } else {
            let data = [];
            fs.readFile("./users.json", "utf-8", (err, userData) => {
              if (err) {
                console.log(err);
              } else {
                try {
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
        }
      }
    })
  } catch (err) {
    console.log("Throws error", err);
    res.redirect("/signup");
  }
});

app.get("/inbox", (req, res) => {
  res.render("inboxsection.ejs");
});

app.get("/sent", (req, res) => {
  res.render("sentsection.ejs");
});

app.get("/drafts", (req, res) => {
  res.render("draftssection.ejs");
});

app.get("/trash", (req, res) => {
  res.render("trashsection.ejs");
});

app.get("/composemail", (req, res) => {
  res.render("composemail.ejs");
});

app.get("/openmail", (req, res) => {
  res.render("openmail.ejs");
});

app.listen(8000, () => {
  console.log(
    "Server connected at port number 8000 with url 'http://localhost:8000/'"
  );
});
