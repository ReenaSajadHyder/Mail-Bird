let mailArr = [];
let email;

(function(){
    fetchUsername();
    fetchMail();
})();

function fetchUsername(){
    fetch("/fetchUsername")
    .then((data) => data.json())  
     .then((result) => {
        let user = result.user;
        email = result.email;
     })
}

function fetchMail(){
    fetch("/fetchMail")
    .then((data) => data.json())  
     .then((result) => {
        mailArr = result;
        displayMails();
     })
}

function displayMails(){
    document.querySelector("#mails-container").innerHTML = "";
    for (let i = 0; i < mailArr.length; i++ ){
        if(mailArr[i].recipient == email){
            document.querySelector("#mails-container").innerHTML = 
            `<div class="mail">
                <div class="pin"><img class="pin-symbol" src="./assets/images/tack-bw.png" alt="pinned"></div>
                <div class="sender-name">
                    ${mailArr[i].senderName}
                </div>
                <div class="mail-title">
                    ${mailArr[i].subject}
                </div>
                <div class="time">
                    ${mailArr[i].time}
                </div>
            </div>` + document.querySelector("#mails-container").innerHTML;
        }
    }
}
