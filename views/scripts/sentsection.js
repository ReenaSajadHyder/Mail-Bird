let mailArr = [];
let email;
let user;
let currentMailId = "";

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
      console.log(user);
    });
}

function fetchMail() {
  fetch("/fetchMail")
    .then((data) => data.json())
    .then((result) => {
      mailArr = result;
      displayMails();
    });
}

function displayMails() {
  document.querySelector("#mails-container").innerHTML = "";
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].sender == email) {
      currentMailId = mailArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
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
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash()">
                </div>
            </div>` + document.querySelector("#mails-container").innerHTML;
    }
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

function addToTrash() {
  let mailObj = {};
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].id == currentMailId) {
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
