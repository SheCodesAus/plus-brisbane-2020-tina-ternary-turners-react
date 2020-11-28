import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div class="about-page">
      <div class="info">
        <h1>Welcome to Income Splitter</h1>
        <p>
          Want to manage your income more effectively? Tired of working out how
          much you need for tax, bills and other expenses? Always running out of
          money before next pay day?
        </p>
        <p>
          Join Income Splitter today and say goodbye to money headaches. Income
          Splitter allows you to put your income into 'pipes' each time you’re
          paid, making sure you have enough to pay your bills - and enjoy your
          lifestyle.
        </p>
        <p>
          Designed specifically for workers and contractors on the go, you can
          spend less time managing your money and more time managing your
          business!
        </p>
      </div>

      <aside class="sidebar">
        <h1>Join today!</h1>
        <p>3 simple steps to get started!</p>

        <h2>Step 1</h2>
        <p>
          Link your main bank account to your 'bucket' in Income Splitter. 
          This will display your current bank balance in the app. 
        </p>

        <h2>Step 2</h2>
        <p>
          {" "}
          Link 'pipes' to your bucket. This is where your money needs to go
          – things like bills, savings and fun stuff. 
        </p>

        <h2>Step 3</h2>
        <p> 
          {" "}
          Decide how much of your money goes into each pipe, 
          each time you are paid.
        </p>
        <h2><Link to={`register/`}>Get Started</Link></h2>
        <h2>Want to know more? <Link to={`contact/`}>Contact us</Link></h2>
      </aside>
    </div>
  );
};
export default AboutPage;
