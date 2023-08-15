import React from 'react'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faBars } from '@fortawesome/free-solid-svg-icons'
const HomePage = () => {
    const navigate=useNavigate()



    const go =()=>{




        navigate("/odeljenja")
    }


  return (
    <div>

        <button onClick={go}>Go to odeljenja</button>
        
    </div>
  )
}

export default HomePage