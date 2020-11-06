import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {fetchEpicArcs, fetchEpicArc} from '../../redux/epicArcsActions';
import {fetchNpcs} from '../../redux/eveNpcsActions';
import {friendlyUrl, seo} from '../../helpers';
import {
  addExtraMissionContext,
  convertNameToIndex,
  isEnemyException,
  renderEnemyProfile,
  getInfoByNames
} from './helpers';
import './EpicArcs.scss';

const renderGeneralInfo = (desc, notes, rewards) => (
  <div className='missions__content'>
    <div className='missions__item'>
      <h3>General Notes</h3>
      <ul className='ul--packed'>{desc.map(desc => <li key={Math.random()}>{desc}</li>)}</ul>
    </div>
    <div className='missions__item'>
      <h3>Things to be aware of</h3>
      <ul className='ul--packed'>{notes.map(note => <li key={Math.random()}>{note}</li>)}</ul>
    </div>
    <div className='missions__item'>
      <h3>Rewards</h3>
      <ul className='ul--packed'>{rewards.map(reward => <li key={Math.random()}>{reward}</li>)}</ul>
    </div>
  </div>
);

const renderEffect = (id, title) => (
  <img className='enemies__effect' src={`https://image.eveonline.com/Type/${id}_32.png`} title={title} alt={title}/>
);

