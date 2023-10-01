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
import ProfilePage from "./Pages/ProfilePage";
import LekarProfilePage from "./Pages/Lekar/LekarProfilePage";
import LekarOdeljenjePage from "./Pages/Lekar/LekarOdeljenjePage";
import AdminSestrice from "./Pages/Admin/AdminSestrice";
import AdminListaKorisnika from "./Pages/Admin/AdminListaKorisnika";
import AdminUkloniOdeljenje from "./Pages/Admin/AdminUkloniOdeljenje";
import AdminDodajOdeljenje from "./Pages/Admin/AdminDodajOdeljenje";

import LekarKartonPage from "./Pages/Lekar/LekarKartonPage";
import SestraOdeljenjePage from "./Pages/Sestra/SestraOdeljenjePage";
import SestraOdeljenjeDetails from "./Pages/Sestra/SestraOdeljenjeDetails";
import SestraKartonPage from "./Pages/Sestra/SestraKartonPage";
import SestraPregledi from "./Pages/Sestra/SestraPregledi";
import DodajPacijenta from "./Pages/Sestra/DodajPacijenta";
import LekarIstorijaPacijenta from "./Pages/Lekar/LekarIstorijaPacijenta";
import LekarPremestiPacijenta from "./Pages/Lekar/LekarPremestiPacijenta";
import LekarKartonArhivirani from "./Pages/Lekar/LekarKartonArhivirani";
import LekarPacijenti from "./Pages/Lekar/LekarPacijenti";
import LekarNapomene from "./Pages/Lekar/LekarNapomene";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile-admin' element={<AdminProfilePage />} />
        <Route path='/lekari-admin' element={<AdminLekari />} />
        <Route path='/sestrice-admin' element={<AdminSestrice />} />
        <Route path='/odeljenja-admin' element={<AdminUkloniOdeljenje />} />
        <Route
          path='/dodaj-odeljenja-admin'
          element={<AdminDodajOdeljenje />}
        />
        <Route
          path='/lista-korisnika-admin'
          element={<AdminListaKorisnika />}
        />
        <Route path='/odeljenja' element={<OdeljenjaPage />} />
        <Route path='/odeljenja/:id' element={<Details />} />
        <Route path='/odeljenja/create' element={<Create />} />

        <Route path='/profile-lekar/odeljenje' element={<ProfilePage />} />
        <Route path='/profile-lekar/:id' element={<LekarOdeljenjePage />} />
        <Route
          path='/profile-lekar/:id/:pacijentId'
          element={<LekarKartonPage />}
        />
        <Route
          path='/profile-lekar/arhivirani/:idA/:pacijentId/:id'
          element={<LekarKartonArhivirani />}
        />
        <Route path='/profile-lekar' element={<LekarProfilePage />} />
        <Route path='/profile-sestra' element={<ProfilePage />} />
        <Route
          path='/profile-lekar/pacijent-istorija/:id/:pacijentId'
          element={<LekarIstorijaPacijenta />}
        />
        <Route path='/profile-lekar/pacijenti' element={<LekarPacijenti />} />
        <Route
          path='/profile-lekar/pacijent-premesti/:id/:pacijentId'
          element={<LekarPremestiPacijenta />}
        />

        <Route path='/odeljenja-sestra' element={<SestraOdeljenjePage />} />
        <Route path='/dodaj-pacijenta-sestra' element={<DodajPacijenta />} />
        <Route
          path='/odeljenja-sestra/:id'
          element={<SestraOdeljenjeDetails />}
        />
        <Route
          path='/odeljenja-sestra/:id/:pacijentId'
          element={<SestraKartonPage />}
        />
        <Route
          path='/profile-lekar/napomene/:id/:pacijentId'
          element={<LekarNapomene />}
        />

        <Route
          path='/pregledi-sestra/:id/:pacijentId'
          element={<SestraPregledi />}
        />

        <Route path='/errors' element={<TestErrors />} />

        <Route path='/not-found' element={<NotFound />} />
        <Route path='/*' element={<Navigate replace to='/not-found' />} />
      </Routes>
    </Router>
  );
}

export default App;
