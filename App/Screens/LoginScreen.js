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

var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;
var dismissKeyboard = require('dismissKeyboard');

var i18n = require('../i18n.js');
var styles = require('../Styles/style');

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
    console.log("Login using ",this.username);

    if (!BYPASS_LOGIN){
      this.props.verifyCredential(this.state.username, this.state.password);
    } else {
      Actions.main();
    }
  },

    render: function() {
        return (
            <View  style={localStyles.bg}>

                <Image source={require('image!logo')} style={localStyles.logo}/>
                <Text style={styles.logo}>
                Jasa Raharja
                </Text>
                <Text style={styles.desc}>
                Mobile Application
                </Text>
                <View style={localStyles.border}>
                    <TextInput
                        ref="username"
                        style={localStyles.textInput}
                        placeholder={'USERNAME'}
                        onChangeText={text => this.setState({'username': text})}
                        onSubmitEditing={() => this.refs.password.focus()}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} />
                </View>
                <View style={localStyles.border}>
                    <TextInput
                        ref="password"
                        style={localStyles.textInput}
                        placeholder={'PASSWORD'}
                        onChangeText={text => this.setState({'password':text})}
                        onSubmitEditing={this._login}
                        secureTextEntry={true}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7'} />
                </View>
                <View style={{marginTop: 15}}>
                <Button
                  onPress={this._login}
                  style={styles.buttonText}
                  containerStyle={styles.buttonRounded}  >
                  {i18n.login}
                </Button>
                </View>
            </View>
        );
    }
});

const localStyles = StyleSheet.create({
	bg : {
		backgroundColor: '#3B3738',
		flex: 1,
		justifyContent: 'center',
		padding: 15

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
	},
  textInput: {
		height: 40,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		paddingLeft: 10,
	},
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
