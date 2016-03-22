/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict';
/**
 * ## Import
 *
 * React
 */
var React = require('react-native');
var {
    PropTypes
} = React;


/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var FormScreen = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render() {

    let formType = this.props.formType;

    let options = {
      auto: 'placeholders',
      fields: {

      }
    };

    let username = {
      label: 'Username',
      multiline: true,
      numberOfLines: 20,
      editable: true,
      error: 'Must have 6-12 characters and/or numbers'
    };

    let email = {
      type: 'textarea',
      label: 'Email',
      keyboardType: 'email-address',
      editable: true,
      error: 'Please enter valid email'
    };

    let password = {
      label: 'Password',
      maxLength: 12,
      editable: true,
      error: 'Must have 6-12 characters with at least 1 number and 1 special character'
    };

    let passwordAgain= {
      label: 'Please enter password again',
      maxLength: 12,
      editable: true,
      error: 'Passwords must match'
    };

    let loginForm = t.struct({
      username: t.String,
      email: t.String,
      password: t.String,
      passwordAgain: t.String
    });
    options.fields['username'] = username;
    options.fields['email'] = email;
    options.fields['password'] = password;
    options.fields['passwordAgain'] = passwordAgain;


    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
        <Form ref="form"
      type={loginForm}
      options={options}
      value={this.props.value}
      onChange={this.props.onChange}
        />

    );
  }
});

module.exports = FormScreen;
