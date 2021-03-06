import React, { Component } from 'react';
import Navbar from './components/navigationBar'
import ImageLinkForm from './components/imageLinkForm'
import FaceDetection from './components/faceDetection'
import SignInForm from './components/signInForm'
import RegisterForm from './components/register'
import Rank from './components/rank'
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
    route: 'sign-in',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: '',
      date: ''
    }
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  loadUser = (user) => {

    this.setState({
      user: {
        id: user.ID,
        name: user.NAME,
        email: user.EMAIL,
        entries: user.ENTRIES,
        date: user.JOINED
      }
    })
  }
  calculateBoundingBox = (data) => {
    const clarifaiRes = data.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);


    return {
      leftColumn: width * clarifaiRes.left_col,
      topRow: height * clarifaiRes.top_row,
      rightColumn: width - (width * clarifaiRes.right_col),
      bottomRow: height - (height * clarifaiRes.bottom_row)
    }
  }

  faceBox = (box) => {
    this.setState({ box: box });
    // console.log(box);
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
      .then(response => {

        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(response => {
              let user = { ...this.state.user };
              user.entries = response.ENTRIES;
              this.setState({ user })
            })
        }
        this.faceBox(this.calculateBoundingBox(response))
      })


      .catch(err => console.log(err))

  }

  onRouteChange = (routeLink) => {

    this.setState({ route: routeLink })
    if (this.state.route === 'home') {
      this.setState({ isSignedIn: true });
    }
    else {
      this.setState({ isSignedIn: false })
    }

  }
  render() {

    return (
      <div className="App-body">
        <Navbar onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.state.route === 'home' ?
          <div >

            <Rank user={this.state.user} />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
            <FaceDetection box={this.state.box} imgURL={this.state.imgURL} />
          </div>

          :
          (this.state.route === 'sign-in' ?
            <SignInForm loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :
            <RegisterForm onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;