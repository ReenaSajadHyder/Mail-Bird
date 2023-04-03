var loginErrorMessage = false;
var signupErrorMessage = false;
let errorIcon = document.querySelector("error-msg-icon-l");

(function () {
  hideErrorIcon();
})();

function hideErrorIcon() {
  if (!loginErrorMessage) {
    errorIconLg.style.display = "none";
  }
  // if(!signupErrorMessage) {
  //   errorIcon.style.display = "none";
  // }
}

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

document.querySelector("#login-btn").addEventListener("click", () => {
  console.log("Inside login on click");
  if (document.querySelector("login-error-message").innerHTML == " ") {
    loginErrorMessage = false;
  }
  if (loginErrorMessage) {
    errorIcon.src = "http://localhost:8000/assets/images/error-message.png";
  }
});
