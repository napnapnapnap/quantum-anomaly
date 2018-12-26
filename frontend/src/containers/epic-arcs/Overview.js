import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import * as epicArcsActions from '../../redux/epicArcsActions';

import LoadingScreen from '../../components/LoadingScreen';
import {seo} from '../../helpers/seo';
import {renderList, generateMissionUrl} from './helpers';

class EpicArcsOverview extends Component {
  componentWillMount() {
    if (Object.keys(this.props.epicArcsReducer).length === 0) this.props.fetchEpicArcs();

    seo({
      title:           'EVE Online Epic Arcs Level 4',
      metaDescription: 'Guides for EVE Online Epic Arcs: Amarr Empire Right To Rule, Caldari State Penumbra, Gallente Federation Syndication and Minmatar Republic Wildfire. In depth guide for all level 4 epic arc missions. Find all about the related missions, enemies, rewards, what to bring and how to start them...'
    });
  }

  renderArc() {
    let arcs = this.props.epicArcsReducer;

    return Object.keys(arcs).map(faction => (
      <Link to={generateMissionUrl(arcs[faction].race, arcs[faction].missions[0].name)}
            key={arcs[faction].iconID}
            className="arcs__item arcs__item--overview">
        <header className="arcs__header">
          <div className="arcs__faction-logo">
            <img src={`https://image.eveonline.com/Alliance/${arcs[faction].iconID}_128.png`} alt="faction"/>
          </div>
          <h2 className="arcs__title">{arcs[faction].empire} Epic Arc</h2>
        </header>
        {renderList('Journal name', [arcs[faction].name])}
        {renderList('Starting agent', [arcs[faction].starter])}
        {renderList('Rewards', arcs[faction].rewards)}
        {renderList('Description', arcs[faction].description)}
      </Link>
    ));
  }

  render() {
    return (
      <article className="arcs arcs--overview">
        {Object.keys(this.props.epicArcsReducer).length === 0 ? <LoadingScreen/> : this.renderArc()}
      </article>
    );
  }
}


const mapStateToProps    = state => state,
      mapDispatchToProps = {...epicArcsActions};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArcsOverview);
