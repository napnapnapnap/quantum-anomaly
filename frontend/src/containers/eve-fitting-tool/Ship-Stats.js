import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

class ShipStats extends Component {
  componentWillMount() {
    if (!this.props.efsReducer.dogmaAttributes) this.props.fetchDogma();
  }

  renderDogmaAttribute(current = null, attribute) {
    let dogma = this.props.efsReducer.ship.dogmaAttributesNamed,
        currentValue;

    if (!dogma[attribute]) return null;

    let attributeValue = dogma[attribute].value,
        units          = dogma[attribute].units;

    if (current) currentValue = dogma[current].value;
    if (!isNaN(currentValue)) currentValue = currentValue.toLocaleString('de-DE');
    if (!isNaN(attributeValue)) attributeValue = attributeValue.toLocaleString('de-DE');

    return (
      <div className='fitting__attribute'>
        <img className='fitting__icon' src={`/images/eve/icons/${attribute.replace(' ', '')}.png`} alt='icon' title={attribute} />
        {current ? `${currentValue} / ${attributeValue} ${units}` : `${attributeValue} ${units}`}
      </div>
    );
  }

  generalInfo() {
    let dogmaReverseInfo = this.props.efsReducer.dogmaReverseInfo;
    if (this.props.ship && dogmaReverseInfo) {
      let dogmaAttributes = this.props.ship.dogma_attributes;
      return {
        turretHardpoints:   dogmaAttributes[dogmaReverseInfo['Turret Hardpoints']],
        launcherHardpoints: dogmaAttributes[dogmaReverseInfo['Launcher Hardpoints']],
        cpuOutput:          dogmaAttributes[dogmaReverseInfo['CPU Output']].toLocaleString('de-DE'),
        powergridOutput:    dogmaAttributes[dogmaReverseInfo['Powergrid Output']].toLocaleString('de-DE'),
        droneBandwidth:     dogmaAttributes[dogmaReverseInfo['Drone Bandwidth']],
        droneCapacity:      dogmaAttributes[dogmaReverseInfo['Drone Capacity']],
        rigSize:            dogmaAttributes[dogmaReverseInfo['Rig Size']],
        rigCalibration:     dogmaAttributes[dogmaReverseInfo['Calibration']],
        cpuUsed:            500,
        pgUsed:             20,
      };
    } else return {};
  }

  renderGeneralInfo(attributes) {
    return (
      <div className="ship-stats__block ship-stats__block--split">
        <ul className="ship-stats__hardpoints">
          <li className="ship-stats__item" title="Turret hardpoints">
            <img className="ship-stats__image" src={`/images/eve/icons/turretHardpoints.png`} alt='Turrets' />{attributes.turretHardpoints || 0}
          </li>
          <li className="ship-stats__item" title="Missile hardpoints">
            <img className="ship-stats__image" src={`/images/eve/icons/launcherHardpoints.png`} alt='Missiles' />{attributes.launcherHardpoints || 0}
          </li>
        </ul>
        <ul className="ship-stats__fitting">
          <li className="ship-stats__item" title="Cpu Output">
            <img className="ship-stats__image" src={`/images/eve/icons/cpuOutput.png`} alt='Cpu Output' />
            <div className="ship-stats__visual">
              {attributes.cpuUsed || 0} / {attributes.cpuOutput || 0}
              <span className="ship-stats__bar">
                <span className={(attributes.cpuUsed || 1) / attributes.cpuOutput >= 1 ? "ship-stats__bar-used ship-stats__bar-used--over" : "ship-stats__bar-used"}
                      style={{width: (attributes.cpuUsed || 1) / attributes.cpuOutput * 100 + '%'}}>
                </span>
              </span>
            </div>
          </li>
          <li className="ship-stats__item" title="Powergrid Output">
            <img className="ship-stats__image" src={`/images/eve/icons/powergridOutput.png`} alt='Powergrid Output' />
            <div className="ship-stats__visual">
              {attributes.pgUsed || 0} / {attributes.powergridOutput || 0}
              <span className="ship-stats__bar">
                <span className={(attributes.pgUsed || 1) / attributes.powergridOutput >= 1 ? "ship-stats__bar-used ship-stats__bar-used--over" : "ship-stats__bar-used"}
                      style={{width: (attributes.pgUsed || 1) / attributes.powergridOutput * 100 + '%'}}>
                </span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <section className='ship-stats'>
        <h5>Stats - Experimental</h5>
        {this.renderGeneralInfo(this.generalInfo())}
      </section>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(ShipStats);
