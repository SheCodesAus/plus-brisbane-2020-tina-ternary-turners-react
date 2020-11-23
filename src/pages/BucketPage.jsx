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


return (
    <div className="bucket-card">
        <h2>{bucketData.title}</h2>
        <h3>This bucket has been created at: {convertDateTime(bucketData.date_created)}</h3>
        <h3>BSB number: </h3>
        <h4>{bucketData.source_bsb_number}</h4>
        <h3>Account number: </h3>
        <h4>{bucketData.source_account_number }</h4>
        <h3>Account name: </h3>
        <h4>{bucketData.source_account_name }</h4>
        <h3>Balace: </h3>
        <h4>{bucketData.source_balance}</h4>
        <h3>Bucket Status is {(bucketData.is_open)?("Open"):("Closed")}</h3>
        
        

        <hr/>

        <h3>Pipes:</h3>
        <h1>This bucket has been split to </h1>
        <ul>
            {bucketData.pipes.map((pipeData, key) => {
                
            return (
            <li>
                <PipeCard  pipeData={pipeData}/>
            </li>
            );
            })}
        </ul>


        <nav class="main-navigation">
            <ul>
                <li><Link to={`/edit-bucket/${bucketData.id}`}>Edit</Link></li>
                <li><Link type="submit" onClick={handledelete}>Delete</Link></li>
                {/* <li><Link to={`/new-pipe/${bucketData.id}`}>Add Pipes</Link></li> */}
                
            </ul>
        </nav>

        <div>
        <PipePage  bucketId={bucketData.id}/>
        </div>

        <hr/>


        
    </div>
    );
}
export default BucketPage;