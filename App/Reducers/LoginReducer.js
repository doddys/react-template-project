'use-strict'

import Immutable from 'immutable';
import { AUTH_SET_TOKEN, AUTH_LOGIN_ERROR, AUTH_SET_INFO, AUTH_REMOVE_TOKEN, REGISTRATION_SET_TOKEN } from '../Actions/ActionTypes';
var Fabric = require('react-native-fabric');
var { Crashlytics } = Fabric;


var { Map, List, fromJS } = Immutable;
var Actions = require('react-native-router-flux').Actions;

const initialState = Immutable.fromJS(
  {
    username: null,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    pushToken: null,
    pushTokenOS: null,
    error: null,
    isLoading: false,
  },
);

function loginReducer(state = initialState, action) {
      switch (action.type){
        case AUTH_SET_INFO:
          state = state.set('isLoading', true);
        break;

        case AUTH_SET_TOKEN:
          state = state.set('accessToken', action.token.access_token);
          state = state.set('refreshToken', action.token.refresh_token);
          state = state.set('expiresIn', action.token.expires_in);
          state = state.set('username', action.username);
          state = state.set('error', null);
          state = state.set('isLoading', false);
          Crashlytics.setUserName(action.username);
          //Crashlytics.setUserIdentifier('1234');
          Crashlytics.setString('organization', 'Jasa Raharja');
        break;

        case REGISTRATION_SET_TOKEN:
          state = state.set('pushToken', action.token.token);
          state = state.set('pushTokenOS', action.token.os);
        break;

        case AUTH_REMOVE_TOKEN:
          console.log("Removing Token");
          state = state.set('accessToken', null);
          state = state.set('refreshToken', null);
          state = state.set('username', null);
          state = state.set('expiresIn', null);
          state = state.set('error', null);

        break;

        case AUTH_LOGIN_ERROR:
          state = state.set('error', action.error);
          state = state.set('isLoading', false);
        break;
      }

    return state;

}

module.exports = loginReducer;
