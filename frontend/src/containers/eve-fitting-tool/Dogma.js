import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as efsActions from '../../redux/efsActions';

class Dogma extends Component {
  componentWillMount() {
    if(!this.props.efsReducer.dogmaAttributes) this.props.fetchDogma();
  }

  render(id) {
    return (
      <div className='dogma'>
        Dogma
      </div>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Dogma);
