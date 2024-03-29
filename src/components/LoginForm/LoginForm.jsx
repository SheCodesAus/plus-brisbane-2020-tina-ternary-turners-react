import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        });
    const history = useHistory();

    const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
    ...prevCredentials,
    [id]: value,
    }));
    };

    const postData = async () => {
    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}api-token-auth/`,
    {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    }
    );
    return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
        postData().then((response) => {
            console.log(response);
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_id", response.user_id)
        history.push("/");
        console.log(response);
        });
        }
        };
    return (
        <div class="animated fadeInLeft">
        <form>
            <div class ="LogIn-Form">
                <h1>Start</h1>
            </div>
            <div class="form-item">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter username" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </form>
        </div>
    );
}
export default LoginForm;