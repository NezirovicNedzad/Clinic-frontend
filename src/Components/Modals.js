
import React ,{useEffect,useState}from "react";
import { useNavigate,useParams } from 'react-router-dom'
import '../styles/modal.css'
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { CreatePregled } from "../actions/preglediActions";
import Message from "./Message";




const Modals = ({closeModal,kartonId,lekarId,success}) => {


const dispatch=useDispatch();
const [Anamneza, setAnamneza] = useState('');
const [Dijagnoza, setDijagnoza] = useState('');
const [Terapija, setTerapija] = useState('');
const [id,setId]=useState(uuid());

const navigate=useNavigate()


const pregledCreate=useSelector((state)=>state.pregledCreate);

const{success:successCreate,loading:loadingCreate,error:errorCreate}=pregledCreate;



const kreirajP = ()=>{


  setId(uuid());
  dispatch(CreatePregled(id,Anamneza,Dijagnoza,Terapija,lekarId,kartonId));



setTimeout(() =>  closeModal(false),1400);

}
  return (
    
    <div className="modalBackground">

<div className='modalContainer'>

  
    <h1 style={{textAlign:"center"}}>Pregled</h1>
  
  <div className='body'>


  

  <div className='novi22'>
 
  <p>Anamneza:</p>
       
     <div style={{textAlign:"center"}}><textarea  style={{width:"80%"}} value={Anamneza} onChange={(e)=>setAnamneza(e.target.value)} rows="4"  type="textArea"/></div>   
      
  <p>Dijagnoza:</p>
       
       <div style={{textAlign:"center"}}><textarea style={{width:"80%"}}  value={Dijagnoza} onChange={(e)=>setDijagnoza(e.target.value)} rows="4"  type="textArea"/></div>   
   <p>Terapija i dalje lečenje:</p>
       
       <div style={{textAlign:"center"}}><textarea style={{width:"80%"}}  value={Terapija} onChange={(e)=>setTerapija(e.target.value)} rows="2"  type="textArea"/></div>   

   
  </div>
  
  </div>

  <div className='footer'>
  {successCreate ? <Message style={{textAlign:"center"}} variant={'success'}>Uspesno kreiran pregled!</Message> :<>
  
  <button style={{backgroundColor:"red"}} onClick={()=>closeModal(false)}>Otkazi</button>
    <button onClick={()=>(kreirajP())}>Unesi</button>
  </>} 
    
  </div>

</div>

    </div>
   

  )
}

export default Modals