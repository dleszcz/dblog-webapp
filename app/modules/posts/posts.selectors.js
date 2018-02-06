import { createSelector } from 'reselect';


const selectPostsDomain = state => state.get('posts');

export const selectPostsItems = createSelector(
  selectPostsDomain, state => state.get('list')
);

export const selectSinglePost = createSelector(
  selectPostsDomain, state => state.get('single')
);

export const selectCategories = createSelector(
  selectPostsDomain, state => state.get('categories')
);

export const selectActiveFilter = createSelector(
  selectPostsDomain, state => state.get('activeFilter')
);
