import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Post } from './post.component';
import { PostsActions } from '../../modules/posts/posts.redux';
import { selectSinglePost } from '../../modules/posts/posts.selectors';

const mapStateToProps = createStructuredSelector({
  post: selectSinglePost,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchSinglePost: PostsActions.fetchSingle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Post);
