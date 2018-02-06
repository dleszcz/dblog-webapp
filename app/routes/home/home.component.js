import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { contains } from 'ramda';
import Transition from 'react-transition-group/Transition';

import { CategoriesFilter } from '../../components/categoriesFilter/categoriesFilter.component';


export class Home extends PureComponent {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    fetchPostsList: PropTypes.func.isRequired,
    fetchCategoriesList: PropTypes.func.isRequired,
    setActiveFilter: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    activeFilter: PropTypes.number.isRequired,
    searchPosts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchPostsList();
    this.props.fetchCategoriesList();
  }

  formatDate = (date) => moment(date).format("Do MMMM, HH:mm");

  searchInputOnKey = (event) => {
    if (event.target.value) {
      this.props.searchPosts(event.target.value);
    }
  };

  renderPost = (post) => {
    if (this.props.activeFilter === 0 || contains(this.props.activeFilter, post.get('categories').toJS())) {
      return (<div className="home__posts-item" key={post.get('id')}>
        <div className="home__posts-item-date">{this.formatDate(post.get('timestamp'))}</div>
        <Link className="home__posts-item-link" to={`/post/${post.get('id')}`}
              style={{ backgroundImage: `url(${post.get('hero')})` }}>
        </Link>
        <div className="home__posts-item-title">{post.get('title')}</div>
      </div>);
    }
    return null;
  };

  render() {
    return (
      <div className="home">
        <Helmet title="Homepage" />
        <div className="home__actions-container">
          <CategoriesFilter categories={this.props.categories} setActiveFilter={this.props.setActiveFilter} />
          <div>
            <div className="home__search">
              <input
                className="home__search-input"
                type="text"
                placeholder="Search..."
                onKeyUp={this.searchInputOnKey} />
            </div>
          </div>
        </div>
        <div className="home__posts-container">
          { !this.props.posts.size ? <span>Brak postów</span> :
            <div className="home__posts-list">
              {this.props.posts.map(
                (post) => this.renderPost(post)
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}
