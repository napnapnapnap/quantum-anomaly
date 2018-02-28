import React, {Component} from 'react';
import LoadingScreen from '../pages/LoadingScreen';

import Alerts from './alerts';
import Sortie from './sortie';
import Invasions from './invasions';
import Cetus from './cetus';

export default class WarframeStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: {}
    };
  };

  getData() {
    fetch('/api/get-warframe-status')
      .then(response => response.json())
      .then(response => {
        this.setState({
          status: response
        });
        console.log(response);
      });
  }

  componentWillMount() {
    this.getData();
    setInterval(this.getData.bind(this), 1000 * 60);
  }
  
  render() {
    if (Object.keys(this.state.status).length === 0) {
      return <LoadingScreen/>;
    } else {
      return (
        <section>
          <Alerts alerts={this.state.status.alerts}/>
          <Cetus cetus={this.state.status.cetus}/>
          <Invasions invasions={this.state.status.invasions}/>
          <Sortie sortie={this.state.status.sortie}/>
        </section>
      );
    }
  }
}
