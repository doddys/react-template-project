/* @flow */
'use strict';

var React = require('react-native');
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;

var i18n = require('../i18n.js');
var styles = require('../Styles/style');

var {
    Text,
    View,
    StyleSheet
} = React;

import { connect } from 'react-redux';

var HomeScreen = React.createClass({

	render: function() {

	    return (
	     	<View style={styles.bg}>
	     		<Text style={localStyles.welcome}>
	     			Hey There! Welcome, {this.props.username}
	 			  </Text>
          <Button onPress={Actions.home} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.home} </Button>
          <Button onPress={Actions.task} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.taskList} </Button>
          <Button onPress={Actions.approvalList} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.approvalList} </Button>
          <Button onPress={Actions.setting} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.setting} </Button>
          <Button onPress={Actions.map} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.map} </Button>
          <Button onPress={Actions.camera} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.camera} </Button>
          <Button onPress={Actions.logout} style={styles.buttonText} containerStyle={styles.buttonRounded}> {i18n.logout} </Button>
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
	},
  contentContainer: {
    padding: 1,
  },


});


var mapStateToProps = function(state) {
  console.log("MappingStateToProps");

  return {
    username: state.getIn(['currentUser','username']),
  };

};

var mapDispatchToProps = function (dispatch) {
  return {
  };

};

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



{/*<Button onPress={Actions.task} text={i18n.taskList}/>
<Button onPress={Actions.approvalList} text={i18n.approvalList}/>
<Button onPress={Actions.setting} text={i18n.setting}/>
<Button onPress={Actions.map} text={i18n.map}/>
<Button onPress={Actions.camera} text={i18n.camera}/>
<Button onPress={Actions.logout} text={i18n.logout}/>*/}
