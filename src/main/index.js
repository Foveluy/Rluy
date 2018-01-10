import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import Todolist from './views/todolist';


const testReducer = (state = {}, action) => {
    return state
}

const appReducers = combineReducers({
    test: testReducer
})


const sagaMiddleware = createSagaMiddleware(rootSaga);
const store = createStore(appReducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Todolist />
    </Provider>,
    document.getElementById('root')
);
