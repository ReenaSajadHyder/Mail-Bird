let mailArr = [];
let email;
let user;

(function(){
    fetchUsername();
    fetchMail();
})();

function fetchUsername(){
    fetch("/fetchUsername")
    .then((data) => data.json())  
     .then((result) => {
        user = result.user;
        email = result.email;
        console.log(user);
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
        if(mailArr[i].sender == email){
            document.querySelector("#mails-container").innerHTML = 
            `<div class="mail">
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
            </div>` + document.querySelector("#mails-container").innerHTML;
        }
    }
}