import React, { useEffect } from 'react';
import { fetchX4Modifications } from '../../../redux/x4Actions';
import { connect } from 'react-redux';

import './Modifications.scss';
import { float } from '../helpers';
import { seo } from '../../../helpers';

const splitWords = arg => arg.replace('length', ' length')
  .replace('time', ' time')
  .replace('duration', ' duration')
  .replace('capacity', ' capacity')
  .replace('speed', ' speed')
  .replace('hull', '  hull')
  .replace('range', ' range')
  .replace('travel', ' travel ')
  .replace('recharge', ' recharge ')
  .replace('element', ' element ')
  .replace('thrust', ' thrust')
  .replace('regiondamage', 'region damage')
  .replace('radarcloak', 'radar cloak')
  .replace('hidecargochance', 'hide cargo chance')
  .replace(/  /g, ' ');

const percent = arg => {
  if (arg.min === '1.0' && arg.max === '1.0') return '-100%';
  return `${float((parseFloat(arg.min) - 1) * 100)}% to ${float((parseFloat(arg.max) - 1) * 100)}%`;
};
const chance = arg => `${float((parseFloat(arg)) * 100)}%`;

const RenderModifications = props => {
  return (
    <div className="x4-modifications__types">
      <h4 className="capitalize bold">{props.category} {splitWords(props.type)}</h4>
      <div className="x4-modifications__mods">
        {props.mods.map(mod => (
          <div key={mod.ware} className="x4-modifications__mod">
            <h5 className="bold">
              {mod.name} <span className="muted"> - {mod.description.split(' - ')[1]}</span>
            </h5>

            <div>
              <p className="no-mb mt-1 bold">Main modifier:</p>
              <p className="no-mb capitalize">
                {props.category} {mod.description.split(' - ')[0].replace(' Mod', '')}
              </p>
              <p className="x4-modifications__values">
                {percent({ min: mod.min, max: mod.max })}
              </p>
            </div>

            {mod.bonus && (
              <div className="x4-modifications__bonus">
                <p className="no-mb bold">Extra modifiers&nbsp;
                  <span className="muted">(up to {mod.bonus.max})</span>:
                </p>

                {Object.keys(mod.bonus).map(key => {
                  if (key === 'chance' || key === 'max') return null;
                  else return (
                    <div key={key} className="x4-modifications__bonus-item">
                      <p className="no-mb capitalize">
                        {props.category} {splitWords(key)}
                        {mod.bonus[key].weight && <span className="muted"> ({mod.bonus[key].weight})</span>}
                      </p>
                      <p className="no-mb">
                        {percent({ min: mod.bonus[key].min, max: mod.bonus[key].max })}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div>
              <p className="no-mb bold">Cost:</p>
              {mod.production.map(resource => (
                <span key={resource.ware} className="x4-modifications__mats">
                {resource.amount} {resource.ware}
              </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderModificationsGroups = props => {
  const { modifications } = props;

  return (
    <React.Fragment>
      {Object.keys(modifications.weapon).map(key =>
        <RenderModifications key={key} type={key} category="weapon" mods={modifications.weapon[key]} />)}
      {Object.keys(modifications.engine).map(key =>
        <RenderModifications key={key} type={key} category="engine" mods={modifications.engine[key]} />)}
      {Object.keys(modifications.ship).map(key =>
        <RenderModifications key={key} type={key} category="ship" mods={modifications.ship[key]} />)}
      {Object.keys(modifications.shield).map(key =>
        <RenderModifications key={key} type={key} category="shield" mods={modifications.shield[key]} />)}
    </React.Fragment>
  );
};

const Modifications = props => {
  useEffect(() => {
    if (!props.x4.modifications) {
      props.fetchX4Modifications();
    } else {
      const { equipmentmods } = props.x4.modifications;
      const modNames = Object.keys(equipmentmods).map(type => Object.keys(equipmentmods[type])
        .map(mod => equipmentmods[type][mod].map(mod => mod.name)));
      seo({
        title: 'X4 Foundations Modifications',
        metaDescription: 'X4 Foundations, Split Vendetta and Cradle of Humanity modifications.',
        keywords: `${modNames}`
      });
    }
  }, [props.x4.modifications]);

  return (
    <div className="x4-modifications">
      <h1>X4 Modifications</h1>
      {props.x4.modifications && <RenderModificationsGroups modifications={props.x4.modifications.equipmentmods} />}
    </div>
  );
};

const mapStateToProps = state => ({ x4: state.x4 }),
  mapDispatchToProps = { fetchX4Modifications };

export default connect(mapStateToProps, mapDispatchToProps)(Modifications);
