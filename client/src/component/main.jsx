import React, { useState, useEffect } from "react";
import Axios from "axios";
import io from "socket.io-client";

import "../css/home.css";
import Messege from "./messege";
import Home from "./home";
import Notification from "./notfication";
import Friends from "./friends";
import Video from "./post";
import Profile from "./profile";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Main() {
  const navigation = useNavigate();
  const params = useParams();
 
  const pages=params.page
  const [page, setpage] = useState("home");
  const [searchuser, setsearchuser] = useState("alluser");
  const [users, setuser] = useState([]);
  const [tomessage,settomessage]=useState('')
  const [profiledata,setprofiledata] = useState({})

   useEffect(()=>{
    axios.get('http://localhost:5000/profile')
    .then((res)=>{
      setprofiledata(res.data)
    },[])


   },[])
  useEffect(() => {
    if (searchuser == "") setsearchuser("alluser");
    Axios.post("http://localhost:5000/main/searchuser", { searchuser })
      .then(
        (res) => {
          setuser(res.data);
        });
  });
  return (
    <div className="home-conatiner">
      <div className="left">
        <div className="profile">
        <img src={`http://localhost:5000/uploads/${profiledata.profile_picture}`} alt="Uploaded" className="pic"/> 
          <div className="pnames">
            <b>{profiledata.uname}</b>
            <small>online</small>
          </div>
        </div>
        <input
          type="search"
          placeholder="search people"
          className="search"
          onChange={(e) => setsearchuser(e.target.value)}
        />

        <div className="list-people">
          {users.map((useritem) => (
            <div className="profile" onClick={() =>{ navigation(`/main/messege?toid=${useritem.userid}`)}}>
              <img src={`http://localhost:5000/uploads/${useritem.profile_picture}`} alt="Uploaded" className="pic"/> 
              <div className="pnames">
                <b>{useritem.username}</b>
                <small>hy</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <div className="top1">
          <h1>chart</h1>
        </div>
        {/* main-content section */}

        {pages === "messege" && <Messege/>}
        {pages === "home" && <Home />}
        {pages === "notification" && <Notification />}
        {pages === "video" && <Video />}
        {pages === "friends" && <Friends />}
        {pages === "profile" && <Profile />}
      </div>

      {/* that is navigation section */}
      <div className="nav">
        <div className="nav-item" onClick={() => navigation(`/main/${'home'}`)}>
          <img src={require("./../icon/home.png")} alt="" className="icon" />
          <small> home</small>
        </div>
        {/* <div className="nav-item" onClick={() => navigation("/main/friends")}>
          <img src={require("./../icon/friends.png")} alt="" className="icon" />
          <small> friends</small>
        </div>
        <div className="nav-item" onClick={() => navigation("/main/notification")}>
          <img
            src={require("./../icon/notification.png")}
            alt=""
            className="icon"
          />
          <small> notification</small>
        </div> */}
        <div className="nav-item" onClick={() => navigation("/main/video")}>
          <img src={require("./../icon/video.png")} alt="" className="icon" />
          <small> post</small>
        </div>
        <div className="nav-item" onClick={() => navigation("/main/profile")}>
          <img src={require("./../icon/profile.png")} alt="" className="icon" />
          <small> profile</small>
        </div>
        <div className="nav-item">
          <img src={require("./../icon/logout.png")} alt="" className="icon" />
          <small> logout</small>
        </div>
      </div>
    </div>
  );
}

export default Main;
