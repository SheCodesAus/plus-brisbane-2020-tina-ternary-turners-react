import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard/UserCard";
import { Link } from "react-router-dom";


function ProfilePage() {
    const user_id = window.localStorage.getItem("user_id");
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${user_id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setUserList(data);
        });
        }, []);

    return (
        <div id="user-list">
            <UserCard userList={userList} />;
            <h2>Edit Profile <Link to={`/edit-user/${userList.id}`}>Edit</Link></h2>
        </div>
    );
}
export default ProfilePage;