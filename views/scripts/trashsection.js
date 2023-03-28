let mailArr = [];
let email;
let currentMailId = "";
let user;

(function () {
  fetchUsername();
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
      mailArr = result;
      displayMails();
    });
}

function displayMails() {
  document.querySelector("#mails-container").innerHTML = "";
  for (let i = 0; i < mailArr.length; i++) {
    if (mailArr[i].recipient == email || mailArr[i].sender == email) {
      currentMailId = mailArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
                <div class="show-mail" onclick="showMailContent(${currentMailId})">
                    <div class="sender-name">
                        ${mailArr[i].senderName}
                    </div>
                    <div class="mail-title">
                        ${mailArr[i].subject}
                    </div>
                    <div class="time">
                        ${mailArr[i].time}
                    </div>
                </div>
                <div>
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="deleteTrash()">
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
                          <div id="from-sender">
                              <div id="from">From:</div>
                              <div id="sender-name">${mailArr[i].senderName}</div>
                          </div> 
                          <div id="content">
                              ${mailArr[i].content}
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
