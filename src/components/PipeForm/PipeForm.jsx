import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function PipeForm({ projectId}) {
    // const project_id= Number(projectId);
    const user_id = window.localStorage.getItem("user_id");
    const savedtoken = window.localStorage.getItem("token")
    // console.log(projectId);
    const { id } = useParams();
    const [NewpipeData,setPipeList] = useState({
        pipe_name: "",
        dest_bsb_number: 0,
        dest_account_number: 0,
        dest_account_name: "",
        dest_balance: 0,
        amount_dollar: 0,
        amount_percen: 0,
        statement_text: "",
        destination_id: user_id,
        bucket_id: id
        });
    
    const history = useHistory();


    const handleToggle = (e) => {
        const { id, checked } = e.target
        setPipeList((newPipe) => ({
          ...newPipe,
          [id]: checked,
        }))
      }

    const handleChange = (e) => {
        const { id, value } = e.target
        setPipeList((newPipe) => ({
          ...newPipe,
          [id]: value,
        }))
      }

    const postData = async () => {
    const response = await 
    fetch(`${process.env.REACT_APP_API_URL}/pipes/`,
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
        if (NewpipeData.amount && NewpipeData.comment) {
            postData().then((response) => {
        // window.localStorage.setItem("token", response.token);
            console.log(response);
            history.push("/");
        });
        }
        };
    return (
        <form>
            <div class="form-item">
                <label htmlFor="pipe_name">Pipe Name:</label>
                <input type="text" id="pipe_name" placeholder="Piepe Name?" onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_bsb_number">BSB Number:</label>
                <input type="number" id="dest_bsb_number" placeholder="111111" onChange={handleChange}/>
            </div>
            
            <div class="form-item">
                <label htmlFor="dest_account_number">Bank Account Number:</label>
                <input type="number" id="dest_account_number" placeholder="111111111" onChange={handleChange}/>
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
                <label htmlFor="amount_dollar">amount in dollar:</label>
                <input type="number" id="amount_dollar" placeholder="4" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="amount_percent">amount in percent:</label>
                <input type="number" id="amount_percent" placeholder="5" onChange={handleChange}/>
            </div>

            <div class="form-item">
                <label htmlFor="statement_text ">Statement Text:</label>
                <input type="text" id="statement_text" placeholder="statement_text " onChange={handleChange}/>
            </div>

            <div class="form-item">
                <button type="submit" onClick={handleSubmit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Donate
                </button>
            </div>
        </form>
    );
}
export default PipeForm;