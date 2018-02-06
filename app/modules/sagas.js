import { all, fork } from 'redux-saga/effects';
import postsSaga from './posts/posts.sagas';

export default function* rootSaga() {
  yield all([
    fork(postsSaga),
  ]);
}
