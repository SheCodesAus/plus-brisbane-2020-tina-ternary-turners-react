import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound";

function EditPipeForm() {
    
    const[pipeDetails,setPipeDetails] = useState({ pipes: [] });
    const history = useHistory();
    const { id } = useParams();

    const bucket_ID = window.localStorage.getItem("bucket_ID")
    // const [errorCode, setErrorCode] = useState(200); //this does not work!!
    var globalerror = 200;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}pipes/${id}`)
        .then((results) => {
            if(results.ok){return results.json();}
            throw Error(results.statusText);
        
        })
        .then((data) => {
            console.log(data);
            setPipeDetails(data);
        })
        .catch((error) => {
            console.log(error)
        });
        }, []);
    //methods
    //set state

    const handleToggle = (e) => {
        const { id, checked } = e.target
        setPipeDetails((prevPipeDetails) => ({
          ...prevPipeDetails,
          [id]: checked,
        }))
      }
    const handleChange = (e)=> {
        const {id, value} = e.target;
        setPipeDetails((prevPipeDetails) => ({
            ...prevPipeDetails,
            [id]: value,
        }));
    };
    const editData = async() => {
        var savedtoken = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}pipes/${id}`,{
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${savedtoken}`,
            },
            body: JSON.stringify(pipeDetails),
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
                history.push( `/buckets/${bucket_ID}`);
                // history.push( `/pipes/${pipeDetails.id}`);
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
                <label htmlFor="pipe_name">Pipe Name:</label>
                <input type="text" id="pipe_name" value={pipeDetails.pipe_name} onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_bsb_number">BSB Number:</label>
                <input type="number" id="dest_bsb_number" value={pipeDetails.dest_bsb_number}onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_account_number">Bank Account Number:</label>
                <input type="number" id="dest_account_number" value={pipeDetails.dest_account_number} onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="dest_account_name ">Bank Account Name:</label>
                <input type="text" id="dest_account_name" value={pipeDetails.dest_account_name} onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="dest_balance">Bank balance:</label>
                <input type="number" id="dest_balance" value={pipeDetails.dest_balance} onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="amount_dollar">Amount Dollar:</label>
                <input type="number" id="amount_dollar" value={pipeDetails.amount_dollar}/>
            </div>

            <div class="form-item">
                <label htmlfor="amount_percent">Amount Percent:</label>
                <input type="number" id="amount_percent" value={pipeDetails.amount_percent}/>
            </div>	

            <div class="form-item">
                <label htmlFor="statement_text ">Statement Text:</label>
                <input type="text" id="statement_text" value={pipeDetails.statement_text} onChange={handleChange}/>
            </div>
        
        <div class="form-item">
            <button type="submit" onClick={handleSubmit}>Edit</button>
        </div>
        </form>
      );
}
export default EditPipeForm;