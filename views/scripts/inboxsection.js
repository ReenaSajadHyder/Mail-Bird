let mailArr = [];
let pinnedMailArr =[];
let remainingMails = [];
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
    });
}

function fetchMail() {
  fetch("/fetchMail")
    .then((data) => data.json())
    .then((result) => {
      mailArr = result;
      fetch("/fetchPinnedMail")
    .then((data) => data.json())
    .then((result) => {
      pinnedMailArr = result;
      console.log(pinnedMailArr);
      displayMails();
    });
      
    });
    
}

function displayMails() {
  getRemainingMails();
  document.querySelector("#mails-container").innerHTML = "";
  if(pinnedMailArr.length == 0) {
    for(let i = 0; i < mailArr.length; i++){
      if(mailArr[i].recipient == email){
        currentMailId = mailArr[i].id;
        document.querySelector("#mails-container").innerHTML =
          `<div class="mail">
                  <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned" onclick="pinMail(${currentMailId})"></div>
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
                      <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash()">
                  </div>
              </div>` + document.querySelector("#mails-container").innerHTML;
      }
    }
  }
  else {
    for(let i = 0; i < pinnedMailArr.length; i++){
      if(pinnedMailArr[i].recipient == email){
        currentMailId = pinnedMailArr[i].id;
        document.querySelector("#mails-container").innerHTML =
          `<div class="mail">
                  <div class="pin"><img class="pin-symbol" src="http://localhost:8000/assets/images/tack-red.png" alt="pinned" onclick="pinMail(${currentMailId})"></div>
                  <div class="show-mail" onclick="showMailContent(${currentMailId})">
                      <div class="sender-name">
                          ${pinnedMailArr[i].senderName}
                      </div>
                      <div class="mail-title">
                          ${pinnedMailArr[i].subject}
                      </div>
                      <div class="time">
                          ${pinnedMailArr[i].time}
                       </div>
                  </div>
                  <div>
                      <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash()">
                  </div>
              </div>` + document.querySelector("#mails-container").innerHTML;
      }
    }
    for(let i = 0; i < remainingMails.length; i++) {
      if(remainingMails[i].recipient == email) {
        currentMailId = remainingMails[i].id;
        document.querySelector("#mails-container").innerHTML +=
          `<div class="mail">
                  <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned" onclick="pinMail(${currentMailId})"></div>
                  <div class="show-mail" onclick="showMailContent(${currentMailId})">
                      <div class="sender-name">
                          ${remainingMails[i].senderName}
                      </div>
                      <div class="mail-title">
                          ${remainingMails[i].subject}
                      </div>
                      <div class="time">
                          ${remainingMails[i].time}
                       </div>
                  </div>
                  <div>
                      <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash()">
                  </div>
              </div>`
      }
    }
  }
  // for (let i = 0; i < mailArr.length; i++) {
  //   if (mailArr[i].recipient == email) {
  //     currentMailId = mailArr[i].id;
  //     for(let i = 0; i < pinnedMailArr.length; i++){
  //       document.querySelector("#mails-container").innerHTML =
  //       `<div class="mail">
  //               <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned" onclick="pinMail()"></div>
  //               <div class="show-mail" onclick="showMailContent(${currentMailId})">
  //                   <div class="sender-name">
  //                       ${pinnedMailArr[i].senderName}
  //                   </div>
  //                   <div class="mail-title">
  //                       ${pinnedMailArr[i].subject}
  //                   </div>
  //                   <div class="time">
  //                       ${pinnedMailArr[i].time}
  //                    </div>
  //               </div>
  //               <div>
  //                   <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can" onclick="addToTrash()">
  //               </div>
  //           </div>` + document.querySelector("#mails-container").innerHTML;
  //     }
  //   }
  // }
}

function getRemainingMails() {
  for (let i = 0; i < mailArr.length; i++)
        {
            let j;
            for (j = 0; j < pinnedMailArr.length; j++){
              if (mailArr[i].id === pinnedMailArr[j].id){
                break;
              }
            }
            if (j == pinnedMailArr.length)
                remainingMails.push(mailArr[i]);
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
      window.location.href = "/inboxsection";
    });
}
function pinMail(id) {
  console.log("Inside pin mail");
  // document.querySelector(".pin").src = "http://localhost:8000/assets/images/tack-red.png";
  let pinMailId = id;
  let pinnedObj = {};
  // let unpinnedObj = {};
  for(let i = 0; i< mailArr.length; i++) {
    if(mailArr[i].id == pinMailId){
      pinnedObj.id = mailArr[i].id;
      pinnedObj.time = mailArr[i].time;
      pinnedObj.subject = mailArr[i].subject;
      pinnedObj.senderName = mailArr[i].senderName;
      pinnedObj.sender = mailArr[i].sender;
      pinnedObj.recipient = mailArr[i].recipient;
      pinnedObj.content = mailArr[i].content;
      fetch("/addPinnedMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pinnedObj),
      })
        .then((data) => data.json())
        .then((result) => {
          console.log(result);
          window.location.href = "/inboxsection";
        });
    }
    // if(mailArr[i].id !== currentMailId){
    //   unpinnedObj = mailArr[i];
    //   fetch("/addNormalMail", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(unpinnedObj),
    //   })
    //     .then((data) => data.json())
    //     .then((result) => {
    //       console.log(result);
    //       window.location.href = "/inboxsection";
    //     });
    // }
  }
}
document.querySelector("#sign-out-txt").title = `Sign out of your account!`;
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
document.querySelector("#compose-btn").addEventListener("click", () => {
  window.location.href = "/composemail";
});


