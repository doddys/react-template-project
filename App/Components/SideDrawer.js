'use strict';

var React = require('react-native');
var Drawer = require('react-native-drawer');
var ControlPanel = require('./ControlPanel.js');
var ControlPanel = require('./ControlPanel.js');
var ToolbarAndroid = require('ToolbarAndroid');
var { Platform } = React;

var Actions = require('react-native-router-flux').Actions;
import { connect } from 'react-redux';

var toolbarMenu = [
    {title: 'Menu', icon: require('image!ic_menu_white_36dp'), show: 'always'}
];

var SideDrawer = React.createClass({
  closeControlPanel: function(){
      this.refs.drawer.close();
  },

  openControlPanel: function(){
      this.refs.drawer.open();
  },

  componentDidMount: function(){
     //console.log("PROPS:", this.props);
  },
  componentWillUnmount: function(){

  },

  renderBackIcon: function(routeId){
    console.log("PROPS:", this.props);
    if (routeId === "taskDetail") {
      return { uri: 'ic_chevron_left_white_36dp'};
    } else {
      return undefined;
    }

  },


  render: function() {
    console.log("SideDrawer" , this.props);
    var toolbar = Platform.OS === 'android' ?
      <ToolbarAndroid
       actions={toolbarMenu}
       navIcon={this.renderBackIcon(this.props.pageId)}
       onActionSelected={this.openControlPanel}
       onIconClicked={Actions.pop}
       style={drawerStyles.toolbar}
       //actions = {[
       //  {title: "Menu", show: "never"}
       //]}
       //subtitle={this.state.actionText}
       title={this.props.pageTitle}
       titleColor="white"/> : undefined;

    return (
      <Drawer
         ref="drawer"
         type="overlay"
//         openDrawerOffset={0.2}
         openDrawerOffset={50}
         tapToClose={true}
//         panCloseMask={0.2}
         panCloseMask={1}
//         closeDrawerOffset={3}
         styles={drawerStyles}
         content={ <ControlPanel currentUser={this.props.currentUser} pageId={this.props.pageId} close={ this.closeControlPanel }/> }
         tweenHandler={(ratio) => {
             return {
                 drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
                 main: { opacity:(2-ratio)/2 },
             }
         }}
         >
        {toolbar}
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    );
  }
});


var drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 0,
    backgroundColor: '#FFFFFF'
  },
  main: {
    paddingLeft: 0
  },
  toolbar: {
    height: 55,
    backgroundColor: '#2880BE'
  },

}

// openDrawerOffset={50}
// tapToClose={true}
// panCloseMask={1}
//closeDrawerOffset={5}

var mapStateToProps = function(state) {
  //console.log("Mapping Page Title", state.toJS());
  //var curState = state.toJS();
  return {
    //pageTitle: state.currentRoute.title,
    // ROUTE IS NOT IMMUTABLE
    pageTitle: state.get('currentRoute').title,
    pageId: state.get('currentRoute').name,
    currentUser: state.getIn(['currentUser','username']),
  };

};

var mapDispatchToProps = function (dispatch) {
  return {
  };

};

module.exports = connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
