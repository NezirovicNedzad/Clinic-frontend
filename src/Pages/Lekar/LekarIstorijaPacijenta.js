import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  faAddressCard,
  faBook,
  faPlus,
  faCircleExclamation,
  faDeleteLeft,
  faShare,
  faNotesMedical,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import pacientImage from "../../images/user.png";
import { listKartona, listKartonaPacijenta } from "../../actions/kartonActions";
import { detailsPatient } from "../../actions/pacijentActions";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
const LekarIstorijaPacijenta = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const [showDropdownLekari, setShowDropdownLekari] = useState(false);

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);
  const navigate = useNavigate();
  const { userInfo, success } = korisnickiLogin;
  const pacijentDetails = useSelector((state) => state.pacijentDetails);

  const { loading, error, pacijent } = pacijentDetails;

  const idPacijent = params.pacijentId;
  const idO = params.id;
  const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);

  const { loading: loadingOd, error: errorOd, odeljenje } = odeljenjaDetail;

  const kartoniList = useSelector((state) => state.kartoniList);

  const {
    loading: loadingK,
    error: errorK,
    karton,
    pregledi,
    lekarK,
  } = kartoniList;

  const kartoniPacijent = useSelector((state) => state.kartoniPacijent);

  const { loading: loadingP, error: errorP, kartoni } = kartoniPacijent;

  const pregledCreate = useSelector((state) => state.pregledCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = pregledCreate;

  const toggleDropdownLekari = () => {
    setShowDropdownLekari(!showDropdownLekari);
  };

  const toNav = (link) => {
    navigate(`/profile-lekar/${link}/${idO}/${idPacijent}`);
  };

  const toNav2 = () => {
    navigate(`/profile-lekar/${idO}/${idPacijent}`);
  };
  const toNav3 = () => {
    navigate(`/profile-lekar/napomene/${idO}/${idPacijent}`);
  };

  const toNav4 = (ido, idp, idoa) => {
    navigate(`/profile-lekar/arhivirani/${ido}/${idp}/${idoa}`);
  };
  useEffect(() => {
    if (pacijent.id !== idPacijent) {
      dispatch(detailsPatient(idPacijent));
    }

    dispatch(listKartonaPacijenta(idPacijent));

    dispatch(listKartona(idO, idPacijent));
  }, [dispatch, pacijent, idPacijent]);

  return (
    <Container fluid>
      <Row>
        <Col md={3} className='padding0'>
          <div style={{ height: "100%" }} className='navAdmin'>
            <div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    flex: "10",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image fluid src={pacientImage} />
                </div>
              </div>
            </div>
            <h4>
              {pacijent.ime} {pacijent.prezime}
            </h4>
            <p>Pacijent</p>

            <h3>Opcije</h3>

            <ul className='mt-4'>
              <li onClick={() => toNav2()} className='navAdminLine  '>
                Karton <FontAwesomeIcon icon={faNotesMedical} size='lg' />
              </li>
              <li className='navAdminLine' onClick={toggleDropdownLekari}>
                Podaci ▼
              </li>
              {showDropdownLekari && (
                <ul>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>JMBG:</span>
                      {pacijent.jmbg}
                    </h5>
                  </li>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Broj godina:</span>
                      {pacijent.brojGodina}
                    </h5>
                  </li>
                  <li className='navAdminLine '>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Pol:</span>
                      {pacijent.pol}
                    </h5>
                  </li>
                  <li className='navAdminLine'>
                    <h5 style={{ padding: "0.5rem" }}>
                      <span style={{ color: "#43b9dc" }}>Odeljenje:</span>
                      {odeljenje.naziv}
                    </h5>
                  </li>
                </ul>
              )}
              <li onClick={() => toNav3()} style={{ marginBottom: "0.5rem" }}>
                Napomene{" "}
                <FontAwesomeIcon
                  style={{ marginRight: "0.6rem" }}
                  icon={faCircleExclamation}
                />
              </li>

              {userInfo.id === pacijent.idLekara ? (
                <>
                  {" "}
                  <li
                    onClick={() => toNav("pacijent-istorija")}
                    className='navAdminLine activeNav'
                  >
                    Istorija pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faBook}
                    />
                  </li>
                  <li
                    className='navAdminLine'
                    onClick={() => toNav("pacijent-premesti")}
                  >
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>
                      Izabrani lekar na klinici:
                    </span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : userInfo.id === lekarK.id ? (
                <>
                  <li
                    className='navAdminLine'
                    onClick={() => toNav("pacijent-premesti")}
                  >
                    Premesti pacijenta{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faShare}
                    />
                  </li>
                  <h4 style={{ paddingTop: "1.4rem" }}>
                    <span style={{ color: "#43b9dc" }}>
                      Izabrani lekar na klinici:
                    </span>
                  </h4>
                  <h4>
                    {pacijent.imeLekara} {pacijent.prezimeLekara}
                  </h4>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <h3 style={{ textAlign: "center", padding: "0.7rem" }}>
            {" "}
            Istorija Pacijenta
          </h3>
          <Container>
            {loadingP && <Loader></Loader>}
            {errorP && <Message variant={"danger"} children={errorP}></Message>}

            <Table className='mt-4' striped bordered hover>
              <thead className='tableThead'>
                <tr>
                  <th>Odeljenje</th>
                  <th>Ime Izabranog Lekara</th>
                  <th>Prezime Izabranog Lekara</th>
                  <th>Aktivan</th>
                  <th>
                    Pogledaj Karton{" "}
                    <FontAwesomeIcon
                      style={{ marginRight: "0.6rem" }}
                      icon={faNotesMedical}
                      size='lg'
                    />{" "}
                  </th>
                </tr>
                <tr className='tableTr'>
                  <th colSpan={5}>Kartoni na klinici</th>
                </tr>
              </thead>
              <tbody>
                {kartoni.map((k) =>
                  k.idOdeljenja === idO && k.idPacijenta === idPacijent ? (
                    <tr style={{ backgroundColor: "#82d8b0" }}>
                      <td style={{ textAlign: "center" }}>
                        {k.nazivOdeljenja}
                      </td>
                      <td style={{ textAlign: "center" }}>{k.imeLekara}</td>
                      <td style={{ textAlign: "center" }}>{k.prezimeLekara}</td>
                      <td style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          style={{ marginRight: "0.6rem", color: "green" }}
                          icon={faCheck}
                          size='lg'
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          onClick={() => toNav3(k.idOdeljenja, k.idPacijenta)}
                        >
                          Karton
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={k.idK}>
                      <td style={{ textAlign: "center" }}>
                        {k.nazivOdeljenja}
                      </td>
                      <td style={{ textAlign: "center" }}>{k.imeLekara}</td>
                      <td style={{ textAlign: "center" }}>{k.prezimeLekara}</td>
                      <td style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          style={{ marginRight: "0.6rem", color: "red" }}
                          icon={faXmark}
                          size='lg'
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          onClick={() =>
                            toNav4(k.idOdeljenja, k.idPacijenta, idO)
                          }
                        >
                          Karton
                        </Button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LekarIstorijaPacijenta;
