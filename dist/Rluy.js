'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rluy = function () {
    function Rluy() {
        (0, _classCallCheck3.default)(this, Rluy);

        this.isDebug = false;
        this.routingComponent = {};
        this.sagaMiddleware = {};
        this.appReducers = {};
        this.actionStategy = [];
        this.effects = {};
        this.JsxElement = {};
        this.errorFn = void 666;
        this._store = null;
        this.moduleFilename = {};
    }

    (0, _createClass3.default)(Rluy, [{
        key: 'onError',
        value: function onError(fn) {
            this.errorFn = fn;
        }
    }, {
        key: 'rootWatcher',
        value: /*#__PURE__*/_regenerator2.default.mark(function rootWatcher() {
            var _ref, type, others, fn;

            return _regenerator2.default.wrap(function rootWatcher$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!1) {
                                _context.next = 19;
                                break;
                            }

                            _context.next = 3;
                            return (0, _effects.take)(this.actionStategy);

                        case 3:
                            _ref = _context.sent;
                            type = _ref.type;
                            others = (0, _objectWithoutProperties3.default)(_ref, ['type']);

                            if (this.isDebug) {
                                console.info('[saga-action-types]:  \'' + type + '\' in file \'' + this.moduleFilename[type] + '\'', 'payload:', others);
                            }
                            fn = this.effects[type];

                            if (!(fn !== void 666)) {
                                _context.next = 17;
                                break;
                            }

                            _context.prev = 9;
                            _context.next = 12;
                            return (0, _effects.call)(fn, { fork: _effects.fork, take: _effects.take, select: _effects.select, call: _effects.call, put: _effects.put, race: _effects.race, takeEvery: _effects.takeEvery, takeLatest: _effects.takeLatest }, others);

                        case 12:
                            _context.next = 17;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](9);

                            this.errorFn(_context.t0);

                        case 17:
                            _context.next = 0;
                            break;

                        case 19:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, rootWatcher, this, [[9, 14]]);
        })
    }, {
        key: 'rootSaga',
        value: /*#__PURE__*/_regenerator2.default.mark(function rootSaga() {
            return _regenerator2.default.wrap(function rootSaga$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.all)([(0, _effects.fork)(this.rootWatcher.bind(this))]);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, rootSaga, this);
        })
    }, {
        key: 'init',
        value: function init() {
            this.sagaMiddleware = (0, _reduxSaga2.default)(this.rootSaga);
        }
    }, {
        key: 'model',
        value: function model(Module, filename) {
            var _this = this;

            var model = Module.default;
            var namespace = filename.replace('.js', '');
            if (namespace === void 666) {
                throw new SyntaxError('module needs a namespace');
            }
            if (this.appReducers[namespace]) {
                throw new SyntaxError('module for name \'' + namespace + '\' exist');
            }

            (0, _keys2.default)(model.effects).forEach(function (key) {
                _this.actionStategy.push(key);
                _this.effects[key] = model.effects[key];
                _this.moduleFilename[key] = filename;
            });

            var modelState = model.state || {};
            var reducer = function reducer() {
                var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : modelState;
                var _ref2 = arguments[1];
                var type = _ref2.type,
                    payload = _ref2.payload;

                var func = model.reducer[type];
                if (func) {
                    return func(state, { type: type, payload: payload });
                }
                return state;
            };
            this.appReducers[namespace] = reducer;
        }
    }, {
        key: 'injectRun',
        value: function injectRun(JsxElement) {
            var store = (0, _redux.createStore)((0, _redux.combineReducers)(this.appReducers), (0, _redux.applyMiddleware)(this.sagaMiddleware));
            this.sagaMiddleware.run(this.rootSaga.bind(this));

            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                JsxElement
            );
        }
    }, {
        key: 'router',
        value: function router(RouterModel) {
            var _RouterModel = RouterModel.default;
            this.JsxElement = typeof _RouterModel === 'function' ? _RouterModel(this.routingComponent) : _RouterModel;
        }
    }, {
        key: 'run',
        value: function run(DOMNode, isDebug) {
            if (isDebug === true) this.isDebug = true;

            var store = (0, _redux.createStore)((0, _redux.combineReducers)(this.appReducers), (0, _redux.applyMiddleware)(this.sagaMiddleware));
            this._store = store;
            this.sagaMiddleware.run(this.rootSaga.bind(this));
            _reactDom2.default.render(_react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                this.JsxElement
            ), DOMNode);
        }
    }]);
    return Rluy;
}();

exports.default = new Rluy();