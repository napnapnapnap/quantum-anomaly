import React, { useEffect } from 'react';

import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutClient from '../../../layouts/Client';
import {
  X4ModificationsGroupsInterface,
  X4ModificationsModInterface,
  getX4Modifications,
} from '../../../redux/x4/modifications';
import { formatDecimal } from '../x4-helpers';
import './Modifications.scss';

const splitWords = (arg: string) =>
  arg
    .replace('length', ' length')
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

const percent = (arg: { min: string; max: string }) => {
  if (arg.min === '1.0' && arg.max === '1.0') return '-100%';
  return `${formatDecimal((parseFloat(arg.min) - 1) * 100)}% to ${formatDecimal((parseFloat(arg.max) - 1) * 100)}%`;
};
const chance = (arg: string) => `${formatDecimal(parseFloat(arg) * 100)}%`;

const RenderModifications = ({
  type,
  category,
  mods,
}: {
  type: string;
  category: string;
  mods: X4ModificationsModInterface[];
}) => (
  <div className="x4-modifications__types">
    <h4 className="capitalize bold">
      {category} {splitWords(type)}
    </h4>
    <div className="x4-modifications__mods">
      {mods.map((mod) => (
        <div key={mod.ware} className="x4-modifications__mod">
          <h2 className="h6">
            {mod.name} <span className="muted"> - {mod.description.split(' - ')[1]}</span>
          </h2>

          <div>
            <p className="no-mb mt-1 text--bold">Main modifier:</p>
            <p className="no-mb capitalize">
              {category} {mod.description.split(' - ')[0].replace(' Mod', '')}
            </p>
            <p className="x4-modifications__values">{percent({ min: mod.min, max: mod.max })}</p>
          </div>

          {mod.bonus && (
            <div className="x4-modifications__bonus">
              <p className="no-mb bold">
                Extra modifiers&nbsp;
                <span className="muted">(up to {mod.bonus.max} modifiers)</span>:
                {/*<span className="muted">(total weight {mod.totalWeight})</span>*/}
              </p>

              {Object.keys(mod.bonus).map((key) => {
                if (key === 'chance' || key === 'max') return null;
                else
                  return (
                    <div key={key} className="x4-modifications__bonus-item">
                      <p className="no-mb capitalize">
                        {category} {splitWords(key)}
                        {/*{mod.bonus[key].weight && <span className="muted"> ({mod.bonus[key].weight})</span>}*/}
                      </p>
                      <p className="no-mb">{percent({ min: mod.bonus[key].min, max: mod.bonus[key].max })}</p>
                      {mod.bonus[key].weight && (
                        <span className="text--muted text--small">
                          Chance to get {chance(mod.bonus[key].chanceToGet)}
                        </span>
                      )}
                    </div>
                  );
              })}
            </div>
          )}

          <div>
            <p className="no-mb text--bold">Cost:</p>
            {mod.production.map((resource) => (
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

const ModificationsGroups = ({ modifications }: { modifications: X4ModificationsGroupsInterface }) => (
  <React.Fragment>
    {Object.keys(modifications.weapon).map((key) => (
      <RenderModifications key={key} type={key} category="weapon" mods={modifications.weapon[key]} />
    ))}
    {Object.keys(modifications.engine).map((key) => (
      <RenderModifications key={key} type={key} category="engine" mods={modifications.engine[key]} />
    ))}
    {Object.keys(modifications.ship).map((key) => (
      <RenderModifications key={key} type={key} category="ship" mods={modifications.ship[key]} />
    ))}
    {Object.keys(modifications.shield).map((key) => (
      <RenderModifications key={key} type={key} category="shield" mods={modifications.shield[key]} />
    ))}
  </React.Fragment>
);

const X4Modifications = () => {
  const dispatch = useAppDispatch();
  const { modifications } = useAppSelector((state) => state.x4Modifications);

  useEffect(() => {
    if (Object.keys(modifications).length === 0) {
      dispatch(getX4Modifications());
    } else {
      const modNames = Object.keys(modifications.equipmentmods).map((type) =>
        Object.keys(modifications.equipmentmods[type]).map((mod) =>
          modifications.equipmentmods[type][mod].map((mod) => mod.name)
        )
      );

      seo({
        title: 'X4 Foundations Modifications',
        metaDescription: 'X4 Foundations, Split Vendetta and Cradle of Humanity modifications.',
        keywords: modNames.join().split(', '),
      });
    }
  }, [modifications]);

  return (
    <LayoutClient>
      <div className="x4-modifications">
        <h1>X4 Modifications</h1>
        {Object.keys(modifications).length !== 0 && <ModificationsGroups modifications={modifications.equipmentmods} />}
      </div>
    </LayoutClient>
  );
};

export default X4Modifications;
