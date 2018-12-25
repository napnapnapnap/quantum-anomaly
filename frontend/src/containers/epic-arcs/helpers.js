import React from 'react';

export function renderList(label, values, separeted) {
  return (
    <div className="arcs__list">
      <p className="arcs__list-label">{label}:</p>
      <ul className="arcs__list-values">
        {values.map((value, index) => (
          <li className={separeted ? 'arcs__list-value arcs__info-separated' : 'arcs__list-value'} key={index}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
