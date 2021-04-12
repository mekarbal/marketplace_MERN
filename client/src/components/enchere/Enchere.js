import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();
const Enchere = () => {
  const [buyer, setBuyer] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({});
  let token = localStorage.getItem("buyerToken");
  let whatHas = jwt(token)._id;

  const db = firebase.firestore();
  const getUser = (id) => {
    axios
      .get("http://localhost:4000/buyer/" + id)
      .then((response) => {
        setBuyer(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (db) {
      if (message === "") {
        toast.info("Please enter a message");
      } else {
        db.collection("messages").add({
          text: message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user: buyer.full_name,
        });
      }

      setMessage("");
    }
  };

  useEffect(() => {
    getUser(whatHas);

    if (db) {
      const product = db
        .collection("products")
        .limit(1)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setProduct(data);
        });
      const allMessages = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return allMessages;
    }
  }, [db]);
  // console.log(product);
  return (
    <>
      <Row className="justify-content-center text-center mt-5">
        <Col md={6}>
          <div key={product[0].id} className="">
            <h3>{product[0].productName}</h3>
            <div align="center" className="mt-5">
              <img src={`${product[0].image}`} alt="" />
            </div>
            <h3 className="mt-5">${product[0].price}</h3>
          </div>
        </Col>
        <Col md={6}>
          <div className="--dark-theme" id="chat">
            <div className="chat__conversation-board">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="chat__conversation-board__message-container"
                >
                  <div className="chat__conversation-board__message__person">
                    <div className="mt-3">
                      <h6>{message.user}</h6>
                    </div>
                  </div>

                  <div className="chat__conversation-board__message__context">
                    <div className="chat__conversation-board__message__bubble">
                      <span>{message.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="chat__conversation-board__message-container"></div>
              <div className="chat__conversation-board__message-container">
                <div className="chat__conversation-board__message__options">
                  <button className="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
                    <svg
                      className="feather feather-smile sc-dnqmqq jxshSx"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={10} />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1={9} y1={9} x2="9.01" y2={9} />
                      <line x1={15} y1={9} x2="15.01" y2={9} />
                    </svg>
                  </button>
                  <button className="btn-icon chat__conversation-board__message__option-button option-item more-button">
                    <svg
                      className="feather feather-more-horizontal sc-dnqmqq jxshSx"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx={12} cy={12} r={1} />
                      <circle cx={19} cy={12} r={1} />
                      <circle cx={5} cy={12} r={1} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="chat__conversation-panel">
              <div className="chat__conversation-panel__container">
                <input
                  className="chat__conversation-panel__input panel-item"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="chat__conversation-panel__button panel-item btn-icon send-message-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    data-reactid={1036}
                    onClick={onSubmitHandler}
                  >
                    <line x1={22} y1={2} x2={11} y2={13} />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Enchere;
