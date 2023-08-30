import React, { useEffect } from "react";
import { faEdit, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listOdeljenja, deleteOdeljenje } from "../actions/odeljenjaActions";
import { ODELJENJE_CREATE_RESET } from "../constants/odeljenjaConstants";
const OdeljenjaPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const odeljenjaList = useSelector((state) => state.odeljenjaList);
  const { loading, error, odeljenja } = odeljenjaList;

  const obrisiOdeljenje = useSelector((state) => state.odeljenjaDelete);
  const { success: successDelete } = obrisiOdeljenje;

  const selectedOdeljenje = (id) => {
    navigate(`/odeljenja/${id}`);
  };
  const create = () => {
    navigate(`/odeljenja/create`);
  };
  const deleteOd = (id) => {
    if (window.confirm("Jeste li sigurni?")) {
      dispatch(deleteOdeljenje(id));
    }
  };
  useEffect(() => {
    dispatch({ type: ODELJENJE_CREATE_RESET });

    //  setOdeljenja(data);

    dispatch(listOdeljenja());
  }, [successDelete]);

  console.log(odeljenja);

  return (
    <div>
      <h2 style={{ padding: "20px" }}>Dostupna odeljenja</h2>
      <button
        onClick={() => create()}
        style={{
          alignItems: "center",
          margin: "1rem",
          background: "green",
          padding: "10px",
          color: "white",
        }}
      >
        <FontAwesomeIcon style={{ marginRight: "0.6rem" }} icon={faEdit} />
        Kreiraj
      </button>

      {loading ? (
        <p>loading ...</p>
      ) : (
        odeljenja.map((odeljenje) => (
          <div
            style={{ border: "1px solid black", padding: "20px" }}
            key={odeljenje.id}
          >
            <button
              onClick={() => selectedOdeljenje(odeljenje.id)}
              style={{
                float: "right",
                background: "green",
                padding: "10px",
                color: "white",
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.6rem" }}
                icon={faEdit}
              />
              Izmeni
            </button>
            <button
              onClick={() => deleteOd(odeljenje.id)}
              style={{
                float: "right",
                background: "red",
                padding: "10px",
                color: "white",
              }}
            >
              <FontAwesomeIcon
                style={{ marginRight: "0.6rem" }}
                icon={faDeleteLeft}
              />
              Izbrisi
            </button>
            <p>Naziv:{odeljenje.naziv}</p>
            <p>
              Broj kreveta:{odeljenje.brojKreveta} : Broj pacijenata
              {odeljenje.brojPacijenata}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OdeljenjaPage;
