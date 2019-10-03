import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

class Slots extends Component {
  componentDidMount() {
    if (!this.props.dogmaAttributes) this.props.fetchDogma();
  }

  renderSlots(type) {
    let slots            = [],
        dogmaReverseInfo = this.props.dogmaReverseInfo;

    if (this.props.ship && dogmaReverseInfo) {
      for (let index = 0; index < this.props.ship.dogma_attributes[dogmaReverseInfo[type]]; index++) {
        slots.push('Empty Slot');
      }
    }

    return (
      <React.Fragment>
        <h5>{type}</h5>
        <ul className="slots__items">
          {slots.length === 0 ? <LoadingScreen /> : slots.map((slot, index) =>
            <li className="slots__item" key={index}>
              {slot}
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }

  render() {
    return (
      <section className='slots'>
        {this.renderSlots('High Slots')}
        {this.renderSlots('Medium Slots')}
        {this.renderSlots('Low Slots')}
        {this.renderSlots('Rig Slots')}
      </section>
    );
  }
}

const mapStateToProps = state => state.efs,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Slots);
