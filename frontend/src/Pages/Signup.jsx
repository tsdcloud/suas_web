import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css"
import LogoTransparent from "../assets/LogoTransparent.png"

const SignupPage = () => {
    return(
        <div className='container d-flex justify-content-center align-items-center p-sm-5'>
          <div
          style={{
            background: "#fff",
            width:"400px",
            minHeight:"500px",
            borderRadius:"15px",
            padding: "25px"
          }}
          >
            <div
            style={{
              display:"flex",
              justifyContent:"center",
            }}
            >
              <img src={LogoTransparent} alt="No image found" className='logo'/>
            </div>
            <div className='card-header'>
              <h1 className='card-heading'>S'inscrire</h1>
            </div>
            <div className='card-body py-4'>
              <label htmlFor="useremail">Nom :</label>
              <input type="text" className='form-input' id='username' placeholder='votre nom'/>
    
              <label htmlFor="password"className='mt-3'>Prénom :</label>
              <input type="text" name="" id="text" className='form-input' placeholder='votre prénom'/>

              <label htmlFor="password"className='mt-3'>Email :</label>
              <input type="email" name="" id="email" className='form-input' placeholder='votre email'/>

              <label htmlFor="password"className='mt-3'>Mot de passe :</label>
              <input type="password" name="" id="password" className='form-input' placeholder='votre mot de passe'/>

              <label htmlFor="password"className='mt-3'>Confirmer votre mot de passe :</label>
              <input type="password" name="" id="password" className='form-input' placeholder='confirmer votre mot de passe'/>

              <div className='mt-3'>
                <label htmlFor="">Sexe :</label>
                <div className='d-flex'>
                    <div className='mr-3'>
                        <input type="radio" name="gender" id="" value="Male"/>
                        {" "}Male
                    </div>

                    <div>
                        <input type="radio" name="gender" id="" />
                        {" "}Female
                    </div>
                </div>
              </div>

              <label htmlFor="telephone"className='mt-3'>Telephone :</label>
              <div className='row'>
                <div className="d-flex">
                    <div className="">
                        <select
                        id="telephone" 
                        className='form-input country-indicator' 
                        >
                            <option value="">+237</option>
                        </select>
                    </div>
                    <div className="col-8 mr-3">
                        <input type="text" name="" id="password" className='form-input  country-indicator-phone' placeholder='Votre numéro de téléphone'/>
                    </div>
                </div>
              </div>

              <label htmlFor="" className='mt-3'>Date de naissance :</label>

              <div class="input-group">
                <input type="text" class="col-4 form-input" placeholder='JJ'/>
                <input type="text" class="col-4 form-input" placeholder='MM' />
                <input type="text" class="col-4 form-input" placeholder='AAAA' />
            </div>
            
              {/* <div className="d-flex justify-end mt-2">
                <a href="#">Mot de passe oublié ?</a>
              </div> */}
    
              <div className='row'>
                <button className='btn mt-5 _shadow' style={{backgroundColor: "#1C616D", color:"#fff", borderRadius:"50px"}}>
                <i class='bx bx-loader-alt bx-spin' undefined ></i> S'inscrire
                </button>
              </div>
              <div className="row">
                <div className="col-12 my-3">
                  <Link to="/" className='text-center'>Se connecter</Link>
                </div>
              </div>
            </div>
          </div>
              
        </div>
      )
  };

  export default SignupPage