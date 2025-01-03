
import React from "react";
import { Link } from "react-router-dom";

const Complete = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You're complete</h1>
      <p>Waiting for teacher scoring you</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default Complete;
