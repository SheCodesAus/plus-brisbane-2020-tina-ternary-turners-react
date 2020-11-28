import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";

function EditBucketForm() {
    
    const[bucketDetails,setBucketDetails] = useState({ pipes: [] });
    const history = useHistory();
    const { id } = useParams();

    // const [errorCode, setErrorCode] = useState(200); //this does not work!!
    var globalerror = 200;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}buckets/${id}`)
        .then((results) => {
            if(results.ok){return results.json();}
            throw Error(results.statusText);
        
        })
        .then((data) => {
            console.log(data);
            setBucketDetails(data);
        })
        .catch((error) => {
            console.log(error)
        });
        }, []);
    //methods
    //set state
    const handleToggle = (e) => {
        const { id, checked } = e.target
        setBucketDetails((prevBucketDetails) => ({
          ...prevBucketDetails,
          [id]: checked,
        }))
      }
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setBucketDetails((prevBucketDetails) => ({
            ...prevBucketDetails,
            [id]: value,
        }));
    };
    const editData = async() => {
        var savedtoken = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}buckets/${id}`,{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${savedtoken}`,
            },
            body: JSON.stringify(bucketDetails),
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
                history.push( `/buckets/${bucketDetails.id}`);
            }
            else{
                console.log(globalerror);
                // alert("You do not have permission to edit this bucket!");
                history.push(`/${ErrorNotFound}`);
            }
            
        });
    }

    //template
    return ( 
        <form>
        <div class="form-item">
            <label htmlFor="title">Bucket title:</label>
            <input type="text" id="title" value = {bucketDetails.title} maxlength ="400" onChange={handleChange}/>
        </div>

        <div class="form-item">
            <label htmlFor="is_open" class="Boxcontainer">Do you want to change bucket status?
            <input type="checkbox" id="is_open" checked={bucketDetails.is_open} onChange={handleToggle}/>
            <span class="checkmark"></span></label>
        </div>

        <div class="form-item">
            <label htmlFor="source_bsb_number">BSB Number:</label>
            <input type="number" id="source_bsb_number" value = {bucketDetails.source_bsb_number} maxlength ="100" onChange={handleChange}/>
        </div>

        <div class="form-item">
            <label htmlFor="source_account_number">Account Number:</label>
            <input type ="number" id="source_account_number" value = {bucketDetails.source_account_number} onChange={handleChange} />
        </div>

        <div class="form-item">
            <label htmlFor="source_account_name">Account Name:</label>
            <input type="text" id="source_account_name" value = {bucketDetails.source_account_name} maxlength ="100" onChange={handleChange}/>
        </div>
        
        <div class="form-item">
            <label htmlFor="source_balance ">Account Balance:</label>
            <input type ="number" id="source_balance" value = {bucketDetails.source_balance} onChange={handleChange} />
        </div>
        
        <div class="form-item">
            <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
        
    </form>
      );
}
export default EditBucketForm;