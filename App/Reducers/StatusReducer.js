import { LOAD, SAVE } from 'redux-storage';
import { STATUS_NETWORK_UPDATE } from '../Actions/ActionTypes';


const initialState =
  {
    networkActivity: false,
    storageLoaded: false,
    networkStatus: false,
  };

function statusReducer(state = initialState , action) {
    switch (action.type) {
        case LOAD:
            state = state.set('storageLoaded', true);
            return state;

        case SAVE:
            console.log('Something has changed and written to disk!');
            return state;

        case STATUS_NETWORK_UPDATE:
            console.log("Updating network Status", action.name);
            state = state.set('networkStatus', action.isConnected);
            return state;

        default:
            return state;
    }
}

module.exports = statusReducer;
