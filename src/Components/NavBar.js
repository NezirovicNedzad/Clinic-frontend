import React from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/korisniciActions";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo } = korisnickiLogin;

  const toNav = () => {
    if (userInfo.role == "Admin") navigate(`/profile-admin`);
    else if (userInfo.role == "Lekar") navigate("/profile-lekar");
    else if (userInfo.role == "Sestra") navigate("/odeljenja-sestra");
  };

  const Nav = (naziv) => {
    navigate("/" + naziv);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <nav>
        <input type='checkbox' id='check' />
        <label htmlFor='check' className='checkbtn'>
          <FontAwesomeIcon className='icon' icon={faBars} />
        </label>

        <label className='logo'>ClinicX</label>

        <ul className='NavUlLi'>
          <li className='ml-2'>
            <button onClick={() => Nav("Pocetna")}>O nama</button>
          </li>
          <li className='ml-2'>
            <button onClick={() => Nav("Novosti")}>Novosti</button>
          </li>

          {!userInfo ? (
            <li className='ml-2'>
              <button onClick={() => Nav("login")}>Login </button>
            </li>
          ) : (
            <>
              <li className='ml-2'>
                <button onClick={() => toNav()}>Profil </button>
              </li>
              <li className='ml-2'>
                <button onClick={logoutHandler}>Logout </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
