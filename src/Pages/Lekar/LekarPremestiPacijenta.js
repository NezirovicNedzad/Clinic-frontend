import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  faAddressCard,
  faBook,
  faPlus,
  faCircleExclamation,
  faDeleteLeft,
  faShare,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";

import pacientImage from "../../images/user.png";
import {
  detailsPatient,
  prebaciPacijenta,
} from "../../actions/pacijentActions";
import { listOdeljenja } from "../../actions/odeljenjaActions";
import { listaKorisnika } from "../../actions/korisniciActions";
import { PACIJENT_PREBACI_RESET } from "../../constants/pacijentConstants";
import Message from "../../Components/Message";
const LekarPremestiPacijenta = () => {
  const [korisniciP, setKorisniciP] = useState([]);
  const [odeljenjaP, setOdeljenjeP] = useState([]);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [selectedOdeljenje, setSelectedOdeljenje] = useState("");
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);
  const navigate = useNavigate();
  const { userInfo, success } = korisnickiLogin;
  const pacijentDetails = useSelector((state) => state.pacijentDetails);
  const [selectedLekar, setSelectedLekar] = useState("");
  const { loading, error, pacijent } = pacijentDetails;

  const idPacijent = params.pacijentId;
  const idO = params.id;
  const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);
  const { loading: loadingOd, error: errorOd, odeljenje } = odeljenjaDetail;

  const pacijentPrebaci = useSelector((state) => state.pacijentPrebaci);
  const {
    loading: loadingPrebaci,
    error: errorPrebaci,
    success: successPrebaci,
  } = pacijentPrebaci;

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

  const listaOdeljenja = useSelector((state) => state.odeljenjaList);
  const { loading: loadingList, error: errorList, odeljenja } = listaOdeljenja;

  const listaKorisnikaState = useSelector((state) => state.korisniciList);
  const { loading: loadingL, error: errorL, korisnici } = listaKorisnikaState;

  const handleOdeljenjeChange = (e) => {
    const selectedOdeljenjeId = e.target.value;
    setSelectedOdeljenje(selectedOdeljenjeId);
  };
  const handleLekarChange = (e) => {
    const selectedLekarId = e.target.value;
    setSelectedLekar(selectedLekarId);
  };
  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };
  const toNav2 = () => {
    navigate(`/profile-lekar/${idO}/${idPacijent}`);
  };
  const toNav = (link) => {
    navigate(`/profile-lekar/${link}/${idO}/${idPacijent}`);
  };
  const toNav3 = () => {
    navigate(`/profile-lekar/napomene/${idO}/${idPacijent}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Jeste li sigurni da zelite da premestite korisnika?")) {
      dispatch(prebaciPacijenta(idPacijent, selectedOdeljenje, selectedLekar));

      navigate("/profile-lekar");
    }
  };

  useEffect(() => {
    if (pacijent.id !== idPacijent) {
      dispatch(detailsPatient(idPacijent));
    }
    //     if(successPrebaci)
    // {

    //   setTimeout(() =>   navigate("/profile-lekar"),1800);

    // }

    dispatch(listOdeljenja());
    dispatch(listaKorisnika());
  }, [dispatch, pacijent, idPacijent]);

  return (
    <Container fluid>
      <Row>
        <Col md={3} className='padding0'>
          <div style={{ height: "100%" }} className='navAdmin'>
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
              <li onClick={() => toNav2()} className='navAdminLine  '>
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
                  <li className='navAdminLine '>
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

              {userInfo.id === pacijent.idLekara ? (
                <>
                  {" "}
                  <li
                    onClick={() => toNav("pacijent-istorija")}
                    className='navAdminLine'
                  >
                    Istorija pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faBook}
                    />
                  </li>
                  <li
                    className='navAdminLine activeNav'
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
                    className='navAdminLine activeNav'
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
              ) : (
                <></>
              )}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h3 style={{ textAlign: "center", padding: "0.7rem" }}>
            {" "}
            Premesti pacijenta
          </h3>

          <Form
            style={{
              padding: "3rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Form.Group className='mb-10' controlId='formBasicIme'>
              <Form.Label className='formLabel'>Odeljenje</Form.Label>
              <br></br>
              <Form.Select
                className='selectControl'
                aria-label='Default select example'
                onChange={handleOdeljenjeChange}
                value={selectedOdeljenje}
                name='odeljenjeId'
              >
                <option value=''>Izaberite odeljenje</option>
                {odeljenja
                  .filter((odeljenje) => odeljenje.id !== idO)
                  .map((odeljenje) => (
                    <option key={odeljenje.id} value={odeljenje.id}>
                      {odeljenje.naziv}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group
              style={{ marginTop: "4rem" }}
              controlId='formBasicPrezime'
            >
              <Form.Label className='formLabel'>
                Izabrani lekar na datom odeljenju
              </Form.Label>
              <br></br>
              <Form.Select
                className='selectControl'
                aria-label='Default select example'
                onChange={handleLekarChange}
                value={selectedLekar}
                name='lekarId'
                disabled={!selectedOdeljenje}
              >
                <option value=''>Izaberite lekara</option>
                {selectedOdeljenje &&
                  korisnici
                    .filter(
                      (korisnik) =>
                        korisnik.odeljenjeId === selectedOdeljenje &&
                        korisnik.role === "Lekar"
                    )
                    .map((korisnik) => (
                      <option key={korisnik.id} value={korisnik.id}>
                        {korisnik.ime} {korisnik.prezime} (specijalista{" "}
                        {korisnik.specijalizacija}ije)
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
            <Button
              style={{ marginTop: "3rem", marginBottom: "1rem" }}
              className='buttonAdd'
              type='submit'
              variant='primary'
            >
              Premesti pacijenta
            </Button>

            {successPrebaci && (
              <Message
                style={{ textAlign: "center", marginTop: "1rem" }}
                variant={"success"}
              >
                Uspesno ste premestili pacijenta
              </Message>
            )}

            {errorPrebaci && (
              <Message
                style={{ textAlign: "center", marginTop: "1rem" }}
                children={errorPrebaci}
                variant={"danger"}
              ></Message>
            )}
          </Form>

          <p style={{ padding: "3rem" }}>
            Kao izabrani lekar pacijenta na datom kartonu,ili na klinici imate
            mogucnost da ga prebacite na drugo odeljenje,pritom mu dodeljujuci
            izabranog lekara na novom odeljenju.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LekarPremestiPacijenta;
