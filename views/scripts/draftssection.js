let draftsArr = [];
let email;
let currentMailId = "";

(function(){
    fetchUsername();
    fetchDrafts();
})();

function fetchUsername(){
    fetch("/fetchUsername")
    .then((data) => data.json())  
     .then((result) => {
        let user = result.user;
        email = result.email;
     })
}

function fetchDrafts(){
    fetch("/fetchDrafts")
    .then((data) => data.json())  
     .then((result) => {
        mailArr = result;
        displayMails();
     })
}

function displayMails(){
    console.log("Inside display mails function");
    document.querySelector("#mails-container").innerHTML = "";
    for (let i = 0; i < mailArr.length; i++ ){
        if(mailArr[i].sender == email){
            currentMailId = mailArr[i].id;
            document.querySelector("#mails-container").innerHTML = 
            `<div class="mail" onclick="showMailContent(${currentMailId})">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
                <div class="sender-name">
                    ${mailArr[i].recipient}
                </div>
                <div class="mail-title">
                    ${mailArr[i].subject}
                </div>
                <div class="time">
                    ${mailArr[i].time}
                </div>
                <div>
                    <img class="trash-can" src="./assets/images/trash-outline.png" alt="trash can">
                </div>
            </div>`
            + document.querySelector("#mails-container").innerHTML 
        }
    }

}

function showMailContent(id) {
    let mailContentId = id;
    for (let i = 0; i < mailArr.length; i++){
        if(mailArr[i].id == mailContentId){
            document.querySelector("#mails-container").style.overflowY = "hidden";
            document.querySelector("#mails-container").innerHTML = 
                `<div id="compose-box">
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
                </div>`
        }
    }
}