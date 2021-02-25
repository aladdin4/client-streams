import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { streamEditor, streamFetcher } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // many props in this component are coming from router (match{} is one of them)
    this.props.streamFetcher(this.props.match.params.id);
    console.log(this.props);
  }

  onSubmitForm = (values) => {
    this.props.streamEditor(this.props.match.params.id, values);
  };
  render() {
    // console.log(this.props.stream);
    if (this.props.stream) {
      return (
        <div>
          <StreamForm
            onSubmit={this.onSubmitForm}
            initialValues={_.pick(this.props.stream, "title", "description")}
          />

          {/* {this.props.stream.description} */}
        </div>
      );
    }
    return <div>Loading ...</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { streamEditor, streamFetcher })(
  StreamEdit
);
