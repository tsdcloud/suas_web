const agoraController = require('express').Router();
const axios = require('axios');
const {URLs} = require("../Constant/constants")


agoraController.post('/token/', async (req, res) => {

    let headersList = {
    "Accept": "*/*",
    "Authorization": req.headers.authorization,
    "Content-Type": "application/json" 
    }

    let bodyContent = JSON.stringify({
    "tokenType": req.body.tokenType,
    "channel": req.body.channel,
    "role": req.body.role,
    "uid": req.body.uid,
    "expire": req.body.expire
    });

    let reqOptions = {
    url: URLs.getAgoraToken,
    method: "POST",
    headers: headersList,
    data: bodyContent,
    }

    try {
        
        let response = await axios.request(reqOptions);
        if(response.status === 200){
            return res.status(201).json(response.data);
        }
        console.log(response.status);
        return res.status(400).json(response.data);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }


})


module.exports = agoraController;