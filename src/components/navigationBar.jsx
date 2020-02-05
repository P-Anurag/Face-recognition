import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <p
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="pa3 link dim pointer f4"
      >
        Sign out{" "}
      </p>
    );
  }
}

export default Navbar;
