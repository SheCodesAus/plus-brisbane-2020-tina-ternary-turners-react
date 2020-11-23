import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import NavUser from "./NavUser/NavUser";

function Nav() {
    const [loggedIn, setLoggedIn] = useState(false)
  
    const history = useHistory()
    const location = useLocation()
  
    useEffect(() => {
      const token = window.localStorage.getItem("token")
      token != null ? setLoggedIn(true) : setLoggedIn(false)
    },[location])
  
    const logOut = () => {
      window.localStorage.clear()
      history.push("/login")
    }
  
    if (loggedIn === true) {
      return <NavUser logOut={logOut} />
    } 
    else {
      return (
        <nav className="main-navigation">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
      )
    }
  }
  
  export default Nav
