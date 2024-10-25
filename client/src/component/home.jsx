import React from "react";

function Home() {
  return (
    <div className="top2 ">
      <div className="home">
        <img
          src={require("../icon/messege.png")}
          style={{ width: "10pc", height: "10pc" }}
        />
        <br />
        <h3 style={{fontSize:'2pc',fontFamily:'arial'}}>select some one to start chart</h3>
      </div>
    </div>
  );
}

export default Home;
