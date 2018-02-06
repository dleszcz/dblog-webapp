import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export class Footer extends PureComponent {
  static propTypes = {
  };

  componentWillMount() {

  }

  render() {
    return (
      <div className="footer" >
        <div className="footer__content">
          <a className="footer__content-link" href="https://github.com/dleszcz/dblog" target="_blank">dblog</a> by Daniel Leszczyński
        </div>
      </div>
    );
  }
}
