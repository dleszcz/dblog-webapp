import { createActions, createReducer } from 'reduxsauce';
import { Record, List, fromJS, Map } from 'immutable';

export const { Types: PostsTypes, Creators: PostsActions } = createActions({
  fetchList: [],
  fetchListSuccess: ['data'],
  fetchListError: ['payload'],
  fetchSingle: ['id'],
  fetchSingleSuccess: ['data'],
  fetchSingleError: ['payload'],
  fetchCategoriesList: [],
  fetchCategoriesListSuccess: ['data'],
  fetchCategoriesListError: ['payload'],
  setActiveFilter: ['categoryId'],
  searchPosts: ['query'],
  searchPostsSuccess: ['data'],
  searchPostsError: ['payload'],
}, { prefix: 'POSTS_' });

const PostsRecord = new Record({
  list: List(),
  categories: List(),
  single: Map(),
  activeFilter: 0,
});

export const INITIAL_STATE = new PostsRecord({});

const getListSuccessHandler = (state = INITIAL_STATE, action) => state.set('list', fromJS(action.data));
const getSingleSuccessHandler = (state = INITIAL_STATE, action) => state.set('single', fromJS(action.data));
const getCategoriesListSuccessHandler = (state = INITIAL_STATE, action) => state.set('categories', fromJS(action.data));
const setActiveFilterHandler = (state = INITIAL_STATE, action) => state.set('activeFilter', fromJS(action.categoryId));
const searchPostsSuccessHandler = (state = INITIAL_STATE, action) => state.set('list', fromJS(action.data));

export const reducer = createReducer(INITIAL_STATE, {
  [PostsTypes.FETCH_LIST_SUCCESS]: getListSuccessHandler,
  [PostsTypes.FETCH_SINGLE_SUCCESS]: getSingleSuccessHandler,
  [PostsTypes.FETCH_CATEGORIES_LIST_SUCCESS]: getCategoriesListSuccessHandler,
  [PostsTypes.SET_ACTIVE_FILTER]: setActiveFilterHandler,
  [PostsTypes.SEARCH_POSTS_SUCCESS]: searchPostsSuccessHandler,
});
