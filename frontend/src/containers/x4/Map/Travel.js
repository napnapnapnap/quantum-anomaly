import React from 'react';

export const Gates = props => (
  props.x4.map.gates.map(gate => (
    <React.Fragment key={Math.random()}>
      <circle cx={gate.origin.x} cy={gate.origin.y} fill='gray' stroke='white' strokeWidth='1' r='2'/>
      <circle cx={gate.destination.x} cy={gate.destination.y} fill='gray' stroke='white' strokeWidth='1' r='2'/>
      <line x1={gate.origin.x} y1={gate.origin.y}
            x2={gate.destination.x} y2={gate.destination.y} stroke='black'
            strokeWidth='2'/>
      <line x1={gate.origin.x} y1={gate.origin.y}
            x2={gate.destination.x} y2={gate.destination.y} stroke='white'
            strokeDasharray='1px'/>
    </React.Fragment>
  ))
);

export const SuperHighways = props => (
  props.x4.map.superHighways.map(highway => (
    <React.Fragment key={Math.random()}>
      <circle cx={highway.origin.x} cy={highway.origin.y} fill='blue' stroke='white' strokeWidth='1' r='1'/>
      <circle cx={highway.destination.x} cy={highway.destination.y} fill='blue' stroke='white' strokeWidth='1' r='1'/>
      <line x1={highway.origin.x} y1={highway.origin.y}
            x2={highway.destination.x} y2={highway.destination.y}
            stroke='gray' strokeWidth='2'/>
      <line x1={highway.origin.x} y1={highway.origin.y}
            x2={highway.destination.x} y2={highway.destination.y}
            stroke='blue' strokeDasharray='1px'/>
    </React.Fragment>
  ))
);
