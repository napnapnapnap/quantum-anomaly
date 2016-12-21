import React, {Component} from 'react';

function createList(label, values) {
  return (
    <div className="arc__list-wrapper">
      <p className="bold">{label}:</p>
      <ul className="arc__list">
        {values.map((value, index) => {
          return (
            <li key={index}>{value}</li>
          );
        })}
      </ul>
    </div>
  );
}

function missionWave(wave) {
  return wave.enemies.map((enemies, index) => {
    return (
      <p key={index}>
        <span>{enemies.number}x {enemies.name}</span>
        <span className="disclaimer"> {enemies.effect}</span>
      </p>
    );
  });
}

function missionPocket(pocket) {
  return pocket.map((wave, index) => {
    return (
      <div className="arc__wave" key={index}>
        <p>
          <span>{index === 0 ? ('Initial wave') : (`Wave ${index}`)} at {wave.range}</span>
          <span className="disclaimer"> {wave.note}</span>
        </p>
        <div className="arc__enemies">
          {missionWave(wave)}
        </div>
      </div>
    );
  })
}

function missionPockets(pockets) {
  if (pockets) {
    return pockets.map((pocket, index) => {
      return (
        <article key={index}>
          <h6>{index === 0 ? ('Initial pocket') : (`Pocket ${index}`)}</h6>
          {missionPocket(pocket)}
        </article>
      );
    });
  }
}

function missionInfoItem(label, value) {
  if (value) {
    return (
      <p className="arc__mission-info-item">
        <span className="arc__mission-label">{label}: </span>
        <span className="arc__mission-value">{value}</span>
      </p>
    );
  }
}

function missions(missions) {
  return missions.map((mission, index) => {
    return (
      <section className="arc__mission-wrapper" key={index}>
        <h5>{index + 1}. {mission.name}</h5>
        <div className="arc__mission-inner-wrapper">
          <div className="arc__mission-info-wrapper">
            {missionInfoItem('Agent', mission.agent)}
            {missionInfoItem('Location', mission.agentLocation)}
            {missionInfoItem('Type', mission.type)}
            {missionInfoItem('Description', mission.description)}
            {missionInfoItem('Destination', mission.destination)}
            {missionInfoItem('Objective', mission.completed)}
            {missionInfoItem('Tips', mission.tip)}
          </div>
          <div className="arc__mission-pockets">
            {missionInfoItem('Enemy', mission.enemy)}
            {missionPockets(mission.pockets)}
          </div>
        </div>
      </section>
    );
  });
}

export default class EpicArc extends Component {
  render() {
    return (
      <div className="arc">
        <div className="arc__inner-wrapper">
          <div className="arc__race-logo">
            <img src={`https://image.eveonline.com/Alliance/${this.props.arc.iconID}_128.png`} alt="arc logo"/>
          </div>
          <div className="arc__short-description">
            <h5 onClick={this.props.setActiveArc}>{this.props.arc.name}</h5>
            <p>
              <span className="bold">Starting agent: </span> 
              <span>{this.props.arc.starter}</span>
            </p>
            {createList('Rewards', this.props.arc.rewards)}
            {!this.props.active ? (
              <a href={`/epic-arcs/${this.props.arc.race}`}>Show more</a>
            ) : null}
          </div>
        </div>
        <div className={'arc__missions ' + (this.props.active ? 'arc__missions--active' : '')}>
          <p className="long-text">{this.props.arc.global}</p>
          <p className="long-text">{this.props.arc.description}</p>
          {createList('Notes', this.props.arc.notes)}
          {missions(this.props.arc.missions)}
        </div>
      </div>
    );
  }
}
