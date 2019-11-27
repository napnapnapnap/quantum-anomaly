import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {friendlyUrl} from '../../helpers';
import {renderEnemyProfile, renderMissionType} from './helpers';

export default class Missions extends Component {
  getActiveMissionIndex() {
    const {info, activeMission} = this.props;
    return activeMission ? info.missionIndex[activeMission] : null;
  }

  static renderGeneralDescription(info) {
    return (
      <div className="missions__info">
        <h1 className="missions__title missions__spacer">{info.name}</h1>
        <ul>{info.description.map((description, index) => <li key={index}>{description}</li>)}</ul>
        <h5>General notes</h5>
        <ul>{info.notes.map((note, index) => <li key={index}>{note}</li>)}</ul>
        <h5>Rewards</h5>
        <ul>{info.rewards.map((reward, index) => <li key={index}>{reward}</li>)}</ul>
      </div>
    );
  }

  static renderInfo(mission) {
    return (
      <div className="missions__info">
        <h1 className="missions__title">{mission.name}</h1>
        <p className="small missions__spacer">Given by {mission.agent} at {mission.source}</p>
        <h5>General Information</h5>
        <p>Mission type: {mission.type} {renderMissionType(mission.type, 'missions__icon')}</p>
        <p>Starting system: {mission.start}</p>
        <p>Destination: {mission.destination}</p>
        <h5>Description</h5>
        <ul>
          {mission.description.map((description, index) => <li key={index}>{description}</li>)}
        </ul>
        {mission.enemy && <React.Fragment>
          <h5>Enemy</h5>
          {Array.isArray(mission.enemy) ?
            mission.enemy.map((enemy, index) =>
              <React.Fragment key={index}>{renderEnemyProfile(enemy)}</React.Fragment>) :
            renderEnemyProfile(mission.enemy)}
        </React.Fragment>}
        <h5>Tips and objective</h5>
        {mission.canAcceptRemotely && <p>Mission can be accepted remotely</p>}
        <ul>{mission.tips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
        <p>{mission.objective}</p>
      </div>
    );
  }

  static renderEffect(id, title) {
    return <img className='missions__effect'
                src={`https://image.eveonline.com/Type/${id}_32.png`}
                title={title}
                alt={title}/>;
  }

  renderWave(wave, index) {
    return <div key={index} className="missions__wave">
      <h6>
        {index === 0 && wave.enemies.length === 1 && 'Single wave'}
        {index === 0 && wave.enemies.length !== 1 && 'Initial wave'}
        {index !== 0 && `Wave ${index}`} at {wave.range} km
      </h6>
      {wave.enemies.map((enemy, index) => <div className="missions__enemies" key={index}>
        <div className="missions__quantity">{enemy.quantity}</div>
        <div className="missions__ship">
          <p className="missions__type">{this.props.getShipInfo(enemy.names).type}</p>
          <span className="small">{enemy.names.join(', ')}</span>
          {enemy.notice && <p className="missions__notice">{enemy.notice}</p>}
        </div>
        <div className="missions__effects">
          {this.props.getShipInfo(enemy.names).scram && Missions.renderEffect(447, 'Warp Scrambler')}
          {this.props.getShipInfo(enemy.names).web && Missions.renderEffect(526, 'Stasis Webifier')}
          {this.props.getShipInfo(enemy.names).trackingDisr && Missions.renderEffect(2108, 'Tracking Disruptor')}
          {this.props.getShipInfo(enemy.names).energyNeut && Missions.renderEffect(12269, 'Energy Neutralizer')}
          {this.props.getShipInfo(enemy.names).sensorDamp && Missions.renderEffect(1968, 'Sensor Dampener')}
          {this.props.getShipInfo(enemy.names).ecm && Missions.renderEffect(1957, 'Target Jamming')}
          {this.props.getShipInfo(enemy.names).paint && Missions.renderEffect(12709, 'Target Painting')}
        </div>
      </div>)}
    </div>;
  }

  renderPockets(pockets) {
    return (
      <section className="missions__pockets">
        {pockets.map((pocket, index) => <div className='missions__pocket' key={index}>
          <h5 style={{marginTop: 0}}>
            {index === 0 && pockets.length === 1 && 'Single pocket'}
            {index === 0 && pockets.length !== 1 && 'Initial pocket'}
            {index !== 0 && `Pocket ${index}`}
          </h5>
          {pocket.map((wave, index) => this.renderWave(wave, index))}
        </div>)}
      </section>);
  }


  render() {
    const {info, missions} = this.props;
    const activeMissionIndex = this.getActiveMissionIndex();

    return (
      <section className="missions">
        <header className="epic-arcs__header missions__header">
          <div className="epic-arcs__header-logo">
            <img src={`https://images.evetech.net/corporations/${info.iconID}/logo`} alt="faction"/>
          </div>
          <div className="epic-arcs__header-text">
            <h2 className="epic-arcs__header-title">{info.name}</h2>
            <p>{info.empire} Epic Arc</p>
          </div>
        </header>

        <aside className="missions__selector">
          <ul>
            <li>
              <NavLink exact to={`/epic-arcs/${info.race}`}
                       className="missions__selector-item"
                       activeClassName={'missions__selector-item--active'}>
                0. General Info
              </NavLink>
            </li>

            {missions.map((mission, index) => <li key={index}>
              <NavLink to={`/epic-arcs/${info.race}/${friendlyUrl(mission.name)}`}
                       className="missions__selector-item"
                       activeClassName={'missions__selector-item--active'}>
                {index + 1}. {mission.name}
                {renderMissionType(mission.type, 'missions__icon')}
              </NavLink>
            </li>)}
          </ul>
        </aside>

        <main className="missions__main">
          {activeMissionIndex !== null ? Missions.renderInfo(missions[activeMissionIndex]) : Missions.renderGeneralDescription(info)}
          {activeMissionIndex !== null ? this.renderPockets(missions[activeMissionIndex].pockets || []) : null}
        </main>
      </section>
    );
  }
}
