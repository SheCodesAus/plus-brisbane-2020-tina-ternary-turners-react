
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


function PipeCard(props) {
    const { pipeData} = props;
    const history = useHistory();
    const [bucketData, setBuckettData] = useState({ pipes: [] });
    var id = window.localStorage.getItem("bucket_ID");
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}buckets/${id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setBuckettData(data);
        });
        }, []);

        const deleteData = async() => {
        
            var savedtoken = window.localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_API_URL}pipes/${pipeData.id}`,{
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${savedtoken}`,
                },
                body: JSON.stringify(pipeData),
            });
            return response.text();
        };
        const handledelete = (e) => {
        
            e.preventDefault();
    
            if (window.confirm(`You are about to delete the ${pipeData.pipe_name} pipe!!`)) {
                deleteData().then(response => {
                    console.log(response)
                    history.push( `/`)
                });
              } 
              else {
                history.push( `/`)
              }
            // deleteData().then(response => {
            //     console.log(response)
            //     history.push( `/`)
            // }
            
        }
    return (
        <div className="bucket-card">
            <h4>Pipe Name: {pipeData.pipe_name}</h4>
            <h4>BSB Number: {pipeData.dest_bsb_number}</h4>
            <h4>Bank Account Number: {pipeData.dest_account_number} </h4>
            <h4>Bank Account Name: {pipeData.dest_account_name}</h4>
            <h4>Bank Balance: ${pipeData.dest_balance} </h4>
            <h4>Statement Text: {pipeData.statement_text} </h4>
            <h4>Date Transferred: dd/mm/yy</h4>
            <h4>Amount in dollar: ${(pipeData.amount_dollar==-1)?(pipeData.amount_percent*bucketData.source_balance/100):(pipeData.amount_dollar)}</h4>
            <h4>Amount percent: {(pipeData.amount_percent==-1)?(pipeData.amount_dollar*100/bucketData.source_balance):(pipeData.amount_percent)}%</h4>
            <nav class="main-navigation">
            <ul >
                <li><Link to={`/edit-pipe/${pipeData.id}`}>Edit Pipe</Link></li>
            </ul>
            <ul >
                <li><Link type="submit" onClick={handledelete}>Delete Pipe</Link></li>
            </ul>

        </nav>
        </div>
    );
}
export default PipeCard;