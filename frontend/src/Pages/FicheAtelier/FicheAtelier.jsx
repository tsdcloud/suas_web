import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../../Components/Card'
import VerticalScroll from '../../Components/VerticalScroll';
import bg1 from '../../assets/bg1.jpeg'
import nodatalogo from '../../assets/nodatalogo.svg'
import { URLs, TOKEN } from '../../constants/constants';
import "./FicheAtelier.css"
import FooterBar from '../../Components/FooterBar/FooterBar';
import useFetch from '../../hook/useFetch';

function FicheAtelier() {

const [pageIsLoading, setPageIsLoading] = useState(true)
const [atelier, setAtelier] = useState({});
const { id } = useParams();

useEffect(() => {
    // fetchAtelier(id);
    fetchMyAtelier();
    localStorage.setItem("uid", id);
    localStorage.setItem("channel_name", id.replaceAll("-","_").replaceAll(":","_"));
  }, [id]);
  
  useEffect(() => {
    //   fetchMyAtelier();
    }, []);

const navigate = useNavigate();


// const fetchAtelier = async(id)=>{
//     let headersList = {
//         "Accept": "*/*",
//         "Authorization": "Bearer "+TOKEN,
//         "Content-Type": "application/json"
//        }
              
//     let response = await fetch(URLs.allAtelier, { 
//       method: "GET",
//       headers: headersList
//     });
    
//     try {
//         let data = await response.json();
//         const myAtelier = data?.data.filter(item=>item.id_event === id);
//         setAtelier(myAtelier);
//         console.log(atelier);

//     } catch (error) {
//         console.log(error.message);
//     }finally{

//     }
       
// }

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
            const selectAtelier = data?.data.filter(item=>item.uuid == id)[0];
            setAtelier(selectAtelier);
            console.log(atelier);
        }
    } catch (error) {
        console.log(error.message);
    }finally{
        setPageIsLoading(false);
    }
       
}
  return (
    <>
        <div className="shadow-lg p-2 bg-white" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: "fixed",
            zIndex: 9999999,
            top: 0,
            right: 0,
            left: 0,
        }}>
            <button className='btn btn-default' onClick={()=>navigate(-1)}>
                <i className='bx bxs-chevron-left'></i> {" Retour"}
            </button>
            <div></div>
        </div>

        <div className="" style={{
            height: "150px",
            padding:"50px",
            background:{bg1},
            backgroundSize:"cover",
            backgroundPosition:"center center",
            display: "flex",
            flexDirection:"column"
        }}>
            <div className="row d-flex justify-content-center align-items-center p-4" style={{}}>
                <img src={nodatalogo} alt="" className='' style={{width: '150px'}}/>
            </div>

            {pageIsLoading ?
            (
                <div className='d-flex justify-content-center align-items-center' style={{height:"90vh", flexDirection:"column"}}>
                    <i class='bx bx-loader-alt bx-spin' undefined style={{fontSize: "50px"}}></i>
                    <h5>Chargement...</h5>
                </div>
            ):
            (
                <div>
                    <h2 className='page-heading text-center' style={{color:'#3b6269'}}>
                        {atelier.libelle}
                    </h2>
                    <div className=" mt-2 mb-5">
                        <div className='d-flex justify-content-center align-items-center'>
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <p>
                                            {atelier.description}
                                        </p>
                                    </div>
                                </div>
                                <div className='row mt-3 d-flex'>
                                    {atelier.statut === "3"
                                    &&
                                    <button className='btn btn-primary my-2 btn-sm py-2' style={{borderRadius: "50px", color:"#fff", background:"#3B6269"}} onClick={()=>{navigate(`../room/${atelier.uuid}`)}}>
                                        <i className='bx bx-exit'></i>
                                        {" Rejoindre"}
                                    </button>
                                
                                    }
                                    {
                                        atelier.statut === "2" &&
                                        <p className='text-secondary py-2' style={{borderRadius: "50px"}} to="/inscription">
                                            <i className='bx bx-spreadsheet'></i>
                                            {" La reunion va bientôt commencer"}
                                        </p>
                                    }
                                    {
                                        atelier.statut === "1" &&
                                        <p className='text-secondary py-2' style={{borderRadius: "50px"}} to="/inscription">
                                            <i className='bx bx-spreadsheet'></i>
                                            {" En attente de validation"}
                                        </p>
                                    }
                                    {
                                        atelier.statut === "4" &&
                                        <p className='text-secondary py-2' style={{borderRadius: "50px"}} to="/inscription">
                                            <span class="badge rounded-pill bg-label-warning">
                                            <i class='bx bx-error-alt'></i>
                                                {" Reunion terminée"}
                                            </span>
                                        </p>
                                    }                                
                                    {
                                        atelier.statut === "5" &&
                                        <p className='text-secondary py-2' style={{borderRadius: "50px"}} to="/inscription">
                                            <span class="badge rounded-pill bg-label-warning">
                                            <i class='bx bx-error-alt'></i>
                                                {" Reunion terminée"}
                                            </span>
                                        </p>
                                    }                                
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
            }
        </div>
        {/**/} <button className="float-btn btn" style={{background:"#3b6269", color:"#fff", bottom: "90px", right:"10px"}}
            onClick={()=>{
                navigate("/view-badge/"+id)
            }}
        >
            <i className="bx bx-id-card"></i>{" Avoir mon badge"}
        </button> 
        <FooterBar />
    </>
  )
}

export default FicheAtelier