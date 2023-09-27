const TOKEN = localStorage.getItem("access_token");

const URLs={
    login:"http://127.0.0.1:7000/api/token/",
    getProfile:"/users/account/",
    allCategory: "http://127.0.0.1:7000/categorie/GetAll",
    allEvents: "http://127.0.0.1:7000/event/GetAll",
    allAtelier: "http://127.0.0.1:7000/atelier/GetAll",
    allMyAtelier: "http://127.0.0.1:7000/atelier/GetAll",
    getMessageStream: "http://127.0.0.1:7000/atelier/getmessages/",
    sendMessageStream: "http://127.0.0.1:7000/atelier/sendmessages/",
    getAgoraToken: 'http://127.0.0.1:7000/agora/token/',
}

const appid = "a5b57400b77442328b286486f4e155d9"


module.exports = {TOKEN, URLs, appid}