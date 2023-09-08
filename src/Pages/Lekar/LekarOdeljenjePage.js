
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DetailsOdeljenje } from "../../actions/odeljenjaActions";
import { FaAddressCard, FaList, FaPowerOff, FaUser, FaUsers } from "react-icons/fa";
import { faAddressCard,faHospitalUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doctorImage from "../../images/lekar.png";
import adminImage from "../../images/user-gear.png";
import krevetImage from "../../images/krevet.png"
import users from "../../images/group.png";
import profile from "../../images/user.png";
import { useParams } from "react-router";
import "../../styles/adminProfilePage.css"
const LekarOdeljenjePage = () => {

    const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

    const { userInfo, success } = korisnickiLogin;
  const params=useParams();

  const id=params.id;
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [brojk, setBrojKreveta] = useState(0);
  
  const dispatch=useDispatch();
    const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);
  
    const { loading, error, odeljenje } = odeljenjaDetail;
  
    const object1 = Array(odeljenje.brojKreveta).fill();
    useEffect(()=>{
  
        if (odeljenje.id !== id) {
            dispatch(DetailsOdeljenje(id));
          }
    
      setBrojKreveta(odeljenje.brojKreveta);
      
    },[dispatch, id, odeljenje])
  
    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  


  return (
    <>
      
    
        <Container fluid > 
        <Row>
          <Col md={3} className='padding0'>
            <div className='navAdmin'>
              <div className='adminImage'>
                <Image fluid src={doctorImage} />
              </div>
              <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
              <p>{userInfo.role}</p>

              <h3>Opcije</h3>

              <ul>
                <li className="navAdminLine activeNav">
                  <FaUser className='faIcons' />
                  Profil
                </li>
               <li className="navAdminLine" >
                  <FaList className='faIcons' />
                  Lista pacijenata
                </li>
                <li className="navAdminLine" >
                <FontAwesomeIcon style={{ marginRight: "0.6rem" }} icon={faAddressCard} />
                  Lista pregleda
                </li>
              </ul>
            </div>
          </Col>
          <Col style={{padding:"1rem"}} md={9}>
            
                <Container  style={{background:"#80D0F4",width:"100%",height:"100%",}} >
                  
                <h3 style={{textAlign:"center",color:"white",paddingTop:"0.7rem"}}>{odeljenje.naziv}</h3>
                    
          <Container style={{display:"flex",flexWrap:"wrap"}} >
                {object1.map((contact,index)=>
          <>
         
        

          {index <  odeljenje.brojKreveta-odeljenje.brojPacijenata  ?
          
          <Container className="krevet"  style={{width:"6rem",margin:"15px 10px",backgroundColor:"white"}}>
           
          
          <Image style={{width:"100%",background:"blue"}} src={krevetImage} />
       
          <p style={{color:"black",textAlign:"center"}}>{index +1 }</p>
        </Container> :  <Container  className="krevet"  style={{width:"6rem",margin:"15px 10px",backgroundColor:"green"}}>
           
          
           <Image style={{width:"100%",background:"blue"}} src={krevetImage} />
         
           <p style={{color:"white",textAlign:"center"}}>{index+1}</p>

           <button  style={{fontSize:"14px",padding:"5px",marginBottom:"10px",background:"black",color:"white",display:"flex"}}  >Karton<FontAwesomeIcon style={{marginLeft:"5px"}} icon={faHospitalUser} /></button>  
         </Container>


          


}              
                </>        



                )}


            </Container>

             

                

                  
               </Container>           

          </Col>
        </Row>
      </Container>

    </>

    
  
  )
}

export default LekarOdeljenjePage