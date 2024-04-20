import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      {" "}
      <h2>
        Wecome. This website is simply to display list of Ojima's github repos.
        <br />
        Click the following button to explore
      </h2>
      <Link to="/repos">Explore</Link>
    </div>
  );
}

export default Home;
