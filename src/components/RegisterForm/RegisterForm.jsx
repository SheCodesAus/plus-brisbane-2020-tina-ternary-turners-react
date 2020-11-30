import React, { useState } from "react";
import { useHistory } from "react-router-dom";


function RegisterForm() {
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/`, 
            {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData().then((response) => {
            console.log(response);
        history.push("/login");
        });
    };

    return (
        <form>
            <div class="Register1">
                <h1>Hi</h1>
            </div>
            <div class="form-item">
                <label htmlFor="first_name">First name: </label>
                <input
                type="text"
                id="first_name"
                placeholder="First name"
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="last_name">Last name: </label>
                <input
                type="text"
                id="last_name"
                placeholder="Last name"
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="username">Username: </label>
                <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="email">Email: </label>
                <input
                type="text"
                id="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="password">Password: </label>
                <input
                type="password"
                id="password"
                placeholder="Enter a password"
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
            <button type="submit" onClick={handleSubmit}>
                Sign up
            </button>
            </div>
        </form>
    );
}

export default RegisterForm;