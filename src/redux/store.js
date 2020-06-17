import { applyMiddleware, createStore, compose } from 'redux';
    
import loggerMiddleware from './middleware/logger';
import fileReducers from './reducers/fileReducers';


const middlewareEnhancer = applyMiddleware(loggerMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(fileReducers, undefined, composedEnhancers);

export default store;