import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/hyf.png"

const Header = () => {
    return (
        <header className="header">
            <div className="logo_container">
                <img src={logo} alt="logo"></img>
            </div>
            <ul className="navigation">
                <Link to={"/"}>  <li>Home</li></Link>
                <Link to={"/meals"}>  <li>Meals</li></Link>
                <Link to={"/meals/addmeal"}>  <li>Create a new meal</li></Link>
            </ul>
        </header>
    )
}

export default Header;