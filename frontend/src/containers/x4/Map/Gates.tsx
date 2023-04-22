export const GateConnection = ({
  gateConnection,
  isHighwayGate = false,
}: {
  gateConnection: { start: { x: number; z: number }; exit: { x: number; z: number } };
  isHighwayGate?: boolean;
}) => (
  <>
    <line
      x1={gateConnection.start.x}
      y1={-gateConnection.start.z}
      x2={gateConnection.exit.x}
      y2={-gateConnection.exit.z}
      stroke={isHighwayGate ? 'gray' : 'black'}
      strokeWidth={isHighwayGate ? '3' : '5'}
    />
    <line
      x1={gateConnection.start.x}
      y1={-gateConnection.start.z}
      x2={gateConnection.exit.x}
      y2={-gateConnection.exit.z}
      stroke={isHighwayGate ? 'blue' : 'white'}
      strokeWidth={isHighwayGate ? '1' : '3'}
      strokeDasharray={isHighwayGate ? '1' : '2'}
    />
  </>
);

export const Gate = ({
  gate,
  isHighwayGate = false,
}: {
  gate: { position: { x: number; z: number } };
  isHighwayGate?: boolean;
}) => (
  <circle
    cx={gate.position.x}
    cy={-gate.position.z}
    fill={isHighwayGate ? 'blue' : 'gray'}
    stroke="white"
    strokeWidth="1"
    r={isHighwayGate ? '3' : '5'}
  />
);
