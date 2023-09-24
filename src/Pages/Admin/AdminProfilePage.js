import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  FaGripHorizontal,
  FaList,
  FaUser,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import {} from "react-icons/bi";
import { IoMdContact } from "react-icons/io";

import adminImage from "../../images/user-gear.png";

import "../../styles/adminProfilePage.css";

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
  });
  const navigate = useNavigate();

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo, success } = korisnickiLogin;

  const [showDropdownLekari, setShowDropdownLekari] = useState(false);
  const [showDropdownOdeljenja, setShowDropdownOdeljenja] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        ime: userInfo.ime,
        prezime: userInfo.prezime,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

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
    // Ovde možete implementirati logiku za slanje podataka na server ili njihovo čuvanje u Redux stanju
  };

  return (
    <>
      {userInfo.role === "Admin" ? (
        <Container fluid>
          <Row>
            <Col md={3} className='padding0'>
              <div style={{height:"100vh"}} className='navAdmin'>
                <div className='adminImage'>
                  <Image fluid src={adminImage} />
                </div>
                <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
                <p>{userInfo.role}</p>

                <h3>Opcije</h3>

                <ul className='mt-3'>
                  <li
                    onClick={() => toNav("profile-admin")}
                    className='navAdminLine activeNav'
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
                  Moj nalog <FaUserEdit />
                </h1>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Form onSubmit={handleSubmit}>
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

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Label className='formLabel'>Email</Form.Label>
                      <Form.Control
                        className='formControlor'
                        name='email'
                        onChange={handleInputChange}
                        type='text'
                        value={formData.email}
                      />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Sačuvaj
                    </Button>
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
