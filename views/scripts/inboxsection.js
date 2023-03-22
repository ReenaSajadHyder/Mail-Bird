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
        document.querySelector("#current-user").innerHTML = user;
     })
}

function fetchMail(){
    // console.log("Inside fetchmail method in js file")
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
        console.log("Inside for loop");
        if(mailArr[i].recipient == email){
            console.log("Inside if loop");
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