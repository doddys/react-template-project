/* @flow */
'use strict';

var React = require('react-native');
var {
    Text,
    Image,
    View,
    StyleSheet,
    ScrollView
} = React;

var Actions = require('react-native-router-flux').Actions;
var Button = require('react-native-button');
var i18n = require('../i18n.js');
var styles = require('../Styles/style');

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

import Dimensions from 'Dimensions';
var {height, width} = Dimensions.get('window');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { acceptTask, editTask } from '../Actions/TaskAction'
import { getImageSource, getStyleFromScore, getTextFromScore } from '../Api/Common';


var TaskDetailScreen = React.createClass({

  componentDidMount: function() {
    console.log("Viewing Detail Page", this.props.data);
  },

  _editTask: function() {
    var desc =this.refs.form.getValue();
    console.log("Editing Task...", desc);
    this.props.editTask(this.props.data, desc);
    Actions.home;
  },

  _acceptTask: function() {
    console.log("Accepting Task", this.props.data);
    this.props.acceptTask(this.props.accessToken, this.props.data);
    Actions.task();
  },

	render: function() {
    let options = {
      fields: {
        synopsis: {
          label: 'Penjelasan',
          multiline: true,
          numberOfLines: 20,
          // textAlignVertical: true,
          editable: true
        }
      }
    };

    var defValue = {
      description: this.props.data.synopsis
    };
    let taskForm = t.struct({
      synopsis: t.String
    });

	    return (
        <ScrollView contentContainerStyle={localStyles.contentContainer}>
          <View style={localStyles.mainSection}>
            <Text style={localStyles.taskTitle}>{this.props.data.victimName}</Text>
            <View style={localStyles.separator} />
            <View style={localStyles.actionButton}>
              <Button
                onPress={this._acceptTask}
                style={styles.buttonText}
                containerStyle={styles.buttonRounded,localStyles.buttonRounded}>
                {i18n.accept}
              </Button>
            </View>
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
    buttonRounded: {
      backgroundColor: '#05A5D1',
  	  padding: 10,
  	  borderColor: '#05A5D1',
  	  borderWidth:0,
  	  borderBottomColor: '#05A5D1',
  	  alignSelf: 'center',
  		borderRadius: 10,
  		width: 150,
  		marginTop: 8,
    }
  });

  var mapStateToProps = function(state) {
    console.log("MappingStateToProps");
    return {
      accessToken: state.getIn(['currentUser','accessToken']),
    };

  };

  var mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
  	  acceptTask,
      editTask,
  	}, dispatch);

  };

module.exports = connect(mapStateToProps, mapDispatchToProps)(TaskDetailScreen);
