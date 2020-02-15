import React from "react";

const Navbar = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <p
        onClick={() => onRouteChange("sign-in")}
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="pa3 link dim pointer f4"
      >
        Sign Out
      </p>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("sign-in")}
          className="pa3 link dim pointer f4"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="pa3 link dim pointer f4"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navbar;
