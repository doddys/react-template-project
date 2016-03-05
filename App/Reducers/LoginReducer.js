'use-strict'

import Immutable from 'immutable';
import { AUTH_SET_TOKEN, AUTH_SET_INFO, AUTH_REMOVE_TOKEN } from '../Actions/ActionTypes';

var { Map, List, fromJS } = Immutable;
var Actions = require('react-native-router-flux').Actions;

const initialState = Immutable.fromJS(
  {
    username: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
  },
);

function loginReducer(state = initialState, action) {
      switch (action.type){
        case AUTH_SET_TOKEN:
          console.log("Action:", action);
          state = state.set('accessToken', action.token.access_token);
          state = state.set('refreshToken', action.token.refresh_token);
          state = state.set('expiresIn', action.token.expires_in);
          state = state.set('username', action.username);
      }

      return state;
}

module.exports = loginReducer;
