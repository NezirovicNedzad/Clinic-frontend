import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DetailsOdeljenje } from "../../actions/odeljenjaActions";
import {
  faPlus,
  faCircleExclamation,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pacientImage from "../../images/user.png";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Components/Loader";
import "../../styles/lekarProfile.css";
import "../../styles/adminProfilePage.css";
import "../../styles/karton.css";
import { detailsPatient } from "../../actions/pacijentActions";
import { listKartona } from "../../actions/kartonActions";
import SlickReactSlider from "../../Components/SlickReactSlider";
import Modals from "../../Components/Modals";
import { FaList } from "react-icons/fa";
import { PREGLED_CREATE_RESET } from "../../constants/pregledConstants";

const SestraPregledi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);
  const [idDok, setIdDok] = useState("");
  const idPacijent = params.pacijentId;
  const idO = params.id;
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo, success } = korisnickiLogin;
  const pacijentDetails = useSelector((state) => state.pacijentDetails);

  const { loading, error, pacijent, lekar } = pacijentDetails;

  const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);

  const { loading: loadingOd, error: errorOd, odeljenje } = odeljenjaDetail;

  const kartoniList = useSelector((state) => state.kartoniList);

  const {
    loading: loadingK,
    error: errorK,
    karton,
    pregledi,
    lekarK,
  } = kartoniList;
  const pregledCreate = useSelector((state) => state.pregledCreate);

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = pregledCreate;

  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };

  const customSort = (a, b) => {
    const dateA = new Date(a.vremePregleda);
    const dateB = new Date(b.vremePregleda);

    if (dateA < dateB) return 1;
    else if (dateA > dateB) return -1;

    return 0;
  };

  useEffect(() => {
    if (pacijent.id !== idPacijent) {
      dispatch(detailsPatient(idPacijent));

      setIdDok(lekar.id);
    }
    if (successCreate) {
      setTimeout(() => dispatch({ type: PREGLED_CREATE_RESET }), 1700);
    }
    dispatch(DetailsOdeljenje(idO));

    dispatch(listKartona(idO, idPacijent));
  }, [dispatch, pacijent, idPacijent, successCreate]);

  const toNav = (naziv) => {
    navigate(`/${naziv}`);
  };

  const id = params.id;
  const toKarton = (Nid) => {
    navigate(`/odeljenja-sestra/${id}/${Nid}`);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className='padding0'>
          <div style={{ height: "800px" }} className='navAdmin'>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: "10",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image fluid src={pacientImage} />
                </div>
              </div>
            </div>
            <h4>
              {pacijent.ime} {pacijent.prezime}
            </h4>
            <p>Pacijent</p>

            <h3>Opcije</h3>

            <ul className='mt-4'>
              <li className='navAdminLine' onClick={toggleDropdownLekari}>
                Podaci ▼
              </li>
              {showDropdownLekari && (
                <ul style={{ marginLeft: "50px" }}>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>JMBG:</span>
                      {pacijent.jmbg}
                    </h5>
                  </li>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Broj godina:</span>
                      {pacijent.brojGodina}
                    </h5>
                  </li>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Pol:</span>
                      {pacijent.pol}
                    </h5>
                  </li>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Odeljenje:</span>
                      {odeljenje.naziv}
                    </h5>
                  </li>
                </ul>
              )}
              <li
                onClick={() => toKarton(pacijent.id)}
                className='navAdminLine'
              >
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faCircleExclamation}
                />
                Napomene{" "}
              </li>
              <li className='navAdminLine activeNav'>
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faAddressCard}
                />
                Lista pregleda
              </li>
              <li
                onClick={() => toNav("odeljenja-sestra")}
                className='navAdminLine'
              >
                <FaList className='faIcons' />
                Lista odeljenja
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h3 style={{ textAlign: "center", padding: "1.2rem" }}>
            {" "}
            Obavljeni pregledi
          </h3>

          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              height: "65vh",
            }}
          >
            {loadingK ? (
              <Loader />
            ) : pregledi.length == 0 ? (
              <>
                <h2 style={{ marginBottom: "32rem" }}>
                  Trenutni pacijent nema ni jedan obavljen pregled!
                </h2>
              </>
            ) : (
              <SlickReactSlider pregledi={pregledi.sort(customSort)} />
            )}
          </Container>
          <div style={{ display: "flex" }}>
            {openModal ? (
              <Modals
                closeModal={setOpenModal}
                kartonId={karton.id}
                lekarId={userInfo.id}
                success={successCreate}
              />
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SestraPregledi;
