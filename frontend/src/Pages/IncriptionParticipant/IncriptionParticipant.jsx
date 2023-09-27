import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../../Components/Card'
import VerticalScroll from '../../Components/VerticalScroll';
import bg1 from '../../assets/bg1.jpeg'
import LogoTransparent from "../../assets/LogoTransparent.png"
import { URLs, TOKEN } from '../../constants/constants';
import "./IncriptionParticipant.css"
import useFetch from '../../hook/useFetch';

function InscriptionParticipant() {

const num_cards = [1, 2, 3, 4, 5];
const [atelier, setAtelier] = useState([]);

const { id } = useParams();

useEffect(() => {
    fetchAtelier(id);
  }, [id]);
  
  useEffect(() => {
      fetchMyAtelier();
    }, []);

const navigate = useNavigate();


const fetchAtelier = async(id)=>{
    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
       }
              
    let response = await fetch(URLs.allAtelier, { 
      method: "GET",
      headers: headersList
    });
    
    try {
        let data = await response.json();
        const myAtelier = data?.data.filter(item=>item.id_event === id);
        setAtelier(myAtelier);
        console.log(atelier);

    } catch (error) {
        console.log(error.message);
    }finally{

    }
       
}

const fetchMyAtelier = async()=>{
    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
       }
              
    let response = await fetch(URLs.allAtelier, { 
      method: "GET",
      headers: headersList
    });
    
    try {
        let data = await response.json();
        if(response?.status === 201){
            if(data?.data?.id_event){
                setAtelier(data?.data.slice(0, 5))
                console.log(data?.data)
            }
            console.log(data)
        }
    } catch (error) {
        console.log(error.message);
    }finally{

    }
       
}
  return (
    <>
        <div className="page-header d-flex justify-content-between" style={{
            height: "200px",
            padding:"30px",
            background:{bg1},
            backgroundSize:"cover",
            backgroundPosition:"center center",
            display: "flex",
            flexDirection:"column",
            position: "fixed",
            top:"0",
            left:"0",
            right:"0",
        }}>
            <div className="">
                <div className="col-12">
                    <button className='text-white btn btn-default' onClick={()=>navigate(-1)}>
                        <i class='bx bx-left-arrow-alt'></i>
                        {" Retour"}
                    </button>
                </div>
            </div>
            <div>
                <h2 className='page-heading'>
                    {"Inscription"}
                </h2>
                <p className="page-description">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
        </div>
        <div className="page-content" style={{overflowY: "auto"}}>
            <div className='d-flex justify-content-center align-items-center p-sm-5'>
            <div
            style={{
                background: "#fff",
                marginTop:"150px",
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
                </div>
                <div className='card-header'>
                </div>
                <div className='card-body py-4'>
                <label htmlFor="useremail">Nom <span className='text-danger'>*</span>:</label>
                <input type="text" className='form-input' id='username' placeholder='votre nom'/>
        
                <label htmlFor="prenom"className='mt-3'>Prénom <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="prenom" className='form-input' placeholder='votre prénom'/>

                <label htmlFor="entreprise"className='mt-3'>Nom de l'entreprise <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="entreprise" className='form-input' placeholder='votre entreprise'/>

                <label htmlFor="fonction"className='mt-3'>Votre fonction dans l'entreprise <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="fonction" className='form-input' placeholder='votre fonction'/> 

                <label htmlFor="pays"className='mt-3'>Pays de résidence <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="pays" className='form-input' placeholder='Saisir le pays de résidence'/>
                
                <label htmlFor="ville"className='mt-3'>Ville de résidence <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="ville" className='form-input' placeholder='Saisir votre ville de résidence'/>

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
        
                <label htmlFor="ville"className='mt-3'>Email <span className='text-danger'>*</span>:</label>
                <input type="text" name="" id="ville" className='form-input' placeholder='Votre email'/>

                <div className='row'>
                    <button className='btn mt-5 _shadow' style={{backgroundColor: "#1C616D", color:"#fff", borderRadius:"50px"}}>
                    <i class='bx bx-loader-alt bx-spin' undefined ></i> S'inscrire
                    </button>
                </div>
                </div>
            </div>
                
            </div>
        </div>
    </>
  )
}

export default InscriptionParticipant