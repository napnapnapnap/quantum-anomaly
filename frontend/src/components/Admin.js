import React, {Component} from 'react';
import axios from 'axios';

const UPDATE_RATE = 30000;

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      esiGroups: [],
      currentJob: {
        name: null
      }
    };
    
    this.updateInformation = this.updateInformation.bind(this);
  }

  componentWillMount() {
    this.updateInformation();
    setInterval(this.updateInformation, UPDATE_RATE);
  }

  updateInformation() {
    return axios.get('/admin/esi/information').then(response => this.setState({...response.data}));
  }
  
  renderDate(date) {
    return (
      <React.Fragment>
        {(new Date(date)).toLocaleDateString('de-DE', {
            year:   '2-digit',
            month:  '2-digit',
            day:    '2-digit',
            hour:   '2-digit',
            minute: '2-digit'
          })
        }
      </React.Fragment>
    )
  }

  render() {
    return (
      <section className="admin">
        <h1>Admin page</h1>
        <div className="admin__section">
          <h4>ESI Data</h4>
          <ul>
            {this.state.esiGroups.map(group => (
              <li key={group.name} className="admin__list-item">
                <div className="admin__group">
                  <p className="admin__group-name">{group.name}</p>
                  <p className='admin__group-info'>
                    {(group.numberOfEntries - group.numberOfMissingEntries).toLocaleString('de-DE')} / {group.numberOfEntries.toLocaleString('de-DE')} entries<br/>
                    {this.renderDate(group.lastUpdate)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {this.state.currentJob.name !== null ? "Show disabled button and label" : "Show update button"}
        </div>
      </section>
    );
  }
}
