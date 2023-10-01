import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { CreateNapomena } from "../../actions/napomeneActions";
import Message from "../../Components/Message";

const NapomenaModal = ({ closeModal, kartonId, sestraId, success }) => {
  const dispatch = useDispatch();
  const [nezeljenoDejstvo, setNezeljenoDejstvo] = useState("");
  const [primedba, setPrimedba] = useState("");
  const [id, setId] = useState(uuid());

  const navigate = useNavigate();

  const napomenaCreate = useSelector((state) => state.napomenaCreate);

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = napomenaCreate;

  const kreirajNapomena = () => {
    setId(uuid());
    dispatch(
      CreateNapomena(id, nezeljenoDejstvo, primedba, kartonId, sestraId)
    );

    setTimeout(() => closeModal(false), 1400);
  };
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <h1 style={{ textAlign: "center" }}>Napomena</h1>

        <div className='body'>
          <div className='novi22'>
            <p>Primedba:</p>

            <div style={{ textAlign: "center" }}>
              <textarea
                style={{ width: "80%" }}
                value={primedba}
                onChange={(e) => setPrimedba(e.target.value)}
                rows='4'
                type='textArea'
              />
            </div>

            <p>Neželjeno dejstvo:</p>

            <div style={{ textAlign: "center" }}>
              <textarea
                style={{ width: "80%" }}
                value={nezeljenoDejstvo}
                onChange={(e) => setNezeljenoDejstvo(e.target.value)}
                rows='4'
                type='textArea'
              />
            </div>
          </div>
        </div>

        <div className='footer'>
          {successCreate ? (
            <Message style={{ textAlign: "center" }} variant={"success"}>
              Uspesno kreirana napomena!
            </Message>
          ) : (
            <>
              <button
                style={{ backgroundColor: "red" }}
                onClick={() => closeModal(false)}
              >
                Otkazi
              </button>
              <button onClick={() => kreirajNapomena()}>Unesi</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NapomenaModal;
