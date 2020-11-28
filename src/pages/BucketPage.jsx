import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../components/BucketCard/BucketCard.css";
import PipePage from "./PipePage"
import PipeCard from "../components/PipeCard/PipeCard";


function BucketPage({convertDateTime}) {
    const [bucketData, setBuckettData] = useState({ pipes: [] });
    const { id } = useParams();
    const history = useHistory();

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
        const response = await fetch(`${process.env.REACT_APP_API_URL}buckets/${id}`,{
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${savedtoken}`,
            },
            body: JSON.stringify(bucketData),
        });
        return response.text();
    };
    window.localStorage.setItem("bucket_ID", bucketData.id)
    const handledelete = (e) => {
        
        e.preventDefault();

        if (window.confirm(`You are about to delete the bucket with title ${bucketData.title}!!!!`)) {
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
    function piechart(bucketData){
        var i;
        var stlyeString = {}
        var str1 = "--gen"
        stlyeString[str1.concat(0)] = 0
        var str2 = ""
        for (i = 0; i < bucketData.pipes.length; i++) {
            // str2= pipes[i]["amount_percent"] + "%";
            str2=(bucketData.pipes[i]["amount_percent"]==-1)?(bucketData.pipes[i]["amount_dollar"]*100/bucketData["source_balance"])+"%":(bucketData.pipes[i]["amount_percent"])+ "%";
            stlyeString[str1.concat(i)] = str2;

        }
        // var stlyeString = {"--gen0": "10%","--gen1": "60%","--gen2": "30%"}
        return(stlyeString);
    }
    function chartLabel(inx){
        var i;
        var str1 = "percent color";
        str1=str1+inx;
        return(str1);
    }
    function calculate_remaining(bucketData){
        var i;
        var accum_percent = 0;
        for (i = 0; i < bucketData.pipes.length; i++) {
            bucketData.pipes[i]["amount_percent"] = (bucketData.pipes[i]["amount_percent"]==-1)?(bucketData.pipes[i]["amount_dollar"]*100/bucketData["source_balance"]):(bucketData.pipes[i]["amount_percent"]);
            var accum_percent = accum_percent + bucketData.pipes[i]["amount_percent"];    
        }
        var remaining = 100*(bucketData["source_balance"] * (1-(accum_percent/100)) )/ bucketData["source_balance"];
        return(remaining.toFixed(0));
    }
    window.localStorage.setItem("bucket_remaining", (calculate_remaining(bucketData)/100)*bucketData["source_balance"]);
return (
    <div className="bucket-card">
        <aside class="sidebar-left">
            <h2>{bucketData.title}</h2>
            <h3>This bucket has been created at: {convertDateTime(bucketData.date_created)}</h3>
            <h3>BSB number:{bucketData.source_bsb_number} </h3>
            <h3>Account number:{bucketData.source_account_number }</h3>
            <h3>Account name: {bucketData.source_account_name }</h3>
            <h3>Balace: {bucketData.source_balance}</h3>
            <h3>Bucket Status is {(bucketData.is_open)?("Open"):("Closed")}</h3>
        </aside>

        <aside class="sidebar-right">
            <div class="chart" style={piechart(bucketData)}></div>
            <h2>This bucket has been split to </h2>
            <ul class="key">
            {bucketData.pipes.map((pipeData, key) => {
                
                return (
                    <li>
                        <strong class= {chartLabel(key)}>{(pipeData.amount_percent==-1)?(pipeData.amount_dollar*100/bucketData.source_balance):(pipeData.amount_percent)}%</strong>
                        {/* <strong class="percent color0">{pipeData.amount_percent}%</strong> */}
                        <span class="choice">This pipe has been created for {pipeData.pipe_name}</span>
                    </li>
                );
                })}
                <li>
                    <strong class="percent color00">{calculate_remaining(bucketData)}%</strong>
                    <span class="choice">Bucket's Remaining</span>
                </li>
            </ul>
        </aside>
        
        <nav class="main-navigation">
            <ul >
                <li><Link to={`/edit-bucket/${bucketData.id}`}>Edit</Link></li>
                <li><Link type="submit" onClick={handledelete}>Delete</Link></li>
                <li><Link to={`/new-pipe/${bucketData.id}`}>Add Pipes</Link></li>
                
            </ul>
        </nav>

        <div>
        {/* <PipePage  bucketId={bucketData.id}/> */}
        </div>
   
    </div>
    );
}
export default BucketPage;