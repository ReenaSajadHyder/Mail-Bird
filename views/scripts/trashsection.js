(function(){
    fetchUsername();
})();

function fetchUsername(){
    fetch("/fetchUsername")
    .then((data) => data.json())  
     .then((result) => {
        let user = result.user;
        let email = result.email;
        console.log("Inside trash page "+user);
     })
}