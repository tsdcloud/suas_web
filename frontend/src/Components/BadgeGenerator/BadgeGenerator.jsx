import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import badgeBG from '../../assets/Badge.png'
import avatar from '../../assets/avatar.jpg'
import './BadgeGenerator.css';


const BadgeGenerator = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="shadow-lg p-2 bg-white" style={{
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
      </div>
    </>
  );
};

export default BadgeGenerator;