'use strict';

var React = require('react-native');
var { AppRegistry, Navigator, Component, BackAndroid, StyleSheet,Text,View, Platform, NetInfo } = React;
var RNRF = require('react-native-router-flux');
var {Route, Schema, Animations, Actions, TabBar} = RNRF;
var SplashScreen = require('@remobile/react-native-splashscreen');
var PushNotification = require('react-native-push-notification');

// Local Dependency
var SideDrawer = require('./Components/SideDrawer');
var styles = require('./Styles/style');
var Error = require('./Components/Error');
var debug = require('./debug');

// Screens
var HomeScreen = require('./Screens/HomeScreen');
var LoginScreen = require('./Screens/LoginScreen');
var ApprovalListScreen = require('./Screens/ApprovalListScreen');
var TaskListScreen = require('./Screens/TaskListScreen');
var TaskDetailScreen = require('./Screens/TaskDetailScreen');
var TaskEditScreen = require('./Screens/TaskEditScreen');
var SettingScreen = require('./Screens/SettingScreen');
var MapScreen = require('./Screens/MapScreen');
var CameraScreen = require('./Screens/CameraScreen');
var ErrorPopUp = require('./Screens/ErrorPopUp');
var i18n = require('./i18n.js');
var store = require('./Stores/AppStore');

import { verifyCredential, setRegistrationToken } from './Actions/AuthAction'
import { updateNetworkStatus } from './Actions/StatusAction'

console.log("Language", i18n.getLanguage() );
console.log("Setting language to id", i18n.setLanguage('id'));
console.log('Dev Mode', __DEV__);

import { Provider, connect } from 'react-redux';
const Router = connect()(RNRF.Router);

const hideNavBar = Platform.OS === 'android'
//const paddingTop = Platform.OS === 'android' ? {paddingTop: 0} : {paddingTop : Navigator.NavigationBar.Styles.General.NavBarHeight};
const paddingTop = Platform.OS === 'android' ? 0 : 64;

import { REGISTRATION_SET_TOKEN } from './Actions/ActionTypes';
import { SENDER_ID } from './Config/Config';

var pushOption = null;

if (Platform.OS === 'android'){
  BackAndroid.addEventListener('hardwareBackPress', () => {
    //if (_navigator && _navigator.getCurrentRoutes().length > 1) {
      Actions.pop();
      return true;
    //}
    //return false;
  });

  pushOption = {
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log( 'TOKEN:', token );

          //dispatch action to set token in the current state
          store.dispatch(setRegistrationToken(token));
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },
      // ANDROID ONLY: (optional) GCM Sender ID.
      senderID: SENDER_ID,
  };


} else {
  pushOption = {
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log( 'TOKEN:', token );

          //dispatch action to set token in the current state
          store.dispatch(setRegistrationToken(token));
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      /**
        * IOS ONLY: (optional) default: true
        * - Specified if permissions will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,

  };

}


export default class JasaRaharjaMobileApp extends Component {
  componentDidMount() {
    debug ("App is Mounted");
    if (Platform.OS === 'android') {
      SplashScreen.hide();

      // temporary until ios version is implemented
      PushNotification.configure(pushOption);
    }

    NetInfo.isConnected.fetch().done((isConnected) => {
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
      store.dispatch(updateNetworkStatus(isConnected));
    });

    //listen to network status change
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  }

  componentWillUnmount() {
    debug ("App is Unmounted");
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  }

  _handleConnectionInfoChange(isConnected) {
    console.log("Connection", isConnected);
    store.dispatch(updateNetworkStatus(isConnected));
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Schema
            name='boot'
            sceneConfig={Navigator.SceneConfigs.FadeAndroid}
            hideNavBar={true}
            type='replace'
          />
          <Schema
            name='main'
            hideNavBar={hideNavBar}
          />
          <Schema
            name='sub'
            sceneConfig={Navigator.SceneConfigs.FloatFromRight}
            hideNavBar={hideNavBar}
          />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

        <Route name="error" type="modal" component={ErrorPopUp}/>
        <Route name='auth' component={LoginScreen} schema='boot' initial={true}/>
        <Route name='logout' component={LoginScreen} schema='boot'/>

        <Route name='main' title={i18n.home} hideNavBar={true} type='reset'>
            <SideDrawer>
              <Router
                sceneStyle={localStyles.routerScene}
                navigationBarStyle={localStyles.navigationBar}
                titleStyle={localStyles.navigationTitle}
                barButtonIconStyle={localStyles.barButtonIcon}
                barButtonTextStyle={localStyles.barButtonText}
                >
                <Route name='home' component={HomeScreen} type="reset" schema='main' title={i18n.home} />
                <Route name='task' component={TaskListScreen} type="reset" schema='main' title={i18n.taskList} />
                <Route name='taskDetail' component={TaskDetailScreen} schema='sub' title={i18n.taskDetail} />
                <Route name='taskEdit' component={TaskEditScreen} schema='sub' title={i18n.taskEdit} />
                <Route name='approvalList' component={ApprovalListScreen} type="reset" schema='main' title={i18n.approvalList} />
                <Route name='setting' component={SettingScreen} type="reset" schema='main' title={i18n.setting} />
                <Route name='map' component={MapScreen} type="reset" schema='main' title={i18n.map} />
                <Route name='camera' component={CameraScreen} type="reset" schema='main' title={i18n.camera} />
              </Router>
            </SideDrawer>
        </Route>

        </Router>
      </Provider>
    );
  }
}

var localStyles = StyleSheet.create({
  //Routing Styles
  routerScene: {
      paddingTop: paddingTop,
  },
  nestedRouterScene: {
      paddingTop: 100,
  },
  navigationBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5aa0cc',
    borderBottomColor: 'transparent',
    //borderBottomWidth: 64
  },
  navigationTitle: {
    color: 'white',
  },
  barButtonIcon: {

  },
  barButtonText: {

  },

});
