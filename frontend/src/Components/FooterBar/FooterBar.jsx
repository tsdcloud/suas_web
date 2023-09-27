import React from 'react'
import { useNavigate } from 'react-router-dom'
import './FooterBar.css'

function FooterBar() {
    const navigate = useNavigate()
  return (
    <div className='footbar-nav card shadow-lg p-3 d-flex' style={{boxShadow:"0px 50px 15px rgba(0,0,0,0.1"}}>
        <div className="row">
            <div className='col-3 text-center footer-btn' onClick={()=>{navigate('/')}}>
                <i className='bx bxs-category'></i><br />
                <small style={{fontSize: "10px"}}>
                    Category
                </small>
            </div>
            <div className='col-3 text-center footer-btn' onClick={()=>{navigate('/events')}}>
                <i class='bx bxs-shapes'></i><br />
                <small style={{fontSize: "10px"}}>
                    Evenements
                </small>
            </div>
            <div className='col-3 text-center footer-btn'>
                <i class='bx bxs-user-circle'></i><br />
                <small style={{fontSize: "10px"}}>
                    Profile
                </small>
            </div>
            <div className='col-3 text-center footer-btn'>
                <i class='bx bx-qr-scan' ></i><br />
                <small style={{fontSize: "10px"}}>
                    Scanner qr
                </small>
            </div>
        </div>
    </div>
  )
}

export default FooterBar