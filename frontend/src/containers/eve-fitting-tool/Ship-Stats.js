import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

class ShipStats extends Component {
  componentWillMount() {
    if (!this.props.efsReducer.dogmaAttributes) this.props.fetchDogma();
  }

  getStatsObject() {
    let dogmaReverseInfo = this.props.efsReducer.dogmaReverseInfo;
    if (this.props.ship && dogmaReverseInfo) {
      let dogmaAttributes = this.props.ship.dogma_attributes;
      return {
        turretHardpoints:   dogmaAttributes[dogmaReverseInfo['Turret Hardpoints']],
        launcherHardpoints: dogmaAttributes[dogmaReverseInfo['Launcher Hardpoints']],
        cpuOutput:          dogmaAttributes[dogmaReverseInfo['CPU Output']],
        powergridOutput:    dogmaAttributes[dogmaReverseInfo['Powergrid Output']],
        droneBandwidth:     dogmaAttributes[dogmaReverseInfo['Drone Bandwidth']],
        droneCapacity:      dogmaAttributes[dogmaReverseInfo['Drone Capacity']],
        rigSize:            dogmaAttributes[dogmaReverseInfo['Rig Size']],
        rigCalibration:     dogmaAttributes[dogmaReverseInfo['Calibration']],
        cpuUsed:            500,
        pgUsed:             20,
      };
    } else return {};
  }

  renderVisualBar(used, available) {
    return (
      <div className="ship-stats__visual">
        {(used || 0).toLocaleString('de-DE')} / {(available || 0).toLocaleString('de-DE')}
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
