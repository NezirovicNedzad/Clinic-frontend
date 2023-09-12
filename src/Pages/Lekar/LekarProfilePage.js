import React,{useState,useEffect} from 'react'

import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DetailsOdeljenje,listOdeljenja } from "../../actions/odeljenjaActions";
import { FaAddressCard, FaList, FaPowerOff, FaUser, FaUsers } from "react-icons/fa";
import { faAddressCard,faHospitalUser} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doctorImage from "../../images/lekar.png";
import { useNavigate } from 'react-router';
import krevetImage from "../../images/krevet.png"
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import "../../styles/lekarProfile.css";
const LekarProfilePage = () => {

  const navigate=useNavigate();  
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

    const { userInfo, success } = korisnickiLogin;
  
    var object1;
  
   
  const odeljenjaList = useSelector((state) => state.odeljenjaList);
  const { loading, error, odeljenja } = odeljenjaList;
  const [counter,setCount]=useState(0);

  const boje=["#20A0D8","#6DCE87","#87E878","#80D0F4","#3BA293","#50a2e0","#8DE971",""]
  
  
  const dispatch=useDispatch();
  
  

    useEffect(()=>{
  
  
      dispatch(DetailsOdeljenje(userInfo.odeljenjeId));
      dispatch(listOdeljenja());
      
    },[])
  
   
const selectedOdeljenje = (id)=>{

navigate(`/profile-lekar/${id}`)

}

  return (
    <>
      <Container fluid  > 
        <Row>
          <Col md={3}  className='padding0'>
            <div style={{height:"100%"}}  className='navAdmin'>
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
            
                <Container  style={{width:"100%",height:"100%",}} >
                  
                <h3 style={{textAlign:"center",paddingTop:"0.7rem"}}>Odeljenja</h3>
                    
          <Container className='novi' >
            
          {odeljenja.map((odeljenje,i)=>(
        
              odeljenje.brojKreveta<=15 ? <>
              
              <button  onClick={() => selectedOdeljenje(odeljenje.id)} className='dugme1'>
<Container  style={{backgroundColor: `${boje[i]}`,width:"22rem",padding:"10px",
   height:"10.2rem",
    textAlign:"center",
    borderRadius:"0.7rem"
   }} >

<h4 style={{color:'white'}}>{odeljenje.naziv}</h4>
<p style={{color:'white'}}>Dostupnih mesta: {odeljenje.brojKreveta-odeljenje.brojPacijenata} - Broj pacijenata:{odeljenje.brojPacijenata}</p>
<p style={{color:'white'}}>Ukupno mesta</p>
{object1= Array(odeljenje.brojKreveta).fill()}
<Container style={{display:"flex",flexWrap:"wrap"}} >
{object1.map((x)=>(

<div style={{fontSize:"18px",color:"white",padding:"0.4rem"}}>I</div>


))}
</Container>

</Container>
</button>
              
              
              </> :
            odeljenje.brojKreveta<=20 && odeljenje.brojKreveta>15 ?
<button  onClick={() => selectedOdeljenje(odeljenje.id)} className='dugme1'>
<Container  style={{backgroundColor: `${boje[i]}`,width:"25rem",padding:"10px",
   
    textAlign:"center",
    borderRadius:"0.7rem",
    height:"11.7rem"
  }} >

<h4 style={{color:'white'}}>{odeljenje.naziv}</h4>
<p style={{color:'white'}}>Dostupnih mesta: {odeljenje.brojKreveta-odeljenje.brojPacijenata} - Broj pacijenata:{odeljenje.brojPacijenata}</p>
<p style={{color:'white'}}>Ukupno mesta</p>
{object1= Array(odeljenje.brojKreveta).fill()}
<Container style={{display:"flex",flexWrap:"wrap"}} >
{object1.map((x)=>(

<div style={{fontSize:"18px",color:"white",padding:"0.4rem"}}>I</div>


))}

</Container>
</Container>
</button>
: odeljenje.brojKreveta >20 && odeljenje.brojKreveta<=25 ?
 
 
 <button  onClick={() => selectedOdeljenje(odeljenje.id)} className='dugme1'>
<Container  style={{backgroundColor: `${boje[i]}`,width:"29rem",padding:"10px",
   
    textAlign:"center",
    borderRadius:"0.7rem",
    height:"15rem"
   }} >

<h4 style={{color:'white'}}>{odeljenje.naziv}</h4>
<p style={{color:'white'}}>Dostupnih mesta: {odeljenje.brojKreveta-odeljenje.brojPacijenata} - Broj pacijenata:{odeljenje.brojPacijenata}</p>
<p style={{color:'white'}}>Ukupno mesta</p>
{object1= Array(odeljenje.brojKreveta).fill()}
<Container style={{display:"flex",flexWrap:"wrap"}} >
{object1.map((x)=>(

<div style={{fontSize:"22px",color:"white",padding:"0.4rem"}}>I</div>


))}

</Container>
</Container>
</button>

 
  : 
  <button  onClick={() => selectedOdeljenje(odeljenje.id)} className='dugme1'>
 <Container  style={{backgroundColor: `${boje[i]}`,width:"30rem",padding:"10px",
    
     textAlign:"center",
     borderRadius:"0.7rem",
     height:"17rem"
    }} >
 
 <h4 style={{color:'white'}}>{odeljenje.naziv}</h4>
 <p style={{color:'white'}}>Dostupnih mesta: {odeljenje.brojKreveta-odeljenje.brojPacijenata} - Broj pacijenata:{odeljenje.brojPacijenata}</p>
<p style={{color:'white'}}>Ukupno mesta</p>
 {object1= Array(odeljenje.brojKreveta).fill()}
 <Container style={{display:"flex",flexWrap:"wrap"}} >
 {object1.map((x)=>(
 
 <div style={{fontSize:"22px",color:"white",padding:"0.4rem"}}>I</div>
 
 
 ))}
 
 </Container>
 </Container>
 </button>

   ))}
            </Container>

   {loading && <Loader ></Loader>}  
   {error && <Message>Greska</Message>}   
   


                

                  
               </Container>           

          </Col>
        </Row>
      </Container>

    
    
    </>
  )
}

export default LekarProfilePage