import React, { useEffect, useState } from 'react';

import Checkbox from '../../../components/Inputs/Checkbox';
import Input from '../../../components/Inputs/Input';
import { seo } from '../../../helpers';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import LayoutBase from '../../../layouts/Base';
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

const applySearch = (category: string, mod: X4ModificationsModInterface, searchTerm: string) => {
  let shouldDisplay = false;

  if (searchTerm.length > 3) {
    const modAttribute = mod.description.split(' - ')[0].replace(' Mod', '').toLowerCase();
    const fullModAttribute = `${category.toLowerCase()} ${modAttribute}`;
    if (fullModAttribute.indexOf(searchTerm.toLowerCase()) !== -1) shouldDisplay = true;

    if (mod.bonus) {
      Object.keys(mod.bonus).forEach((key) => {
        const fullModAttribute = `${category.toLowerCase()} ${splitWords(key).toLowerCase()}`;
        if (fullModAttribute.indexOf(searchTerm.toLowerCase()) !== -1) shouldDisplay = true;
      });
    }
  } else return true;

  return shouldDisplay;
};

const applyFilter = (basic: boolean, enhanced: boolean, exceptional: boolean, mod: X4ModificationsModInterface) => {
  let shouldDisplay = false;
  if (mod.description.split(' - ')[1] === 'Basic Quality' && basic) shouldDisplay = true;
  if (mod.description.split(' - ')[1] === 'Enhanced Quality' && enhanced) shouldDisplay = true;
  if (mod.description.split(' - ')[1] === 'Exceptional Quality' && exceptional) shouldDisplay = true;
  return shouldDisplay;
};

const RenderModifications = ({
  category,
  mods,
  searchTerm,
  basic,
  enhanced,
  exceptional,
}: {
  category: string;
  mods: X4ModificationsModInterface[];
  searchTerm: string;
  basic: boolean;
  enhanced: boolean;
  exceptional: boolean;
}) => (
  <>
    {mods.map((mod) =>
      applySearch(category, mod, searchTerm) && applyFilter(basic, enhanced, exceptional, mod) ? (
        <tr key={mod.ware} className="x4-modifications__mod">
          <td>
            <span className="capitalize bold">{mod.name}</span>
            <br />
            <span>{mod.description.split(' - ')[1]}</span>
          </td>

          <td>
            <span className="capitalize bold">
              {category} {mod.description.split(' - ')[0].replace(' Mod', '')}
            </span>
            <br />
            <span>Bonus: {percent({ min: mod.min, max: mod.max })} </span>
          </td>

          <td>
            {mod.bonus && (
              <>
                {Object.keys(mod.bonus).map((key) => {
                  if (key === 'chance' || key === 'max') return <React.Fragment key={key} />;
                  else
                    return (
                      <React.Fragment key={key}>
                        <div>
                          <span className="bold capitalize">
                            {category} {splitWords(key)}&nbsp;
                          </span>
                          {mod.bonus[key].weight && (
                            <span className="text--muted text--smaller">
                              (chance {chance(mod.bonus[key].chanceToGet)})
                            </span>
                          )}
                        </div>
                        <span className="no-mb">
                          Bonus: {percent({ min: mod.bonus[key].min, max: mod.bonus[key].max })}
                        </span>
                        <br />
                      </React.Fragment>
                    );
                })}
                <span className="muted bold">Maximum of {mod.bonus.max}</span> <br />
              </>
            )}
          </td>

          <td>
            {mod.production.map((resource) => (
              <span key={resource.ware}>
                {resource.amount} {resource.ware}
                <br />
              </span>
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

  const [basic, setBasic] = useState(true);
  const [enhanced, setEnhanced] = useState(true);
  const [exceptional, setExceptional] = useState(true);

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
  }, [dispatch, modifications]);

  return (
    <LayoutBase>
      <div className="x4-modifications">
        <h1>X4 Modifications</h1>
        <div className="x4-modifications__controls">
          <Input
            label="Search:"
            placeholder="Weapon damage..."
            type="text"
            value={searchTerm}
            name="searchTerm"
            handleInputChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <Checkbox label="Basic" name="basic" checked={basic} handleInputChange={() => setBasic(!basic)} />
            <Checkbox
              label="Enhanced"
              name="basic"
              checked={enhanced}
              handleInputChange={() => setEnhanced(!enhanced)}
            />
            <Checkbox
              label="Exceptional"
              name="basic"
              checked={exceptional}
              handleInputChange={() => setExceptional(!exceptional)}
            />
          </div>
        </div>
        <br />
        <div className="x4-modifications__wrapper">
          {Object.keys(modifications).length !== 0 && (
            <table className="x4-modifications__table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Modifier</td>
                  <td>Extra modifier</td>
                  <td>Cost</td>
                </tr>
              </thead>
              <tbody>
                {Object.keys(modifications.equipmentmods.weapon).map((key) => (
                  <RenderModifications
                    basic={basic}
                    enhanced={enhanced}
                    exceptional={exceptional}
                    searchTerm={searchTerm}
                    key={key}
                    category="weapon"
                    mods={modifications.equipmentmods.weapon[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.engine).map((key) => (
                  <RenderModifications
                    basic={basic}
                    enhanced={enhanced}
                    exceptional={exceptional}
                    searchTerm={searchTerm}
                    key={key}
                    category="engine"
                    mods={modifications.equipmentmods.engine[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.ship).map((key) => (
                  <RenderModifications
                    basic={basic}
                    enhanced={enhanced}
                    exceptional={exceptional}
                    searchTerm={searchTerm}
                    key={key}
                    category="ship"
                    mods={modifications.equipmentmods.ship[key]}
                  />
                ))}
                {Object.keys(modifications.equipmentmods.shield).map((key) => (
                  <RenderModifications
                    basic={basic}
                    enhanced={enhanced}
                    exceptional={exceptional}
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
