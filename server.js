const express = require("express");
const app = express();
const fs = require("fs");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
let currentUser;
let currentUserEmail;

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(express.json());
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

app.get("/homepg", (req, res) => {
  res.render("homepg.ejs", { message: req.flash("message") });
});

app.post("/login", (req, res) => {
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
          currentUser = data[i].name;
          currentUserEmail = data[i].email;
          req.flash("message", `${currentUser}`);
          res.redirect("/homepg");
          // window.sessionStorage.setItem("data[i].name", "data[i].email");
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
    fs.readFile("./users.json", "utf-8", (err, userData) => {
      if (err) {
        console.log(err);
      } else {
        data = JSON.parse(userData);
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === userObj.email) {
            userExists = "true";
          }
        }
        if (userExists === "true") {
          req.flash(
            "message",
            "The email you entered is already in use. Please enter a different email id."
          );
          res.redirect("/signup");
        } else {
          if (userObj.password !== userObj.confirmPassword) {
            req.flash(
              "message",
              "The passwords don't match. Please Enter the same password again."
            );
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
    });
  } catch (err) {
    console.log("Throws error", err);
    res.redirect("/signup");
  }
});

app.get("/inboxsection", (req, res) => {
  res.render("inboxsection.ejs");
});

app.get("/sentsection", (req, res) => {
  res.render("sentsection.ejs");
});

app.get("/draftssection", (req, res) => {
  res.render("draftssection.ejs");
});

app.get("/trashsection", (req, res) => {
  res.render("trashsection.ejs");
});

app.get("/composemail", (req, res) => {
  res.render("composemail.ejs");
});

app.get("/openmail", (req, res) => {
  res.render("openmail.ejs");
});

app.get("/signout", (req, res) => {
  res.render("login.ejs", { message: req.flash("message") });
});

app.get("/fetchUsername", (req, res) => {
  let user = currentUser;
  let email = currentUserEmail;
  res.json({user, email});
});

app.get("/fetchMail", (req, res) => {
  let data;
  fs.readFile("./mails.json","utf-8", (err, mailData) => {
    if(err) {
      console.log(err);
    }
    else {
      try {
         data = JSON.parse(mailData);
         res.json(data);
      }
      catch{
        console.log("Error parsing mails file");
      }
    }
  })
});

app.post("/addMail", (req, res) => {
  try {
    var today = new Date();
    var AmPm;
    if((today.getHours()>12)){
      AmPm = "PM";
    }
    else{
      AmPm = "AM";
    }
    var hours = today.getHours() % 12 || 12;
    let newMail = {};
    newMail.id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    newMail.time = hours + ":" + today.getMinutes() + " " +AmPm;
    newMail.subject = req.body.subject;
    newMail.senderName = req.body.senderName;
    newMail.sender = req.body.sender;
    newMail.recipient = req.body.recipient;
    newMail.content = req.body.content;
    let data = [];
    fs.readFile("./mails.json", "utf-8", (err, mailData) => {
      if (err) {
        console.log(err);
      } else {
        try {
          data = JSON.parse(mailData);
          data.push(newMail);
          fs.writeFile("./mails.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              console.log(err);
            } else {
              let message = "Succesfully written";
              console.log("Succesfully written into mails.json");
              res.json(message);
            }
          });
        } catch (err) {
          console.log("Error parsing mails JSON file:" + err);
        }
      }
    });
  } catch (err) {
    console.log("Error parsing mails JSOn file:" + err);
  }
  
});

app.post("/addDraft", (req, res) => {
  try {
    var today = new Date();
    var AmPm;
    if((today.getHours()>12)){
      AmPm = "PM";
    }
    else{
      AmPm = "AM";
    }
    var hours = today.getHours() % 12 || 12;
    let newDraft = {};
    newDraft.id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    newDraft.time = hours + ":" + today.getMinutes() + " " +AmPm;
    newDraft.subject = req.body.subject;
    newDraft.senderName = req.body.senderName;
    newDraft.sender = req.body.sender;
    newDraft.recipient = req.body.recipient;
    newDraft.content = req.body.content;
    let data = [];
    fs.readFile("./drafts.json", "utf-8", (err, draftData) => {
      if (err) {
        console.log(err);
      } else {
        try {
          data = JSON.parse(draftData);
          data.push(newDraft);
          fs.writeFile("./drafts.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              console.log(err);
            } else {
              let message = "Succesfully written";
              console.log("Succesfully written into drafts.json");
              res.json(message);
            }
          });
        } catch (err) {
          console.log("Error parsing mails JSON file:" + err);
        }
      }
    });
  } catch (err) {
    console.log("Error parsing mails JSON file:" + err);
  }
});

app.get("/fetchDrafts", (req, res) => {
  let data;
  fs.readFile("./drafts.json","utf-8", (err, draftData) => {
    if(err) {
      console.log(err);
    }
    else {
      try {
        data = JSON.parse(draftData);
        res.json(data);
      }
      catch{
        console.log("Error parsing drafts file");
      }
    }
  })
});

app.listen(8000, () => {
  console.log(
    "Server connected at port number 8000 with url 'http://localhost:8000/'"
  );
});
