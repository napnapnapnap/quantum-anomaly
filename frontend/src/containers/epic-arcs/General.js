import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as epicArcsActions from '../../redux/epicArcsActions';
import * as eveNpcsActions from '../../redux/eveNpcsActions';

class EpicArcsGeneral extends Component {
  render() {
    return (
      <article className="epic-arcs">
        <h1>General guidelines and overview</h1>
      </article>
    )
  }
}

const mapStateToProps    = state => {
    return {epicArcs: state.epicArcs, eveNpcs: state.eveNpcs};
  },
  mapDispatchToProps = {...epicArcsActions, ...eveNpcsActions};

export default connect(mapStateToProps, mapDispatchToProps)(EpicArcsGeneral);
