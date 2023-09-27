const URLs = require("../Constant/constants");
const axios = require("axios");

// Verify token middleware
const verifyToken= async(req, res, next) => {
    const token = req.headers.authorization
    if(!token || !token.startsWith("Bearer ")){
        return res.status(403).send({"message":"Unauthorized access"})
    }

    if(token && token.startsWith("Bearer ")){

            let headersList = {
                "Accept": "*/*",
                "Content-Type": "application/json" 
            }

            let bodyContent = JSON.stringify({
             "token":token.split(" ")[1]
           });

           let reqOptions = {
               url: URLs.USER_URL+"api/token/verify/",
               method: "POST",
               headers: headersList,
               data: bodyContent,
            }

            try {

                let response = await axios.request(reqOptions);
                if(response.status == 200){
                    console.log("Verify token was successfull...");
                    next();
                }else{
                    console.log("Token expired or invalid");
                    return res.status(401).json({message:"Token expired or invalid"});
                }

            } catch (error) {
                console.log("Verify token failed with status code 500");
                return res.status(500).json(error.message);
           }
           
    }
}



module.exports = {verifyToken}