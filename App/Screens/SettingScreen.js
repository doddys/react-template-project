/* @flow */
'use strict';

var React = require('react-native');
var {
    Text,
    Image,
    View,
    StyleSheet
} = React;
var Actions = require('react-native-router-flux').Actions;
var i18n = require('../i18n.js');
var styles = require('../Styles/style');


import { connect } from 'react-redux';


var SettingScreen = React.createClass({
  componentDidMount: function() {
    console.log("componentDidMount");
  },

  componentWillUnmount: function() {
    console.log("componentWillUnmount");
  },

	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={localStyles.welcome}>
	     			Push Token: {this.props.pushToken}
	 			</Text>

	        </View>
	    );
  }
});

const localStyles = StyleSheet.create({
	welcome: {
		color: 'black',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		marginTop: 20
	}

});


var mapStateToProps = function(state) {
  return {
    pushToken: state.getIn(['currentUser','pushToken']),
  };
};

var mapDispatchToProps = function (dispatch) {
  return {};
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
