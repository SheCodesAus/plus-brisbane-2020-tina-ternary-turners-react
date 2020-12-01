import React from "react";
import Image from "./notfound.jpeg";

function ErrorNotFound() {
    return(
        <div class="error-header">
            <h1>Uh Oh! This page can't be found</h1>
            <p>It looks like nothing was found at this page or 
            you may not have authorisation to complete this activity.
            Maybe try another link.</p>
            <div>
            <img src={Image} alt="monoploy-man-bankrupt" />
            </div>
        </div>
    );
}

export default ErrorNotFound;