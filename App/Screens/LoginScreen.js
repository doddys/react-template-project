/* @flow */
'use strict';

var React = require('react-native');
var {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Platform
 } = React;

var styles = require('../Styles/style');
var Button = require('../Components/Button');
var Actions = require('react-native-router-flux').Actions;
var i18n = require('../i18n.js');
var dismissKeyboard = require('dismissKeyboard');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyCredential } from '../Actions/AuthAction'
import { BYPASS_LOGIN } from '../Config/Config';


var LoginScreen = React.createClass({
  getInitialState: function () {
      return  {
        username: null,
        password: null,
      }

  },

  getDefaultProps: function(){
      return {
            isLoggedIn: false,
      };
  },

  componentWillReceiveProps: function (nextProps) {
    console.log("Receiving new Properties: ", nextProps.isLoggedIn);
      if (nextProps.isLoggedIn) {
        Actions.main();
      }
  },

  // added for testing
  _login: function() {
    if (Platform.OS === 'android') {
      dismissKeyboard();
    }
    console.log("Log Info",this.state)

    if (!BYPASS_LOGIN){
      this.props.verifyCredential(this.state.username, this.state.password);
    } else {
      Actions.main();
    }
  },

    render: function() {
        return (
            <View  style={loginScreen.bg}>

                <Image source={require('image!logo')} style={loginScreen.logo}/>
                <Text style={styles.logo}>
                Permata
                </Text>
                <Text style={styles.desc}>
                Mobile Application
                </Text>
                <View style={loginScreen.border}>
                    <TextInput
                        ref="username"
                        style={loginScreen.textInput}
                        placeholder={'USERNAME'}
                        onChangeText={text => this.setState({'username': text})}
                        onSubmitEditing={() => this.refs.password.focus()}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} />
                </View>
                <View style={loginScreen.border}>
                    <TextInput
                        ref="password"
                        style={loginScreen.textInput}
                        placeholder={'PASSWORD'}
                        onChangeText={text => this.setState({'password':text})}
                        onSubmitEditing={this._login}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} />
                </View>
                <View style={{marginTop: 15}}>
                <Button
                    onPress={this._login}
                    text={i18n.login} />
                </View>
            </View>
        );
    }
});

const loginScreen = StyleSheet.create({
	textInput: {
		height: 40,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 10,
	},
	bg : {
		backgroundColor: '#3B3738',
		flex: 1,
		justifyContent: 'center',
		padding: 15

	},
	loginLogo: {
		width: 100,
	},
	background: {
        flex: 1,
        resizeMode: 'stretch'
    },
	logo: {
		marginBottom: 60,
		marginTop: -50,
		alignSelf: 'center',
		width: 250,
		height: 250,
		resizeMode: 'stretch'
	},
	navbar: {
		borderBottomColor: 'transparent',
	},
	border: {
		alignSelf: 'stretch',
		position: 'relative',
		borderColor: 'rgba(255,255,255,0.5)',
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		marginTop: 15,
		marginRight: 10,
		marginLeft: 10,
		height: 40
	}
});


var mapStateToProps = function(state) {
  var login = false;
  console.log('mapStateToProps', state.getIn(['currentUser','accessToken']));
  if (state.getIn(['currentUser','accessToken'])){
    login = true;
  }


  return {
    isLoggedIn: login,
  };
};

var mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
	  verifyCredential,
	}, dispatch);

};

module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
