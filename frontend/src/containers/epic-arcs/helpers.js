import React from 'react';

export function renderList(label, values, separated) {
  return (
    <div className="arcs__list">
      <p className="arcs__list-label">{label}:</p>
      <ul className="arcs__list-values">
        {values.map((value, index) => (
          <li className={separated ? 'arcs__list-value arcs__info-separated' : 'arcs__list-value'} key={index}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function renderSegment(label, value) {
  return (
    <div className="arcs__list">
      <p className="arcs__list-label">{label}:</p>
      <p className="">{value}</p>
    </div>
  );
}

export function renderMissionSegment(label, value) {
  return (
    <div className="arcs__list">
      <p className="arcs__list-label">{label}:</p>
      <p className="">{value}</p>
    </div>
  );
}

export function generateMissionUrl(faction, name) {
  const nameClean = name.replace(/ /g, '-').replace(/,/g, '').replace(/\?/g, '').replace(/:/g, '');
  return `/epic-arcs/${faction}/${nameClean.toLowerCase()}`;
}
