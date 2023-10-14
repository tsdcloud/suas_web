import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import badgeBG from '../../assets/Badge.png'
import avatar from '../../assets/images.png'
import './BadgeGenerator.css';
import {QRCodeSVG} from 'qrcode.react';
import { TOKEN, URLs } from '../../constants/constants';

const user = {
  username: "Mr. Jean SOSO",
  email:"usertest@bfclimited.com"
}

const BadgeGenerator = () => {
  const domain = window.location.host; 
  const [qrValue, setQrValue] = useState(domain+"/uuid")
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); 

  const fetchUser = async()=>{
    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
       }
              
       let bodyContent = JSON.stringify({
        "id_atelier":id
      });
    let response = await fetch(URLs.userInscription, { 
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
    
    try {
        let data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(error.message);
    }finally{

    }
       
}

useEffect(()=>{
  console.log(qrValue);
  fetchUser()
},[])

  return (
    <>
      <div className="container">
            <div className="padding">
                <div className="font">
                    <div className="top">
                        <img src={avatar} style={{objectFit: "cover"}}/>
                    </div>
                    <div className="bottom">
                        <p>Mr. Jean SOSO</p>
                        <p className="desi">Participant</p>
                        <div className="barcode">
                        <QRCodeSVG style={{height:"65px", width:"65px"}} value={qrValue.toString()} />
                        </div>
                        <p className="no">Salle 40</p>
                        <p className="no">Digital Transformation Centre <br/> Stage – Mozambique</p>
                    </div>
                </div>
            </div>
            <div className="back">
                <h1 className="Details">informations</h1>
                <hr className="hr"/>
                <div className="details-info">
                    <p><b>Email : </b></p>
                    <p className='sm-text'>jeansoso@bfclimited.com</p>
                    <p><b>Téléphone: </b></p>
                    <p className='sm-text'>+237 677345673</p>
                    <p><b>Fonction:</b></p>
                    <p className='sm-text'>Directeur TSD</p>
                    </div>
                    <hr/>
                </div>
            </div>
       
      {/* <div className="shadow-lg p-2 bg-white" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: "fixed",
            zIndex: 99999999,
            top: 0,
            right: 0,
            left: 0,
        }}>
            <button className='btn btn-default' onClick={()=>navigate(-1)}>
                <i className='bx bxs-chevron-left'></i> {" Retour"}
            </button>
            <div></div>
        </div>
      <div className='badge-wrapper d-flex justify-content-center align-items-center h-100'style={{overflowX: "auto", minHeight:"100vh"}}>
        <div className="badge" style=
        {{
            background: `url(${badgeBG})`,
            backgroundSize: "397px 559px",
            width: "397px",
            height: "559px",
            overflowY:"auto",
            overflowX:"auto",
            position:"absolute"
        }}>
            <div style={{position: "relative"}}>
              <div className='d-flex justify-content-center align-items-center' style={{width:"153px", height:"153px", borderRadius: "50%",marginTop: "61.5px", marginLeft:"30.2%", overflow:"hidden"}}>
                <img src={avatar} style={{width:"154px", height:"154px", borderRadius: "50%", objectFit:"cover"}}/>
              </div>
                <h6 style={{marginTop:"17px", color:"#1f7687"}}>Participant</h6>
                <h2 style={{marginTop:"30px", color:"#efce77", textAlign:"center"}}><b>Mr. Jean SOSO</b></h2>
            </div>
        </div>
      </div> */}
    </>
  );
};

export default BadgeGenerator;