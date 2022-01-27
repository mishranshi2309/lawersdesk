import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.css";
import {useNavigate} from 'react-router-dom';

const { SubMenu } = Menu;

function NavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
    console.log("selected menu : ", current);
  };
  const handleLogout =()=>{
    localStorage.removeItem("affidUser");
    navigate('/', { replace: true});
  }
  return (
  
    <nav className="navbar navbar-expand-lg navbar-light bg-blue px-3 text-light">
    <a className="navbar-brand text-light" href="#">Logo</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link text-light" href="#">Home </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Pricing</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link text-light dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown link
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" >Action</a>
            <a className="dropdown-item">Another action</a>
            <a className="dropdown-item" >Something else here</a>
          </div>
        </li>
      </ul>
    </div>
    <div onClick={handleLogout} className="cursor">Logout</div>
  </nav>

  );
}

export default NavBar;
