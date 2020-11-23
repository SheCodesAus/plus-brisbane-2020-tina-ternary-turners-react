import React from "react";
import { Link } from "react-router-dom";

function BucketCard(props) {
    const { bucketData , convertDateTime} = props;
    return (
        <div className="bucket-card">
            <Link to={`buckets/${bucketData.id}`}>
            <h3>{bucketData.title}</h3>
            <h4>{convertDateTime(bucketData.date_created)}</h4>
            </Link>

        </div>
    );
}
export default BucketCard;