import React from 'react'
import "./Card.css"
function Card(props) {
  return (
    <>
    <div className="card wrapper-card" onClick={props.onClick}>
      <div className="card-header">
      </div>
        <div className="card-body">
          {
            props.image &&
            <div style={{
              width: '300px',
              height: "150px",
              background:props.image,
              backgroundSize:"cover",
              backgroundPosition:"center center",
              display: "flex",
              flexDirection:"column"
            }}>
            
            </div>
          }
          {
            props.bodyContent && props.bodyContent
          }
        </div>
        <div className="card-footer">
          {
            props.title &&
            <div className='d-flex'>
              <h5>
              <i className="bx bx-note"></i>
                <b>{"Titre : "}</b>
              </h5>
              <p>{props.title}</p>
            </div>
          }
          
          {
            props.description &&
            <div className='d-flex'>
              <h5><b>{"Descirption :"}</b></h5>
              <p>{props.description}</p>
            </div>
          }
          
          {
            props.date &&
            <div className='d-flex'>
              <h5>
                <i className="bx bx-calendar"></i>
                <b>{" Date init :"}</b>
              </h5>
              <small>{props.date}</small>
            </div>
          }
          {
            props.dateDebut &&
            <div className='d-flex'>
              <h5>
                <i className="bx bx-calendar"></i>
                <b>{" Date debut :"}</b>
              </h5>
              <small>{props.dateDebut.replace("T", " ")}</small>
            </div>
          }
          
        </div>
    </div>
    </>
  )
}

export default Card