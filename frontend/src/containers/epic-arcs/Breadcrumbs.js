import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Breadcrumbs extends Component {
  render() {
    const {type, location} = this.props;

    return (
      <nav className="breadcrumbs">
        {type === 'index' && <span className="breadcrumbs__item">Epic Arcs</span>}
        {type === 'epic-arc' && <React.Fragment>
          <Link to='/epic-arcs' className="breadcrumbs__item breadcrumbs__item--link">
            Epic Arcs
          </Link>
          <span className="breadcrumbs__item">{location}</span>
        </React.Fragment>
        }
      </nav>
    );
  }
}
