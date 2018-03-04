import React, {Component} from 'react';

import * as helpers from '../../helpers';

function traitsBlock(ship) {
  if (ship.traits) {
    return Object.keys(ship.traits).map((traitType, index) => {
      return (
        <section className="overview-ship__traits" key={index}>
          <ul>
            <li className="overview-ship__trait-label">{traitType !== 'Ship Bonus' ? `Per ${traitType} skill level` : `${traitType}`}</li>
            {ship.traits[traitType].map((trait, index) => {
              return (
                <li className="overview-ship__trait" key={index}>
                  <span className="overview-ship__trait-value">
                    {trait.bonus}{helpers.operationSign(trait.unitID, trait)}
                  </span>
                  <span className="overview-ship__trait-text">{trait.bonusText}</span>
                </li>
              );
            })}
          </ul>
        </section>
      );
    });
  }
}

function statsBlock(ship, stat) {
  let human = helpers.humanReadableStat(stat),
      value;

  if (!ship[stat]) ship[stat] = 0;
  value = ship[stat];

  if (stat === 'upgradeSlotsLeft') {
    value += helpers.humanRigSize(ship['rigSize']);
  } else if (stat === 'align') {
    value = Math.LN2 * ship['agility'] * ship['mass'] / 500000;
    value = Math.round(value * 100) / 100;
  } else if (stat === 'agility') {
    value = Math.round(value * 100) / 100;
  } else if (stat === 'maxTargetRange') {
    value = value / 1000;
  } else if (stat === 'sensorStrength') {
    value       = ship[stat].value;
    human.label = ship[stat].label;
  } else if (stat === 'mass') {
    value = value / 1000;
  }

  if (human.format) {
    value = value.toLocaleString();
  }

  return (
    <li className="overview-ship__stat">
      <span className="overview-ship__stat-label">{human.label}</span>
      <span className="overview-ship__stat-value">{value} {human.units}</span>
    </li>
  );
}

function tankingProfileBlock(profile) {
  return (
    <li className="overview-ship__stat">
      <span className="overview-ship__stat-label">Resist.</span>
      <span className="overview-ship__stat-value">
        {Object.keys(profile).map((key, index) => {
          return (
            <span className={`tanking tanking--${key}`} key={index} title={profile[key] + '%'}>
              <span className={`tanking__active tanking__active--${key}`} style={{width: profile[key] + '%'}}></span>
            </span>
          );
        })}
      </span>
    </li>
  );
}

function shipComponent(ship, index) {
  return (
    <article className={`overview-ships__item overview-ship overview-ship--${ship.raceName.toLowerCase()}`} key={index}>
      <h6 className="overview-ship__name">
        <span>{ship.typeName}</span>
        <a className="overview-ship__simulate-link" href={`/efs-fitting-screen/${ship.typeID}`}>Simulate this ship</a>
      </h6>
      <section className="overview-ship__basics">
        <div className="overview-ship__column overview-ship__column--auto">
          <img src={`https://image.eveonline.com/Render/${ship.typeID}_64.png`} alt="ship"/>
        </div>
        <div className="overview-ship__column overview-ship__column--grow">
          <ul>
            {statsBlock(ship, 'metaLevel')}
            {statsBlock(ship, 'cpuOutput')}
            {statsBlock(ship, 'powerOutput')}
            {statsBlock(ship, 'capacitorCapacity')}
          </ul>
        </div>
      </section>

      <section className="overview-ship__tank">
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'shieldCapacity')}
          {statsBlock(ship, 'armorHP')}
          {statsBlock(ship, 'hp')}
        </ul>
        <ul className="overview-ship__column overview-ship__column--half">
          {tankingProfileBlock(ship.shieldProfile)}
          {tankingProfileBlock(ship.armorProfile)}
          {tankingProfileBlock(ship.hullProfile)}
        </ul>
      </section>

      <section className="overview-ship__slots">
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'upgradeSlotsLeft')}
          {statsBlock(ship, 'hiSlots')}
          {statsBlock(ship, 'medSlots')}
          {statsBlock(ship, 'lowSlots')}
        </ul>
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'upgradeCapacity')}
          {statsBlock(ship, 'turretSlotsLeft')}
          {statsBlock(ship, 'launcherSlotsLeft')}
        </ul>
      </section>


      <section className="overview-ship__velocity">
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'align')}
          {statsBlock(ship, 'agility')}
          {statsBlock(ship, 'mass')}
        </ul>
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'maxVelocity')}
          {statsBlock(ship, 'warpSpeedMultiplier')}
        </ul>
      </section>

      <section className="overview-ship__sensors">
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'scanResolution')}
          {statsBlock(ship, 'maxLockedTargets')}
        </ul>
        <ul className="overview-ship__column overview-ship__column--half">
          {statsBlock(ship, 'maxTargetRange')}
          {statsBlock(ship, 'sensorStrength')}
        </ul>
      </section>

      <section className="overview-ship__drones">
        <ul>
          {statsBlock(ship, 'droneBandwidth')}
          {statsBlock(ship, 'droneCapacity')}
          {statsBlock(ship, 'capacity')}
        </ul>
      </section>

      {traitsBlock(ship)}

    </article>
  );
}


export default class Ships extends Component {
  render() {
    return (
      <section className="overview-ships__group">
        {Object.keys(this.props.ships).map((race) => {
          return this.props.ships[race].map((ship, index) => shipComponent(ship, index));
        })}
      </section>
    );
  }
}
