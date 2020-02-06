import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <p
        onClick={() => this.props.onRouteChange("sign-in")}
        style={{ display: "flex", justifyContent: "flex-end" }}
        className="pa3 link dim pointer f4"
      >
        Sign Out
      </p>
    );
  }
}

export default Navbar;
