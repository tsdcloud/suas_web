import React from "react";
import './style.css'
const LoggedOutLayout = (props) => {
  return (
    <div className="main"
      style={{
        background: "../assets/bg1.jpeg",
        backgroundSize: "cover",

        minHeight: "100vh"
    }}
    >
      {props.children}
    </div>
  );
};

export default LoggedOutLayout;
