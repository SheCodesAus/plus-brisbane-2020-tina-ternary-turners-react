import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditUserForm() {
    
    const[userDetails,setUserDetails] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    var globalerror = 200;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`)
        .then((results) => {
            if(results.ok){return results.json();}
            throw Error(results.statusText);
        
        })
        .then((data) => {
            console.log(data);
            setUserDetails(data);
        })
        .catch((error) => {
            console.log(error)
        });
        }, []);
    //methods
    //set state
    // const handleToggle = (e) => {
    //     const { id, checked } = e.target
    //     setUserDetails((prevUserDetails) => ({
    //       ...prevUserDetails,
    //       [id]: checked,
    //     }))
    //   }
    const handleChange = (e)=> {
        const { id, value } = e.target;
        setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            [id]: value,
        }));
    };
    const editData = async() => {
        var savedtoken = window.localStorage.getItem("token");
        const response = await 
        fetch(`${process.env.REACT_APP_API_URL}users/${id}`,
        {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${savedtoken}`,
        },
        body: JSON.stringify(userDetails),
        })
        .then((response) => {
            // console.log(response.status)
            // setErrorCode(response.status); //This one does not work here!!!
            globalerror =(response.status);
            
            return response.json();
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editData()
        .then((response) => {
            console.log(globalerror);
            if(globalerror===200){
                alert("Your changes have been saved!");
                history.push(`/users/${userDetails.id}`);
            }
            else{
                console.log(globalerror);
                alert("You do not have permission to edit this user!");
                history.push( "/");
            }
            
        });
    }
    //template
    return ( 
        <form>
            <div class="form-item">
                <label htmlFor="first_name">First name: </label>
                <input
                type="text"
                id="first_name"
                value={userDetails.first_name}
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="last_name">Last name: </label>
                <input
                type="text"
                id="last_name"
                value={userDetails.last_name}
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="username">Username: </label>
                <input
                type="text"
                id="username"
                value={userDetails.username}
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="email">Email: </label>
                <input
                type="text"
                id="email"
                value={userDetails.email}
                onChange={handleChange}
                />
            </div>
            <div class="form-item">
                <label htmlFor="password">Password: </label>
                <input
                type="password"
                id="password"
                value={userDetails.password}
                onChange={handleChange}
                />
            </div>
        
        <div class="form-item">
            <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
        
    </form>
      );
}
export default EditUserForm;