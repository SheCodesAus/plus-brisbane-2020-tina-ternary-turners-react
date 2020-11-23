import React, { useState, useEffect } from "react";
import BucketCard from "../components/BucketCard/BucketCard";
import "../App.css"
function AllBucketPage({ convertDateTime }) {
    const [bucketList, setBucketList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}buckets`)
        .then((results) => {
        return results.json();
        })
        .then((data) => {
        setBucketList(data);
        });
        }, []);

return (
    <div id="bucket-list">
        {bucketList.map((bucketData, key) => {
        return <BucketCard key={key} bucketData={bucketData} convertDateTime={convertDateTime} />;
        })}
    </div>
);
}
export default AllBucketPage;
