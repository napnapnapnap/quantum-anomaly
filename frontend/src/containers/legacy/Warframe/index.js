import React, {Component} from 'react';
import LoadingScreen from '../../../components/LoadingScreen';

import Sortie from './Sortie';
import Invasions from './Invasions';
import Fissures from './Fissures';
import Cetus from './Cetus';
import Planets from './Planets';
import {seo} from '../../../helpers/';

import './warframe.scss';

const UPDATE_FREQUNCY = 60 * 1000;

export default class Warframe extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  getData() {
    fetch('/api/warframe')
      .then(response => response.json())
      .then(response => {
        response.lastUpdate = new Date();
        response.nextUpdate = new Date(response.lastUpdate.getTime() + UPDATE_FREQUNCY);
        this.setState({...response});
      });
    seo({
      title:           'Warframe Tracker',
      metaDescription: 'Current available events inside Warframe universe'
    });
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData.bind(this), UPDATE_FREQUNCY);
  }

  render() {
    if (Object.keys(this.state).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <article className='warframe'>
          <Fissures fissures={this.state.fissures}/>
          <Invasions invasions={this.state.invasions}/>
          <Sortie sortie={this.state.sortie}/>
          <Cetus cetus={this.state.cetus}/>
          <Planets planets={this.state.planets}/>
          <div className='warframe__update-info'>
            <span>
              Last update: {this.state.lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </span>
            <span>
              Next update: {this.state.nextUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
            </span>
          </div>
        </article>
      );
    }
  }
}

