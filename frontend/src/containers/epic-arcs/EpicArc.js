import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as epicArcsActions from '../../redux/epicArcsActions';

import Missions from './EpicArcMissions';
import LoadingScreen from '../../components/LoadingScreen';
import {seo} from '../../helpers/seo';
import {renderList} from './helpers';

class EpicArc extends Component {
  constructor(props) {
    super(props);
    this.updateSeoTags = this.updateSeoTags.bind(this);
  }

  componentWillMount() {
    const faction = this.props.match.params.faction;

    if (!this.props.epicArcsReducer[faction]) {
      this.props.fetchEpicArc(faction).then(response => {
        this.updateSeoTags(faction);
      });
    } else {
      this.updateSeoTags(faction);
    }
  }

  renderList(label, values, separeted) {
    return (
      <section className="arcs__info-segment">
        <span className="arcs__info-label arcs__info-label--bold">{label}:</span>
        <ul className="arcs__info">
          {values.map((value, index) => (
            <li className={separeted && 'arcs__info-separeted'} key={index}>{value}</li>
          ))}
        </ul>
      </section>
    );
  }

  updateSeoTags(faction) {
    const title       = `${this.props.epicArcsReducer[faction].name} - ${faction.charAt(0).toUpperCase() + faction.slice(1)} Epic Arc Level 4`,
          description = this.props.epicArcsReducer[faction].description;

    seo({
      title:           title,
      metaDescription: description
    });
  }

  render() {
    const faction = this.props.match.params.faction,
          arc     = this.props.epicArcsReducer[faction];
    if (arc) {
      return (
        <article className="arcs">
          <section className="arcs__item">
            <header className="arcs__header">
              <div className="arcs__faction-logo">
                <img src={`https://image.eveonline.com/Alliance/${arc.iconID}_128.png`} alt="faction logo"/>
              </div>
              <h2 className="arcs__title arcs__title--big">{arc.name}</h2>
            </header>
            {renderList('Starting agent', [arc.starter])}
            {renderList('Rewards', arc.rewards)}
            {renderList('Description', arc.description)}
            {renderList('Notes', arc.notes)}
          </section>
          <Missions missions={arc.missions}/>
        </article>
      );
    } else {
      return (
        <article className="arcs">
          <LoadingScreen/>
        </article>
      );
    }
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...epicArcsActions};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArc);
