import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard/UserCard";
import "../App.css"
function UserPage({}) {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setUserList(data);
        });
        }, []);

return (
    <div id="user-list">
        {userList.map((userData, key) => {
        return <UserCard key={key} userData={userData} />;
        })}
    </div>
);
}
export default UserPage;
