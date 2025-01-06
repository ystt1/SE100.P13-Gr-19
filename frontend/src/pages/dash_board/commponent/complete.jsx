
import React from "react";
import { Link } from "react-router-dom";

const Complete = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You're complete</h1>
      <p>Waiting for teacher scoring you</p>
      <Link to="/quiz-history" style={{ color: "blue", textDecoration: "underline" }}>
        Go to history
      </Link>
    </div>
  );
};

export default Complete;
