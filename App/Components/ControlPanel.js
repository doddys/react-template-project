'use strict';

var React = require('react-native')
var {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} = React

var Icon = require('react-native-vector-icons/FontAwesome');
var Actions = require('react-native-router-flux').Actions;

var styles = require('../Styles/style');
var i18n = require('../i18n.js');

import { connect } from 'react-redux';


var ControlPanel = React.createClass({
    contextTypes: {
       drawer: React.PropTypes.object.isRequired,
    },

    _selectMenu(selectedAction){
      var {drawer} = this.context;
      // route to page
      //this.props.close();
      drawer.close();
      selectedAction();
      // close drawer
    },


    render(){
        var {drawer} = this.context;

        return (
            <View style={localStyles.container}>
              <View style={localStyles.header}>
                <Icon style={localStyles.icon} name="user" size={30} />
                <Text style={localStyles.headerText} >{this.props.currentUser}</Text>
              </View>
              <View style={localStyles.menuList}>
                <TouchableHighlight
                      style={localStyles.menu}
                      underlayColor="rgba(50, 105, 69, 0.4)"
                      onPress={() => this._selectMenu(Actions.home)}>
                      <View style={localStyles.row}>
                        <Icon style={localStyles.icon} name="home" size={25} />
                        <Text style={localStyles.text}> {i18n.home} </Text>
                      </View>
                </TouchableHighlight>
                <TouchableHighlight
                      style={localStyles.menu}
                      underlayColor="rgba(50, 105, 69, 0.4)"
                      onPress={() => this._selectMenu(Actions.task)}>
                      <View style={localStyles.row}>
                        <Icon style={localStyles.icon} name="tasks" size={25} />
                        <Text style={localStyles.text}> {i18n.taskList} </Text>
                      </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={localStyles.menu}
                    underlayColor="rgba(50, 105, 69, 0.4)"
                    onPress={() => this._selectMenu(Actions.approvalList)}>
                    <View style={localStyles.row}>
                      <Icon style={localStyles.icon} name="check" size={25} />
                      <Text style={localStyles.text}> {i18n.approvalList} </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    style={localStyles.menu}
                    underlayColor="rgba(50, 105, 69, 0.4)"
                    onPress={() => this._selectMenu(Actions.setting)}>
                    <View style={localStyles.row}>
                      <Icon style={localStyles.icon} name="sliders" size={25} />
                      <Text style={localStyles.text}> {i18n.setting} </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                   style={localStyles.menu}
                   underlayColor="rgba(50, 105, 69, 0.4)"
                   onPress={() => this._selectMenu(Actions.map)}>
                   <View style={localStyles.row}>
                     <Icon style={localStyles.icon} name="map" size={25} />
                     <Text style={localStyles.text}> {i18n.map} </Text>
                   </View>
                 </TouchableHighlight>
                 <TouchableHighlight
                    style={localStyles.menu}
                    underlayColor="rgba(50, 105, 69, 0.4)"
                    onPress={() => this._selectMenu(Actions.camera)}>
                    <View style={localStyles.row}>
                      <Icon style={localStyles.icon} name="camera" size={25} />
                      <Text style={localStyles.text}> {i18n.camera} </Text>
                    </View>
                 </TouchableHighlight>
                 <TouchableHighlight
                     style={localStyles.menu}
                     underlayColor="rgba(50, 105, 69, 0.4)"
                     onPress={Actions.logout}>
                     <View style={localStyles.row}>
                       <Icon style={localStyles.icon} name="unlock" size={25} />
                       <Text style={localStyles.text}> {i18n.logout} </Text>
                     </View>
                </TouchableHighlight>
              </View>
            </View>
        )
    }
})

var localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#78B8DF',
    height: 240,
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 30,
    color: '#fff'
  },
  menuList: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  menu: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 55,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#0f0f0f',
  },
  icon: {
    textAlign: 'center',
    marginRight: 10,
    width: 25,
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: '#0f0F0f'
  },
});

// var mapStateToProps = function(state) {
//   //console.log("Mapping Current User", state);
//   //var curState = state.toJS();
//   return {
//     currentUser: state.get('currentUser'),//state.currentUser,
//     //currentUser: state.currentUser,
//   };
//
// };
//
// var mapDispatchToProps = function (dispatch) {
//   return {
//   };
//
// };

//module.exports = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
module.exports = ControlPanel;
