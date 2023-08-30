import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { OdeljenjeUpdate } from "../actions/odeljenjaActions";
import { DetailsOdeljenje } from "../actions/odeljenjaActions";
import Message from "../Components/Message";
import { ODELJENJE_UPDATE_RESET } from "../constants/odeljenjaConstants";

const Details = () => {
  const params = useParams();

  const id = params.id;
  const [naziv, setNaziv] = useState("");
  const [brojKreveta, setBrojKreveta] = useState(0);
  const [brojPacijenata, setBrojPacijenata] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const odeljenjaDetail = useSelector((state) => state.odeljenjaDetails);

  const { loading, error, odeljenje } = odeljenjaDetail;

  const odeljenjaUpdate = useSelector((state) => state.odeljenjaUpdate);

  const { success } = odeljenjaUpdate;

  const Submit = async () => {
    dispatch(
      OdeljenjeUpdate({ id: odeljenje.id, naziv, brojKreveta, brojPacijenata })
    );
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: ODELJENJE_UPDATE_RESET });
      navigate("/odeljenja");
    } else {
      if (odeljenje.id !== id) {
        dispatch(DetailsOdeljenje(id));
      } else {
        setNaziv(odeljenje.naziv);
        setBrojKreveta(odeljenje.brojKreveta);
        setBrojPacijenata(odeljenje.brojPacijenata);
      }
    }
  }, [dispatch, id, odeljenje]);

  return (
    <div style={{ margin: "10px" }}>
      <h2>Detalji o odeljenju:</h2>

      {success && <Message variant='danger'>Uspesan update </Message>}
      <p style={{ fontSize: "20px", margin: "10px" }}>Naziv</p>
      <input
        name='naziv'
        value={naziv}
        onChange={(e) => setNaziv(e.target.value)}
        type='text'
        width='100px'
      />
      <p style={{ fontSize: "20px", margin: "10px" }}>Broj Kreveta</p>
      <input
        name='brojKreveta'
        value={brojKreveta}
        onChange={(e) => setBrojKreveta(e.target.value)}
        type='number'
        width='100px'
      />
      <p style={{ fontSize: "20px", margin: "10px" }}>Broj Pacijenata</p>
      <input
        name='brojPacijenata'
        value={brojPacijenata}
        onChange={(e) => setBrojPacijenata(e.target.value)}
        type='number'
        width='100px'
      />
      <br></br>
      <button
        onClick={Submit}
        style={{ margin: "10px", background: "red", padding: "10px" }}
      >
        Izmeni
      </button>
    </div>
  );
};

export default Details;
