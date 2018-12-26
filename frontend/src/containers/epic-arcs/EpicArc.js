import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as epicArcsActions from '../../redux/epicArcsActions';

import LoadingScreen from '../../components/LoadingScreen';
import NotFound from '../../components/NotFound';
import Missions from './EpicArcMissions';
import {renderList} from './helpers';

class EpicArc extends Component {
  componentWillMount() {
    const faction = this.props.match.params.faction;
    if (!this.props.epicArcsReducer[faction]) this.props.fetchEpicArc(faction);
  }

  renderArc(arc) {
    return (
      <React.Fragment>
        <section className="arcs__item">
          <header className="arcs__header">
            <div className="arcs__faction-logo">
              <img src={`https://image.eveonline.com/Alliance/${arc.iconID}_128.png`} alt="faction logo"/>
            </div>
            <h1 className="arcs__title arcs__title--big">
              {arc.empire} Epic Arc
            </h1>
          </header>
          {renderList('Journal name', [arc.name])}
          {renderList('Starting agent', [arc.starter])}
          {renderList('Rewards', arc.rewards)}
          {renderList('Description', arc.description)}
          {renderList('Notes', arc.notes)}
        </section>
        <Missions missions={arc.missions}
                  metaDescription={arc.description}
                  faction={this.props.match.params.faction}
                  mission={this.props.match.params.mission}
                  empire={arc.empire}/>
      </React.Fragment>
    );
  }

  render() {
    const faction = this.props.match.params.faction,
          arc     = this.props.epicArcsReducer[faction] || {};
    
    if (arc.error) return <NotFound/>;

    return (
      <article className="arcs">
        {Object.keys(arc).length === 0  ?  <LoadingScreen/> : this.renderArc(arc, faction)}
      </article>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...epicArcsActions};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArc);
