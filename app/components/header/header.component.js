import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Header extends PureComponent {
  static propTypes = {
  };

  componentWillMount() {

  }

  render() {
    return (
      <div className="header">
        <div className="header__logo-container">
          <Link className="header__logo" to={'/'} />
        </div>
      </div>
    );
  }
}
