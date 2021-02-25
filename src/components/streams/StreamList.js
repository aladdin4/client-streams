import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { streamsFetcher } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.streamsFetcher();
  }

  renderCreateBtn() {
    return (
      <div style={{ textAlign: "end" }}>
        <Link to="/streams/new" className="ui button primary">
          Create new Stream
        </Link>
      </div>
    );
  }

  renderAdmin(stream) {
    //console.log(stream.creatorID);
    //console.log(this.props.currentUserID);

    if (stream.creatorID === this.props.currentUserID) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>

          <Link
            className="ui button negative"
            to={`/streams/delete/${stream.id}`}
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      //console.log(stream);
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />

          <div className="content">
            {stream.title}

            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateBtn()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log("hello from mapState()", state);
  return {
    streams: Object.values(state.streams),
    currentUserID: state.auth.currentUserID,
  };
};

export default connect(mapStateToProps, { streamsFetcher })(StreamList);
