'use strict';

var React = require('react-native');
var {
    View,
    Text,
    ListView,
    StyleSheet,
    PullToRefreshViewAndroid,
    Platform,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    InteractionManager,
    ScrollView,
} = React;

var dismissKeyboard = require('dismissKeyboard');
var Actions = require('react-native-router-flux').Actions;
var i18n = require('../i18n.js');
var styles = require('../Styles/style');
var TaskCell = require('../Components/TaskCell');
var debug = require('../debug');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { runFetchAvailTask, runMoreAvailTask } from '../Actions/TaskAction'

var ds = new ListView.DataSource(
  {
    rowHasChanged: (r1, r2) => r1 !== r2,
  }
);

var TaskList = React.createClass({

  getInitialState: function() {
    debug("Get Initial State");
    return {
      dataSource: ds.cloneWithRows(this.props.tasks.toJS()),
      isLoading: false,
    }
  },

  componentDidMount: function (){
    debug("componentDidMount .. not fetching from server");
    this.setState({isLoading: true});
    InteractionManager.runAfterInteractions(() => {
      this._reloadTask();
      this.setState({isLoading: false});
    });

  },

  componentWillReceiveProps: function (nextProps) {
    debug("Receiving new Properties with Size: " + nextProps.tasks.size);
    this.setState({
      isLoading: nextProps.isLoading,
    });

      if (this.props.tasks !== nextProps.tasks) {
        debug("Updating List with new data");
        this.setState({
          dataSource: ds.cloneWithRows(nextProps.tasks.toJS()),
        });
      } else {
        debug("New Props = Old Props");

      }
  },

  _selectTask: function(task: Object) {
    console.log("Selecting Task");
    // will dispatch action to navigate with param taskid
    if (Platform.OS === 'ios') {
    } else {
      dismissKeyboard();
    }
    Actions.taskDetail({data: task});
  },

  _hasMore: function (){
    // check if there is more data on the server
    console.log("hasMore", this.props.moreData );
    return (this.props.moreData);
  },

  _onLoadMore: function() {

    console.log("_onLoadMore");

    // if !hasMore return
    if (!this._hasMore()){
      console.log("_onLoadMore - No more data");
      return;
    }

    if (this.props.isLoading){
      console.log('_onLoadMore - Still loading data');
      return;
    }

    console.log('_onLoadMore - Getting more Data');
    this.props.runMoreAvailTask(this.props.nextPage);
  },

  _renderFooter: function() {
    console.log("_renderFooter");
    if (this._hasMore()) {
      console.log("_renderFooter - actionable text");
      return (
        <View style={[styles.bg, localStyles.centerText]}>
          <Text style={localStyles.noTasksText} onPress={this._onLoadMore} >Load More...</Text>
        </View>);
    }
  },

  _renderSeparator: function(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    var style = localStyles.rowSeparator;
    if (adjacentRowHighlighted) {
        style = [style, localStyles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
    );
  },

  _renderRow: function(
    task: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <TaskCell
        key={task.surveyId}
        onSelect={() => this._selectTask(task)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        task={task}
      />
    );
  },

  _reloadTask: function() {
    // returns a Promise of reload completion
    // for a Promise-free version see ControlledRefreshableListView below
    debug("Reloading Task...");
    this.props.runFetchAvailTask();
  },

  render: function() {
      debug("Render Task List: "+ this.props.tasks.size);

      var content = this.state.dataSource.getRowCount() === 0 ?
        <NoTask
          isLoading={this.state.isLoading}
        /> :
        <ListView
          ref="listview"
          renderSeparator={this._renderSeparator}
          dataSource={this.state.dataSource}
          renderFooter={this._renderFooter}
          renderRow={this._renderRow}
          // onEndReached={this._onEndReached}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
        />;


	    return (
        <PullToRefreshViewAndroid
          style={styles.bg}
          refreshing={this.state.isLoading}
          onRefresh={this._reloadTask}
          colors={['#ff0000', '#00ff00', '#0000ff']}
          progressBackgroundColor={'#ffff00'}>
          {content}
        </PullToRefreshViewAndroid>
	    );
  }
});

  const localStyles = StyleSheet.create({

    centerText: {
      alignItems: 'center',
    },
    noTasksText: {
      marginTop: 5,
      color: '#727182',
    },
    separator: {
      height: 1,
      backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
      marginVertical: 20,
    },
    rowSeparator: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: 1,
      marginLeft: 4,
    },
    rowSeparatorHide: {
      opacity: 0.0,
    },
    container: {
      flex: 1,
      marginTop: 30,
    },
    tabView: {
      flex: 1,
      padding: 10,
      backgroundColor: 'rgba(0,0,0,0.01)',
    },
  });

  var NoTask = React.createClass({
    render: function() {
      var text = '';
      if (!this.props.isLoading) {
        // If we're looking at the latest tasks, aren't currently loading, and
        // still have no results, show a message
        return (
          <View style={[styles.bg, localStyles.centerText]}>
            <Text style={localStyles.noTasksText}> No Task Found </Text>
          </View>

        );
      } else {
        if (Platform.OS === 'ios') {
          return <ActivityIndicatorIOS style={localStyles.scrollSpinner} />;
        } else {
          return (
            <View  style={{alignItems: 'center'}}>
              <ProgressBarAndroid styleAttr="Small"/>
            </View>
          );
        }
      }

    }
  });

  var mapStateToProps = function(state) {
    console.log("TaskList - MappingStateToProps", state);

    return {
      username: state.getIn(['currentUser','username']),
      tasks: state.getIn(['availTasks','dataSource']),
      nextPage: state.getIn(['availTasks','nextPageUrl']),
      isLoading: state.getIn(['availTasks','isLoading']),
      moreData: state.getIn(['availTasks','moreData']),
    };

  };

  var mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
      runFetchAvailTask,
      runMoreAvailTask,
  	}, dispatch);

  };

  module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskList);
