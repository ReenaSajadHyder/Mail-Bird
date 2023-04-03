let mailArr = [];
let email;
let user;
let mailNum = 0;

(function () {
  fetchUsername();
  fetchMail();
})();

function fetchUsername() {
  fetch("/fetchUsername")
    .then((data) => data.json())
    .then((result) => {
      user = result.user;
      email = result.email;
    });
}

function fetchMail() {
  fetch("/fetchMail")
    .then((data) => data.json())
    .then((result) => {
      mailArr = result;
      changeMailNum();
    });
}

function changeMailNum() {
  mailNum = 0;
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].recipient == email) {
      if (mailArr[i].readStatus == "unread") {
        mailNum++;
      }
    }
  }
  console.log(mailNum);
  document.querySelector("#mails-number").innerHTML = mailNum;
}

document.querySelector("#inbox-sec").addEventListener("click", () => {
  window.location.href = "/inboxsection";
});
document.querySelector("#sent-sec").addEventListener("click", () => {
  window.location.href = "/sentsection";
});
document.querySelector("#drafts-sec").addEventListener("click", () => {
  window.location.href = "/draftssection";
});
document.querySelector("#trash-sec").addEventListener("click", () => {
  window.location.href = "/trashsection";
});
document.querySelector("#compose-btn").addEventListener("click", () => {
  window.location.href = "/composemail";
});
