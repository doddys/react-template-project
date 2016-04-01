'use strict';

var React = require('react-native');
var {
    View,
} = React;

var i18n = require('../i18n.js');
var styles = require('../Styles/style');
var TaskList = require('../Components/TaskList');
var MyTask = require('../Components/MyTask');
var debug = require('../debug');

import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';

var TaskScreen = React.createClass({
  render: function() {
      debug("Render Task Screen");
      return (
        <ScrollableTabView
          style={styles.container}
          renderTabBar={()=><DefaultTabBar backgroundColor='#FFFFFF' />}
        >
          <TaskList tabLabel='Available Task' />
          <MyTask tabLabel='My Task' />
        </ScrollableTabView>
      );
  }
});

module.exports = TaskScreen;
