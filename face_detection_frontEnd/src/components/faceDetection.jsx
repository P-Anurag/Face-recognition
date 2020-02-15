import React, { Component } from "react";
import "./faceDetection.css";
class FaceDetection extends Component {
  render() {
    // let leftColumn, rightColumn, topRow, bottomRow;
    // ({ leftColumn, topRow, rightColumn, bottomRow } = this.props.box);
    return (
      <div className="center ma">
        <div className="absolute mt2">
          {
            <img
              id="inputImage"
              src={this.props.imgURL}
              width="500px"
              height="auto"
            />
          }
          <div
            className="bounding-box"
            style={{
              top: this.props.box.topRow,
              right: this.props.box.rightColumn,
              bottom: this.props.box.bottomRow,
              left: this.props.box.leftColumn
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default FaceDetection;
