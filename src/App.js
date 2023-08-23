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
import { useNavigate } from 'react-router-dom';
import Details from './Pages/Details';
import Create from './Pages/Create';
function App() {











  return (
    

      <Router>

<NavBar/>
<Routes>




  <Route path='/'  element={<HomePage/>} />
  <Route path='/odeljenja'  element={<OdeljenjaPage/>} />
  <Route path='/odeljenja/:id' element={<Details />} />
  <Route path='/odeljenja/create' element={<Create/>}/>


</Routes>


      </Router>


  


)     





}

export default App;
