import React, { Component } from "react";

class SignInForm extends Component {
  state = {
    signInEmail: "",
    signInPassword: ""
  };
  onEmailChange = email => {
    this.setState({ signInEmail: email.target.value });
  };
  onPasswordChange = password => {
    this.setState({ signInPassword: password.target.value });
  };

  onPasswordSubmit = event => {
    // console.log(this.state);
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      // .then(console.log);
      .then(user => {
        if (user.EMAIL === this.state.signInEmail) {
          this.props.loadUser(user);

          this.props.onRouteChange("home");
        } else {
          document.getElementById("email-address").value = "";
          document.getElementById("password").value = "";
          document.getElementById("login-status").innerText =
            "Error logging in!";
          // console.log("Error logging in !");
        }
      });
    event.preventDefault();
  };
  render() {
    return (
      <article className="shadow-5 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80 center ">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6">Password</label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <p id="login-status" className="f6 red b bg-black">
              {" "}
            </p>
            <div className="">
              <button
                onClick={this.onPasswordSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                // type="submit"
                value="Sign in"
              >
                Sign In{" "}
              </button>
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => this.props.onRouteChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Sign up
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignInForm;
