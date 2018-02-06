import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


export class CategoriesFilter extends PureComponent {
  static propTypes = {
    setActiveFilter: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
  };

  state = {
    activeFilter: 0
  };

  componentDidUpdate = (props, { activeFilter }) => {
    if (this.state.activeFilter !== activeFilter) {
      this.props.setActiveFilter(this.state.activeFilter);
    }
  };

  setActiveFilter = (id) => this.setState({ activeFilter: id });

  clearFilter = () => this.setState({ activeFilter: 0 });

  render() {
    const filterItemClassNames = (id) =>
      classnames('categories-filter__item-name', { 'categories-filter__item-name--active': this.state.activeFilter === id });
    const filterAllClassNames =
      classnames('categories-filter__item-name', { 'categories-filter__item-name--active': !this.state.activeFilter } );

    return (
      <div className="categories-filter">
        <div className="categories-filter__item" onClick={() => this.clearFilter()}>
          <div className={filterAllClassNames}>All</div>
        </div>
        {this.props.categories.map(
          (category) => (
            <div className="categories-filter__item" onClick={() => this.setActiveFilter(category.get('id'))}
                 key={category.get('id')}>
              <div className={filterItemClassNames(category.get('id'))}> {category.get('name')} </div>
            </div>
          )
        )}
      </div>
    );
  }
}
