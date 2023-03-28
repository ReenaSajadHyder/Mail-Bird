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
  if (imgurl.endsWith("password-hidden.png")){
    isTrue = true;
  }
  if (isTrue) {
    eye.src = "http://localhost:8000/assets/images/password-visible.png";
  } else {
    eye.src = "http://localhost:8000/assets/images/password-hidden.png";
  }
}

function togglePwdVisibility() {
  let confPwd = document.getElementById("conf-password-input");
  let confEye = document.getElementById("conf-password-hidden");
  var imgurl = confEye.src;
  var isTrue = false;
  if (confPwd.type === "password") {
    confPwd.type = "text";
  } else {
    confPwd.type = "password";
  }
  if(imgurl.endsWith("password-hidden.png")){
    isTrue = true;
  }
  if (isTrue) {
    confEye.src = "http://localhost:8000/assets/images/password-visible.png";
  } else {
    confEye.src = "http://localhost:8000/assets/images/password-hidden.png";
  }
}
