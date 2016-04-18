'use-strict'

import Immutable from 'immutable';

var {
  Map,
  List,
  fromJS
} = Immutable;

const initialState = Immutable.fromJS({
  lang: 'id',
}, );

function settingReducer(state = initialState, action) {
  //console.log("Placeholder Changing Setting State");

  return state;
}

module.exports = settingReducer;
