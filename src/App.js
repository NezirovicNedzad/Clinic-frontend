import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import OdeljenjaPage from "./Pages/OdeljenjaPage";
import NavBar from "./Components/NavBar";
import Details from "./Pages/Details";
import Create from "./Pages/Create";
import LoginPage from "./Pages/LoginPage";
import TestErrors from "./features/errors/TestError";
import NotFound from "./features/errors/NotFound";
import AdminProfilePage from "./Pages/Admin/AdminProfilePage";
import AdminLekari from "./Pages/Admin/AdminLekari";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile-admin' element={<AdminProfilePage />} />
        <Route path='/lekari-admin' element={<AdminLekari />} />
        <Route path='/odeljenja' element={<OdeljenjaPage />} />
        <Route path='/odeljenja/:id' element={<Details />} />
        <Route path='/odeljenja/create' element={<Create />} />
        <Route path='/errors' element={<TestErrors />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<Navigate replace to='/not-found' />} />
      </Routes>
    </Router>
  );
}

export default App;
