import React, { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FaList, FaPowerOff, FaUser, FaUsers } from "react-icons/fa";

import adminImage from "../images/user-gear.png";
import users from "../images/group.png";
import profile from "../images/user.png";

import "../styles/adminProfilePage.css";

export default function ProfilePage() {
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo, success } = korisnickiLogin;

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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

                <ul>
                  <li>
                    <FaUser className='faIcons' />
                    Profil
                  </li>{" "}
                  <li onClick={toggleDropdown}>
                    <FaUsers className='faIcons' /> Korisnici ▼
                  </li>
                  {showDropdown && (
                    <ul style={{ marginLeft: "50px" }}>
                      <li>Lekari</li>
                      <li>Sestrice</li>
                    </ul>
                  )}
                  <li>
                    <FaList className='faIcons' />
                    Lista korisnika
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={9}>
              proba admin ostalo
              {/* Dodajte druge elemente ovde */}
            </Col>
          </Row>
        </Container>
      ) : userInfo.role === "Lekar" ? (
        "Lekar"
      ) : (
        "Pacijent"
      )}
    </>
  );
}
