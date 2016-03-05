'use strict';

var React = require('react-native');
var { AppRegistry, Navigator, Component, BackAndroid, StyleSheet,Text,View, Platform } = React;
var RNRF = require('react-native-router-flux');
var {Route, Schema, Animations, Actions, TabBar} = RNRF;
var SplashScreen = require('@remobile/react-native-splashscreen');

//import RootRouter from './Components/RootRouter';

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
const paddingTop = Platform.OS === 'android' ? 0 : 8

if (Platform.OS === 'android'){
  BackAndroid.addEventListener('hardwareBackPress', () => {
    //if (_navigator && _navigator.getCurrentRoutes().length > 1) {
      Actions.pop();
      return true;
    //}
    //return false;
  });
}

export default class JasaRaharjaMobileApp extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      SplashScreen.hide();

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
            name='main'
            sceneConfig={Navigator.SceneConfigs.FloatFromRight}
            hideNavBar={hideNavBar}
          />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>

        <Route name='auth' component={LoginScreen} schema='boot' initial={true}/>
        <Route name='logout' component={LoginScreen} schema='boot'/>

          <Route name='main' title={i18n.home} hideNavBar={true} type='reset'>
            <SideDrawer>
              <Router
                sceneStyle={styles.routerScene}
                navigationBarStyle={styles.navigationBar}
                titleStyle={styles.navigationTitle}
                barButtonIconStyle={styles.barButtonIcon}
                barButtonTextStyle={styles.barButtonText}
                >
                <Route name='home' component={HomeScreen} schema='main' title={i18n.home} />
                <Route name='task' title={i18n.taskList}>
                  <Router>
                    <Route name='taskList' component={TaskListScreen} schema='main' title={i18n.taskList} />
                    <Route name='taskDetail' component={TaskDetailScreen} schema='main' title={i18n.taskDetail} />
                    <Route name='taskEdit' component={TaskEditScreen} schema='main' title={i18n.taskEdit} />
                  </Router>
                </Route>
                <Route name='approvalList' component={ApprovalListScreen}  schema='main' title={i18n.approvalList} />
                <Route name='setting' component={SettingScreen}   schema='main' title={i18n.setting} />
                <Route name='map' component={MapScreen}   schema='main' title={i18n.map} />
                <Route name='camera' component={CameraScreen} schema='main' title={i18n.camera} />
              </Router>
            </SideDrawer>
          </Route>

        </Router>
      </Provider>
    );
  }
}
