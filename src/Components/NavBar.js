import React from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
const NavBar = () => {



const navigate=useNavigate();




const toNav = (naziv) =>{

navigate(`/${naziv}`);

}

  return (
    <>
<nav>


<input type='checkbox' id="check"/>
<label htmlFor="check"className='checkbtn' >

<FontAwesomeIcon className='icon'   icon={faBars }  />
</label>

    <label  className='logo'>ClinicX</label>


    <ul>

     
     <li><button  onClick={()=>toNav("")} >O nama</button></li>
     <li><button onClick={()=>toNav("odeljenja")} >Odeljenja</button></li>
     <li><button >Pacijenti</button></li>
     <li><button >Admin </button></li>
     <li><button >Uloguj se </button></li>
   
  


    </ul>
    </nav>
    
    </>
  )
}

export default NavBar