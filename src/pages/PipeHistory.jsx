import React from "react";
import Logo from "../images/Logo2.PNG";
import history from "../images/pipe-history.png";
import PipeCard from "../components/PipeCard/PipeCard";
import { useState, useEffect } from "react";


function PipeHistory () {
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
    return (
    <div className="pipe-history">
    <h1>Pipe History </h1>
    {/* <img src={history} alt="pipe history image"/> */}
    <table style={{"width":"100%"}}>
    <tr>
        <th>Pipe Name</th>
        <th>BSB Number</th>
        <th>Bank Account Number</th>
        <th>Bank Account Name</th>
        <th>Bank Balance</th>
        <th>Statement Text</th>
        <th>Amount in dollar</th>
        <th>Amount in percent</th>
        <th>Date Transferred</th>
    </tr>
    
    {bucketData.pipes.map((pipeData, key) => 
    {
        // return (<p><PipeCard  pipeData={pipeData}/></p>);
        return(
        <tr>
            <td>{pipeData.pipe_name}</td>
            <td>{pipeData.dest_bsb_number}</td>
            <td>{pipeData.dest_account_number}</td>
            <td>{pipeData.dest_account_name}</td>
            <td>{pipeData.dest_balance}</td>
            <td>{pipeData.statement_text}</td>
            <td>{(pipeData.amount_dollar==-1)?(pipeData.amount_percent*bucketData.source_balance/100):(pipeData.amount_dollar)}$</td>
            <td>{(pipeData.amount_percent==-1)?(pipeData.amount_dollar*100/bucketData.source_balance):(pipeData.amount_percent)}%</td>
            <td>dd/mm/yy</td>
        </tr>
        );
        })}
        </table>
    </div>
    )
}

export default PipeHistory;