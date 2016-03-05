/* @flow */
'use strict';

var React = require('react-native');
var styles = require('../Styles/style');
var ButtonRounded = require('../Components/ButtonRounded');
var Actions = require('react-native-router-flux').Actions;

var {
    Text,
    Image,
    View,
    StyleSheet,
    ScrollView
} = React;

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { acceptTask, rejectTask } from '../Actions/TaskAction'
import { getImageSource, getStyleFromScore, getTextFromScore } from '../Api/Common';


var TaskDetailScreen = React.createClass({

  componentDidMount: function() {
    console.log("Viewing Detail Page");
    console.log("DETAIL:", this.props.data);
  },

	render: function() {
	    return (
        <ScrollView contentContainerStyle={localStyles.contentContainer}>
          <View style={localStyles.mainSection}>
            {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
              * omit a property or set it to undefined if it's inside a shape,
              * even if it isn't required */}
            <Image
              source={getImageSource(this.props.data, 'det')}
              style={localStyles.detailsImage}
            />
            <View style={localStyles.rightPane}>
              <Text style={localStyles.taskTitle}>{this.props.data.title}</Text>
              <Text>{this.props.data.year}</Text>
              <View style={localStyles.mpaaWrapper}>
                <Text style={localStyles.mpaaText}>
                  {this.props.data.mpaa_rating}
                </Text>
              </View>

            </View>
          </View>
          <View style={localStyles.separator} />
          <Text>
            {this.props.data.synopsis}
          </Text>
          <View style={localStyles.separator} />
          <Casualties casualties={this.props.data.abridged_cast} />

          <View style={localStyles.separator} />

          <View style={localStyles.actionButton}>
            <ButtonRounded onPress={this.props.acceptTask} text="Accept"/>
            <ButtonRounded onPress={this.props.rejectTask} text="Reject"/>
          </View>

        </ScrollView>

	    );
  }
});


var Casualties = React.createClass({
  render: function() {
    if (!this.props.casualties) {
      return null;
    }

    return (
      <View>
        <Text style={localStyles.casualtyTitle}>Casualties</Text>
        {this.props.casualties.map(casualty =>
          <Text key={casualty.name} style={localStyles.casualtyName}>
            &bull; {casualty.name}
          </Text>
        )}
      </View>
    );
  },
});


var localStyles = StyleSheet.create({
    contentContainer: {
      padding: 10,
    },
    rightPane: {
      justifyContent: 'space-between',
      flex: 1,
    },
    taskTitle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
    },
    rating: {
      marginTop: 10,
    },
    ratingTitle: {
      fontSize: 14,
    },
    ratingValue: {
      fontSize: 28,
      fontWeight: '500',
    },
    mpaaWrapper: {
      alignSelf: 'flex-start',
      borderColor: 'black',
      borderWidth: 1,
      paddingHorizontal: 3,
      marginVertical: 5,
    },
    mpaaText: {
      fontFamily: 'Palatino',
      fontSize: 13,
      fontWeight: '500',
    },
    mainSection: {
      flexDirection: 'row',
    },
    detailsImage: {
      width: 134,
      height: 200,
      backgroundColor: '#eaeaea',
      marginRight: 10,
    },
    separator: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: StyleSheet.hairlineWidth,
      marginVertical: 10,
    },
    casualtyTitle: {
      fontWeight: '500',
      marginBottom: 3,
    },
    casualtyName: {
      marginLeft: 2,
    },
    actionButton: {
      flexDirection : 'row',
      justifyContent: 'space-around',
      flex: 1,
    },
  });

  var mapStateToProps = function(state) {
    console.log("MappingStateToProps");
    return {
    };

  };

  var mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
  	  acceptTask,
      rejectTask,
  	}, dispatch);

  };

module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskDetailScreen);
