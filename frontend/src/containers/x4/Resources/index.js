import React, {useEffect, useState} from 'react';
import {fetchX4Map} from '../../../redux/x4Actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {int, maps} from '../helpers';
import {dynamicSortMultiple, seo} from '../../../helpers';
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
      console.log(props.x4)
      props.x4.map.clusters.forEach(cluster => cluster.sectors.forEach((sector =>
        orderedSectors.push({
          id: sector.id,
          name: sector.name,
          owner: sector.owner,
          ore: sector.relativeResources && sector.relativeResources.ore > 0 ? sector.relativeResources.ore : null,
          silicon: sector.relativeResources && sector.relativeResources.silicon > 0 ? sector.relativeResources.silicon : null,
          ice: sector.relativeResources && sector.relativeResources.ice > 0 ? sector.relativeResources.ice : null,
          hydrogen: sector.relativeResources && sector.relativeResources.hydrogen > 0 ? sector.relativeResources.hydrogen : null,
          helium: sector.relativeResources && sector.relativeResources.helium > 0 ? sector.relativeResources.helium : null,
          methane: sector.relativeResources && sector.relativeResources.methane > 0 ? sector.relativeResources.methane : null,
          nividium: sector.relativeResources && sector.relativeResources.nividium > 0 ? sector.relativeResources.nividium : null,
          volume: sector.relativeResources && sector.relativeResources.volume ? sector.relativeResources.volume : null,
          // yea... I know, fix later...
          empty: !(sector.relativeResources && (
            sector.relativeResources.ore ||
            sector.relativeResources.silicon ||
            sector.relativeResources.ice ||
            sector.relativeResources.hydrogen ||
            sector.relativeResources.helium ||
            sector.relativeResources.methane ||
            sector.relativeResources.nividium
          ))
        })
      )));
      orderedSectors.sort(dynamicSortMultiple('name', 'owner'));
      seo({
        title: 'X4 Foundations Resource Table',
        metaDescription: 'X4 Foundations, Split Vendetta and Cradle of Humanity resource table.',
        keywords: `${orderedSectors.map(sector => sector.name).join(',')}`
      });
      setSectors(orderedSectors);
    }
  }, [props.x4.map]);

  return (
    <div className='x4-resources-table'>
      <h1>X4 Resource table v4.1</h1>
      {props.x4.map && (
        <React.Fragment>
          <div className='x4-resources-table__wrapper'>
            <div className='x4__map-controls'>
              <Link to={'/x4/map'} className='link'>Go to interactive map</Link>
              <span onClick={() => setShowEmpty(!showEmpty)}>
              {!showEmpty ? 'Hide' : 'Show'} empty systems
            </span>
            </div>
            <span className='x4-resources-table__method muted'>Method explained under the table</span>
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
                <th onClick={() => sortBy('volume')} className='number'>Volume (km³)</th>
              </tr>
              </thead>
              <tbody>
              {sectors.map(sector => (
                <React.Fragment key={sector.id}>
                  {(!sector.empty || !showEmpty) && (
                    <tr>
                      <td title={sector.id}>
                        {sector.name}<br/>
                      </td>
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
                      <td className='number'>
                        {int(sector.volume)} <br/>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              </tbody>
            </table>
          </div>
          <p className='long-text'>
            The game defines regions in each system. This is reference table which describes which resources you might
            find in each sector. The game describes cylinders, spheres, spline tubes and cubes as potential region which
            can have resources. For each of those regions volume was calculated and multiplied by density of the field.
            <span className='bold'> Falloff zones</span> were ignored in calculations. They will most likely be added in
            future. This means that extremes are a bit skewed, but still should provide good relative idea of what is
            where and how much of it is there. Since some zones are huge, the maximum volume used in calculation is:&nbsp;
            <span className='bold'>limited to 300 km in each direction</span>. This seems like good enough estimation for
            relative calculations later and out of 120 zones, 37 of them are clipped in this way.
          </p>
          <p className='long-text'>
            After that for each region we can have asteroids or a nebula. For each asteroid yield was calculated
            together with the density of those types of asteroids, including their noise level average. For each nebula
            similar was done, but game doesn't apply same rules there, so calculation is just based on region size
          </p>
          <p className='long-text'>
            Each zone can be have resources in either one of these states: lowest, verylow, low, medium, high and very
            high. These describe one more density modifier for asteroids and gather speed factor for nebula. They also
            describe replenish time for each zone. <span className='bold'>Replenish times</span> were ignored
            in calculations.
          </p>
          <p className='long-text'>
            At the end for each system, each of the resources was added together in total tally. Largest number of each
            resource was calculated on universe level. That number is fairly large for some systems which have
            large zones. Then that number set as "100 points" and the rest of numbers are in relation to that maximum.
            Since it could happen that a system might have more zones, there was risk of getting over 100 points,
            so maximum was limited to 99, even if system has more due to containing more rich or large zones.
          </p>
          <h3>Things to be aware of</h3>
          <ul className='ul--packed long-text'>
            <li>
              Just because something is high number of points, doesn't mean it is feasible, for example
              Grand Exchange IV region is practically infinite in size, so take that information into consideration.
            </li>
            <li>
              Each resource is tracked on it's own, 99 Ore and 99 Nividium doesn't mean there is as much Nividium as
              Ore. It only means that this is biggest yield of both of them in universe. Highest theoretical Ore
              yield is about 4 trillion units, while for Nividium is about 2 billion.
            </li>
            <li>
              Volume shown is all the fields in sector added together, hover on the value to see number of fields.
            </li>
            <li>
              File used for calculation are available here:&nbsp;
              <a href='/api/x4/resources' className='link' target='_blank'>Resources data</a>
            </li>
            <li>
              Full map data is available here: <a href='/api/x4/map' className='link' target='_blank'>Map data</a>
            </li>
            <li>
              Special thank you to&nbsp;
              <a href='https://www.nexusmods.com/users/2663?tab=user+files' className='link' target='_blank'>
                Allectus
              </a>, DeadAir and UniTrader from Egosoft discord for helping with calculations.
            </li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({x4: state.x4}),
  mapDispatchToProps = {fetchX4Map};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesTable);
