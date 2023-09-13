import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

import { listOdeljenja } from "../../actions/odeljenjaActions";

import {
  FaGripHorizontal,
  FaList,
  FaUser,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

import adminImage from "../../images/user-gear.png";

import "../../styles/adminProfilePage.css";
import { dodajKorisnika } from "../../actions/korisniciActions";

export default function AdminLekari() {
  const navigate = useNavigate();

  const [selectedOdeljenje, setSelectedOdeljenje] = useState("");
  const [selectedSpecijalizacija, setSelectedSpecijalizacija] = useState("");

  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
    username: "",
    password: "",
    role: "Lekar",
  });

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);
  const listaOdeljenja = useSelector((state) => state.odeljenjaList);
  const { loading: loadingList, error: errorList, odeljenja } = listaOdeljenja;
  const dodajKorisnikaAdmin = useSelector((state) => state.dodajKorisnikaState);

  const { loading, error, success } = dodajKorisnikaAdmin;

  const dispatch = useDispatch();

  const { userInfo } = korisnickiLogin;

  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);

  useEffect(() => {
    const selectedOdeljenjeObj = odeljenja.find(
      (odeljenje) => odeljenje.id === selectedOdeljenje
    );

    if (selectedOdeljenjeObj) {
      setSelectedSpecijalizacija(selectedOdeljenjeObj.specijalizacijaNaziv);
    } else {
      setSelectedSpecijalizacija("");
    }

    if (success) {
      setFormData({
        ime: "",
        prezime: "",
        email: "",
        username: "",
        password: "",
        role: "Lekar",
      });
      // setSelectedOdeljenje("");
      // setSelectedSpecijalizacija("");
    }
  }, [selectedOdeljenje, selectedSpecijalizacija, odeljenja, success]);

  useEffect(() => {
    dispatch(listOdeljenja());
  }, [dispatch]);

  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };

  const toggleDropdownOdeljenja = () => {
    setShowDropdownOdeljenja(!showDropdownOdeljenja);
  };

  const handleOdeljenjeChange = (e) => {
    const selectedOdeljenjeId = e.target.value;
    setSelectedOdeljenje(selectedOdeljenjeId);
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

    const { ime, prezime, email, username, password, role } = formData;

    dispatch(
      dodajKorisnika(
        email,
        password,
        role,
        ime,
        prezime,
        username,
        selectedSpecijalizacija,
        selectedOdeljenje
      )
    );
    console.log(formData);
    console.log(selectedSpecijalizacija);
    console.log(selectedOdeljenje);
    console.log(error);
  };

  return (
    <>
      {loadingList ? (
        <Loader />
      ) : loading ? (
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
                  <li
                    className='navAdminLine activeNav'
                    onClick={toggleDropdownLekari}
                  >
                    <FaUsers className='faIcons' /> Korisnici ▼
                  </li>
                  {showDropdownLekari && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li
                        className='activeNav'
                        onClick={() => toNav("lekari-admin")}
                      >
                        Lekari
                      </li>

                      <li onClick={() => toNav("sestrice-admin")}>Sestrice</li>
                      <li onClick={() => toNav("lista-korisnika-admin")}>
                        Lista korisnika
                      </li>
                    </ul>
                  )}
                  <li
                    className='navAdminLine'
                    onClick={toggleDropdownOdeljenja}
                  >
                    <FaGripHorizontal className='faIcons' /> Odeljenja ▼
                  </li>
                  {showDropdownOdeljenja && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li onClick={() => toNav("lekari-admin")}>Dodaj</li>

                      <li onClick={() => toNav("sestrice-admin")}>Ukloni</li>
                    </ul>
                  )}
                </ul>
              </div>
            </Col>
            <Col md={9}>
              <div className='adminInfo'>
                <h1>
                  Dodaj lekara <FaUserPlus />
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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
                    <div className='successMessage'>Uspešno dodat lekar</div>
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
                        <Form.Label className='formLabel'>Email</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='email'
                          onChange={handleInputChange}
                          type='email'
                          value={formData.email}
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
                      <Form.Group className='mb-3' controlId='formBasicUloga'>
                        <Form.Label className='formLabel'>Uloga</Form.Label>

                        <Form.Control
                          className='formControlor'
                          name='role'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.role}
                          disabled
                        />
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='formBasicLozinka'>
                        <Form.Label className='formLabel'>Lozinka</Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='password'
                          onChange={handleInputChange}
                          type='password'
                          value={formData.password}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group className='mb-3' controlId='formBasicKoIme'>
                        <Form.Label className='formLabel'>
                          Korisničko ime
                        </Form.Label>
                        <Form.Control
                          className='formControlor'
                          name='username'
                          onChange={handleInputChange}
                          type='text'
                          value={formData.username}
                        />
                      </Form.Group>
                      <Form.Group
                        className='mb-3'
                        controlId='formBasicSpecijalizacija'
                      >
                        <Form.Label className='formLabel'>
                          Specijalizacija
                        </Form.Label>
                        <br />
                        <Form.Select
                          className='selectControl'
                          aria-label='Default select example'
                          onChange={handleInputChange}
                          value={selectedSpecijalizacija}
                          name='specijalizacija'
                          disabled={!selectedOdeljenje}
                        >
                          <option value=''>Izaberite specijalizaciju</option>
                          {selectedOdeljenje &&
                            odeljenja
                              .filter(
                                (odeljenje) =>
                                  odeljenje.id === selectedOdeljenje
                              )
                              .map((odeljenje) => (
                                <option
                                  key={odeljenje.id}
                                  value={odeljenje.specijalizacijaNaziv}
                                >
                                  {odeljenje.specijalizacijaNaziv}
                                </option>
                              ))}{" "}
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
        <h4>Nažalost samo admin ima pristup ovoj stranici.</h4>
      )}
    </>
  );
}
