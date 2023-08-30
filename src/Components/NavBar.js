import React from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const NavBar = () => {
  const navigate = useNavigate();
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo } = korisnickiLogin;

  const toNav = (naziv) => {
    navigate(`/${naziv}`);
  };

  return (
    <>
      <nav>
        <input type='checkbox' id='check' />
        <label htmlFor='check' className='checkbtn'>
          <FontAwesomeIcon className='icon' icon={faBars} />
        </label>

        <label className='logo'>ClinicX</label>

        <ul>
          <li>
            <button onClick={() => toNav("")}>O nama</button>
          </li>
          <li>
            <button onClick={() => toNav("odeljenja")}>Odeljenja</button>
          </li>
          <li>
            <button>Pacijenti</button>
          </li>
          <li>
            <button>Admin </button>
          </li>
          {!userInfo ? (
            <li>
              <button onClick={() => toNav("login")}>Uloguj se </button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => toNav("login")}>Profil </button>
              </li>
              <li>
                <button onClick={() => toNav("login")}>Izloguj se </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
