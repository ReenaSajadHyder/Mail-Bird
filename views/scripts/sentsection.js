let mailArr = [];
let email;
let user;
let currentMailId = "";
let totalMailNum = 0;

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
      displayMails();
    });
}

function displayMails() {
  document.querySelector("#mails-container").innerHTML = "";
  changeBg();
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].sender == email) {
      currentMailId = mailArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail">
                <div class="show-mail" onclick="showMailContent(${currentMailId})">
                    <div class="sender-name">
                        ${mailArr[i].recipient}
                    </div>
                    <div class="mail-title">
                        ${mailArr[i].subject}
                    </div>
                    <div class="time">
                        ${mailArr[i].time}
                    </div>
                </div>
                <div>
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash(${currentMailId})">
                </div>
            </div>` + document.querySelector("#mails-container").innerHTML;
    }
  }
}

function changeBg() {
  if(totalMailNum == 0){
    document.querySelector("#mails-container").style.backgroundImage = "url(./assets/images/sectionpg-bg-small.jpg)";
  }
  if(totalMailNum > 0){
    console.log("Inside totalmailnum > 0")
    document.querySelector("#mails-container").style.backgroundColor = "white";
  }
}

function showMailContent(id) {
  let mailContentId = id;
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].id == mailContentId) {
      document.querySelector("#mails-container").style.overflowY = "hidden";
      document.querySelector(
        "#mails-container"
      ).innerHTML = `<div id="compose-box">
                    <div id="mail-container">
                        <div id="subject-time">
                            <div id="subject">${mailArr[i].subject}</div>
                            <div id="close-compose" onclick="displayMails()">&#10005</div>
                        </div>
                        <div id="to-recipient">
                            <div id="to">To:</div>
                            <div id="recipient-name">${mailArr[i].recipient}</div>
                        </div>
                        <div id="content">
                            ${mailArr[i].content}
                        </div>
                    </div>
                </div>`;
    }
  }
}

function changeMailNum() {
  mailNum = 0;
  totalMailNum = 0;
  for (let i = 0; i < mailArr.length; i++) {
    if(mailArr[i].sender == email) {
      totalMailNum++;
    }
    if (mailArr[i].recipient == email) {
      if (mailArr[i].readStatus == "unread") {
        mailNum++;
      }
    }
  }
  document.querySelector("#mails-number").innerHTML = mailNum;
}

function addToTrash(id) {
  let deletedMailId = id;
  let mailObj = {};
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].id == deletedMailId) {
      mailObj.id = mailArr[i].id;
      mailObj.time = mailArr[i].time;
      mailObj.senderName = mailArr[i].senderName;
      mailObj.sender = mailArr[i].sender;
      mailObj.subject = mailArr[i].subject;
      mailObj.recipient = mailArr[i].recipient;
      mailObj.content = mailArr[i].content;
    }
  }
  fetch("/addTrash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailObj),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      window.location.href = "/sentsection";
    });
}

document.querySelector("#sign-out-txt").title = `Sign out of your account!`;
document.querySelector("#drafts-txt").title = `Navigate to the draft section`;
document.querySelector("#inbox-txt").title = `Navigate to the inbox section`;
document.querySelector("#trash-txt").title = `Navigate to the trash section`;
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
