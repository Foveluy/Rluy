import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { fork, take, select, call, all, put } from 'redux-saga/effects';

class Rluy {
    constructor() {
        this.sagaMiddleware = {};
        this.appReducers = {};
        this.actionStategy = [];
        this.effects = {};
    }
    *rootWatcher() {
        while (1) {
            const { type, ...others } = yield take(this.actionStategy);
            const fn = this.effects[type];
            if (fn !== void 666) {
                yield call(fn, { fork, take, select, call, put }, others);
            }
        }
    }
    *rootSaga() {
        yield all([
            fork(this.rootWatcher.bind(this))
        ])
    }

    init() {
        this.sagaMiddleware = createSagaMiddleware(this.rootSaga);
    }
    model(Module) {
        const model = Module.default;
        const namespace = model.namespace;
        if (namespace === void 666) {
            throw new SyntaxError('模块缺少命名空间');
        }
        if (this.appReducers[namespace]) {
            throw new SyntaxError(`模块${namespace}已经存在`);
        }

        Object.keys(model.effects).forEach((key) => {
            this.actionStategy.push(key);
            this.effects[key] = model.effects[key];
        })

        const modelState = model.state || {};
        const reducer = (state = modelState, { type, payload }) => {
            const func = model.reducer[type];
            if (func) {
                return func(state, { type, payload });
            }
            return state;
        }
        this.appReducers[namespace] = reducer;
    }

    run(JsxElement, DOMNode) {
        const store = createStore(combineReducers(this.appReducers), applyMiddleware(this.sagaMiddleware))
        this.sagaMiddleware.run(this.rootSaga.bind(this));

        ReactDOM.render(
            <Provider store={store}>
                {JsxElement}
            </Provider>,
            DOMNode
        );
    }
}

export default new Rluy();