import React from 'react'
import './VerticalScroll.css'

function VerticalScroll(props) {
  return (
    <div className='wrapper'>
        {props.children}
    </div>
  )
}

export default VerticalScroll