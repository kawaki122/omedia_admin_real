
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootreducer from './rootReducer';


const initialstate={};

const middleware = [thunk];

const store = createStore(rootreducer,undefined, composeWithDevTools(applyMiddleware(...middleware)))

export default store;