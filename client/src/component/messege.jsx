import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

function Messege() {
  const location = useLocation();
  const querylocation = new URLSearchParams(location.search);
  const sectionref = useRef(null);

  const [fromid, setfromid] = useState(2);
  const [message, setmessagetext] = useState("");
  const toid = querylocation.get("toid");

  const [resultmessage, setresultmessage] = useState({});

  //for message send
  const SendMessage = () => {
    axios
      .post("http://localhost:5000/chart/addmessage", { fromid, toid, message })
      .then((res) => window.location.reload());
  };

  //for receive message

  useEffect(() => {
    axios
      .post("http://localhost:5000/chart/selectmessage", { fromid, toid })
      .then((res) => {
        setresultmessage(res.data);
      });
  });

  //for message scroll
  useEffect(() => {
    sectionref.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div className="top2">
      <div className="profile">
        <div className="pic"></div>
        <div className="pnames">
          <b>donatien</b>
          <small>online</small>
        </div>
      </div>
      <div className="messege-body">
        <div className="messege-body2">
          {resultmessage.length == 0 ? (
            <center>
            <img
              src={require("../icon/empty.png")}
              style={{ width: "10pc", height: "10pc" }}
            />
            <br />
            <h3 style={{fontSize:'2pc',fontFamily:'arial'}}>!!! no message</h3>
          </center>
          ) : null}
          {Array.isArray(resultmessage) &&
            resultmessage.map((messageitem) =>
              messageitem.from_user == fromid ? (
                <div className="send-messege">
                  <div className="content">{messageitem.messeget_text}</div>
                  <div className="time">
                    {new Date(messageitem.created_time).getHours()}:
                    {new Date(messageitem.created_time).getMinutes()}
                  </div>
                </div>
              ) : (
                <div className="received-messege">
                  <div className="content">{messageitem.messeget_text}</div>
                  <div className="time">
                    {new Date(messageitem.created_time).getHours()}:
                    {new Date(messageitem.created_time).getMinutes()}
                  </div>
                </div>
              )
            )}
            {/* <div ref={sectionrefs}></div> */}
        </div>
        
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          SendMessage();
        }}
        className="form-messege"
      >
        <input
          type="text"
          onChange={(e) => {
            setmessagetext(e.target.value);
          }}
          className="messegefield"
        />
        <button>send</button>
      </form>
      
    </div>
  );
}

export default Messege;
