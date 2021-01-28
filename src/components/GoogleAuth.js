import React from "react";
import { signIn, signOut } from "../actions/index";

import { connect } from "react-redux";

class GoogleAuth extends React.Component {
  //we initialize a bool with null in case we don't know what is it's case.

  componentDidMount() {
    //gapi.load() takes 2 arg. (a)the library to load, (b) callback function that will be called when the library (a) completes loading.
    window.gapi.load("client:auth2", () => {
      //
      //the client.init() takes a configuration{} with APIKey as a mandatory property , but more properties can be added according to the need of the app
      window.gapi.client
        .init({
          client_id:
            "275317570091-q2s6klr53hsnedhmmthkvlvauhd8bfsg.apps.googleusercontent.com",
          scope: "email",
        })

        //init() is promise based function
        .then(() => {
          //1- get the auth{}.
          this.myAuth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.myAuth.isSignedIn.get());

          //4- listen to changes in sign-in state and change the state{} accordingly
          this.myAuth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //call-back function, well be called each time myAuth{} sign-in state changes
  //called with bool as arg, indicating whether the user is signed-in{t} or out{f}
  onAuthChange = (signInState) => {
    if (signInState) {
      //
      //calling the action handler through props, it will return an action object with the type:"sign in"
      //we send the user id to the sign-in action handler so it can do further processing from there
      this.props.signIn(
        this.myAuth.currentUser.get().getBasicProfile().getId()
      );

      //
    } else {
      //

      //calling the action handler through props, it will return an action object with the type:"sign out"
      this.props.signOut();
    }
  };

  //call-back function, to be called when the button is clicked
  onSignInClick = () => {
    this.myAuth.signIn();
  };

  //call-back function, to be called when the button is clicked
  onSignOutClick = () => {
    this.myAuth.signOut();
  };

  renderAuthButton() {
    if (this.props.signInState === null) {
      return <div>Loading .....</div>;
    } //
    else if (this.props.signInState === true) {
      console.log(this.myAuth.currentUser.get().getBasicProfile().getId());
      return (
        <div>
          <button
            className="ui red google button"
            onClick={this.onSignOutClick}
          >
            <i className="google icon" />
            Sign Out
          </button>
          <div>user ID : {this.props.userID}</div>
        </div>
      );
    } //
    else if (this.props.signInState === false) {
      return (
        <button className="ui red google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    } //end if
  }

  render() {
    return (
      <div style={{ color: "green", textDecoration: "underline" }}>
        {this.renderAuthButton()}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { signInState: state.auth.signIn, userID: state.auth.userID };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
