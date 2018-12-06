import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from '../../components/LoadingScreen';
import * as efsActions from '../../redux/efsActions';

const CPU_ID       = 48,
      PG_ID        = 11,
      CPU_USAGE_ID = 50,
      PG_USAGE_ID  = 30;

class Modules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:        [],
      showImposible: false,
      showT1:        true,
      showT2:        true,
      showFaction:   true,
      showOfficer:   true
    };

    this.expand            = this.expand.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    return this.props.fetchModuleGroups();
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
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

  isVisible(module) {
    let show = true,
        meta = module.meta_level,
        cpu  = module.data.dogma_attributes[CPU_USAGE_ID],
        pg   = module.data.dogma_attributes[PG_USAGE_ID];

    if (!this.state.showT1 && meta < 5) show = false;
    if (!this.state.showT2 && meta === 5) show = false;
    if (!this.state.showFaction && (meta > 5 && meta <= 9)) show = false;
    if (!this.state.showOfficer && (meta > 9)) show = false;

    if (!this.state.showImposible && this.props.ship) {
      if (this.props.ship.dogma_attributes[CPU_ID] * 2 < cpu || this.props.ship.dogma_attributes[PG_ID] * 2 < pg)
        show = false;
    }
    return show;
  }

  renderItems(modules) {
    return Object.keys(modules).map(key => (
      <React.Fragment key={key}>
        <h5>{key}</h5>
        <ul>
          {modules[key].map(module =>
            <li className={this.isVisible(module) ? 'modules__item' : 'modules__item modules__item--hidden'}
                title={module.name}
                key={module.id}>
              <img className="modules__item-image"
                   src={`https://image.eveonline.com/Type/${module.id}_32.png`}
                   alt="module.name" />
              <span className="modules__item-label">{module.name}</span>
            </li>
          )}
        </ul>
      </React.Fragment>
    ));
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

  renderMessage() {
    return (
      <React.Fragment>
        <h5>No group selected</h5><br />
        <p className="bold">Please select group</p><br /><br />
        <p>This fitting tool is still under development</p><br />
        <p>
          If you wish to show support and incrase motivation,
          you can donate ISK to Quantum Anomaly corporation in-game.
          Still no promises on when this tool will be ready.
        </p>
      </React.Fragment>
    );
  }

  renderFilters() {
    return (
      <React.Fragment>
        <label className="modules__checkbox" title="Toggle modules which take more than double of total fitting available for this ship">
          <input type="checkbox" name="showImposible" onChange={this.handleInputChange} defaultChecked={this.state.showImposible} />
          Show modules impossible to fit
        </label>
        <h5 className="modules__title">Item meta level</h5>
        <label className="modules__checkbox">
          <input type="checkbox" name="showT1" onChange={this.handleInputChange} defaultChecked={this.state.showT1} />
          T1
        </label>
        <label className="modules__checkbox">
          <input type="checkbox" name="showT2" onChange={this.handleInputChange} defaultChecked={this.state.showT2} />
          T2
        </label>
        <label className="modules__checkbox">
          <input type="checkbox" name="showFaction" onChange={this.handleInputChange} defaultChecked={this.state.showFaction} />
          Faction
        </label>
        <label className="modules__checkbox">
          <input type="checkbox" name="showOfficer" onChange={this.handleInputChange} defaultChecked={this.state.showOfficer} />
          Officer
        </label>
      </React.Fragment>
    );
  }

  render() {
    const moduleGroups = this.props.efsReducer.moduleGroups,
          modules      = this.props.efsReducer.modules;

    return (
      <section className="modules">
        <div className="modules__groups">
          <h5 className="modules__title">Modules</h5>
          {moduleGroups ? this.renderModules(moduleGroups) : <LoadingScreen />}
          {this.renderFilters()}
        </div>
        <div className="modules__group-items">
          {modules ? this.renderItems(modules) : this.renderMessage()}
        </div>
      </section>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...efsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Modules);
