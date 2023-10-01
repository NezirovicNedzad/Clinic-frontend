import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

import { listOdeljenja } from "../../actions/odeljenjaActions";
import { listaLekara } from "../../actions/korisniciActions";

import { FaList, FaUser, FaUserPlus, FaUsers } from "react-icons/fa";

import adminImage from "../../images/user-gear.png";

import { dodajPacijenta } from "../../actions/pacijentActions";

import "../../styles/adminProfilePage.css";

export default function DodajPacijenta() {
  const navigate = useNavigate();

  const [selectedOdeljenje, setSelectedOdeljenje] = useState("");
  const [greskaPacijent, setGreskaPacijent] = useState("");
  const [godine, setGodine] = useState(0);
  const [selectedLekar, setSelectedLekar] = useState(null);

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    jmbg: "",
    pol: "",
    idLekara: "",
    idOdeljenja: "",
  });

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);

  const listaOdeljenja = useSelector((state) => state.odeljenjaList);
  const { loading: loadingList, error: errorList, odeljenja } = listaOdeljenja;

  const listaLekaraR = useSelector((state) => state.lekariList);
  const { lekari } = listaLekaraR;

  const dodajPacijentaR = useSelector((state) => state.pacijentCreate);
  const { loading, error, success } = dodajPacijentaR;

  const dispatch = useDispatch();

  const { userInfo } = korisnickiLogin;

  const lekarii =
    lekari && lekari.filter((korisnik) => korisnik.role === "Lekar");

  useEffect(() => {
    dispatch(listaLekara());

    if (selectedOdeljenje) {
      const selectedOdeljenjeId = selectedOdeljenje.toLowerCase();
      const lekariZaOdeljenje =
        lekarii &&
        lekarii.filter(
          (lekar) =>
            lekar.odeljenjeId.toLowerCase() === selectedOdeljenjeId &&
            lekar.role === "Lekar"
        );
      setSelectedLekar(lekariZaOdeljenje[0] || null);
    } else {
      setSelectedLekar(null);
    }

    if (success) {
      setFormData({
        ime: "",
        prezime: "",
        jmbg: "",
        idLekara: "",
        idOdeljenja: "",
      });
    }
  }, [selectedOdeljenje, success, dispatch]);

  useEffect(() => {
    dispatch(listOdeljenja());
  }, [dispatch]);

  const handleOdeljenjeChange = (e) => {
    const selectedOdeljenjeId = e.target.value;
    setSelectedOdeljenje(selectedOdeljenjeId);

    if (selectedOdeljenjeId) {
      const selectedLekarObj = lekarii.find(
        (lekar) =>
          lekar.odeljenjeId.toLowerCase() === selectedOdeljenjeId.toLowerCase()
      );

      setSelectedLekar(selectedLekarObj || null);
    } else {
      setSelectedLekar(null);
    }
  };

  const toNav = (naziv) => {
    navigate(`/${naziv}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { ime, prezime, jmbg, pol } = formData;
    if (
      selectedLekar === "" ||
      ime === "" ||
      prezime === "" ||
      jmbg === "" ||
      pol === "" ||
      godine === "" ||
      selectedOdeljenje === ""
    ) {
      setGreskaPacijent("Sva polja su obavezna.");
    } else {
      dispatch(
        dodajPacijenta(
          ime,
          prezime,
          jmbg,
          godine,
          pol,
          selectedLekar.id,
          selectedOdeljenje
        )
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      {loadingList ? (
        <Loader />
      ) : loading ? (
        <Loader />
      ) : userInfo.role === "Sestra" ? (
        <Container fluid>
          <Row>
            <Col md={3} className='padding0'>
              <div style={{ height: "100vh" }} className='navAdmin'>
                <div className='adminImage'>
                  <Image fluid src={adminImage} />
                </div>
                <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
                <p>{userInfo.role}</p>

                <h3>Opcije</h3>

                <ul className='mt-3'>
                  <li className='navAdminLine'>
                    <FaUser className='faIcons' />
                    Profil
                  </li>
                  <li
                    onClick={() => toNav("odeljenja-sestra")}
                    className='navAdminLine'
                  >
                    <FaList className='faIcons' />
                    Lista odeljenja
                  </li>
                  <li
                    onClick={() => toNav("dodaj-pacijenta-sestra")}
                    className='navAdminLine activeNav'
                  >
                    <FaUsers className='faIcons' />
                    Dodaj pacijenta
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              <div className='adminInfo'>
                <h1>
                  Dodaj pacijenta <FaUserPlus />
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {greskaPacijent && (
                    <div className='error-container'>
                      <div className='error-message'>
                        <div className='error-box'>{greskaPacijent}</div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className='error-container'>
                      {Array.isArray(error)
                        ? error.map((errorObject, index) => (
                            <div className='error-message' key={index}>
                              <div className='error-box'>
                                {errorObject.description}
                              </div>
                            </div>
                          ))
                        : Object.entries(error.errors).map(
                            ([fieldName, errorMessages]) => (
                              <div key={fieldName}>
                                {errorMessages.map((errorMessage, index) => (
                                  <div className='error-message' key={index}>
                                    <div className='error-box'>
                                      {errorMessage}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                    </div>
                  )}

                  {success && (
                    <div className='successMessage'>Uspešno dodat pacijent</div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group className='mb-3' controlId='formBasicIme'>
                        <Form.Label className='formLabel'>Ime</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='ime'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.ime}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicPrezime'>
                        <Form.Label className='formLabel'>Prezime</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='prezime'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.prezime}
                        />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='formLabel'>Jmbg</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='jmbg'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.jmbg}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicOdeljenja'
                      >
                        <Form.Label className='formLabel'>Odeljenja</Form.Label>
                        <br />
                        <Form.Select
                          className='selectControl'
                          aria-label='Default select example'
                          onChange={handleOdeljenjeChange}
                          value={selectedOdeljenje}
                          name='odeljenjeId'
                        >
                          <option value=''>Izaberite odeljenje</option>
                          {odeljenja.map((odeljenje) => (
                            <option key={odeljenje.id} value={odeljenje.id}>
                              {odeljenje.naziv}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group className='mb-3' controlId='formBasicGodine'>
                        <Form.Label className='formLabel'>Godine</Form.Label>

                        <Form.Control
                          className='formControlor'
                          name='godine'
                          onChange={(e) => setGodine(e.target.value)}
                          type='number'
                          value={godine}
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicPol'>
                        <Form.Label className='formLabel'>Pol</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='pol'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.pol}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicSpecijalizacija'
                      >
                        <Form.Label className='formLabel'>Lekar</Form.Label>
                        <br />
                        <Form.Select
                          className='selectControl'
                          aria-label='Default select example'
                          value={selectedLekar ? selectedLekar.id : ""}
                          name='lekar'
                          disabled={!selectedOdeljenje}
                          onChange={handleInputChange}
                        >
                          <option value=''>Izaberite lekara</option>
                          {selectedOdeljenje &&
                            lekarii &&
                            lekarii
                              .filter(
                                (lekar) =>
                                  lekar.odeljenjeId.toLowerCase() ===
                                    selectedOdeljenje.toLowerCase() &&
                                  lekar.role === "Lekar"
                              )
                              .map((lekar) => (
                                <option key={lekar.id} value={lekar.id}>
                                  {lekar.ime}
                                </option>
                              ))}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Button
                        className='buttonAdd'
                        type='submit'
                        variant='primary'
                      >
                        Dodaj lekara
                      </Button>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <h4>Nažalost samo sestra ima pristup ovoj stranici.</h4>
      )}
    </>
  );
}
