import React from "react";
import{BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Login from './component/login';
import Register from './component/register'
import Home from './component/main'

function App() {
  return (
        <Router>
          <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/main/:page" element={<Home/>} />
          </Routes>

        </Router>
  );
}

export default App;
