
const URLs = {
    login: "http://149.202.42.116:7000/api/token/",
    token: "http://149.202.42.116:7000/",
    allCategory: "http://149.202.42.116:8000/categorie/GetAll",
    allEvent: "http://149.202.42.116:8000/event/GetAll",
    allAtelier: "http://149.202.42.116:8000/atelier/GetAll",
    getMessageStream: "http://149.202.42.116:8000/messagerie/StreamMessage/GetUntil",
    sendMessageStream: "http://149.202.42.116:8000/messagerie/StreamMessage/Create",
    getAgoraToken: 'https://agora-token-service-production-0cf9.up.railway.app/getToken',
    inscriptionAtelier: "http://149.202.42.116:8000/inscription/GetAllFromAtelier",

}

module.exports = {URLs}