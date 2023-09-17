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

import { deleteOdeljenje, listOdeljenja } from "../../actions/odeljenjaActions";

export default function AdminUkloniOdeljenje() {
  const navigate = useNavigate();

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const listaOdeljenjaState = useSelector((state) => state.odeljenjaList);
  const { loading, error, odeljenja } = listaOdeljenjaState;

  const ukloniOdeljenjeState = useSelector((state) => state.odeljenjaDelete);
  const {
    loading: loadingUkloni,
    error: errorUkloni,
    success,
  } = ukloniOdeljenjeState;

  const dispatch = useDispatch();

  const { userInfo } = korisnickiLogin;

  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);
  useEffect(() => {
    dispatch(listOdeljenja());
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
    if (window.confirm("Da li ste sigurni da želite da obrišete odeljenje?")) {
      dispatch(deleteOdeljenje(id));
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
                      <li onClick={() => toNav("dodaj-odeljenja-admin")}>
                        Dodaj
                      </li>

                      <li
                        className='activeNav'
                        onClick={() => toNav("odeljenja-admin")}
                      >
                        Ukloni
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </Col>
            <Col md={9}>
              <div className='adminInfo'>
                <h1>
                  Lista odeljenja <FaListUl />
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
                          <th>Naziv</th>
                          <th>Broj kreveta</th>
                          <th>Broj pacijenata</th>
                          {/* <th>Osoblje</th> */}
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {odeljenja ? (
                          odeljenja.map((odeljenje) => (
                            <tr key={odeljenje.id}>
                              <td>{odeljenje.naziv}</td>
                              <td>{odeljenje.brojKreveta}</td>
                              <td>{odeljenje.brojPacijenata}</td>
                              {/* <td>{korisnik.role}</td> */}
                              <td>
                                <FaTrashAlt
                                  className='pointer'
                                  onClick={() => handleDeleteUser(odeljenje.id)}
                                  data-id={odeljenje.id}
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
