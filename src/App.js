import React, { Component } from 'react';
import Navbar from './components/navigationBar'
import ImageLinkForm from './components/imageLinkForm'
import FaceDetection from './components/faceDetection'
import SignInForm from './components/signInForm'
import RegisterForm from './components/register'
import './App.css';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'c6dc08eb29c84b908813ac568ea7eafd'
});


class App extends Component {
  state = {
    input: '',
    imgURL: '',
    box: {},
    route: 'sign-in'
  }

  calculateBoundingBox = (data) => {
    const clarifaiRes = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);
    console.log(clarifaiRes);

    return {
      leftColumn: width * clarifaiRes.left_col,
      topRow: height * clarifaiRes.top_row,
      rightColumn: width - (width * clarifaiRes.right_col),
      bottomRow: height - (height * clarifaiRes.bottom_row)
    }
  }

  faceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imgURL: this.state.input });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.calculateBoundingBox(response))
      .then(response => this.faceBox(response))
      .catch(err => console.log(err));

  }

  onRouteChange = (routeLink) => {
    this.setState({ route: routeLink })
  }
  render() {
    return (
      <div className="App-body">

        {this.state.route === 'home' ?
          <div >
            <Navbar onRouteChange={this.onRouteChange} />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
            <FaceDetection box={this.state.box} imgURL={this.state.imgURL} />
          </div>

          :
          (this.state.route === 'sign-in' ?
            <SignInForm onRouteChange={this.onRouteChange} />
            :
            <RegisterForm />)
        }
      </div>
    );
  }
}

export default App;