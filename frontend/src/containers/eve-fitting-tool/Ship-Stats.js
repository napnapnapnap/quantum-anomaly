import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

class ShipStats extends Component {
  componentWillMount() {
    if (!this.props.efsReducer.dogmaAttributes) this.props.fetchDogma();
  }

  getSize(value, type) {
    const sizes = {
      numbered: {1: 'Small', 2: 'Medium', 3: 'Large', 4: 'Capital'}
    };
    return sizes[type][value];
  }

  getStatsObject() {
    let dogmaReverseInfo = this.props.efsReducer.dogmaReverseInfo;
    if (this.props.ship && dogmaReverseInfo) {
      let shipDogmaAttributes = this.props.ship.dogma_attributes;
      return {
        turretHardpoints:   shipDogmaAttributes[dogmaReverseInfo['Turret Hardpoints']],
        launcherHardpoints: shipDogmaAttributes[dogmaReverseInfo['Launcher Hardpoints']],
        cpuOutput:          shipDogmaAttributes[dogmaReverseInfo['CPU Output']],
        powergridOutput:    shipDogmaAttributes[dogmaReverseInfo['Powergrid Output']],
        droneBandwidth:     shipDogmaAttributes[dogmaReverseInfo['Drone Bandwidth']],
        droneCapacity:      shipDogmaAttributes[dogmaReverseInfo['Drone Capacity']],
        rigSize:            this.getSize(shipDogmaAttributes[dogmaReverseInfo['Rig Size']], 'numbered'),
        rigSlots:           shipDogmaAttributes[dogmaReverseInfo['Rig Slots']],
        rigCalibration:     shipDogmaAttributes[dogmaReverseInfo['Calibration']],
        rigCalibrationUsed: 0,
        cpuUsed:            0,
        pgUsed:             0,
      };
    } else return {};
  }

  renderVisualBar(used, available, postLabel) {
    return (
      <div className="ship-stats__visual">
        {(used || 0).toLocaleString('de-DE')} / {(available || 0).toLocaleString('de-DE')} {postLabel ? `[${postLabel}]` : ''}
        <span className="ship-stats__bar">
                <span className={(used || 1) / available >= 1 ? "ship-stats__bar-used ship-stats__bar-used--over" : "ship-stats__bar-used"}
                      style={{width: (used || 1) / available * 100 + '%'}}>
                </span>
              </span>
      </div>
    );
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
          <li className="ship-stats__item" title="Rig hardpoints">
            <img className="ship-stats__image" src={`/images/eve/icons/rigSize.png`} alt='Rigs' />{attributes.rigSlots || 0}
          </li>
        </ul>
        <ul className="ship-stats__fitting">
          <li className="ship-stats__item" title="Cpu Output">
            <img className="ship-stats__image" src={`/images/eve/icons/cpuOutput.png`} alt='Cpu Output' />
            {this.renderVisualBar(attributes.cpuUsed, attributes.cpuOutput)}
          </li>
          <li className="ship-stats__item" title="Powergrid Output">
            <img className="ship-stats__image" src={`/images/eve/icons/powergridOutput.png`} alt='Powergrid Output' />
            {this.renderVisualBar(attributes.pgUsed, attributes.powergridOutput)}
          </li>
          <li className="ship-stats__item" title="Rigs">
            <img className="ship-stats__image" src={`/images/eve/icons/rigCalibration.png`} alt='Rig Calibration' />
            {this.renderVisualBar(attributes.rigCalibrationUsed, attributes.rigCalibration, attributes.rigSize)}
          </li>
        </ul>
      </div>
    );
  }

  render() {
    const stats = this.getStatsObject();
    return (
      <section className='ship-stats'>
        <h5>Stats - Experimental</h5>
        {this.renderGeneralInfo(stats)}
      </section>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(ShipStats);
