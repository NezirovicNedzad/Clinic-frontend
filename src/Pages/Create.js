import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{v4 as uuid} from 'uuid'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

import { CreateOdeljenje } from '../actions/odeljenjaActions'

const Create = () => {


const navigate=useNavigate();

  const [id,setId]=useState(uuid());
  
  const [naziv,setNaziv]=useState('');
  
  const [brojKreveta,setBrojKreveta]=useState(0);
  
  const [brojPacijenata,setBrojPacijenata]=useState(0);
  const dispatch=useDispatch();


  const odeljenjeCr=useSelector(state=>state.odeljenjaCreate);

  const{loading,error,success:successCreate,odeljenje}=odeljenjeCr;
 


const  Sub = ()=>{
 setId(uuid());
 dispatch(CreateOdeljenje(id,naziv,brojKreveta,brojPacijenata));
 navigate("/odeljenja");


}

  return (
    <div>
      {loading &&<Loader></Loader>}
      {error &&<Message variant="danger" >{error}</Message>}
<div style={{margin:"10px"}}>


        <h2>Detalji o odeljenju:</h2>
<p style={{fontSize:"20px",margin:"10px"}}>Naziv</p>
<input  onChange={(e)=>setNaziv(e.target.value)} name='naziv'  width="100px"/>
<p style={{fontSize:"20px",margin:"10px"}}>Broj Kreveta</p>
<input onChange={(e)=>setBrojKreveta(e.target.value)}  type="number"  name='brojKreveta'   width="100px"/>
<p style={{fontSize:"20px",margin:"10px"}}>Broj Pacijenata</p>
<input onChange={(e)=>setBrojPacijenata(e.target.value)} type="number" name='brojPacijenata'   width="100px"/>
<br></br>
<button onClick={()=>Sub()} style={{margin:"10px",background:"red",padding:"10px"}} >Kreiraj</button>
    </div>


    </div>
  )
}

export default Create