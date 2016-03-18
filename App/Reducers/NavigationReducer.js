'use-strict'

var Actions = require('react-native-router-flux').Actions;
var Fabric = require('react-native-fabric');
var { Answers } = Fabric;

const initialState =
  {
    pageTitle: null,
    pageId: null,
    stackSize: null,
  };


function navigationReducer(state = initialState, action) {
      //console.log("STATE:", action.type, state);
      Answers.logCustom('ReducerAction', {action: action.type });

      //console.log("Navigate:", action);
      console.log("Navigate:", action.type, action.name);

      switch (action.type) {
          case Actions.BEFORE_ROUTE:
            state.pageId = action.route.name;
            state.pageTitle = action.route.title;

            state = {
              pageId: action.route.name,
              pageTitle: action.route.title,
              stackSize: action.route.parent.stack.length,
            };
              //state = action.route;

            return state;
          case Actions.AFTER_ROUTE:
            state = {
              pageId: action.route.name,
              pageTitle: action.route.title,
              stackSize: action.route.parent.stack.length,
            };
            console.log("Updating CurrentRoute", state);

            return state;
          case Actions.AFTER_POP:
            state = {
              pageId: action.route.name,
              pageTitle: action.route.title,
              stackSize: action.route.parent.stack.length,
            };
            console.log("Updating CurrentRoute", state);

            return state;
          case Actions.BEFORE_POP:
            return state;
          case Actions.AFTER_DISMISS:
            return state;
          case Actions.BEFORE_DISMISS:
            return state;

          default:
            return state;
      }
}

module.exports = navigationReducer;
