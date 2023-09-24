import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

import { CreateOdeljenje, listOdeljenja } from "../../actions/odeljenjaActions";

import { FaGripHorizontal, FaUser, FaUsers } from "react-icons/fa";

import adminImage from "../../images/user-gear.png";

import "../../styles/adminProfilePage.css";

export default function AdminDodajOdeljenje() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    naziv: "",
    zvanje: "",
    brKreveta: 0,
    brPacijenata: 0,
  });

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const dodajOdeljenjeAdmin = useSelector((state) => state.odeljenjaCreate);
  const { loading, error, success } = dodajOdeljenjeAdmin;

  const listaOdeljenjaState = useSelector((state) => state.odeljenjaList);
  const { odeljenja } = listaOdeljenjaState;

  const dispatch = useDispatch();

  const { userInfo } = korisnickiLogin;

  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    dispatch(listOdeljenja());
    if (success) {
      setFormData({
        naziv: "",
        zvanje: "",
        brKreveta: 0,
        brPacijenata: 0,
      });
    }
  }, [dispatch, success]);

  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };

  const toggleDropdownOdeljenja = () => {
    setShowDropdownOdeljenja(!showDropdownOdeljenja);
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

    const { naziv, zvanje, brKreveta, brPacijenata } = formData;
    const nazivVecPostoji = odeljenja.some(
      (odeljenje) =>
        odeljenje.naziv === naziv && odeljenje.specijalizacijaNaziv === zvanje
    );

    if (nazivVecPostoji) {
      setErrorText("Odeljenje sa istim nazivom i zvanjem već postoji.");
    } else {
      setErrorText("");
      dispatch(CreateOdeljenje(naziv, zvanje, brKreveta, brPacijenata));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : userInfo.role === "Admin" ? (
        <Container fluid>
          <Row>
            <Col md={3} className='padding0'>
              <div className='navAdmin'>
                <div className='adminImage'>
                  <Image fluid src={adminImage} />
                </div>
                <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
                <p>{userInfo.role}</p>

                <h3>Opcije</h3>

                <ul className='mt-3'>
                  <li
                    onClick={() => toNav("profile-admin")}
                    className='navAdminLine '
                  >
                    <FaUser className='faIcons' />
                    Profil
                  </li>{" "}
                  <li className='navAdminLine' onClick={toggleDropdownLekari}>
                    <FaUsers className='faIcons' /> Korisnici ▼
                  </li>
                  {showDropdownLekari && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li onClick={() => toNav("lekari-admin")}>Lekari</li>

                      <li onClick={() => toNav("sestrice-admin")}>Sestrice</li>
                      <li onClick={() => toNav("lista-korisnika-admin")}>
                        Lista korisnika
                      </li>
                    </ul>
                  )}
                  <li
                    className='navAdminLine activeNav'
                    onClick={toggleDropdownOdeljenja}
                  >
                    <FaGripHorizontal className='faIcons' /> Odeljenja ▼
                  </li>
                  {showDropdownOdeljenja && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li
                        className='activeNav'
                        onClick={() => toNav("dodaj-odeljenja-admin")}
                      >
                        Dodaj
                      </li>

                      <li onClick={() => toNav("odeljenja-admin")}>Ukloni</li>
                    </ul>
                  )}
                </ul>
              </div>
            </Col>
            <Col md={9}>
              <div className='adminInfo'>
                <h1>
                  Dodaj odeljenje <FaGripHorizontal />
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {errorText && (
                    <div className='error-container'>
                      <div className='error-message'>
                        <div className='error-box'>{errorText}</div>
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
                    <div className='successMessage'>
                      Uspešno dodato odeljenje
                    </div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group className='mb-3' controlId='formBasicNaziv'>
                        <Form.Label className='formLabel'>Naziv</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='naziv'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.naziv}
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicZvanje'>
                        <Form.Label className='formLabel'>Zvanje</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='zvanje'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.zvanje}
                        />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicbrKreveta'
                      >
                        <Form.Label className='formLabel'>
                          Broj kreveta
                        </Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='brKreveta'
                          onChange={handleInputChange}
                          type='number'
                          value={formData.brKreveta}
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicbrPacijenata'
                      >
                        <Form.Label className='formLabel'>
                          Broj pacijenata
                        </Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='brPacijenata'
                          onChange={handleInputChange}
                          type='number'
                          value={formData.brPacijenata}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Button
                        className='buttonAdd'
                        type='submit'
                        variant='primary'
                      >
                        Dodaj odeljenje
                      </Button>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <h4>Nažalost samo admin ima pristup ovoj stranici.</h4>
      )}
    </>
  );
}
