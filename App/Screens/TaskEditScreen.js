/* @flow */
'use strict';

var React = require('react-native');
var styles = require('../Styles/style');
var NavigationBar = require('react-native-navbar');
var ButtonRounded = require('../Components/ButtonRounded');
var Button = require('../Components/Button');
var Actions = require('react-native-router-flux').Actions;

var {
    Text,
    Image,
    View,
    StyleSheet
} = React;

var TaskEditScreen = React.createClass({
	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={styles.welcome}>
	     			Task Edit Screen
	 			</Text>

	        </View>
	    );
  }
});

const taskEditScreen = StyleSheet.create({
	welcome: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		marginTop: 20
	}

});


module.exports = TaskEditScreen;
