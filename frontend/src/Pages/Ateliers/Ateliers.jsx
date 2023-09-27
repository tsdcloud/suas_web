import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../Components/Card'
import VerticalScroll from '../../Components/VerticalScroll';
import bg1 from '../../assets/bg1.jpeg'
import { URLs, TOKEN } from '../../constants/constants';
import "./Ateliers.css"
import useFetch from '../../hook/useFetch';
import FooterBar from '../../Components/FooterBar/FooterBar';
function Atelier() {

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
              
       
       try {
        let response = await fetch(URLs.allAtelier, { 
          method: "GET",
          headers: headersList
        });
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
              
       
       try {
        let response = await fetch(URLs.allAtelier, { 
          method: "GET",
          headers: headersList
        });
        let data = await response.json();
        if(response?.status === 201){
            if(data?.data?.id_event){
                setAtelier(data?.data)
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
            <div>
                <h2 className='page-heading' style={{color:'#3b6269'}}>
                    {"Atelier"}
                </h2>
                <p className="page-description">
                    Lorem ipsum dolor sit amet consectetur.
                </p>
            </div>
        </div>
        <div className="page-content mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center p-3">
                <h4>
                    <b>{"Tous les ateliers"}</b>
                </h4>
                <a href="#">
                    <>{"Tous voir"}</>
                </a>
            </div>

            <div>
                <VerticalScroll style={{background:"red"}}>
                    {atelier.length > 0?
                        (atelier.map((item)=>(
                            
                            <>
                                <div>
                                    {/* <Card 
                                        key={item.uuid} title={item.libelle} date={item.date_init} 
                                        description={item.description}
                                        image={bg1}
                                        profile={bg1}
                                        onClick={()=>navigate("events/"+item.uuid)}
                                    /> */}
                                    <div class="card h-100 m-2" key={item.uuid} onClick={()=>navigate(`../../fiche-atelier/${item.uuid}`)}>
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
                        )))
                        :
                        (
                            <div className="container">
                                <div className='row mt-5'>
                                    <div className="col-12 text-center" style={{fontSize:"20px"}}>
                                        <i className='bx bx-archive'></i>
                                        <h1 className="text-center">
                                            {" Aucun ateliers"}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </VerticalScroll>
            </div>

        </div>
        <FooterBar />
    </>
  )
}

export default Atelier