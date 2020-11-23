import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewBucketForm() {
    const [NewbucketData, setNewbucketData] = useState({
        title: "",
        is_open: true,
        source_bsb_number : 0,
        source_account_number :0,
        source_account_name :"",
        source_balance : 0,
        });
    const history = useHistory();

    const handleToggle = (e) => {
        const { id, checked } = e.target
        setNewbucketData((NewbucketData) => ({
          ...NewbucketData,
          [id]: checked,
        }))
      }
    const handlebucketChange = (e) => {
    const { id, value } = e.target;
    setNewbucketData((prevbucketData) => ({
    ...prevbucketData,
    [id]: value,
    }));
    };

    const postbucketData = async () => {
    var savedtoken = window.localStorage.getItem("token");
    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}buckets/`,
    {
    method: "post",
    headers: {
    "Authorization": `Token ${savedtoken}`,
    "Content-Type": "application/json",
    },
    body: JSON.stringify(NewbucketData),
    }
    );
    return response.text();
    };

    const handlebucketSubmit = (e) => {
        e.preventDefault();
        if (NewbucketData.title && NewbucketData.source_bsb_number && NewbucketData.source_account_number && NewbucketData.source_account_name && NewbucketData.source_balance ) 
        {
        postbucketData().then((response) => {
        // window.localStorage.setItem("token", response.token);
        history.push("/");
        console.log(response);
        });
        }
        };
    return (
        <form>
            <div class="form-item">
                <label htmlFor="title">Bucket title:</label>
                <input type="text" id="title" placeholder="Enter Bucket title" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="is_open">Bucket is open?:</label>
                <input type="checkbox" id="is_open" value="true" onChange={handleToggle}/>
            </div>

            <div class="form-item">
                <label htmlFor="source_bsb_number"> bsb number: </label>
                <input type="number" id="source_bsb_number" placeholder="111111" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="source_account_number">account number?</label>
                <input type ="number" id="source_account_number" placeholder="111111111" onChange={handlebucketChange} />
            </div>

            
            <div class="form-item">
                <label htmlFor="source_account_name"> account name?</label>
                <input type ="text" id="source_account_name" placeholder="Name" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="source_balance"> balance ?</label>
                <input type ="number" id="source_balance" placeholder="20000" onChange={handlebucketChange} />
            </div>

            <div class="form-item">
                <button type="submit" onClick={handlebucketSubmit}>Submit</button>
            </div>
            
        </form>
    );
}
export default NewBucketForm;