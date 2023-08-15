import React from 'react'
import "../styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
const NavBar = () => {
  return (
    <>
<nav>


<input type='checkbox' id="check"/>
<label htmlFor="check"className='checkbtn' >

<FontAwesomeIcon className='icon'   icon={faBars }  />
</label>

    <label  className='logo'>ClinicX</label>


    <ul>

     <li><a  className="active"href='#'>Pocetna</a></li>
     <li><a href='#'>O nama</a></li>
     <li><a href='#'>Usluge</a></li>
     <li><a href='#'>Pacijenti</a></li>
     <li><a href='#'>Admin </a></li>
   
  


    </ul>
    </nav>
    
    </>
  )
}

export default NavBar