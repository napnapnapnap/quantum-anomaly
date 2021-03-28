import React, {useEffect, useState} from 'react';
import {fetchX4Map} from '../../../redux/x4Actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {maps} from '../helpers';
import {dynamicSortMultiple} from '../../../helpers';
import './Resources.scss';

export const ResourcesTable = props => {
  const [sort, setSort] = useState('name');
  const [showEmpty, setShowEmpty] = useState('false');
  const [sectors, setSectors] = useState([]);
  const sortBy = arg => setSort(arg === sort ? `-${arg}` : arg);

  useEffect(() => {
    setSectors([...sectors].sort(dynamicSortMultiple(sort, 'name', 'owner')));
  }, [sort]);

  useEffect(() => {
    if (!props.x4.map) {
      props.fetchX4Map();
    } else {
      const orderedSectors = [];
      props.x4.map.systems.forEach(system => system.sectors.forEach(sector =>
        orderedSectors.push({
          id: sector.id,
          name: sector.name,
          owner: system.owner,
          ore: sector.resources && sector.resources.ore > 0 ? sector.resources.ore : null,
          silicon: sector.resources && sector.resources.silicon > 0 ? sector.resources.silicon : null,
          ice: sector.resources && sector.resources.ice > 0 ? sector.resources.ice : null,
          hydrogen: sector.resources && sector.resources.hydrogen > 0 ? sector.resources.hydrogen : null,
          helium: sector.resources && sector.resources.helium > 0 ? sector.resources.helium : null,
          methane: sector.resources && sector.resources.methane > 0 ? sector.resources.methane : null,
          nividium: sector.resources && sector.resources.nividium > 0 ? sector.resources.nividium : null,
          // yea... I know, fix later...
          empty: !(sector.resources && (
            sector.resources.ore ||
            sector.resources.silicon ||
            sector.resources.ice ||
            sector.resources.hydrogen ||
            sector.resources.helium ||
            sector.resources.methane ||
            sector.resources.nividium
          ))
        })
      ));
      orderedSectors.sort(dynamicSortMultiple('name', 'owner'));
      setSectors(orderedSectors);
    }
  }, [props.x4.map]);

  return (
    <div className='x4-resources-table'>
      <h1>X4 Resource table v4.0</h1>
      {props.x4.map && (
        <React.Fragment>
          <div className='x4__map-controls'>
            <Link to={'/x4/map'} className='link'>Go to interactive map</Link>
            <span onClick={() => setShowEmpty(!showEmpty)}>
              {!showEmpty ? 'Hide' : 'Show'} empty systems
            </span>
          </div>
          <div className='x4-resources-table__wrapper'>
            <table>
              <thead>
              <tr>
                <th onClick={() => sortBy('name')}>System</th>
                <th onClick={() => sortBy('owner')}>Owner</th>
                <th onClick={() => sortBy('ore')} className='number'>Ore</th>
                <th onClick={() => sortBy('silicon')} className='number'>Silicon</th>
                <th onClick={() => sortBy('ice')} className='number'>Ice</th>
                <th onClick={() => sortBy('hydrogen')} className='number'>Hydrogen</th>
                <th onClick={() => sortBy('helium')} className='number'>Helium</th>
                <th onClick={() => sortBy('methane')} className='number'>Methane</th>
                <th onClick={() => sortBy('nividium')} className='number'>Nividium</th>
              </tr>
              </thead>
              <tbody>
              {sectors.map(sector => (
                <React.Fragment key={sector.id}>
                  {(!sector.empty || !showEmpty) && (
                    <tr>
                      <td title={sector.id}>{sector.name}</td>
                      <td>{maps.factions[sector.owner] || 'Neutral'}</td>

                      {['ore', 'silicon', 'ice', 'hydrogen', 'helium', 'methane', 'nividium'].map(resource => (
                        <td className='number' key={`${sector.id}${resource}`}>
                          {sector[resource]
                            ? <span title={resource}
                                    style={{borderColor: maps.resourceColors[resource]}}>{sector[resource]}</span>
                            : null
                          }
                        </td>
                      ))}
                    </tr>
                  )}
                </React.Fragment>
              ))}
              </tbody>
            </table>
          </div>
          <p>
            The game defines regions in each system. Tthis is reference table which describes which resources you might
            find in each sector.
          </p>
          <p>
            Each zone can be have resources in either one of these states: lowest: 1, verylow: 2, low: 3, medium: 5,
            high: 10, very high: 20.
          </p>
          <p>
            For each resource the number is calcualated based on availability in given system. Zones affect how much and
            how fast resource generates. Low numbers are really not that good for
            supporting complex factories, but for simple ones you can assume there will be enough resource to cover the
            needs.
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Map};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesTable);
