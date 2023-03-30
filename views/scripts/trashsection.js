let mailArr = [];
let trashArr = [];
let email;
let currentMailId = "";
let user;
let totalMailNum = 0;

(function () {
  fetchUsername();
  fetchMail();
  fetchTrash();
})();

function fetchUsername() {
  fetch("/fetchUsername")
    .then((data) => data.json())
    .then((result) => {
      user = result.user;
      email = result.email;
    });
}

function fetchTrash() {
  fetch("/fetchTrash")
    .then((data) => data.json())
    .then((result) => {
      trashArr = result;
      trashNum();
      displayMails();
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

function trashNum(){
  for (let i = 0; i < trashArr.length; i++) {
    if ((trashArr[i].recipient == email) || (trashArr[i].sender == email)){
      totalMailNum++;
    }
  }
}

function changeMailNum() {
  mailNum = 0;
  totalMailNum = 0;
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].recipient == email){
      if (mailArr[i].readStatus == "unread") {
        mailNum++;
      }
    }
  }
  document.querySelector("#mails-number").innerHTML = mailNum;
}

function displayMails() {
  changeBg();
  document.querySelector("#mails-container").innerHTML = "";
  for (let i = 0; i < trashArr.length; i++) {
    if (trashArr[i].recipient == email || trashArr[i].sender == email) {
      currentMailId = trashArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail">
                <div class="show-mail" onclick="showMailContent(${currentMailId})">
                    <div class="sender-name">
                        ${trashArr[i].senderName}
                    </div>
                    <div class="mail-title">
                        ${trashArr[i].subject}
                    </div>
                    <div class="time">
                        ${trashArr[i].time}
                    </div>
                </div>
                <div>
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="deleteTrash()">
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
    document.querySelector("#mails-container").style.backgroundColor = "white";
  }
}

function showMailContent(id) {
  let mailContentId = id;
  for (let i = 0; i < trashArr.length; i++) {
    if (trashArr[i].id == mailContentId) {
      document.querySelector("#mails-container").style.overflowY = "hidden";
      document.querySelector(
        "#mails-container"
      ).innerHTML = `<div id="compose-box">
                      <div id="mail-container">
                          <div id="subject-time">
                              <div id="subject">${trashArr[i].subject}</div>
                              <div id="close-compose" onclick="displayMails()">&#10005</div>
                          </div>
                          <div id="from-sender">
                              <div id="from">From:</div>
                              <div id="sender-name">${trashArr[i].senderName}</div>
                          </div> 
                          <div id="to-recipient">
                              <div id="from">To:</div>
                              <div id="sender-name">${trashArr[i].recipient}</div>
                          </div>
                          <div id="content">
                              ${trashArr[i].content}
                          </div>
                      </div>
                  </div>`;
    }
  }
}

function deleteTrash() {
  let mailObj = {};
  mailObj.id = currentMailId;
  fetch("/deleteTrash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailObj),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      window.location.href = "/trashsection";
    });
}

document.querySelector("#sign-out-txt").title = `Sign out of your account!`;
document.querySelector("#inbox-txt").title = `Navigate to the inbox section`;
document.querySelector("#sent-txt").title = `Navigate to the sent section`;
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
document.querySelector("#compose-btn").addEventListener("click", () => {
  window.location.href = "/composemail";
});
