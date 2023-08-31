import React from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/korisniciActions";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo } = korisnickiLogin;

  const toNav = (naziv) => {
    navigate(`/${naziv}`);
  };


const logoutHandler =()=>{

  dispatch(logout());
  navigate("/");
}
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
            <button onClick={() => toNav("")}>Novosti</button>
          </li>
      
          {!userInfo ? (
            <li>
              <button onClick={() => toNav("login")}>Login </button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => toNav("login")}>Profil </button>
              </li>
              <li>
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
