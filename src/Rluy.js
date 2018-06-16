import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { fork, take, select, call, all, put, race, takeEvery, takeLatest } from 'redux-saga/effects'
import { produceNamespace } from './util'

function* puts(type, payload) {
  yield put({
    type,
    payload
  })
}

class Rluy {
  constructor() {
    this.isDebug = false
    this.routingComponent = {}
    this.sagaMiddleware = {}
    this.appReducers = {}
    this.actionStategy = []
    this.effects = {}
    this.JsxElement = {}
    this.errorFn = void 666
    this._store = null
    this.moduleFilename = {}
  }
  onError(fn) {
    this.errorFn = fn
  }

  *rootWatcher() {
    while (1) {
      const { type, ...others } = yield take(this.actionStategy)
      if (this.isDebug) {
        console.info(`[saga-action-types]:  '${type}' in file '${this.moduleFilename[type]}'`, 'payload:', others)
      }
      const fn = this.effects[type]
      if (fn !== void 666) {
        try {
          yield call(fn, { fork, take, select, call, puts, put, race, takeEvery, takeLatest }, others)
        } catch (e) {
          this.errorFn(e)
        }
      }
    }
  }
  *rootSaga() {
    yield all([fork(this.rootWatcher.bind(this))])
  }

  init() {
    this.sagaMiddleware = createSagaMiddleware(this.rootSaga)
  }
  model(Module, filename) {
    const model = Module.default
    const namespace = produceNamespace(filename)
    if (namespace === void 666) {
      throw new SyntaxError('module needs a namespace')
    }
    if (this.appReducers[namespace]) {
      throw new SyntaxError(`module for name '${namespace}' exist`)
    }

    Object.keys(model.effects).forEach(key => {
      this.actionStategy.push(key)
      this.effects[key] = model.effects[key]
      this.moduleFilename[key] = filename
    })

    const modelState = model.state || {}
    const reducer = (state = modelState, { type, payload }) => {
      const func = model.reducer[type]
      if (func) {
        return func(state, { type, payload })
      }
      return state
    }
    this.appReducers[namespace] = reducer
  }
  
  router(RouterModel) {
    const _RouterModel = RouterModel.default
    this.JsxElement = typeof _RouterModel === 'function' ? _RouterModel(this.routingComponent) : _RouterModel
  }

  run(DOMNode, isDebug) {
    if (isDebug === true) this.isDebug = true

    const store = createStore(combineReducers(this.appReducers), applyMiddleware(this.sagaMiddleware))
    this._store = store
    this.sagaMiddleware.run(this.rootSaga.bind(this))
    ReactDOM.render(<Provider store={store}>{this.JsxElement}</Provider>, DOMNode)
  }
}

export default new Rluy()
