import React, {Component} from 'react';
import {generateMissionUrl, renderList, renderSegment} from './helpers';
import {Link} from 'react-router-dom';
import {seo} from '../../helpers/seo';

export default class Mission extends Component {
  constructor(props) {
    super(props);

    this.setCurrent        = this.setCurrent.bind(this);
    this.nextMission       = this.nextMission.bind(this);
    this.prevMission       = this.prevMission.bind(this);
    this.updateSeo         = this.updateSeo.bind(this);
    this.getCurrentMission = this.getCurrentMission.bind(this);

    const currentMission = this.getCurrentMission();

    this.state = {currentMission: currentMission};
    this.updateSeo(currentMission);
  };

  componentWillReceiveProps() {
    window.onpopstate = () => {
      let currentMission = this.getCurrentMission();
      this.setState({currentMission: currentMission});
      this.updateSeo(currentMission);
    };
  }

  componentWillUnmount() {
    window.onpopstate = () => {};
  }

  getCurrentMission() {
    const missions       = this.props.missions,
          faction        = this.props.faction,
          currentMission = this.props.mission;

    let currentIndex = -1;
    missions.forEach((mission, index) => {
      if (generateMissionUrl(faction, mission.name).indexOf(currentMission) !== -1) currentIndex = index;
    });
    return currentIndex;
  }

  updateSeo(missionIndex) {
    if (this.state.currentMission === -1) return;

    const missionName     = this.props.missions[missionIndex].name,
          title           = `${missionName} - ${this.props.empire} EVE Online Epic Arc Level 4`,
          metaDescription = this.props.metaDescription;

    seo({
      title:           title,
      metaDescription: metaDescription
    });
  }

  setCurrent(index) {
    this.setState({currentMission: index});
    this.updateSeo(index);
  }

  nextMission() {
    this.setCurrent(this.state.currentMission + 1);
  }

  prevMission() {
    this.setCurrent(this.state.currentMission - 1);
  }

  renderMissionsList() {
    const missions       = this.props.missions,
          faction        = this.props.faction,
          currentMission = this.state.currentMission;

    if (!missions) return null;

    return (
      <ul className="missions__list">
        {missions.map((mission, index) => (
          <li className={currentMission === index ? 'missions__list-item bold' : 'missions__list-item'} key={index}>
            <Link className="link"
                  to={generateMissionUrl(faction, mission.name)}
                  onClick={() => {this.setCurrent(index);}}>
              {index + 1}. {mission.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  renderMissionInfo() {
    const mission = this.props.missions[this.state.currentMission];
    if (!mission) return null;

    return (
      <section className="missions__info">
        {renderSegment('Agent', mission.agent)}
        {renderSegment('Location', mission.agentLocation)}
        {renderSegment('Type', mission.type)}
        {renderSegment('Destination', mission.destination)}
        {renderSegment('Objective', mission.completed)}
        {mission.enemy ? renderSegment('Enemy', mission.enemy) : ''}
        {renderList('Description', mission.description)}
        {renderList('Tips', mission.tips)}
      </section>
    );
  }

  renderMissionEnemies() {
    const mission = this.props.missions[this.state.currentMission];
    if (!mission.pockets) return null;

    return (
      <section className="missions__enemies">
        {mission.pockets.map((pocket, index) => (
          <div className="missions__pocket" key={index}>
            <header className="missions__title">{index === 0 ? ('Initial pocket') : (`Pocket ${index}`)}</header>
            <ul>
              {pocket.map((wave, index) => (
                <li className="missions__wave" key={index}>
                  <header>
                    {index === 0 ? ('Initial wave') : (`Wave ${index}`)} at {wave.range}
                    {wave.lastTrigger && ', last one is trigger'}
                    {wave.note && `, ${wave.note}`}
                  </header>
                  <ul className="missions__wave-enemies">
                    {wave.enemies.map((enemies, index) => (
                      <li className="missions__enemy" key={index}>
                        <span className="missions__enemy-count">{enemies.number}</span><span>{enemies.name}</span>
                        <div className="missions__enemy-effect">{enemies.effect}</div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    );
  };

  render() {
    return (
      <section className="missions">
        {this.renderMissionsList()}
        {this.state.currentMission !== -1 && this.renderMissionInfo()}
        {this.state.currentMission !== -1 && this.renderMissionEnemies()}
      </section>
    );
  }
}
