import React from "react";
import linkedin from "../images/010-linkedin.png";
import Profile from "../images/Profile.png"
import Elnaz from "../images/Elnaz.png";
import Bec from "../images/Bec.png";
import Nic from "../images/Nic.png";
import Rachael from "../images/Rachael.png"
import "./ContactPage.css"
function ContactPage() {
return (
    <div class="contact-page">
<h2>
Income Splitters was proudly made by Elnaz, Rebecca, Nic and Rachael.
</h2>
<p>If you would like to get in touch with us with any feedback, or have a question, please follow the links on our pictures below. 
We’d love to hear from you!
We are contactable via our individual Portfolio pages, where you will also find links to our LinkedIn  accounts</p>
        <footer>

        <h4>Our Developers:</h4>
   
            <div class="container">
                <img src={Elnaz} alt="Avatar" class="image" style={{"width":"100%"}}/>
                <div class="middle">
                    <div class = "icon-contact">
                    <a  href="https://www.linkedin.com/in/elnaz-karimpour-49a7a877/"><img src={linkedin}/> </a> 
                    </div>
                    <div class = "icon-contact">
                    <a  href="https://elikrm.github.io/"><img src={Profile} /> </a> 
                    </div>
                </div>
            </div>

            <div class="container">
                <img src={Bec} alt="Avatar" class="image" style={{"width":"100%"}}/>
                <div class="middle">
                    <div class = "icon-contact">
                    <a  href="https://www.linkedin.com/in/rebeccamillwood/"><img src={linkedin}/> </a> 
                    </div>
                    <div class = "icon-contact">
                    <a  href="https://rebeccamillwood.github.io/"><img src={Profile} /> </a> 
                    </div>
                </div>
            </div>

            <div class="container">
                <img src={Nic} alt="Avatar" class="image" style={{"width":"100%"}}/>
                <div class="middle">
                    <div class = "icon-contact">
                    <a  href="https://www.linkedin.com/in/nicolalambie/"><img src={linkedin}/> </a> 
                    </div>
                </div>
            </div>

            <div class="container">
                <img src={Rachael} alt="Avatar" class="image" style={{"width":"100%"}}/>
                <div class="middle">
                    <div class = "icon-contact">
                    <a  href="https://www.linkedin.com/in/rachael-dagge-798334133/"><img src={linkedin}/> </a> 
                    </div>
                </div>
            </div>
            <p>Made by Elnaz & Rebeca & Rachael & Nic</p>
        </footer>
    </div>
);
};
export default ContactPage;