let draftsArr = [];
let email;
let user;
let currentMailId = "";

(function () {
  fetchUsername();
  fetchDrafts();
})();

function fetchUsername() {
  fetch("/fetchUsername")
    .then((data) => data.json())
    .then((result) => {
      user = result.user;
      email = result.email;
    });
}

console.log(user, email);
function fetchDrafts() {
  fetch("/fetchDrafts")
    .then((data) => data.json())
    .then((result) => {
      draftsArr = result;
      displayMails();
    });
}

function displayMails() {
  document.querySelector("#mails-container").innerHTML = "";
  for (let i = 0; i < draftsArr.length; i++) {
    if (draftsArr[i].sender == email) {
      currentMailId = draftsArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
                <div class ="show-mail" onclick="showMailContent(${currentMailId})" >
                    <div class="sender-name">
                        ${draftsArr[i].recipient}
                    </div>
                    <div class="mail-title">
                        ${draftsArr[i].subject}
                    </div>
                    <div class="time">
                        ${draftsArr[i].time}
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
  for (let i = 0; i < draftsArr.length; i++) {
    if (draftsArr[i].id == mailContentId) {
      sessionStorage.setItem(
        "draft",
        JSON.stringify({
          subject: draftsArr[i].subject,
          recipient: draftsArr[i].recipient,
          content: draftsArr[i].content,
        })
      );
    }
  }

  window.location.href = "/composemail";
}

function addToTrash() {
  let mailObj = {};
  for (let i = 0; i < draftsArr.length; i++) {
    if (draftsArr[i].id == currentMailId) {
      mailObj.id = draftsArr[i].id;
      mailObj.time = draftsArr[i].time;
      mailObj.senderName = draftsArr[i].senderName;
      mailObj.sender = draftsArr[i].sender;
      mailObj.subject = draftsArr[i].subject;
      mailObj.recipient = draftsArr[i].recipient;
      mailObj.content = draftsArr[i].content;
    }
  }
  fetch("/addDraftTrash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailObj),
  })
    .then((data) => data.json())
    .then((result) => {
      console.log(result);
      window.location.href = "/draftssection";
    });
}

document.querySelector("#sign-out-txt").title = `Sign out of your account!`;
document.querySelector("#inbox-txt").title = `Navigate to the inbox section`;
document.querySelector("#sent-txt").title = `Navigate to the sent section`;
document.querySelector("#trash-txt").title = `Navigate to the trash section`;
