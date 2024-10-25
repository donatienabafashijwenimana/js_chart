import React,{useState,useEffect} from "react";
import axios from "axios";

function Profile() {
  const [profiledata,setprofiledata]= useState({})
  const [edetdata,seteditdata]=useState({uname:'',email:'',passwrd:'',Profilepicture:''})

  useEffect(()=>{
    axios.get('http://localhost:5000/profile')
    .then((res)=>{
      setprofiledata(res.data)
    },[])
  })
  return (
    <div className="top2">
      <br />
      <center>
        <h1>Manage your profile</h1>

        <p>
          <img src={require('../icon/image.png')} className="image-profilep-setting"/>
          <div className="names"><br />
            
          </div>
          
          <div className="namesprofile">
            <p><b>user name:</b>{profiledata.uname}</p>
            <p><b>Email:</b>{profiledata.email}</p>
          <button className="proedit">edit</button>
          </div>
        </p>
      </center>
    </div>
  );
}

export default Profile;
