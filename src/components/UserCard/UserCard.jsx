import React from "react";
import { Link } from "react-router-dom";

function UserCard(props) {
    const { userData } = props;
    return (
        <div className="user-card">
            <Link to={`users/${userData.id}`}>
            <h3>{userData.name}</h3>
            </Link>

        </div>
    );
}
export default UserCard;