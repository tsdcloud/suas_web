const categoryController = require('express').Router();
const axios = require('axios');
const {URLs} = require("../../Constant/constants")

categoryController.get("/getall/", async (req, res)=>{
    
    let headersList = {
        "Accept": "*/*",
        "Authorization": req.headers.authorization,
        "Content-Type":"application/json"
    }

    let reqOptions = {
        url: URLs.allCategory,
        method: "GET",
        headers: headersList,
    }
    try {
        let response = await axios.request(reqOptions);
        console.log(response);
        if(response.data.code == 0){
            return res.status(201).json(response.data);
        }
        return res.status(401).json({message: "No category found"});
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


module.exports = categoryController