import React, {Component} from 'react';

import ShipsGroup from './Groups';
import LoadingScreen from '../../../componentsCommon/LoadingScreen';

export default class Ships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ships:        [],
      currentGroup: ''
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    fetch('/api/get-all-ships')
      .then(response => response.json())
      .then(response => {
        this.setState({
          ships:        response,
          currentGroup: Object.keys(response)[0]
        });
        console.log(response.Battleship.Minmatar[3]);
      });
  }

  change(event) {
    this.setState({currentGroup: event.target.value});
  }
  
  renderShipGroupSelector(options) {
    return (
      <select onChange={this.change} className="overview-ship__selector">
        {options.map(option => (
          <option value={option} key={option}>{option}</option>))}
      </select>
    );
  }

  renderMainView() {
    return (
      <section>
        <div className="overview-ship__selector">
          Ship Type: {this.renderShipGroupSelector(Object.keys(this.state.ships))}
        </div>
        <ShipsGroup ships={this.state.ships[this.state.currentGroup]} group={this.state.currentGroup}/>
      </section>
    );
  }

// <ShipsGroup ships={this.state.ships[group]} group={group} key={index}/>
  render() {
    return (
      <section className="overview-ships">
        {this.state.ships.length === 0 ?
          <LoadingScreen/> : this.renderMainView()}
      </section>
    );
  }
}
