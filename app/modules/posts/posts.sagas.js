import { put, takeLatest } from 'redux-saga/effects';
import reportError from 'report-error';

import api from '../../services/api';
import { PostsTypes, PostsActions } from './posts.redux';

export function* fetchPosts() {
  try {
    const { data } = yield api.get('postings/');

    yield put(PostsActions.fetchListSuccess(data));
  } catch (e) {
    yield put(PostsActions.fetchListError(e.response ? e.response.data : e));
    yield reportError(e);
  }
}

export function* fetchPost( { id } ) {
  try {
    const { data } = yield api.get(`postings/${id}/`);

    yield put(PostsActions.fetchSingleSuccess(data));
  } catch (e) {
    yield put(PostsActions.fetchSingleError(e.response ? e.response.data : e));
    yield reportError(e);
  }
}

export function* fetchCategoriesList() {
  try {
    const { data } = yield api.get(`postings/categories/`);

    yield put(PostsActions.fetchCategoriesListSuccess(data));
  } catch (e) {
    yield put(PostsActions.fetchCategoriesListError(e.response ? e.response.data : e));
    yield reportError(e);
  }
}

export function* searchPosts( { query } ) {
  try {
    const { data } = yield api.get(`postings/?q=${query}`);

    yield put(PostsActions.searchPostsSuccess(data));
  } catch (e) {
    yield put(PostsActions.searchPostsError(e.response ? e.response.data : e));
    yield reportError(e);
  }
}

export default function* PostsSaga() {
  yield takeLatest(PostsTypes.FETCH_LIST, fetchPosts);
  yield takeLatest(PostsTypes.FETCH_SINGLE, fetchPost);
  yield takeLatest(PostsTypes.FETCH_CATEGORIES_LIST, fetchCategoriesList);
  yield takeLatest(PostsTypes.SEARCH_POSTS, searchPosts);
}
