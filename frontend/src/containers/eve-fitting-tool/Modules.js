import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      active: []
    };
    this.expand = this.expand.bind(this);
  }

  componentWillMount() {
    return this.props.fetchModuleGroups();
  }

  expand(e, id, level, hasOnlyItems) {
    e.stopPropagation();
    let active        = [...this.state.active],
        currentlength = active.length;

    if (level === 0 && active[0] === id) {
      // if clicking on saem top level one, then remove it from expaneded
      active = [];
    } else if (level === 0) {
      // initial state and every other top level click
      active = [];
      active.push(id);
    } else if (currentlength === level + 1 && active[level] === id) {
      // same element clicked, toogle
      active = active.slice(0, level);
    } else if (currentlength === level) {
      // any click which is natural progression deeper into three
      active.push(id);
    } else if (currentlength > level) {
      // in case of selecting something inside current tree, but higher than deepest expanded
      active = active.slice(0, level);
      active.push(id);
    }
    this.setState({active: active});

    if (hasOnlyItems) {
      this.props.fetchModuleGroup(id);
    }
  }

  renderItems(modules) {
    return (
      <ul>
        {modules.map(module =>
          <li className="modules__item" title={module.name} key={module.id}>
            <img className="modules__item-image"
                 src={`https://image.eveonline.com/Type/${module.id}_32.png`}
                 alt="module.name" />
            <span className="modules__item-label">{module.name}</span>
          </li>
        )}
      </ul>
    );
  }

  renderSubgroups(tree, level = 0) {
    const isVisible    = this.state.active.indexOf(tree.id) !== -1,
          hasOnlyItems = !tree.subgroups;

    return (
      <li className={level === 0 ? 'modules__subgroup' : 'modules__subgroup modules__subgroup--border'} key={tree.id}>
        <button className="btn modules__expand-indicator" onClick={e => this.expand(e, tree.id, level, hasOnlyItems)}>
          {isVisible ? '-' : '+'}
        </button>
        <p className={isVisible ? 'modules__subgroup-title bold' : 'modules__subgroup-title'} onClick={e => this.expand(e, tree.id, level, hasOnlyItems)}>
          {tree.name}
        </p>
        {tree.subgroups ?
          <ul className={isVisible ? 'modules__subgroup-section modules__subgroup-section--expanded' : 'modules__subgroup-section'}>
            {tree.subgroups.map(subgroup => this.renderSubgroups(subgroup, level + 1))}
          </ul> : null
        }
      </li>
    );
  }

  renderModules(modules) {
    return (
      <React.Fragment>
        {modules.map(topLevelModule => (
          <ul className="modules__top-level-item" key={topLevelModule.id}>
            {this.renderSubgroups(topLevelModule)}
          </ul>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const moduleGroups = this.props.efsReducer.moduleGroups,
          modules      = this.props.efsReducer.modules;

    return (
      <section className="modules">
        <h5 className="modules__title">Modules</h5>
        <div className="modules__groups">
          {moduleGroups ? this.renderModules(moduleGroups) : <LoadingScreen />}
        </div>
        <div className="modules__group-items">
          {modules ? this.renderItems(modules) :
            <React.Fragment>
              <p className="bold">Please select group</p><br/><br/>
              <p>This fitting tool is still under development</p><br/>
              <p>
                If you wish to show support and incrase motivation,
                you can donate ISK to Quantum Anomaly corporation in-game.
                Still no promises on when this tool will be ready.
              </p>
            </React.Fragment>}
        </div>
      </section>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
