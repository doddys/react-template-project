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
import { runSearchTasks, moreTasks, SEARCH_AVAIL_TASK_TYPE } from '../Actions/TaskSearchAction'

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
      this.setState({isLoading: false});
    });
    // only trigger server fetch on pulldown
    // this.props.runSearchTasks();

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
    console.log("hasMore", this.props.tasks.moreData );
    return (this.props.tasks.moreData);
  },

  _onEndReached: function() {
    // if !hasMore return
    if (!this._hasMore()){
      console.log("onEndReach");
      return;
    }

    if (this.props.isLoadingTail || this.props.isLoading){
      console.log('still loading data');
      return;
    }

    console.log('Getting more Data');
    this.props.moreTasks(this.props.username, this.props.nextPageNumber);


    // if isLoading return
    // else fetch more data
  },

  _renderFooter: function() {
    if (!this._hasMore() || !this.props.isLoadingTail) {
      return <View style={localStyles.scrollSpinner} />;
    }
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={localStyles.scrollSpinner} />;
    } else {
      return (
        <View  style={{alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
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
        key={task.id}
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
    this.props.runSearchTasks(SEARCH_AVAIL_TASK_TYPE, this.props.accessToken);
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
          onEndReached={this._onEndReached}
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
    noMoviesText: {
      marginTop: 80,
      color: '#888888',
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
      accessToken: state.getIn(['currentUser','accessToken']),
      tasks: state.getIn(['tasks','availTask']),
      isLoading: state.getIn(['tasks','isLoading']),
      isLoadingTail: state.getIn(['tasks','isLoadingTail']),
      moreData: state.getIn(['tasks','moreData']),
    };

  };

  var mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
  	  runSearchTasks,
      moreTasks,
  	}, dispatch);

  };

  module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskList);
