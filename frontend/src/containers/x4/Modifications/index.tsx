import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import Checkbox from '../../../components/Inputs/Checkbox';
import Input from '../../../components/Inputs/Input';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
import { X4ModificationsModInterface, getX4Modifications } from '../../../redux/x4/modifications';
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

const applySearch = (category: string, mod: X4ModificationsModInterface, searchTerm: string) => {
  let shouldDisplay = false;

  if (searchTerm.length > 3) {
    const modAttribute = mod.description.split(' - ')[0].replace(' Mod', '').toLowerCase();
    const fullModAttribute = `${category.toLowerCase()} ${modAttribute}`;
    if (fullModAttribute.indexOf(searchTerm.toLowerCase()) !== -1) shouldDisplay = true;
    else if (mod.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) shouldDisplay = true;
    else if (mod.bonus) {
      Object.keys(mod.bonus).forEach((key) => {
        const fullModAttribute = `${category.toLowerCase()} ${splitWords(key).toLowerCase()}`;
        if (fullModAttribute.indexOf(searchTerm.toLowerCase()) !== -1) shouldDisplay = true;
      });
    }
  } else return true;

  return shouldDisplay;
};

const applyQualityFilter = (
  qualityFilter: { basic: boolean; enhanced: boolean; exceptional: boolean },
  mod: X4ModificationsModInterface
) => {
  let shouldDisplay = false;
  if (mod.description.split(' - ')[1] === 'Basic Quality' && qualityFilter.basic) shouldDisplay = true;
  if (mod.description.split(' - ')[1] === 'Enhanced Quality' && qualityFilter.enhanced) shouldDisplay = true;
  if (mod.description.split(' - ')[1] === 'Exceptional Quality' && qualityFilter.exceptional) shouldDisplay = true;
  return shouldDisplay;
};

const applyPartFilter = (
  partFilter: { engine: boolean; ship: boolean; weapon: boolean; shield: boolean },
  category: string
) => {
  let shouldDisplay = false;
  if (category === 'engine' && partFilter.engine) shouldDisplay = true;
  if (category === 'ship' && partFilter.ship) shouldDisplay = true;
  if (category === 'weapon' && partFilter.weapon) shouldDisplay = true;
  if (category === 'shield' && partFilter.shield) shouldDisplay = true;
  return shouldDisplay;
};

