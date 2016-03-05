import { LOAD, SAVE } from 'redux-storage';


const initialState =
  {
    networkActivity: false,
    storageLoaded: false,
  };

function storageReducer(state = initialState , action) {
    switch (action.type) {
        case LOAD:
            state.storageLoaded = true;
            return state;

        case SAVE:
            console.log('Something has changed and written to disk!');

        default:
            return state;
    }
}

module.exports = storageReducer;
