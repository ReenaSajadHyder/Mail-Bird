let user;
let email;

(function () {
  fetchUsername();
})();

function fetchUsername() {
  fetch("/fetchUsername")
    .then((data) => data.json())
    .then((result) => {
      user = result.user;
      email = result.email;
    });
}

function addMail() {
  let newMailObj = {};
  newMailObj.senderName = user; 
  newMailObj.sender = email;
  newMailObj.subject = document.querySelector("#subject-inp").value;
  newMailObj.recipient = document.querySelector("#recipient-name").value;
  newMailObj.content = document.querySelector("#content").value;
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
    let draftObj = {};
    draftObj.senderName = user;
    draftObj.sender = email;
    draftObj.subject = document.querySelector("#subject-inp").value;
    draftObj.recipient = document.querySelector("#recipient-name").value;
    draftObj.content = document.querySelector("#content").value;
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