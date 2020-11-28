import React from "react";
import Recorded from "../assets/gif/Recorded.gif"

function HomePage() {
  
  return (
    <div>
          <h1 id="langing-head">Explore the features now</h1>
          <div className="landing">
              <div className="landing-container">
                  <div id="landing-text">
                      <h1>WELCOME</h1>
                  </div>
                  <div className="landing-gif">
                    <img className="landing-gif" src={Recorded}/>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default HomePage;
