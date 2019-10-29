import React, {Component} from 'react';
import {connect} from 'react-redux';

import {seo} from '../../helpers/seo';
import * as epicArcsActions from '../../redux/epicArcsActions';
import * as eveNpcsActions from '../../redux/eveNpcsActions';

import Breadcrumbs from './Breadcrumbs';
import Overview from './Overview';
import Missions from './Missions';
import {convertNameToIndex, getInfoByNames} from './helpers';

class EpicArcs extends Component {
  constructor(props) {
    super(props);
    this.getShipInfo = this.getShipInfo.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
    const {epicArcs} = this.props;
    const urlParams = this.props.match.params;

    if (!urlParams.faction) this.setEpicArcSeo();
    else if (urlParams.faction && epicArcs.fetchedInfo && epicArcs.data.missions[urlParams.faction].length !== 0) this.setEpicArcMissionSeo();
  }

  setEpicArcSeo() {
    seo({
      title:           'EVE Online Epic Arcs Level 4',
      metaDescription: `Guides for EVE Online Epic Arcs: Amarr Empire Right To Rule, Caldari State Penumbra, Gallente Federation Syndication and Minmatar Republic Wildfire. In depth guide for all level 4 epic arc missions. Find all about the related missions, enemies, rewards, what to bring and how to start them...`
    });
  }

  setEpicArcMissionSeo() {
    const {epicArcs} = this.props;
    const urlParams = this.props.match.params,
      info = epicArcs.data.info[urlParams.faction],
      missions = epicArcs.data.missions[urlParams.faction],
      missionIndex = urlParams.faction && info.missionIndex[urlParams.mission] !== undefined
                     ? info.missionIndex[urlParams.mission] : null;

    const empire = info.empire,
      description = info.description.join('. '),
      missionName = missionIndex ? missions[missionIndex].name : null,
      name = missionName ? `${info.name} - ${missionName}` : info.name;

    seo({
      title:           `${empire} Epic Arc - ${name}`,
      metaDescription: missionName ? `EVE Online ${empire} Epic Arc - ${name} - ${missionName}. ${description}`
                                   : `EVE Online ${empire} Epic Arc - ${name}. ${description}`
    });
  }

  getShipInfo(names) {
    return getInfoByNames(this.props.eveNpcs, names);
  }

  async fetchData() {
    const {epicArcs, fetchEpicArcsInfo, fetchEpicArc} = this.props;
    const urlParams = this.props.match.params;

    if (!epicArcs.fetchedInfo) await fetchEpicArcsInfo();

    if (!urlParams.faction) this.setEpicArcSeo();
    else if (urlParams.faction && epicArcs.fetchedInfo && epicArcs.data.missions[urlParams.faction].length === 0) {
      fetchEpicArc(urlParams.faction).then(data => {
        const missions = data.payload[urlParams.faction],
          enemies = {};

        missions.forEach(mission => {
          if (mission.pockets) mission.pockets.forEach(pocket => pocket.forEach(wave => wave.enemies.forEach(enemy => {
            enemy.names.forEach(name => enemies[convertNameToIndex(name)] = null);
          })));
        });

        this.props.fetchNpcs(Object.keys(enemies).join(';'));
        this.setEpicArcMissionSeo();
      });
    }
  }

  render() {
    const {epicArcs} = this.props,
      urlParams = this.props.match.params,
      faction = urlParams.faction,
      info = epicArcs.data.info,
      missions = epicArcs.data.missions;

    return (
      <article className="epic-arcs">
        {!faction && <Breadcrumbs type='index'/>}
        {!faction && epicArcs.fetchedInfo && <Overview info={info}/>}

        {faction && <Breadcrumbs type='epic-arc' location={info[faction].name}/>}
        {faction && missions[faction].length !== 0 && <Missions info={info[faction]}
                                                                missions={missions[faction]}
                                                                activeMission={urlParams.mission || null}
                                                                getShipInfo={this.getShipInfo}/>}
      </article>
    );
  }
}

const mapStateToProps = state => ({epicArcs: state.epicArcs, eveNpcs: state.eveNpcs}),
  mapDispatchToProps = {...epicArcsActions, ...eveNpcsActions};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArcs);
