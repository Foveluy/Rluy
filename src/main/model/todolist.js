import { take } from 'redux-saga/effects';




export function* watcher() {
    while (1) {
        const { type, ...others } = yield take(['addHandler']);
        console.log({ type, ...others })
    }
}