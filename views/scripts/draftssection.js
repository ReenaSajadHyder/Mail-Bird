let draftsArr = [];
let email;
let currentMailId = "";

(function () {
  fetchUsername();
  fetchDrafts();
})();

function fetchUsername() {
  fetch("/fetchUsername")
    .then((data) => data.json())
    .then((result) => {
      let user = result.user;
      email = result.email;
    });
}

function fetchDrafts() {
  fetch("/fetchDrafts")
    .then((data) => data.json())
    .then((result) => {
      console.table(result);
      draftsArr = result;
      displayMails();
    });
}

function displayMails() {
  console.log("Inside display mails function");
  document.querySelector("#mails-container").innerHTML = "";
  for (let i = 0; i < draftsArr.length; i++) {
    if (draftsArr[i].sender == email) {
      currentMailId = draftsArr[i].id;
      document.querySelector("#mails-container").innerHTML =
        `<div class="mail" onclick="showMailContent(${currentMailId})">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
                <div class="sender-name">
                    ${draftsArr[i].recipient}
                </div>
                <div class="mail-title">
                    ${draftsArr[i].subject}
                </div>
                <div class="time">
                    ${draftsArr[i].time}
                </div>
                <div>
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can">
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
