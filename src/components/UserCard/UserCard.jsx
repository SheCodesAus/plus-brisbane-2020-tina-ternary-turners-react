import React from "react";
import { Link } from "react-router-dom";

function UserCard(props) {
    const { userList } = props;
    return (
        <div id="bucket-list">
            <Link to={`users/${userList.id}`}>
            <h3>{userList.first_name} </h3>
            <h3>{userList.last_name} </h3>
            <h3>{userList.email} </h3>
            <h3>{userList.username}</h3>
            </Link>
        </div>
    );
}
export default UserCard;