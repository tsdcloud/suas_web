import React, {useEffect, useState, useContext} from 'react'
import AuthContext from "../../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import VerticalScroll from '../../Components/VerticalScroll';
import bg1 from '../../assets/bg1.jpeg'
import nodatalogo from '../../assets/nodatalogo.svg'
import { URLs, TOKEN } from '../../constants/constants';
import "./Categories.css"
import FooterBar from '../../Components/FooterBar/FooterBar';

function Categories() {

const [categories, setCategories] = useState([]);
const [pageIsLoading, setPageIsLoading] = useState(true);
const [menuIsOpenned, setMenuIsOpenned] = useState(false);
const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

useEffect(()=>{
    console.log(menuIsOpenned)
    fetchCategories()
}, [])

const navigate = useNavigate();


const fetchCategories = async ()=>{
    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
       }
    
       try {
           let response = await fetch(URLs.allCategory, { 
             method: "GET",
             headers: headersList
           });
           let data = await response.json();
            if(response.status === 201){
                setCategories(data.data)
            }
       } catch (error) {
            alert("Votre session a expiré");
            // setIsLoggedIn(false);
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
            <div>
                <button className='btn' onClick={()=>setMenuIsOpenned(!menuIsOpenned)}>
                    <i class='bx bx-dots-vertical-rounded' ></i>
                </button>
            </div>
        </div>
        {
            menuIsOpenned 
            &&
            <div className='card' style={{position: 'fixed', zIndex: '9999999',  right:'10px', top:'50px'}}>
                <button className='btn' onClick={()=>{
                        localStorage.clear();
                        setIsLoggedIn(false);
                        navigate('/')
                    }
                }>
                    <i className='bx bxs-door-open'></i>
                    Deconnexion
                </button>
            </div>
        }

        {/* <div className="" style={{
            height: "150px",
            padding:"50px",
            background:{bg1},
            backgroundSize:"cover",
            backgroundPosition:"center center",
            display: "flex",
            flexDirection:"column"
        }}>
            <div className="row">
                
            </div>
            <div>
                <h2 className='page-heading' style={{color:'#3b6269'}}>
                    {"Categories"}
                </h2>
                <p className="page-description">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
        </div> */}
        {pageIsLoading ?
        (
            <div className='d-flex justify-content-center align-items-center' style={{height:"90vh", flexDirection:"column"}}>
                <i class='bx bx-loader-alt bx-spin' undefined style={{fontSize: "50px"}}></i>
                <h5>Chargement...</h5>
            </div>
        ):
        (
            <div className="page-content mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center p-3">
                <h4 className='mt-5'>
                    <b>{"Mes categories"}</b>
                </h4>
                <a href="#">
                    <>{"Tous voir"}</>
                </a>
            </div>

            <div>
                <>
                    {categories.length>0?
                        categories.map((item)=>(
                            <div className='' style={{display:'flex !important'}}>
                                {/* <Card 
                                    key={item.uuid} title={item.libelle} date={item.date_init} 
                                    description={item.description}
                                    image={bg1}
                                    profile={bg1}
                                    onClick={()=>navigate("events/"+item.uuid)}
                                /> */}
                                <div class="card h-100 h-md-50 m-2" key={item.uuid} onClick={()=>navigate("events/"+item.uuid)}>
                                    <div class="card-body">
                                    <h5 class="card-title">{item.libelle}</h5>
                                    {/* <h6 class="card-subtitle text-muted">Support card subtitle</h6> */}
                                    </div>
                                    <img class="img-fluid" src={bg1} alt="Card image cap" />
                                    <div class="card-body">
                                    {/* <p class="card-text">Bear claw sesame snaps gummies chocolate.</p>
                                    <a href="javascript:void(0);" class="card-link">Card link</a> */}
                                    <a href="javascript:void(0);" class="card-link">Date :{item.date_init}</a>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        (
                            <div className="container">
                                <div className='row mt-5'>
                                    <div className="col-12 text-center" style={{fontSize:"20px"}}>
                                        <i className='bx bx-archive'></i>
                                        <h1 className="text-center">
                                            {" Aucune categories"}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </>
            </div>

        </div>
        )
    }
        
        {/* <div className='back-drop'>
            <div className='side-bar shadow-lg p-2'>
                <div className="d-flex justify-content-between">
                    <div>
                    </div>
                    <div style={{border: "1px solid #f4f4f4"}} className='p-1 rounded'>
                        <i className='bx bx-x' style={{fontSize: "35px"}}></i>
                    </div>
                </div>
                <div className="d-flex flex-direction">
                    <ul className="sidebar-menu nav-list">
                        <li className="menu-item"><Link className="nav-link">Toutes mes catégories</Link></li>
                        <li className="menu-item"><Link className="nav-link">Tous mes évènements</Link></li>
                        <li className="menu-item"><Link className="nav-link">Tous mes atelier</Link></li>
                        <li className="menu-item"><Link className="nav-link">Tous mes évènements</Link></li>
                    </ul>
                </div>
            </div>
        </div> */}
        <FooterBar />
    </>
  )
}

export default Categories