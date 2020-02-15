import React, { Component } from "react";
import "./imageLinkForm.css";
class ImageLinkForm extends Component {
  state = {};
  render() {
    return (
      <div>
        <p className="f3 pa3">
          {"This app can detect faces in ur picture. Give it a try!"}
        </p>

        <div className="center form pa3 shadow-5">
          <input
            onChange={this.props.onInputChange}
            className="f4 w-70 "
            type="text"
            placeholder="Enter link"
          />
          <button
            onClick={this.props.onSubmit}
            className="f4 w-30 grow link pointer"
          >
            Detect
          </button>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;
