import React,{useState,useEffect} from 'react'

import { Col, Container, Row, Image, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DetailsOdeljenje,listOdeljenja } from "../../actions/odeljenjaActions";

import { FaAddressCard, FaList, FaPowerOff, FaUser, FaUsers,FaHospital } from "react-icons/fa";
import { faAddressCard,faHospitalUser,faHospital,faNotesMedical,faShareFromSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doctorImage from "../../images/lekar.png";
import { useNavigate } from 'react-router';
import krevetImage from "../../images/krevet.png"
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import "../../styles/lekarProfile.css";
import { deletePacijent, izabraniPacijenti } from '../../actions/pacijentActions';
import { PACIJENT_DELETE_RESET } from '../../constants/pacijentConstants';
const LekarPacijenti = () => {

  const navigate=useNavigate();  
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

    const { userInfo, success } = korisnickiLogin;
  
    var object1;
  
   
  const odeljenjaList = useSelector((state) => state.odeljenjaList);
  const { loading, error, odeljenja } = odeljenjaList;
  const [counter,setCount]=useState(0);
const pacijentDelete=useSelector(state=>state.pacijentDelete);
const{loading:loadingD,error:errorD,successDelete}=pacijentDelete;

  const pacijentIzabrani=useSelector(state=>state.pacijentIzabrani);
  const{loading:loadingI,error:errorI,pacijenti}=pacijentIzabrani;
  const boje=["#20A0D8","#6DCE87","#87E878","#80D0F4","#3BA293","#50a2e0","#8DE971","green"]
  
  
  const dispatch=useDispatch();
  
  

    useEffect(()=>{
  
        if(successDelete)
        {
          setTimeout(() =>   dispatch({type:PACIJENT_DELETE_RESET}),2000);
    
    
        
        }
      dispatch(DetailsOdeljenje(userInfo.odeljenjeId));
      dispatch(listOdeljenja());
      dispatch(izabraniPacijenti(userInfo.id))
    },[userInfo,successDelete])
    const toK=()=>{
      navigate(`/profile-lekar/`)
    
    }
    const tol=()=>{
      navigate(`/profile-lekar/pacijenti`)
    
    }  
    const toNav3=(ido,idp)=>{

        navigate(`/profile-lekar/${ido}/${idp}`);
      }
   const release=(idP)=>{
    if(window.confirm("Ovim brišete sve kartone sa klinike.Jeste li sigurni da zelite da otpustite pacijenta sa klinike?"))
    {
dispatch(deletePacijent(idP));

    }


   }

  return (
    <>
      <Container fluid  > 
        <Row>
          <Col md={3}  className='padding0'>
            <div style={{height:"100vh"}}  className='navAdmin'>
              <div className='adminImage'>
                <Image fluid src={doctorImage} />
              </div>
              <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
              <p>{userInfo.role}</p>
 
           <p style={{textTransform:"none"}}>Specijalizacija:<span style={{textTransform:"capitalize"}}>{userInfo.specijalizacija}</span></p>
              <h3>Opcije</h3>

              <ul>
                <li onClick={()=>toK()} className="navAdminLine">
                  <FaHospital className='faIcons' />
                  Klinika
                </li>
               <li onClick={()=>tol()} className="navAdminLine activeNav" >
                  <FaList className='faIcons' />
                  Lista pacijenata
                </li>
               
              </ul>
            </div>
          </Col>
          <Col style={{padding:"1rem"}} md={9}>
            
                <Container  style={{width:"100%",height:"100%",}} >
                  
                <h3 style={{textAlign:"center",paddingTop:"0.7rem"}}>Vasi pacijenti</h3>
                    
              <Container style={{padding:"1rem"}}>


              {loadingI && <Loader></Loader>}
                    {errorI && <Message variant={"danger"}  children={errorI} ></Message>}
                 
                 
                    <Table className='mt-4' striped bordered hover>
                      <thead className='tableThead'>
                        <tr>
                          <th>Ime</th>
                          <th>Prezime</th>
                          <th>Godine</th>
                          <th>Pol</th>
                          <th>JMBG</th>
                          <th>Odeljenje</th>
                          <th>Pogledaj <FontAwesomeIcon style={{ marginRight: "0.6rem"}}  icon={faNotesMedical} size='lg' /> </th>
                         <th>Otpusti pacijenta</th>
                        </tr>
                        <tr className='tableTr'>
                          <th colSpan={8}>Pacijent kojima ste vi izabrani lekar na klinici</th>
                        </tr>
                      </thead>
                      <tbody>
   {pacijenti.map(pacijent=>(
<tr key={pacijent.id}>

<td>{pacijent.ime}</td>
<td>{pacijent.prezime}</td>
<td>{pacijent.brojGodina}</td>
<td>{pacijent.pol}</td>
<td>{pacijent.jmbg}</td>
<td>{pacijent.nazivOdeljenja}</td>
<td style={{textAlign:"center"}}><Button onClick={()=>toNav3(pacijent.idOdeljenja,pacijent.id)} >Karton</Button></td>
<td style={{textAlign:"center"}}><Button style={{backgroundColor:"red",textAlign:"center"}} onClick={()=>release(pacijent.id)} ><FontAwesomeIcon   icon={faShareFromSquare} size='2x' /> </Button></td>


</tr>



   ))             }
                 
                 </tbody>
                 </Table>
{successDelete &&<Message style={{textAlign:"center"}} variant={'success'}>Uspesno obrisan pacijent sa klinike!</Message> }
{errorD &&<Message style={{textAlign:"center"}} children={errorD} variant={'danger'}></Message> }
              </Container>
                

                  
               </Container>           

          </Col>
        </Row>
      </Container>

    
    
    </>
  )
}

export default LekarPacijenti
