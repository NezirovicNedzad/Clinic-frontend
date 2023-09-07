import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  FaList,
  FaPowerOff,
  FaUser,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

import adminImage from "../../images/user-gear.png";
import users from "../../images/group.png";
import profile from "../../images/user.png";

import "../../styles/adminProfilePage.css";

export default function AdminLekari() {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    email: "",
  });
  const navigate = useNavigate();
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo, success } = korisnickiLogin;

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        ime: userInfo.ime,
        prezime: userInfo.prezime,
        email: userInfo.email,
      });
    }
  }, [userInfo]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
              <div className='navAdmin'>
                <div className='adminImage'>
                  <Image fluid src={adminImage} />
                </div>
                <h4>{userInfo.ime + " " + userInfo.prezime}</h4>
                <p>{userInfo.role}</p>

                <h3>Opcije</h3>

                <ul className='mt-3'>
                  <li
                    className='navAdminLine'
                    onClick={() => toNav("profile-admin")}
                  >
                    <FaUser className='faIcons' />
                    Profil
                  </li>{" "}
                  <li
                    className='activeNav navAdminLine'
                    onClick={toggleDropdown}
                  >
                    <FaUsers className='faIcons' /> Korisnici ▼
                  </li>
                  {showDropdown && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li
                        onClick={() => toNav("lekari-admin")}
                        className='activeNav'
                      >
                        Lekari
                      </li>

                      <li>Sestrice</li>
                    </ul>
                  )}
                  <li className='navAdminLine'>
                    <FaList className='faIcons' />
                    Lista korisnika
                  </li>
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

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Label className='formLabel'>Uloga</Form.Label>
                      <Form.Control
                        className='formControlor'
                        name='email'
                        onChange={handleInputChange}
                        type='text'
                        value={formData.email}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                      <Form.Label className='formLabel'>Lozinka</Form.Label>
                      <Form.Control
                        className='formControlor'
                        name='email'
                        onChange={handleInputChange}
                        type='text'
                        value={formData.email}
                      />
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Promeni
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
