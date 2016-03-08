'use strict';

var React = require('react-native');
var { AppRegistry, Navigator, Component, BackAndroid, StyleSheet,Text,View, Platform } = React;
var RNRF = require('react-native-router-flux');
var {Route, Schema, Animations, Actions, TabBar} = RNRF;
var SplashScreen = require('@remobile/react-native-splashscreen');
var PushNotification = require('react-native-push-notification');

// Local Dependency
var SideDrawer = require('./Components/SideDrawer');
var styles = require('./Styles/style');
var Error = require('./Components/Error');

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
var i18n = require('./i18n.js');
var store = require('./Stores/AppStore');

console.log("Language", i18n.getLanguage() );
console.log("Setting language to id", i18n.setLanguage('id'));
console.log('Dev Mode', __DEV__);

import { Provider, connect } from 'react-redux';
const Router = connect()(RNRF.Router);

const hideNavBar = Platform.OS === 'android'
const paddingTop = Platform.OS === 'android' ? {paddingTop: 0} : {paddingTop : Navigator.NavigationBar.Styles.General.NavBarHeight};

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
          store.dispatch(
            {type: REGISTRATION_SET_TOKEN,
            token
          });
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
          store.dispatch(
            {type: REGISTRATION_SET_TOKEN,
            token
          });
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
    if (Platform.OS === 'android') {
      SplashScreen.hide();

      // temporary until ios version is implemented
      PushNotification.configure(pushOption);
    }


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
            name='main2'
            sceneConfig={Navigator.SceneConfigs.FloatFromRight}
            hideNavBar={hideNavBar}
          />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

        <Route name='auth' component={LoginScreen} schema='boot' initial={true}/>
        <Route name='logout' component={LoginScreen} schema='boot'/>

        <Route name='main' title={i18n.home} hideNavBar={false} type='reset'>
            <SideDrawer>
              <Router hideNavBar={false}
                sceneStyle={styles.routerScene, paddingTop}
                navigationBarStyle={styles.navigationBar}
                titleStyle={styles.navigationTitle}
                barButtonIconStyle={styles.barButtonIcon}
                barButtonTextStyle={styles.barButtonText}
                >
                <Route name='home' component={HomeScreen} type='transitionToTop' schema='main2' title={i18n.home} />
                <Route name='task' type='transitionToTop' title={i18n.taskList} hideNavBar={true}>
                  <Router>
                    <Route name='taskList' component={TaskListScreen} schema='main2' title={i18n.taskList} />
                    <Route name='taskDetail' component={TaskDetailScreen} schema='main2' title={i18n.taskDetail} />
                    <Route name='taskEdit' component={TaskEditScreen} schema='main2' title={i18n.taskEdit} />
                  </Router>
                </Route>
                <Route name='approvalList' component={ApprovalListScreen} type='transitionToTop' schema='main2' title={i18n.approvalList} />
                <Route name='setting' component={SettingScreen} type='transitionToTop'  schema='main2' title={i18n.setting} />
                <Route name='map' component={MapScreen} type='transitionToTop'  schema='main2' title={i18n.map} />
                <Route name='camera' component={CameraScreen} type='transitionToTop' schema='main2' title={i18n.camera} />
              </Router>
            </SideDrawer>
        </Route>

        </Router>
      </Provider>
    );
  }
}
