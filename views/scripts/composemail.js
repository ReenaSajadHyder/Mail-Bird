let user;
let email;
let draftId = sessionStorage.getItem("draft");
let mailArr = [];

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
  document.querySelector("#mails-number").innerHTML = mailNum;
}

function addMail() {
  let content = document.querySelector("#content");
  let contentValue = content.value.replace(
      /\r\n|\r|\n/g,
      "<br>"
     );
  let newMailObj = {};
  newMailObj.senderName = user;
  newMailObj.sender = email;
  newMailObj.subject = document.querySelector("#subject-inp").value;
  newMailObj.recipient = document.querySelector("#recipient-name").value;
  newMailObj.content = contentValue;
  newMailObj.readStatus = "unread";
  fetch("/addMail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMailObj),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      window.location.href = "/sentsection";
    });
}

function addToDrafts() {
  let content = document.querySelector("#content").value;
  let contentValue = content.replace(
      /\r\n|\r|\n/g,
      "<br>"
     );
  let draftObj = {};
  draftObj.senderName = user;
  draftObj.sender = email;
  draftObj.subject = document.querySelector("#subject-inp").value;
  draftObj.recipient = document.querySelector("#recipient-name").value;
  draftObj.content = contentValue;

  fetch("/addDraft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draftObj),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      window.location.href = "/draftssection";
    });
}
let sessionDraft = sessionStorage.getItem("draft");
if (sessionDraft != null) {
  sessionDraft = JSON.parse(sessionDraft);
  let content = sessionDraft.content.replace(
    /\r\n|\r|\n/g,
    "<br>"
   );
  document.querySelector("#subject-inp").value = `${sessionDraft.subject}`;
  document.querySelector("#recipient-name").value = `${sessionDraft.recipient}`;
  document.querySelector("#content").value = `${content}`;
  sessionStorage.clear();
}

document.querySelector("#sign-out-txt").title = `Sign out of your account!`;
document.querySelector("#inbox-txt").title = `Navigate to the inbox section`;
document.querySelector("#sent-txt").title = `Navigate to the sent section`;
document.querySelector("#trash-txt").title = `Navigate to the trash section`;
document.querySelector("#drafts-txt").title = `Navigate to the draft section`;

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