const RenderModifications = ({
  category,
  mods,
  searchTerm,
  qualityFilter,
  partFilter,
}: {
  category: string;
  mods: X4ModificationsModInterface[];
  searchTerm: string;
  qualityFilter: { basic: boolean; enhanced: boolean; exceptional: boolean };
  partFilter: { engine: boolean; ship: boolean; weapon: boolean; shield: boolean };
}) => (
  <>
    {mods.map((mod) =>
      applySearch(category, mod, searchTerm) &&
      applyQualityFilter(qualityFilter, mod) &&
      applyPartFilter(partFilter, category) ? (
        <tr key={mod.ware} className="x4-modifications__mod">
          <td>
            <p className="text--capitalize text--bold">
              {mod.name}
              <span
                className={clsx('text--xs x4-modifications__quality', {
                  'x4-modifications__quality--basic': mod.description.split(' - ')[1] === 'Basic Quality',
                  'x4-modifications__quality--enhanced': mod.description.split(' - ')[1] === 'Enhanced Quality',
                  'x4-modifications__quality--exceptional': mod.description.split(' - ')[1] === 'Exceptional Quality',
                })}
              >
                {mod.description.split(' - ')[1]}
              </span>
            </p>
            <p className="text--capitalize text--bold mt-1">
              {category} {mod.description.split(' - ')[0].replace(' Mod', '')}
            </p>
            <p className="text--smaller">Bonus: {percent({ min: mod.min, max: mod.max })}</p>
            {mod.bonus && <p className="text--xs text--bold mt-1">+ {mod.bonus.max} extra modifiers</p>}
          </td>

          <td>
            {mod.bonus && (
              <>
                {Object.keys(mod.bonus).map((key) => {
                  if (key === 'chance' || key === 'max') return <React.Fragment key={key} />;
                  else
                    return (
                      <React.Fragment key={key}>
                        <p className="text--capitalize text--bold mt-1">
                          {category} {splitWords(key)}&nbsp;
                          {mod.bonus[key].weight && (
                            <span className="text--muted text--xs">{chance(mod.bonus[key].chanceToGet)} chance</span>
                          )}
                        </p>
                        <p className="text--smaller">
                          Bonus: {percent({ min: mod.bonus[key].min, max: mod.bonus[key].max })}
                        </p>
                      </React.Fragment>
                    );
                })}
              </>
            )}
          </td>

          <td>
            {mod.production.map((resource) => (
              <p className="text--smaller text--capitalize mt-1" key={resource.ware}>
                {resource.amount} {resource.ware}
              </p>
            ))}
          </td>
        </tr>
      ) : (
        <React.Fragment key={mod.ware}></React.Fragment>
      )
    )}
  </>
);
const X4Modifications = () => {
  const dispatch = useAppDispatch();
  const { modifications } = useAppSelector((state) => state.x4Modifications);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [qualityFilter, setQualityFilter] = useState({
    basic: true,
    enhanced: true,
    exceptional: true,
  });
  const [partFilter, setPartFilter] = useState({
    engine: true,
    shield: true,
    ship: true,
    weapon: true,
  });

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
        metaDescription:
          'X4 Foundations, Split Vendetta, Cradle of Humanity, Tides of Avarice and Kingdom End' + ' modifications.',
        keywords: modNames.join().split(', '),
      });
    }
  }, [dispatch, modifications]);

  return (
    <LayoutBase>
      <div className="x4-modifications">
        <h1>X4 Modifications</h1>
        <div className="x4-modifications__controls">
          <div>
            <p className="text--bold">Search</p>
            <Input
              placeholder="Mod name or effect..."
              type="text"
              value={searchTerm}
              name="searchTerm"
              handleInputChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <p className="text--bold">Quality Filters</p>
            <Checkbox
              label="Basic"
              name="basic"
              checked={qualityFilter.basic}
              labelClassName="x4-modifications__quality--basic"
              handleInputChange={() => setQualityFilter({ ...qualityFilter, basic: !qualityFilter.basic })}
            />
            <Checkbox
              label="Enhanced"
              name="basic"
              checked={qualityFilter.enhanced}
              labelClassName="x4-modifications__quality--enhanced"
              handleInputChange={() => setQualityFilter({ ...qualityFilter, enhanced: !qualityFilter.enhanced })}
            />
            <Checkbox
              label="Exceptional"
              name="basic"
              checked={qualityFilter.exceptional}
              labelClassName="x4-modifications__quality--exceptional"
              handleInputChange={() => setQualityFilter({ ...qualityFilter, exceptional: !qualityFilter.exceptional })}
            />
          </div>
          <div>
            <p className="text--bold">Ship Part</p>
            <Checkbox
              label="Ship Chassis"
              name="ship"
              checked={partFilter.ship}
              handleInputChange={() => setPartFilter({ ...partFilter, ship: !partFilter.ship })}
            />
            <Checkbox
              label="Weapons and Turrets"
              name="weapon"
              checked={partFilter.weapon}
              handleInputChange={() => setPartFilter({ ...partFilter, weapon: !partFilter.weapon })}
            />
            <Checkbox
              label="Shields"
              name="shield"
              checked={partFilter.shield}
              handleInputChange={() => setPartFilter({ ...partFilter, shield: !partFilter.shield })}
            />
            <Checkbox
              label="Engines"
              name="engine"
              checked={partFilter.engine}
              handleInputChange={() => setPartFilter({ ...partFilter, engine: !partFilter.engine })}
            />
          </div>
        </div>
        <br />
        <div className="x4-modifications__wrapper">
          {Object.keys(modifications).length !== 0 && (
            <table className="x4-modifications__table">
              <thead>
                <tr>
                  <th>Mod</th>
                  <th>Extra modifier</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(modifications.equipmentmods.weapon).map((key) => (
                  <RenderModifications
                    qualityFilter={qualityFilter}
                    partFilter={partFilter}
                    searchTerm={searchTerm}
                    key={key}
                    category="weapon"
                    mods={modifications.equipmentmods.weapon[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.engine).map((key) => (
                  <RenderModifications
                    qualityFilter={qualityFilter}
                    partFilter={partFilter}
                    searchTerm={searchTerm}
                    key={key}
                    category="engine"
                    mods={modifications.equipmentmods.engine[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.ship).map((key) => (
                  <RenderModifications
                    qualityFilter={qualityFilter}
                    partFilter={partFilter}
                    searchTerm={searchTerm}
                    key={key}
                    category="ship"
                    mods={modifications.equipmentmods.ship[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.shield).map((key) => (
                  <RenderModifications
                    qualityFilter={qualityFilter}
                    partFilter={partFilter}
                    searchTerm={searchTerm}
                    key={key}
                    category="shield"
                    mods={modifications.equipmentmods.shield[key]}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LayoutBase>
  );
};

export default X4Modifications;
