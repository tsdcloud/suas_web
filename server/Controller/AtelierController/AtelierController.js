const atelierController = require('express').Router();
const axios = require('axios');
const {URLs} = require("../../Constant/constants")

atelierController.get("/getall/", async (req, res)=>{
    
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type":"application/json"
    }

    let reqOptions = {
        url: URLs.allAtelier,
        method: "GET",
        headers: headersList,
    }
    try {
        let response = await axios.request(reqOptions);
        if(response.data.code == 0){
            return res.status(201).json(response.data);
        }
        return res.status(401).json({message: "No category found"});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

atelierController.post('/getmessages/', async (req, res) => {
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
         "id_atelier":req.body.id_atelier,
         "time":req.body.time
       });
       
       let reqOptions = {
         url: URLs.getMessageStream,
         method: "POST",
         headers: headersList,
         data: bodyContent,
       }
       
       try {
           let response = await axios.request(reqOptions);
            if(response.status === 200){
                return res.status(201).json(response.data);
            }
            return res.status(400).json({message: response.message})
       } catch (error) {
        return res.status(500).json({message: error.message});
       }
})

atelierController.post('/getUserParticipant/', async (req, res) => {
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
         "id_atelier":req.body.id_atelier,
       });
       
       let reqOptions = {
         url: URLs.inscriptionAtelier,
         method: "POST",
         headers: headersList,
         data: bodyContent,
       }
       
       try {
           let response = await axios.request(reqOptions);
            if(response.status === 200){
                return res.status(201).json(response.data);
            }
            return res.status(400).json({message: response.message})
       } catch (error) {
        return res.status(500).json({message: error.message});
       }
})


atelierController.post('/sendmessages/', async (req, res) => {
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
        "id_user":  req.body.id_user,
        "id_atelier":  req.body.id_atelier,
        "nom":  req.body.nom,
        "image":  req.body.image,
        "role":  req.body.role,
        "message":  req.body.message,
        "description":  req.body.description,
        "micStatus":  req.body.micStatus,
        "handStatus":  req.body.handStatus,
        "title":  req.body.title,
        "time":  req.body.time,
      });
       
      console.log(bodyContent)
       let reqOptions = {
         url: URLs.sendMessageStream,
         method: "POST",
         headers: headersList,
         data: bodyContent,
       }
       
       try {
           let response = await axios.request(reqOptions);
           console.log(response)
            if(response.data.code === 0){
                console.log(response.data);
                return res.status(201).json(response.data);
            }
            return res.status(400).json({message: response.message})
       } catch (error) {
        // console.log(error)
        return res.status(500).json({message: error.message});
       }
})

module.exports = atelierController;