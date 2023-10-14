const TOKEN = localStorage.getItem("access_token");

// const URLs={
//     // login:"http://172.19.120.187:7000/api/token/",
//     login:"http://149.202.42.116:9000/api/token/",
//     getProfile:"http://149.202.42.116:9000/users/account/",
//     allCategory: "http://149.202.42.116:9000/categorie/GetAll",
//     allEvents: "http://149.202.42.116:9000/event/GetAll",
//     allAtelier: "http://149.202.42.116:9000/atelier/GetAll",
//     userInscription: "http://149.202.42.116:9000/atelier/getUserParticipant",
//     allMyAtelier: "http://149.202.42.116:9000/atelier/GetAll",
//     getMessageStream: "http://149.202.42.116:9000/atelier/getmessages/",
//     sendMessageStream: "http://149.202.42.116:9000/atelier/sendmessages/",
//     getAgoraToken: 'http://149.202.42.116:9000/agora/token/',
// }
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
    userInscription: "http://127.0.0.1:7000/atelier/getUserParticipant/",
}

const appid = "a5b57400b77442328b286486f4e155d9"


module.exports = {TOKEN, URLs, appid}