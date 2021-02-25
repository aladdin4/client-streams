import React from "react";
import { connect } from "react-redux";

import { streamCreator } from "../../actions/index";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmitForm = (values) => {
    //a callback function that is supposed to be called with handleSubmit(which itself is a callback function)
    //it receives the values from the form directly, not the event{}
    this.props.streamCreator(values);
  };

  render() {
    return (
      <div>
        <h3>Create a New Form</h3>
        <StreamForm onSubmit={this.onSubmitForm} />
      </div>
    );
  }
}

export default connect(null, { streamCreator })(StreamCreate);
