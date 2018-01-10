import { fork, take, select, call, all } from 'redux-saga/effects';
import { watcher } from './model/todolist';



export default function* rootSaga() {
    yield all([
        fork(watcher)
    ])
}
