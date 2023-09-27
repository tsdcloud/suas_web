import React, {useRef, useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"
import LogoTransparent from "../assets/LogoTransparent.png"
import {TOKEN, URLs} from "../constants/constants";
import AuthContext, { AuthProvider } from "../Context/AuthContext";


const LoginPage = () => {
  const navigate = useNavigate();
  const [emailMsg, setEmailMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userEmail = useRef();
  const userPassword = useRef();


  const validation=(data)=>{
    var errorCount = 0;

    if(!data.email){
      ++errorCount;
      setEmailMsg("Champ requis");
    }else{
      setEmailMsg("");
    }
    
    if(!data.password){
      ++errorCount;
      setPasswordMsg("Champ requis");
    }else{
      setPasswordMsg("");
    }
    
    if(!emailRegex.test(data.email)){
      ++errorCount;
      setEmailMsg("Entrer un email valide");
    }else{
      setEmailMsg("");
    }

    if(errorCount > 0){
      return false;
    }
    setIsLoading(false);
    return true;
  }
  
  const { setAuthTokens, setIsLoggedIn } = useContext(AuthContext);

  /**
   * 
   */
  const handleSignIn = async() => {
    setIsLoading(true);
    const formData = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    }
    
    if(validation(formData)){
      
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "email":formData.email,
         "password":formData.password
       });
       
       
       
       try {
         let response = await fetch(URLs.login, { 
           method: "POST",
           body: bodyContent,
           headers: headersList
         });
         
         let data = await response.json();

         console.log(data);
         console.log(response);
         if(response.status == 201) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            // const accessToken = localStorage.getItem("access_token");
            // const refreshToken = localStorage.getItem("refresh_token");
            setIsLoggedIn(true)
            // setAuthTokens({accessToken, refreshToken});
            setFormMsg("")
            navigate("/")
         }
         else{
          setFormMsg("Email ou mot de passe invalid")
          userPassword.current.value = "";
         }
         console.log(data);
       } catch (error) {
        userPassword.current.value = "";
       }finally{
        userPassword.current.value = "";
       }
    }
    else{
      setIsLoading(false);
    }
     
  }

  return(
    <div className='d-flex justify-content-center align-items-center'>
      <div
      className='card p-3'
      >
        <div
        style={{
          display:"flex",
          justifyContent:"center",
        }}
        >
          <img src={LogoTransparent} alt="No image found" className='logo'/>
        </div>
        <div className='card-body py-4'>
          <h1 className='card-heading'>Login</h1>
          <label htmlFor="useremail" className="text-light fw-semibold">
            <small>Email :</small>
            </label>
          <input 
          type="text" 
          className='form-input' 
          id='useremail' 
          placeholder='Votre address email'
          ref={userEmail}
          />
          <small className='text-danger'>{emailMsg}</small>

          <label htmlFor="password" className="text-light fw-semibold">
            <small>Password :</small>
            </label>
          <input 
          type="password" 
          name="" 
          id="password" 
          className='form-input' 
          placeholder='Votre mot de passe'
          ref={userPassword}
          />
          <small className='text-danger'>{passwordMsg}</small>

          <div className="d-flex justify-end mt-2">
            <a href="#">
              <small>Mot de passe oublié ?</small>
            </a>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <p className='text-center'>
                <small className='text-danger'>{formMsg}</small>
              </p>
            </div>
          </div>
          <div className='row'>
            <button className='btn mt-3 _shadow' 
            style={{backgroundColor: "#1C616D", color:"#fff", borderRadius:"50px"}}
            onClick={()=>{handleSignIn()}}
            disabled={isLoading}
            >
              {
                isLoading && (<i class='bx bx-loader-alt bx-spin' undefined ></i>)
              }
            Se connecter
            </button>
          </div>
          <div className="row">
            <div className="col-12 my-3">
              <Link className='text-center' to="/sign-up">Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Add your React Router routes and components here

export default LoginPage;

