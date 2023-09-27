import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../Components/Card'
import VerticalScroll from '../../Components/VerticalScroll';
import bg1 from '../../assets/bg1.jpeg'
import { URLs, TOKEN } from '../../constants/constants';
import FooterBar from '../../Components/FooterBar/FooterBar';
import "./Evenements.css"

function Evenements() {
const [events, setEvents] = useState([]);
const { id } = useParams();
const navigate = useNavigate();
useEffect(()=>{
    fetchEvents()
}, [])

useEffect(() => {
    fetchEvents(id);
  }, [id]);

const fetchEvents = async(id)=>{
    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer "+TOKEN,
        "Content-Type": "application/json"
       }

       let bodyContent = JSON.stringify({
        "id":id
      });
      
      
      try {
        let response = await fetch(URLs.allEvents, { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });
        let data = await response.json();
        console.log(data)
        if(response.status === 201){
            setEvents(data.data.slice(0, 5))
        }
    } catch (error) {
        console.log(error.message);
    }finally{

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
            <div className="row">
                
            </div>
            <div className=''>
                <h2 className='page-heading' style={{color:'#3b6269'}}>
                    {"Evenements"}
                </h2>
                <p className="page-description">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
        </div>
        <div className="page-content mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center p-3">
                <h4>
                    <b>{"Tous les evenements"}</b>
                </h4>
                <a href="#">
                    <>{"Tous voir"}</>
                </a>
            </div>

            <div>
                <div>
                    {events.length > 0 ?
                        (events.map((item)=>(
                            <>
                                <div>
                                {/* <Card 
                                    key={item.uuid} title={item.libelle} date={item.date_init} 
                                    description={item.description}
                                    image={bg1}
                                    profile={bg1}
                                    onClick={()=>navigate("events/"+item.uuid)}
                                /> */}
                                <div class="card h-100 m-2" key={item.uuid} onClick={()=>navigate("../events/ateliers/"+item.uuid)}>
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
                            </>
                        ))):
                        (
                            <div className="container">
                                <div className='row mt-5'>
                                    <div className="col-12 text-center" style={{fontSize:"20px"}}>
                                        <i className='bx bx-archive'></i>
                                        <h1 className="text-center">
                                            {" Aucun évènements"}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        <FooterBar />
    </>
  )
}

export default Evenements