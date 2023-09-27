const authController = require('express').Router();
const axios = require('axios');
const {URLs} = require("../Constant/constants")

authController.post("/token/", async (req, res)=>{
    const data = {}
    const body = req.body

    if(!body.email){
        data.email = "user email required"
    }

    if(!body.password){
        data.password = "user password required"
    }

    if(Object.keys(data).length !== 0){
        return res.status(401).json(data);
    }


    let headersList = {
        "Accept": "*/*",
        "Content-Type":"application/json"
    }

    let bodyContent = {
        "username": body.email,
        "password": body.password
      };
       
    let reqOptions = {
        url: URLs.login,
        method: "POST",
        headers: headersList,
        data: bodyContent
    }
    
    try {
        let response = await axios.request(reqOptions);
        if(response.status == 401){
            return res.status(401).json({message: "No active account found with the given credentials"});
        }
        return res.status(201).json(response.data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
    }
})


module.exports = authController
