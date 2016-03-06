/* @flow */
'use strict';

var React = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var styles = require('../Styles/style');
var i18n = require('../i18n.js');

var {
    Text,
    Image,
    View,
    StyleSheet
} = React;

var ApprovalListScreen = React.createClass({
	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={localStyles.welcome}>
	     			Approval Screen
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


module.exports = ApprovalListScreen;
