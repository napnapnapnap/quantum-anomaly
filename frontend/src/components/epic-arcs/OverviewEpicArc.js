import React, {Component} from 'react';

function createList(label, values) {
  return (
    <div className="arc__list-wrapper">
      <span className="bold">{label}:</span>
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
      <div key={index}>
        <span>{enemies.number}x {enemies.name}</span>
        <span className="disclaimer"> {enemies.effect}</span>
      </div>
    );
  });
}

function missionPocket(pocket) {
  return pocket.map((wave, index) => {
    return (
      <section className="arc__wave" key={index}>
        <div>
          <span>{index === 0 ? ('Initial wave') : (`Wave ${index}`)} at {wave.range}</span>
          <span className="disclaimer"> {wave.note}</span>
        </div>
        <div className="arc__enemies">
          {missionWave(wave)}
        </div>
      </section>
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
      <div className="arc__mission-info-item">
        <span className="arc__mission-label">{label}: </span>
        <span className="arc__mission-value">{value}</span>
      </div>
    );
  }
}

function missions(missions) {
  return missions.map((mission, index) => {
    return (
      <section className="arc__mission-wrapper" key={index}>
        <h5>{index + 1}. {mission.name}</h5>
        <div className="arc__mission-inner-wrapper">
          <section className="arc__mission-info-wrapper">
            {missionInfoItem('Agent', mission.agent)}
            {missionInfoItem('Location', mission.agentLocation)}
            {missionInfoItem('Type', mission.type)}
            {missionInfoItem('Description', mission.description)}
            {missionInfoItem('Destination', mission.destination)}
            {missionInfoItem('Objective', mission.completed)}
            {missionInfoItem('Tips', mission.tip)}
          </section>
          <section className="arc__mission-pockets">
            {missionInfoItem('Enemy', mission.enemy)}
            {missionPockets(mission.pockets)}
          </section>
        </div>
      </section>
    );
  });
}

export default class EpicArc extends Component {
  render() {
    return (
      <article className="arc">
        <section className="arc__inner-wrapper">
          <figure className="arc__race-logo">
            <img src={`https://image.eveonline.com/Alliance/${this.props.arc.iconID}_128.png`} alt="arc logo"/>
          </figure>
          <div className="arc__short-description">
            <h5 onClick={this.props.setActiveArc}>{this.props.arc.name}</h5>
            <div>
              <span className="bold">Starting agent: </span> 
              <span>{this.props.arc.starter}</span>
            </div>
            {createList('Rewards', this.props.arc.rewards)}
            {!this.props.active ? (
              <a href={`/epic-arcs/${this.props.arc.race}`}>Show more</a>
            ) : null}
          </div>
        </section>
        <section className={'arc__missions ' + (this.props.active ? 'arc__missions--active' : '')}>
          <p className="long-text">{this.props.arc.global}</p>
          <p className="long-text">{this.props.arc.description}</p>
          {createList('Notes', this.props.arc.notes)}
          {missions(this.props.arc.missions)}
        </section>
      </article>
    );
  }
}
