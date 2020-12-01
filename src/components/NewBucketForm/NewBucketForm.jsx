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
                <label htmlFor="title">Bucket Title:</label>
                <input type="text" id="title" placeholder="Enter Bucket Title" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="is_open" class="Boxcontainer">Is this bucket is active?
                <input type="checkbox" id="is_open" value="true" onChange={handleToggle}/>
                <span class="checkmark"></span></label>
            </div>

            <div class="form-item">
                <label htmlFor="source_bsb_number"> BSB Number: </label>
                <input type="number" id="source_bsb_number" placeholder="123123" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="source_account_number">Account Number?</label>
                <input type ="number" id="source_account_number" placeholder="123456789" onChange={handlebucketChange} />
            </div>

            
            <div class="form-item">
                <label htmlFor="source_account_name"> Account Name?</label>
                <input type ="text" id="source_account_name" placeholder="Account Name" onChange={handlebucketChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="source_balance"> Balance?</label>
                <input type ="number" id="source_balance" placeholder="20000" onChange={handlebucketChange} />
            </div>

            <div class="form-item">
                <button type="submit" onClick={handlebucketSubmit}>Submit</button>
            </div>
            
        </form>
    );
}
export default NewBucketForm;