import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DetailsOdeljenje } from "../../actions/odeljenjaActions";
import {
  faBook,
  faPlus,
  faCircleExclamation,
  faDeleteLeft,
  faShare,
  faAddressCard,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FaHospital, FaList, FaUserNurse } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pacientImage from "../../images/user.png";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Components/Loader";
import "../../styles/lekarProfile.css";
import "../../styles/adminProfilePage.css";
import "../../styles/karton.css";
import { detailsPatient } from "../../actions/pacijentActions";
import { listKartona } from "../../actions/kartonActions";
import SliderNapomena from "../Sestra/SliderNapomena";
import NapomenaModal from "../Sestra/NapomenaModal";
import { NAPOMENA_CREATE_RESET } from "../../constants/napomeneConstants";

const LekarNapomene = () => {
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

  const napomenaCreate = useSelector((state) => state.napomenaCreate);

  const napomene = karton.napomene;

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = napomenaCreate;

  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };
  const toNav4 = () => {
    navigate(`/profile-lekar/${idO}/${idPacijent}`);
  };
  const toNa3 = (link) => {
    navigate(`/profile-lekar/${link}/${idO}/${idPacijent}`);
  };

  const toNav2 = () => {
    navigate(`/profile-lekar/${idO}/${idPacijent}`);
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
    }
    if (successCreate) {
      setTimeout(() => dispatch({ type: NAPOMENA_CREATE_RESET }), 1700);
    }
    dispatch(DetailsOdeljenje(idO));

    dispatch(listKartona(idO, idPacijent));
  }, [dispatch, pacijent, idPacijent, successCreate]);

  const toNav = (naziv) => {
    navigate(`/${naziv}`);
  };

  const id = params.id;
  const toKarton = (Nid) => {
    navigate(`/pregledi-sestra/${id}/${Nid}`);
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
              <li onClick={() => toNav2()} className='navAdminLine '>
                Karton{" "}
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faNotesMedical}
                  size='lg'
                />{" "}
              </li>

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

              <li className='navAdminLine activeNav'>
                Napomene{" "}
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faCircleExclamation}
                />
              </li>

              {userInfo.id === pacijent.idLekara ? (
                <>
                  {" "}
                  <li
                    onClick={() => toNa3("pacijent-istorija")}
                    style={{ marginBottom: "0.5rem" }}
                    className='navAdminLine'
                  >
                    Istorija pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faBook}
                    />
                  </li>
                  <li onClick={() => toNa3("pacijent-premesti")}>
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>Izabrani lekar:</span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : userInfo.id === lekarK.id ? (
                <>
                  <li
                    onClick={() => toNa3("pacijent-premesti")}
                    style={{ marginLeft: "1rem" }}
                  >
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>Izabrani lekar:</span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h3 style={{ textAlign: "center", padding: "1.2rem" }}> Napomene</h3>

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
            ) : napomene && napomene.length === 0 ? (
              <>
                <h2 style={{ marginBottom: "32rem" }}>
                  Trenutni pacijent nema ni jednu napomenu!
                </h2>
              </>
            ) : napomene ? (
              <SliderNapomena napomene={napomene} />
            ) : (
              <p>Nema dostupnih napomena.</p>
            )}
          </Container>
          <div style={{ display: "flex" }}>
            {openModal ? (
              <NapomenaModal
                closeModal={setOpenModal}
                kartonId={karton.id}
                sestraId={userInfo.id}
                success={successCreate}
              />
            ) : null}
            <div style={{ flex: "1" }}> </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LekarNapomene;
