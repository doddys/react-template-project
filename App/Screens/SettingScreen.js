/* @flow */
'use strict';

var React = require('react-native');
var styles = require('../Styles/style');
var ButtonRounded = require('../Components/ButtonRounded');
var Button = require('../Components/Button');
var Actions = require('react-native-router-flux').Actions;
var TaskService = require('../Api/TaskService');

var {
    Text,
    Image,
    View,
    StyleSheet
} = React;

var SettingScreen = React.createClass({
  componentDidMount: function() {

  },

	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={styles.welcome}>
	     			Setting Screen
	 			</Text>

	        </View>
	    );
  }
});

const settingScreen = StyleSheet.create({
	welcome: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		marginTop: 20
	}

});


module.exports = SettingScreen;
