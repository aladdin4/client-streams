import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  //
  //a method that will do the rendering of the <Field/>
  renderField = (props) => {
    //
    // making a dynamic class naming
    let className = "";
    if (props.meta.touched && props.meta.error) {
      className = "field error";
    }

    return (
      <div>
        <div className={className}>
          <label>{props.label}</label>
          <input {...props.input} autoComplete="off" />
          {this.renderError(props.meta)}
        </div>
        <br />
      </div>
    );
  };

  renderError(meta) {
    if (meta.touched && meta.error) {
      return (
        <div className="error ui message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  }
  onSubmitForm = (values) => {
    //a callback function that is supposed to be called with handleSubmit(which itself is a callback function)
    //it receives the values from the form directly, not the event{}
    //send it to the parent's onSubmit()
    this.props.onSubmit(values);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmitForm)}
      >
        {/* <Field/> can't render, it's job is basically tansferring of all the attributes and call back fn() from the reducer and action creators and state [those that are related to redux-form ofcourse] to the hooked component */}
        <Field
          name="title"
          component={this.renderField}
          label="Enter the video title"
        />

        <Field
          name="description"
          component={this.renderField}
          label="Enter the video description"
        />

        {/* the weird thing here is, that button act as a submit, without being assigned to it */}
        <button className="ui button primary"> click me</button>
      </form>
    );
  }
}

//the validation function will receive the values of the form
//if returned an empty{} will mean it was validated successfully
const createFormValidate = function (values) {
  const errors = {};

  //we are searching for the fields by name,
  //the returned object sent to the field.component fn()
  if (!values.title) {
    errors.title = "you must enter a valid title !!";
  }
  if (!values.description) {
    errors.description = "you must enter a valid description !!";
  }

  return errors;
};
//reduxForm() is a built-in method from the "redux-form" library, it works like connect()(), but instead of mapState() it accepts a configurable {}, and send the component a ton of props related to form.
export default reduxForm({
  form: "streamForm",
  validate: createFormValidate,
})(StreamForm);
