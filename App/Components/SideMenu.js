'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('react-native-button');
var Actions = require('react-native-router-flux').Actions;


class SideMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text>Menu</Text>
           <Button onPress={Actions.home}>Home</Button>
           <Button onPress={Actions.inbox}>Inbox</Button>
             <Button onPress={Actions.logout}>Logout</Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = SideMenu;
