import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchEpicArcs} from '../../redux/epicArcsActions';
import {seo} from '../../helpers';
import './EpicArcs.scss';

const renderOverviewItem = ({race, iconID, name, empire, desc, rewards}) => (
  <Link to={`/epic-arcs/${race}`} key={race} className='overview__item'>
    <header className='overview__header'>
      <div className='overview__logo'>
        <img src={`https://images.evetech.net/corporations/${iconID}/logo`} alt='faction'/>
      </div>
      <div className='overview__tagline'>
        <h4 className='overview__title'>{name}</h4>
        <p>{empire}</p>
      </div>
    </header>

    <p className='bold'>What to expect:</p>
    <ul className='ul--packed'>{desc.map((desc, index) => <li key={index}>{desc}</li>)}</ul>
    <p className='bold'>Rewards:</p>
    <ul className='ul--packed'>{rewards.map((reward, index) => <li key={index}>{reward}</li>)}</ul>
  </Link>
);

const Overview = (props) => {
  seo({
    title: 'EVE Online Epic Arcs Level 4',
    metaDescription: `Guides for EVE Online Epic Arcs: Amarr Empire Right To Rule, 
    Caldari State Penumbra, Gallente Federation Syndication and Minmatar Republic Wildfire. 
    In depth guide for all level 4 epic arc missions. Find all about the related missions, 
    enemies, rewards, what to bring and how to start them...`
  });

  if (!Object.keys(props.epicArcs).length) props.fetchEpicArcs();

  return (
    <div className='overview'>
      <h1>Eve Online: Epic Arcs Guide</h1>
      {props.epicArcs && Object.keys(props.epicArcs).map(key => renderOverviewItem(props.epicArcs[key]))}
    </div>
  );
};

const mapStateToProps = state => ({epicArcs: state.epicArcs}),
  mapDispatchToProps = {fetchEpicArcs};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