const renderMissionPockets = (pockets = [], eveNpcs) => (
  <div className='mission'>
    {pockets.map((pocket, index) => <div className='pocket' key={index}>
      <h5>
        {index === 0 && pockets.length === 1 && 'Single pocket'}
        {index === 0 && pockets.length !== 1 && 'Initial pocket'}
        {index !== 0 && `Pocket ${index}`}
      </h5>
      {pocket.map((wave, index) => (
        <div key={index} className='wave'>
          <p className='bold'>
            {index === 0 && wave.enemies.length === 1 && 'Single wave'}
            {index === 0 && wave.enemies.length !== 1 && 'Initial wave'}
            {index !== 0 && `Wave ${index}`} at {wave.range} km
          </p>
          {wave.enemies.map(enemy => (
            <div className='enemies' key={Math.random()}>
              <div className='enemies__quantity'>{enemy.quantity}</div>
              <div className='enemies__ship'>
                <p className='enemies__type'>{getInfoByNames(eveNpcs, enemy.names).type}</p>
                <p className='enemies__names'>{enemy.names.join(', ')}</p>
                {enemy.notice && <p className='enemies__notice'>{enemy.notice}</p>}
              </div>
              <div className='enemies__effects'>
                {getInfoByNames(eveNpcs, enemy.names).scram && renderEffect(447, 'Warp Scrambler')}
                {getInfoByNames(eveNpcs, enemy.names).web && renderEffect(526, 'Stasis Webifier')}
                {getInfoByNames(eveNpcs, enemy.names).trackingDisr && renderEffect(2108, 'Tracking Disruptor')}
                {getInfoByNames(eveNpcs, enemy.names).energyNeut && renderEffect(12269, 'Energy Neutralizer')}
                {getInfoByNames(eveNpcs, enemy.names).sensorDamp && renderEffect(1968, 'Sensor Dampener')}
                {getInfoByNames(eveNpcs, enemy.names).ecm && renderEffect(1957, 'Target Jamming')}
                {getInfoByNames(eveNpcs, enemy.names).paint && renderEffect(12709, 'Target Painting')}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>)}
  </div>
);

const renderMissionInfo = ({name, agent, source, type, start, dest, desc, enemy, canAcptRmty, tips, objective, pockets}, eveNpcs) => (
  <div className='missions__content'>
    <div className='missions__item'>
      <h3>{name}</h3>
      <ul className='ul--packed'>
        <li className='bold'>{type}</li>
        <li>Given by <span className='bold'>{agent}</span> at {source}</li>
        <li>Starts in <span className='bold'>{start}</span> and goes to {dest}</li>
      </ul>
    </div>
    <div className='missions__item'>
      <h3>Tips and objective</h3>
      <ul className='ul--packed'>
        {canAcptRmty && <li>Mission can be accepted remotely</li>}
        {tips.map(tip => tip.length > 0 && <li key={Math.random()}>{tip}</li>)}
        <li>{objective}</li>
      </ul>
    </div>
    <div className='missions__item'>
      <h3>What do you need to do</h3>
      <ul className='ul--packed'>
        {desc.map(desc => <li key={Math.random()}>{desc}</li>)}
      </ul>
    </div>
    <div className='missions__item'>
      {enemy && (
        <React.Fragment>
          {Array.isArray(enemy)
            ? enemy.map(enemy => <div key={Math.random()}>{renderEnemyProfile(enemy)}</div>)
            : <div>{renderEnemyProfile(enemy)}</div>}
        </React.Fragment>
      )}
    </div>
    {renderMissionPockets(pockets, eveNpcs)}
  </div>
);

const renderMissionSelector = (race, missions) => (
  <aside className='missions__selector'>
    <NavLink exact to={`/epic-arcs/${race}`} className='link' activeClassName='link--active'>
      General Notes
    </NavLink>
    <p className='bold'>Mission list</p>
    <ul className='ul--links'>
      {missions.map(({name, type}) => (
        <li key={name}>
          <NavLink to={`/epic-arcs/${race}/${friendlyUrl(name)}`} className='link' activeClassName='link--active'>
            {name}
          </NavLink>
          {addExtraMissionContext(name, type)}
        </li>
      ))}
    </ul>
  </aside>
);

const renderArc = ({empire, race, name, iconID, missions, desc, notes, rewards}, activeMissionIndex, eveNpcs) => {
  return (
    <React.Fragment>
      <div className='overview overview--arc'>
        <header className='overview__header'>
          <div className='overview__logo'>
            <img src={`https://images.evetech.net/corporations/${iconID}/logo`} alt='faction'/>
          </div>
          <div className='overview__tagline'>
            <h1 className='overview__title'>{name}</h1>
            <p>{empire} <NavLink to={`/epic-arcs/`} className='link--secondary'>back to others</NavLink></p>
          </div>
        </header>
      </div>
      <div className='missions'>
        {renderMissionSelector(race, missions)}
        {isNaN(activeMissionIndex) ? renderGeneralInfo(desc, notes, rewards) : renderMissionInfo(missions[activeMissionIndex], eveNpcs)}
      </div>
    </React.Fragment>
  );
};

const getAllNpcNames = (epicArc, eveNpcs) => {
  const enemies = [];
  // gather all of the npc names in all mission in this epic arc
  epicArc.missions.forEach(mission => {
    if (mission.pockets)
      mission.pockets.forEach(pocket => pocket.forEach(wave => wave.enemies.forEach(enemy => enemy.names.forEach(name => {
        const indexName = convertNameToIndex(name);
        // if the enemy is not already known and if we didn't already marked it as missing
        if (!eveNpcs[indexName] && enemies.indexOf(indexName) === -1 && !isEnemyException(indexName)) enemies.push(indexName);
      }))));
  });
  return enemies;
};

const setSeo = (epicArc, activeMissionIndex) => {
  let title = `${epicArc.empire} Epic Arc - ${epicArc.name}`;
  let metaDescription = `EVE Online ${title} ${epicArc.desc}`;

  if (!isNaN(activeMissionIndex)) {
    const activeMission = epicArc.missions[activeMissionIndex];
    const missionName = activeMission.name;
    title = `${title} - ${missionName}`;
    metaDescription = `EVE Online ${title}. ${activeMission.type} mission given by ${activeMission.agent} at ${activeMission.source}. Starts in ${activeMission.start} and goes to ${activeMission.dest}`;
  }

  seo({title, metaDescription});
};

const EpicArc = (props) => {
  const {faction, mission} = props.match.params;
  const epicArc = props.epicArcs[faction];
  const [loaded, setLoaded] = useState(false);
  const [activeMissionIndex, setActiveMissionIndex] = useState(null);

  useEffect(() => {
    // if we don't have any information about current requested faction, get all epic arcs general information
    if (!epicArc) props.fetchEpicArcs();
    // if we have all the information, check if we have missions details for this specific arc
    else if (epicArc && !epicArc.missions) props.fetchEpicArc(faction);
    // if we have all the information, check if we are missing some of the npc information
    else if (epicArc && epicArc.missions && getAllNpcNames(epicArc, props.eveNpcs).length > 0) {
      const missingNpc = getAllNpcNames(epicArc, props.eveNpcs);
      if (missingNpc.length > 0) props.fetchNpcs(missingNpc.join(';'));
    }
    // when we have everything
    else {
      const nextActiveMissionIndex = props.epicArcs[faction].missionIndex[mission];
      setActiveMissionIndex(nextActiveMissionIndex);
      setSeo(epicArc, nextActiveMissionIndex);
      setLoaded(true);
    }
  });

  return loaded && renderArc(props.epicArcs[faction], activeMissionIndex, props.eveNpcs);
};

const mapStateToProps = state => ({epicArcs: state.epicArcs, eveNpcs: state.eveNpcs}),
  mapDispatchToProps = {fetchEpicArcs, fetchEpicArc, fetchNpcs};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArc);
