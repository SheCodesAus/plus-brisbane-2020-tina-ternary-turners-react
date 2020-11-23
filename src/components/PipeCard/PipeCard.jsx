
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


function PipeCard(props) {
    const { pipeData} = props;
    const [userData, setuserData] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${pipeData.destination_id}`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
            setuserData(data);
        });
        }, []);
    return (
        <div className="bucket-card">
            <h4>${pipeData.amount_dollar} for {pipeData.pipe_name}</h4>
        
        </div>
    );
}
export default PipeCard;