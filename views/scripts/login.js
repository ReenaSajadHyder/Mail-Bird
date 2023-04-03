var loginErrorMessage = false;
// var signupErrorMessage = false;
let errorIcon = document.querySelector("#error-msg-icon");

// (function () {
//   hideErrorIcon();
// })();

// function hideErrorIcon() {
//   if (!loginErrorMessage) {
//     errorIcon.style.display = "none";
//   }
//   // if(!signupErrorMessage) {
//   //   errorIcon.style.display = "none";
//   // }
// }

function toggleVisibility() {
  let pwd = document.getElementById("password-input");
  let eye = document.getElementById("password-hidden");
  var imgurl = eye.src;
  var isTrue = false;
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
  if (imgurl.endsWith("password-hidden.png")) {
    isTrue = true;
  }
  if (isTrue) {
    eye.src = "http://localhost:8000/assets/images/password-visible.png";
  } else {
    eye.src = "http://localhost:8000/assets/images/password-hidden.png";
  }
}

// console.log(document.querySelector("#error-message").innerHTML);

// document.querySelector("#login-btn").addEventListener("click", () => {
  
// });

// function showError() {
//   let userObj = {};
//   userObj.email = document.querySelector("#email-input").value;
//   userObj.password = document.querySelector("#password-input").value;
//   fetch("/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userObj),
//   }).then((data) => data.json())
//   .then((result) => {
//     errorMsg();
//   });
  
// }

// function errorMsg() {
//   if (!(document.querySelector("#error-message").innerHTML === "")) {
//     console.log("Inside");
//     document.querySelector("#login-error-message").style.display = "flex";
//     errorIcon.style.visibility = "visible";
//   }
// }