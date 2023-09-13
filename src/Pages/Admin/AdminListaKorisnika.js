import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";

import {
  FaGripHorizontal,
  FaListUl,
  FaTrashAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

import adminImage from "../../images/user-gear.png";

import "../../styles/adminProfilePage.css";
import {
  listaKorisnika,
  ukloniKorisnika,
} from "../../actions/korisniciActions";

export default function AdminListaKorisnika() {
  const navigate = useNavigate();

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);
  const listaKorisnikaState = useSelector((state) => state.korisniciList);
  const { loading, error, korisnici } = listaKorisnikaState;

  const ukloniKorisnikaState = useSelector((state) => state.korisniciUkloni);
  const {
    loading: loadingUkloni,
    error: errorUkloni,
    success,
  } = ukloniKorisnikaState;

  const dispatch = useDispatch();

  const { userInfo } = korisnickiLogin;

  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);
  useEffect(() => {
    dispatch(listaKorisnika());
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

  const handleDeleteUser = (id) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete korisnika?")) {
      dispatch(ukloniKorisnika(id));
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
                  <li
                    className='navAdminLine activeNav'
                    onClick={toggleDropdownLekari}
                  >
                    <FaUsers className='faIcons' /> Korisnici ▼
                  </li>
                  {showDropdownLekari && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li onClick={() => toNav("lekari-admin")}>Lekari</li>

                      <li onClick={() => toNav("sestrice-admin")}>Sestrice</li>
                      <li
                        className='activeNav'
                        onClick={() => toNav("lista-korisnika-admin")}
                      >
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
                  Lista korisnika <FaListUl />
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {loadingUkloni ? (
                    <Loader />
                  ) : (
                    <Table className='mt-4' striped bordered hover>
                      <thead className='tableThead'>
                        <tr>
                          <th>Ime</th>
                          <th>Prezime</th>
                          <th>Email</th>
                          <th>Uloga</th>
                          <th></th>
                        </tr>
                        <tr className='tableTr'>
                          <th colSpan={5}>Lekari</th>
                        </tr>
                      </thead>
                      <tbody>
                        {korisnici ? (
                          korisnici
                            .filter((k) => k.role === "Lekar")
                            .map((korisnik) => (
                              <tr key={korisnik.id}>
                                <td>{korisnik.ime}</td>
                                <td>{korisnik.prezime}</td>
                                <td>{korisnik.email}</td>
                                <td>{korisnik.role}</td>
                                <td>
                                  <FaTrashAlt
                                    className='pointer'
                                    onClick={() =>
                                      handleDeleteUser(korisnik.id)
                                    }
                                    data-id={korisnik.id}
                                  />
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan='5'>Nema korisnika.</td>
                          </tr>
                        )}
                        <tr className='tableTr'>
                          <th colSpan={5}>Sestrice</th>
                        </tr>
                        {korisnici ? (
                          korisnici
                            .filter((k) => k.role === "Sestra")
                            .map((korisnik) => (
                              <tr key={korisnik.id}>
                                <td>{korisnik.ime}</td>
                                <td>{korisnik.prezime}</td>
                                <td>{korisnik.email}</td>
                                <td>{korisnik.role}</td>
                                <td>
                                  <FaTrashAlt
                                    className='pointer'
                                    onClick={() =>
                                      handleDeleteUser(korisnik.id)
                                    }
                                    data-id={korisnik.id}
                                  />
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan='5'>Nema korisnika.</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  )}
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
