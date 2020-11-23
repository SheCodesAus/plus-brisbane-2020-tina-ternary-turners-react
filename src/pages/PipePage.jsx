import React from "react";
import PipeForm from "../components/PipeForm/PipeForm";

function PipePage({ bucketId}) {
    return (
        <PipeForm bucketId={bucketId}/>
    );
}
export default PipePage;