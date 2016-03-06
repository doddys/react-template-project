/* @flow */
'use strict';

var React = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var styles = require('../Styles/style');
var i18n = require('../i18n.js');

var {
    Text,
    View,
    StyleSheet
} = React;

var TaskEditScreen = React.createClass({
	render: function() {
	    return (
        <View style={styles.bg}>

          <Text style={localStyles.welcome}>
            Task Edit Screen
            
          </Text>


        </View>
      );
  }
});

const localStyles = StyleSheet.create({
	welcome: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 20,
		marginTop: 20
	}

});


module.exports = TaskEditScreen;
