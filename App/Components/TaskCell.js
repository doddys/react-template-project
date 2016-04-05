'use strict';

var React = require('react-native');
var {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = React;

import type { StyleObj } from 'StyleSheetTypes';
import { getImageSource, getStyleFromScore, getTextFromScore } from '../Api/Common';

var TaskCell = React.createClass({
  render: function() {
    console.log("render TaskCell", this.props.task);
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <View style={styles.card}>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.taskTitle} numberOfLines={2}>
                {this.props.task.survey.victimName}
              </Text>
              <Text style={styles.taskYear} numberOfLines={1}>
                Kode Tugas: {this.props.task.survey.surveyId}
              </Text>
              <Text style={styles.taskYear} numberOfLines={1}>
                Rumah Sakit: {this.props.task.survey.hospital.hospitalName}
              </Text>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  taskYear: {
    color: '#999999',
    fontSize: 12,
  },
  hospital: {
    color: '#F2EC3A',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
  noScore: {
    color: '#999999',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 75,
    padding: 5,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

module.exports = TaskCell;
