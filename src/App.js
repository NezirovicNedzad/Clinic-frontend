import logo from './logo.svg';


import axios  from 'axios';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Pages/HomePage';
import OdeljenjaPage from './Pages/OdeljenjaPage';
import NavBar from './Components/NavBar';

function App() {



  const [odeljenja,setOdeljenja]=useState([]);
 const [redniBr,setRedniBr]=useState(1);



useEffect(()=>{

  const fetchPosts=async () =>{
    const {data}=await axios.get("http://localhost:5000/api/Odeljenje")
  
  setOdeljenja(data);
  
  
  }
 
  fetchPosts()



},[])


console.log(odeljenja)



  return (
    

      <Router>

<NavBar/>
<Routes>




  <Route path='/'  element={<HomePage/>} />
  <Route path='/odeljenja'  element={<OdeljenjaPage/>} />
</Routes>


      </Router>


  


)     





}

export default App;
