import { combineReducers } from 'redux';

import { ADD_FILE } from './actions/fileActions';

const files = (state=[], action) => {
    switch(action.type) {
        case ADD_FILE:
            return [
                ...state,
                {
                    file: action.file, 
                    uploaded: true
                }
            ];
        default: 
            return state;
    }
}

const fileReducers = combineReducers({
    files
});

export default fileReducers;