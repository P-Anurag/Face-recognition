import React, { Component } from "react";

class Rank extends Component {
  render() {
    return (
      <div>
        <p className="f3 white">
          {`${this.props.user.name} your current number of entries is`}
        </p>
        <p className="f1 white">{`# ${this.props.user.entries}`}</p>
      </div>
    );
  }
}

export default Rank;
