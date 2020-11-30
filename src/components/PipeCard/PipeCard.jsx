
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


function PipeCard(props) {
    const { pipeData} = props;
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
        <div className="bucket-card">
            <h4>pipe's name:{pipeData.pipe_name} BSB Numeber:{pipeData.dest_bsb_number}</h4>
            <h4>Bank Account Numebr:{pipeData.dest_account_number} Bank Account Name:{pipeData.dest_account_name}</h4>
            <h4>Bank Balance:{pipeData.dest_balance} </h4>
            <h4>Statement Text:{pipeData.statement_text} Date Transfered:dd/mm/yy</h4>
            <h4>Amount in dollar:{(pipeData.amount_dollar==-1)?(pipeData.amount_percent*bucketData.source_balance/100):(pipeData.amount_dollar)}$</h4>
            <h4>Amount percent:{(pipeData.amount_percent==-1)?(pipeData.amount_dollar*100/bucketData.source_balance):(pipeData.amount_percent)}%</h4>
        
        </div>
    );
}
export default PipeCard;