import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OdeljenjaPage from "./Pages/OdeljenjaPage";
import NavBar from "./Components/NavBar";
import Details from "./Pages/Details";
import Create from "./Pages/Create";
import LoginPage from "./Pages/LoginPage";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/odeljenja' element={<OdeljenjaPage />} />
        <Route path='/odeljenja/:id' element={<Details />} />
        <Route path='/odeljenja/create' element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
