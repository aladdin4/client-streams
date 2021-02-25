import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { streamFetcher, streamDeleter } from "../../actions/index";
import history from "../../history";
import Modal from "../Modals";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.streamFetcher(this.props.match.params.id);
  }

  // render-helper() to display the buttons
  renderActions() {
    return (
      // a fragment ( or a short hand <></> empty tag), is used for enclosing many elements without changing the Css and html div system (for perfect styling)
      <React.Fragment>
        <button
          onClick={() => {
            this.props.streamDeleter(this.props.match.params.id);
          }}
          className="ui negative button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  //render-helper() to display the content right
  renderContent() {
    // console.log(this.props.stream.title);

    if (this.props.stream) {
      return `are you sure you want to delete ${this.props.stream.title}`;
    }
    return `wait while loading the stream`;
  }

  render() {
    return (
      <div>
        hello from within StreamDelete
        <Modal
          title="Delete Stream"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => {
            history.push("/");
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log("state is", state);
  // console.log("ownProps are:", ownProps);
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { streamFetcher, streamDeleter })(
  StreamDelete
);
