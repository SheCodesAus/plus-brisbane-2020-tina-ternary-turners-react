import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function PipeForm({ bucketId}) {
    // const project_id= Number(bucketId);
    const bucket_ID = window.localStorage.getItem("bucket_ID")
    const user_id = window.localStorage.getItem("user_id");
    const savedtoken = window.localStorage.getItem("token");
    const bucket_remaining = window.localStorage.getItem("bucket_remaining");
    // console.log(bucketId);
    const {id} = useParams();
    const [NewpipeData,setPipeList] = useState({
        pipe_name: "",
        dest_bsb_number: 0,
        dest_account_number: 0,
        dest_account_name: "",
        dest_balance: 0,
        amount_dollar: -1,
        amount_percent: -1,
        statement_text: "",
        destination_id: user_id,
        bucket_id: bucket_ID
        });
    // console.log(id)
    const history = useHistory();


    const handleChange = (e) => {
        const { id, value } = e.target
        setPipeList((newPipe) => ({
          ...newPipe,
          [id]: value,
        }))
      }

    const postData = async () => {

    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}pipes/`,
    {
    method: "post",
    headers: {
    "Authorization": `Token ${savedtoken}`,
    "Content-Type": "application/json",
    },
    body: JSON.stringify(NewpipeData),
    }
    );
    return response.json();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (NewpipeData.pipe_name && NewpipeData.dest_bsb_number) {
        var selection = document.getElementById("type") 
        var amount =document.getElementById("amount")
        if (selection.value == "dollar"){

                NewpipeData.amount_dollar= amount.valueAsNumber;
                NewpipeData.amount_percent= -1;
        }
        else
        {
            NewpipeData.amount_dollar= -1;
            NewpipeData.amount_percent= amount.valueAsNumber;
        }
        console.log(NewpipeData);
            postData().then((response) => {
        // window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("bucket_ID", null)
        window.localStorage.setItem("bucket_remaining", null)
            console.log(response);
            history.push("/");
        });
        }
        };
    return (
        <form>
            <div class="form-item">
                <h3> You have ${bucket_remaining} remaining in your bucket</h3>
            </div>
            <div class="form-item">
                <label htmlFor="pipe_name">Pipe Name:</label>
                <input type="text" id="pipe_name" placeholder="Pipe Name" onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_bsb_number">BSB Number:</label>
                <input type="number" id="dest_bsb_number" placeholder="123123" onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_account_number">Bank Account Number:</label>
                <input type="number" id="dest_account_number" placeholder="123456789" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="dest_account_name ">Bank Account Name:</label>
                <input type="text" id="dest_account_name" placeholder="Pipe Account Name" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="dest_balance">Bank balance:</label>
                <input type="number" id="dest_balance" placeholder="50000" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="amount">Amount Value:</label>
                <input type="number" id="amount" placeholder="4"/>
            </div>

            <div class="form-item">
                <label for="type">Choose Dollar or Percent:</label>
                <select id="type" name="type">
                    <option value="Dollar">dollar</option>
                    <option value="Percent">percent</option>
                </select>
            </div>	

            <div class="form-item">
                <label htmlFor="statement_text ">Statement Text:</label>
                <input type="text" id="statement_text" placeholder="Description" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <button type="submit" onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Transfer
                </button>
            </div>
        </form>
    );
}
export default PipeForm;