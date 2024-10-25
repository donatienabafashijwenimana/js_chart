import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/form.css";
import Axios from "axios";


const Login = () => {
  const navigation = useNavigate();
  const [values, setvalues] = useState({
    uname: "",
    password: "",
  });
  const [result, setresult] = useState("");
  // Axios.defaults.withCredentials = true
  const hundlesubmit = async () => {
    await Axios
      .post("http://localhost:5000/auth/login", { values })
      .then((res) => {
        setresult(res.data.message);
        setInterval(() => {
          if (res.data.message==="login successfully") navigation('/main/home')
          window.location.reload()
        }, 4000);
      });
  };
  return (
    <div className="form-container">
      
      <form
        action="form"
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          hundlesubmit();
        }}
      >
        <h1>log in form</h1>
        {result && <label htmlFor="" id="error">{result}</label>}
        <label htmlFor="">username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setvalues({ ...values, uname: e.target.value })}
        />
        <label htmlFor="">password</label>
        <input
          type="password"
          name="password"
          id=""
          onChange={(e) => setvalues({ ...values, password: e.target.value })}
        />
        <button>login</button>
        <p>
          i don't have account <Link to="/register">create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
