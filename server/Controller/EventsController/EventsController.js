const eventsController = require('express').Router();
const axios = require('axios');
const {URLs} = require("../../Constant/constants")

eventsController.post("/GetAll/", async (req, res)=>{
    
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type":"application/json"
    }

    // if(!req.body.id){
    //     return res.status(403).json({message:"Categorie Id required"})
    // }

    let bodyContent = JSON.stringify({
        // "id_categorie":req.body.id
        "id_categorie":"7e601d4d-2bd3-4c70-940b-0fd95d48c0ca:1"
      });
      
    
    let reqOptions = {
        url: URLs.allEvent,
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    let response = await axios.request(reqOptions);
    
    try {
        let response = await axios.request(reqOptions);

        if(response.data.code == 0){
            return res.status(201).json(response.data);
        }
        console.log(response.data);
        return res.status(401).json({message: "No category found"});

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


module.exports = eventsController