import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Home } from './home.component';
import { PostsActions } from '../../modules/posts/posts.redux';
import { selectPostsItems, selectCategories, selectActiveFilter } from '../../modules/posts/posts.selectors';

const mapStateToProps = createStructuredSelector({
  posts: selectPostsItems,
  categories: selectCategories,
  activeFilter: selectActiveFilter,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchPostsList: PostsActions.fetchList,
  fetchCategoriesList: PostsActions.fetchCategoriesList,
  setActiveFilter: PostsActions.setActiveFilter,
  searchPosts: PostsActions.searchPosts,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
