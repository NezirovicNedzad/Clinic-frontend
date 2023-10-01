import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Card from "../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  DetailsOdeljenje,
  listOdeljenja,
} from "../../actions/odeljenjaActions";
import { FaBook } from "react-icons/fa";
import {
  faAddressCard,
  faBook,
  faPlus,
  faCircleExclamation,
  faDeleteLeft,
  faShare,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doctorImage from "../../images/lekar.png";
import pacientImage from "../../images/user.png";
import { useNavigate, useParams } from "react-router";
import krevetImage from "../../images/krevet.png";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import "../../styles/lekarProfile.css";
import "../../styles/adminProfilePage.css";
import "../../styles/karton.css";
import { detailsPatient } from "../../actions/pacijentActions";
import { listKartona } from "../../actions/kartonActions";
import Slider from "react-slick";
import SliderP from "../../Components/SliderP";
import SwiperR from "../../Components/SwiperR";
import SlickReactSlider from "../../Components/SlickReactSlider";
import Modals from "../../Components/Modals";
import { PREGLED_CREATE_RESET } from "../../constants/pregledConstants";

const LekarKartonPage = () => {
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

  const { loading, error, pacijent } = pacijentDetails;

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

  const toNav = (link) => {
    navigate(`/profile-lekar/${link}/${idO}/${idPacijent}`);
  };

  const toNav2 = () => {
    navigate(`/profile-lekar/${idO}/${idPacijent}`);
  };
  const toNav3 = () => {
    navigate(`/profile-lekar/napomene/${idO}/${idPacijent}`);
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

      setIdDok(pacijent.idLekara);
    }
    if (successCreate) {
      setTimeout(() => dispatch({ type: PREGLED_CREATE_RESET }), 1700);
    }
    dispatch(DetailsOdeljenje(idO));

    dispatch(listKartona(idO, idPacijent));
  }, [dispatch, pacijent, idPacijent, successCreate]);

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
              <li onClick={() => toNav2()} className='navAdminLine activeNav'>
                Karton{" "}
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faNotesMedical}
                  size='lg'
                />
              </li>
              <li className='navAdminLine' onClick={toggleDropdownLekari}>
                Podaci ▼
              </li>
              {showDropdownLekari && (
                <ul>
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
              <li onClick={() => toNav3()} style={{ marginBottom: "0.5rem" }}>
                Napomene{" "}
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faCircleExclamation}
                />
              </li>

              {userInfo.id == pacijent.idLekara ? (
                <>
                  {" "}
                  <li
                    onClick={() => toNav("pacijent-istorija")}
                    style={{ marginBottom: "0.5rem" }}
                    className='navAdminLine'
                  >
                    Istorija pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faBook}
                    />
                  </li>
                  <li
                    className='navAdminLine'
                    onClick={() => toNav("pacijent-premesti")}
                  >
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>
                      Izabrani lekar na klinici:
                    </span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : userInfo.id === lekarK.id ? (
                <>
                  <li
                    className='navAdminLine'
                    onClick={() => toNav("pacijent-premesti")}
                    style={{ marginLeft: "1rem" }}
                  >
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>
                      Izabrani lekar na klinici:
                    </span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : (
                <>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>
                      Izabrani lekar na klinici:
                    </span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              )}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h3 style={{ textAlign: "center", padding: "0.7rem" }}>
            {" "}
            Obavljeni pregledi
          </h3>

          <p style={{ float: "right" }}>
            Izabrani lekar na odeljenju {lekarK.ime} {lekarK.prezime}
          </p>

          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
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
            <div style={{ flex: "1" }}> </div>
            {userInfo.odeljenjeId == odeljenje.id ? (
              <div style={{ flex: "1" }}>
                <Button
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  style={{
                    backgroundColor: "#43b9dc",
                    marginTop: "1rem",
                    float: "right",
                    marginRight: "4rem",
                  }}
                >
                  Dodaj Pregled{" "}
                  <FontAwesomeIcon
                    style={{ marginRight: "0.6rem" }}
                    icon={faPlus}
                  />
                </Button>
              </div>
            ) : (
              <p style={{ marginTop: "1rem" }}>
                Trenutno ne radite na ovom odeljenju i ne mozete dodati novi
                pregled!
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LekarKartonPage;
