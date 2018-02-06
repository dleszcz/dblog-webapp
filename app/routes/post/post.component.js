import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export class Post extends PureComponent {
  static propTypes = {
    fetchSinglePost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.fetchSinglePost(this.props.match.params.id);
  }

  formatDate = (date) => moment(date).format('LLLL');

  render() {
    return (
      <div className="post">
        <div className="post__hero" style={{ backgroundImage: `url(${this.props.post.get('hero')})` }}>
          <div className="post__hero-title">
            {this.props.post.get('title')}
          </div>
          <div className="post__hero-date">
            { this.formatDate(this.props.post.get('timestamp')) }
          </div>
        </div>

        <div className="post__content-wrapper">
          <div className="post__lead">
            {this.props.post.get('lead')}
          </div>

          <div className="post__content" dangerouslySetInnerHTML={{ __html: this.props.post.get('content') }} >
          </div>
        </div>
      </div>
    );
  }
}
