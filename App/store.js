import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer  from './reducers/combineReducer';
import devTools from 'remote-redux-devtools';

function configureStore(initialState) {
	const createStoreWithMiddleware = compose(applyMiddleware(thunk), devTools())(createStore);
	return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;
