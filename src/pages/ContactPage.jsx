import React from "react";
import linkedin from "../images/010-linkedin.png";
import github from "../images/100-github.png";
import facebook from '../images/001-facebook.png';
import Elnaz from "../images/Elnaz.png";
import Bec from "../images/Bec.png";
import Nic from "../images/Nic.png";
function ContactPage() {
return (
    <div class="contact-page">
        <footer>
        <h4>Our Developers:</h4>
            <div class = "icon-contact">
                <a  href="https://elikrm.github.io/"><img src={Elnaz} /> </a> 
                <p class="img__description">This image looks super neat.</p>
            </div>
            <div class = "icon-contact">
                <a  href="https://rebeccamillwood.github.io/"><img src={Bec} /> </a> 
            </div>
            <div class = "icon-contact">
                <a  href=""><img  src={Nic} /> </a>
            </div>

            <h4>Contact Us</h4>
            <div class = "icon-contact">
                <a  href="https://www.linkedin.com/in/elnaz-karimpour-49a7a877/"><img src={linkedin} /> </a> 
            </div>
            <div class = "icon-contact">
                <a  href="https://github.com/elikrm"><img src={github} /> </a> 
            </div>
            <div class = "icon-contact">
                <a  href="https://www.facebook.com/elnaz.karimpoor"><img  src={facebook} /> </a>
            </div>
            <p>Made by Elnaz & Rebeca & Rachael & Nic</p>
        </footer>
    </div>
);
}
export default ContactPage;