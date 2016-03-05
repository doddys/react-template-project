/* @flow */
'use strict';

var React = require('react-native');
var styles = require('../Styles/style');
var NavigationBar = require('react-native-navbar');
var ButtonRounded = require('../Components/ButtonRounded');
var Button = require('../Components/Button');
var Actions = require('react-native-router-flux').Actions;
var i18n = require('../i18n.js');

// added for testing
// var { Platform } = React;
// var dismissKeyboard = require('dismissKeyboard');
// var TaskListScreen = require('../Screens/TaskListScreen');

var {
    Text,
    Image,
    View,
    StyleSheet
} = React;

var HomeScreen = React.createClass({


	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={styles.welcome}>
	     			Hey There! Welcome!
	 			  </Text>
          <Button onPress={Actions.home} text={i18n.home}/>
          <Button onPress={Actions.task} text={i18n.taskList}/>
          <Button onPress={Actions.approvalList} text={i18n.approvalList}/>
          <Button onPress={Actions.setting} text={i18n.setting}/>
          <Button onPress={Actions.map} text={i18n.map}/>
          <Button onPress={Actions.camera} text={i18n.camera}/>
          <Button onPress={Actions.logout} text={i18n.logout}/>

	        </View>
	    );
  }
});

const homeScreen = StyleSheet.create({
	welcome: {
		color: 'black',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		marginTop: 20
	}

});


module.exports = HomeScreen;
