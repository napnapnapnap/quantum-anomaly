import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as efsActions from '../../redux/efsActions';

import Modules from './Modules';
import Slots from './Slots';
import ShipStats from './Ship-Stats';
import {seo} from '../../helpers/seo';

class FittingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipId: this.props.match.params.shipId
    };
  }

  componentDidMount() {
    this.props.fetchShip(this.state.shipId).then(response => {
      seo({
        title:           `${response.payload.name} ${response.payload.group_name} - EVE Fitting Tool`,
        metaDescription: response.payload.description
      });
    });
  }

  render() {
    const ship  = this.props.ship || {},
          group = this.props.currentGroup || {},
          dogma = ship.dogmaAttributesNamed || {};

    return (
      <article className="fitting-main">
        <section className="fitting-main__header">
          <div className={dogma['Meta Level'] ? `fitting-main__image tech-level tech-level--${dogma['Meta Level'].value}` : 'fitting-main__image'}>
            <img src={ship.type_id ? `https://image.eveonline.com/Render/${ship.type_id}_64.png` : '/images/placeholder.png'} alt="ship" />
          </div>
          <div className="fitting-main__controls">
            <h2 className="fitting-main__title">{ship.name || 'Loading...'}</h2>
            <Link to='/eve-fitting-simulator' className='link link--secondary'>
              back to {`${group.name}s`.replace('ss', 's')}
            </Link>
          </div>
        </section>
        <section className="fitting-main__sections">
          <div className="fitting-main__modules">
            <Modules ship={this.props.ship} />
          </div>

          <div className="fitting-main__slots">
            <Slots ship={this.props.ship} />
          </div>

          <div className='fitting-main__stats'>
            <ShipStats ship={this.props.ship} />
          </div>
        </section>
      </article>
    );
  }
}

const mapStateToProps = state => state.efs,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(FittingScreen);
