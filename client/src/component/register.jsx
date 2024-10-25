import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import "../css/form.css";

function Login() {
  const [values, setvalues] = useState({
    email: "",
    uname: "",
    password: "",
    
  });
  const [File,setfile] = useState('')
  const [result, setresult] = useState();

  const hundlesubmit = async () => {
    const formdata = new FormData();
    formdata.append("email",values.email)
    formdata.append("uname",values.uname)
    formdata.append("password",values.password)
    formdata.append('file',File)
    
    await Axios.post("http://localhost:5000/auth/register",formdata).then(
      (res) => {
        setresult(res.data);
          if (res.data=="account has been created") {
            setInterval(() => {
              window.location.href='/'  
            }, 2000);
          }else{
            setInterval(() => {
              window.location.reload()
            }, 3000);
          }
      }
    );
  };
  return (
    <div className="form-container">
      <form
        action="form"
        className="form"
        onSubmit={(e) => {
          hundlesubmit();
          e.preventDefault();
        }}
      >
        
        <h1>create account</h1>
        {result && <label htmlFor="" id="error">{result}</label>}
        <label htmlFor="">email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => setvalues({ ...values, email: e.target.value })}
        />
        <label htmlFor="">user name</label>
        <input
          type="text"
          name="name"
          value={values.uname}
          onChange={(e) => setvalues({ ...values, uname: e.target.value })}
        />
        <input type="file" name="file" id="file" onChange={(e)=>setfile(e.target.files[0])}/>
        <label htmlFor="">password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={(e) => setvalues({ ...values, password: e.target.value })}
        />
        <button>cretate account</button>
        <p>
          already i have account <Link to="/">login</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
