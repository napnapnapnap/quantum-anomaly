import React, { useEffect, useState } from "react";
import { fetchX4Map } from "../../../redux/x4Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { float, int, maps } from "../helpers";
import { dynamicSortMultiple, seo } from "../../../helpers";
import "./Resources.scss";

const ORE_SILICON_CAP = 1000000000;
const ICE_CAP = 200000000;
const NIVIDIUM_CAP = 8000000;
const HYDROGEN_HELIUM_CAP = 2000000;
const METHANE_CAP = 8000000;

export const ResourcesTable = props => {
  const [sort, setSort] = useState("name");
  const [showEmpty, setShowEmpty] = useState("false");
  const [sectors, setSectors] = useState([]);
  const sortBy = arg => setSort(arg === sort ? `-${arg}` : arg);

  useEffect(() => {
    setSectors([...sectors].sort(dynamicSortMultiple(sort, "name", "owner")));
  }, [sort]);

  useEffect(() => {
    if (!props.x4.map) {
      props.fetchX4Map();
    } else {
      const orderedSectors = [];
      props.x4.map.clusters.forEach(cluster => cluster.sectors.forEach((sector =>
          orderedSectors.push({
            id: sector.name,
            name: sector.label,
            owner: sector.owner || "neutral",
            ore: sector.resourcePoints && sector.resourcePoints.ore > 0 ? sector.resourcePoints.ore : null,
            silicon: sector.resourcePoints && sector.resourcePoints.silicon > 0 ? sector.resourcePoints.silicon : null,
            ice: sector.resourcePoints && sector.resourcePoints.ice > 0 ? sector.resourcePoints.ice : null,
            hydrogen: sector.resourcePoints && sector.resourcePoints.hydrogen > 0 ? sector.resourcePoints.hydrogen : null,
            helium: sector.resourcePoints && sector.resourcePoints.helium > 0 ? sector.resourcePoints.helium : null,
            methane: sector.resourcePoints && sector.resourcePoints.methane > 0 ? sector.resourcePoints.methane : null,
            nividium: sector.resourcePoints && sector.resourcePoints.nividium > 0 ? sector.resourcePoints.nividium : null,
            numberOfFields: sector.resources ? sector.resources.length : 0,
            fields: sector.resources ? sector.resources.map(r => `${r.name} - ${r.miningRegionVolume} km3`) : null,
            empty: !sector.resourcePoints,
          })
      )));
      orderedSectors.sort(dynamicSortMultiple("name", "owner"));
      seo({
        title: "X4 Foundations Resource Table",
        metaDescription: "X4 Foundations, Split Vendetta and Cradle of Humanity resource table.",
        keywords: `${orderedSectors.map(sector => sector.name).join(",")}`
      });
      setSectors(orderedSectors);
    }
  }, [props.x4.map]);

  return (
    <div className="x4-resources-table">
      <h1>X4 Resource table v5.0</h1>
      {props.x4.map && (
        <React.Fragment>
          <div className="x4-resources-table__wrapper">
            <div className="x4__map-controls">
              <Link to={"/x4/map"} className="link">Go to interactive map</Link>
              <span onClick={() => setShowEmpty(!showEmpty)}>
              {!showEmpty ? "Hide" : "Show"} empty systems
            </span>
            </div>
            <span className="x4-resources-table__method muted">Method explained under the table</span>
            <table>
              <thead>
                <tr>
                  <th onClick={() => sortBy("name")}>System</th>
                  <th onClick={() => sortBy("owner")}>Owner</th>
                  <th onClick={() => sortBy("ore")} className="number">Ore</th>
                  <th onClick={() => sortBy("silicon")} className="number">Silicon</th>
                  <th onClick={() => sortBy("ice")} className="number">Ice</th>
                  <th onClick={() => sortBy("hydrogen")} className="number">Hydrogen</th>
                  <th onClick={() => sortBy("helium")} className="number">Helium</th>
                  <th onClick={() => sortBy("methane")} className="number">Methane</th>
                  <th onClick={() => sortBy("nividium")} className="number">Nividium</th>
                  <th onClick={() => sortBy("numberOfFields")} className="number">Number of fields</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map(sector => (
                  <React.Fragment key={sector.id}>
                    {(!sector.empty || !showEmpty) && (
                      <tr>
                        <td title={sector.id}>
                          {sector.name}<br />
                        </td>
                        <td>{sector.owner !== "neutral" ? maps.factions[sector.owner] : "Neutral"}</td>

                        {["ore", "silicon", "ice", "hydrogen", "helium", "methane", "nividium"].map(resource => {
                          let title = sector[resource] === 1 ? "Up to maximum of " : "At least ";

                          if (resource === "ore" || resource === "silicon")
                            title += `${int(sector[resource] / 100 * ORE_SILICON_CAP)} ${resource}`;
                          if (resource === "ice")
                            title += `${int(sector[resource] / 100 * ICE_CAP)} ${resource}`;
                          if (resource === "nividium")
                            title += `${int(sector[resource] / 100 * NIVIDIUM_CAP)} ${resource}`;
                          if (resource === "hydrogen" || resource === "helium")
                            title += `${int(sector[resource] / 100 * HYDROGEN_HELIUM_CAP)} ${resource}`;
                          if (resource === "methane")
                            title += `${int(sector[resource] / 100 * METHANE_CAP)} ${resource}`;

                          return (
                            <td className="number" key={`${sector.id}${resource}`}>
                              {sector[resource] &&
                                <span title={title} style={{ borderColor: maps.resourceColors[resource] }}>
                            {sector[resource]}
                          </span>}
                            </td>
                          );
                        })}
                        <td title={sector.numberOfFields !== 0 ? sector.fields.join('\n') : "No fields in this system"} className="number">
                          {int(sector.numberOfFields)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="long-text">
            Since some zones are huge, the maximum volume used in calculation is&nbsp;
            <span className="bold">limited to 200 km x 200 km x 100 km</span>. This seems like good enough estimation
            for relative calculations so that your ships don't have to fly to far out.
          </p>
          <p className="long-text">
            <span className="bold"> Falloff zones</span> were ignored in calculations. They will most likely be added in
            future. This means that extremes are a bit skewed, but still should provide good relative idea of what is
            where and how much of it is there.
          </p>
          <p className="long-text">
            <span className="bold">What do the numbers mean?</span><br />
            Each resource has a cap, this was done so that there can be relative number which displays how good the
            system is for mining in comparison with other systems. These caps are set as following:<br /><br />
            Ore and Silicon: {int(1000000000)}<br />
            Ice: {int(200000000)}<br />
            Nividium: {int(8000000)}<br />
            Hydrogen and Helium: {int(2000000)}<br />
            Methane: {int(8000000)}<br /><br />
            This in effect means that each region which is marked as "99" will contain at least that amount of given
            resource. The numbers were chosen based on observed gameplay and then adjusted slightly to have better
            spread.
          </p>
          <ul className="ul--packed long-text">
            <li>
              Full map data is available here: <a href="/api/x4/map" className="link" target="_blank">Map data</a>
            </li>
            <li>
              Special thank you to&nbsp;
              <a href="https://www.nexusmods.com/users/2663?tab=user+files" className="link" target="_blank">
                Allectus
              </a>, DeadAir and UniTrader from Egosoft discord for helping with calculations.
            </li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({ x4: state.x4 }),
  mapDispatchToProps = { fetchX4Map };

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesTable);
