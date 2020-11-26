import React from "react"
import { Link } from "react-router-dom"

function NavUser({ logOut }) {
  return (
    <nav className="main-navigation">
        <uL>
            <li><Link to="/users"> Profile</Link></li>
            <li><Link to="/all-buckets"> Buckets</Link></li>
            <li><Link to="/new-bucket"> New Bucket</Link></li>
            <li><Link to="/" onClick={logOut}>Log Out</Link></li>
        </uL>
    </nav>
  );
}

export default NavUser;