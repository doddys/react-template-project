/* @flow */
'use strict';

var React = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var i18n = require('../i18n.js');
var styles = require('../Styles/style');

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
	     		<Text style={localStyles.welcome}>
	     			Setting Screen
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


module.exports = SettingScreen;
