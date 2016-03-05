'use-strict'

var Actions = require('react-native-router-flux').Actions;

function navigationReducer(state = {}, action) {
      //console.log("STATE:", action.type, state);

      switch (action.type) {
          case Actions.BEFORE_ROUTE:
              console.log("Navigate:", action.type, action.name);
              state = action.route;
              return state;
          case Actions.AFTER_ROUTE:
              console.log("Navigate:", action.type, action.name);
              //console.log("AFTER_ROUTE:", action);
              return state;
          case Actions.AFTER_POP:
              console.log("Navigate:", action.type, action.name);
              state = action.route;
              return state;
          case Actions.BEFORE_POP:
              console.log("Navigate:", action.type, action.name);
              //console.log("BEFORE_POP:", action);
              return state;
          case Actions.AFTER_DISMISS:
              console.log("Navigate:", action.type, action.name);
              //console.log("AFTER_DISMISS:", action);
              return state;
          case Actions.BEFORE_DISMISS:
              console.log("Navigate:", action.type, action.name);
              //console.log("BEFORE_DISMISS:", action);
              return state;
          default:
              return state;
      }
}

module.exports = navigationReducer;


// function reducer(state = {}, action) {
//     console.log("STATE:", action.type, state.toJS());
//
//     switch (action.type) {
//         case Actions.BEFORE_ROUTE:
//             console.log("BEFORE_ROUTE:", action);
//             state = state.set('currentRoute', action.route);
//             return state;
//         case Actions.AFTER_ROUTE:
//             console.log("AFTER_ROUTE:", action);
//             return state;
//         case Actions.AFTER_POP:
//             console.log("AFTER_POP:", action);
//             state = state.set('currentRoute', action.route);
//             return state;
//         case Actions.BEFORE_POP:
//             console.log("BEFORE_POP:", action);
//             return state;
//         case Actions.AFTER_DISMISS:
//             console.log("AFTER_DISMISS:", action);
//             return state;
//         case Actions.BEFORE_DISMISS:
//             console.log("BEFORE_DISMISS:", action);
//             return state;
//         default:
//             return state;
//     }
//
// }
