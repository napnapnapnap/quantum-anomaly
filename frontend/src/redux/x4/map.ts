import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface X4Station {
  id: string;
  tags: string;
  owner: string;
  race: string;
  position: { x: number; z: number };
}

export interface X4MapSectorInterface {
  description: string;
  label: string;
  name: string;
  owner: string;
  potentialHive: string;
  position: { x: number; y: number; z: number };
  resourcePints: { [key: string]: number };
  resources: {
    name: string;
    miningRegionVolume: number;
    resourceQuantities: { [key: string]: number };
  }[];
  resourcePoints: {
    [key: string]: number;
  };
  sunlight: number;
  transformation: string;
  zonehighways: any[];
  stations: X4Station[];
  zones: {
    zoneReference: string;
    gates: { name: string; position: { x: number; y: number; z: number } }[];
  }[];
}

export interface X4MapClusterInterface {
  name: string;
  position: { x: number; y: number; z: number };
  dlc: string[];
  sechighways: {
    assigned: boolean;
    macro: {
      ref: string;
      connection: string;
      connections: {
        connection: {
          macro: {
            connection: string;
            path: string;
            ref: string;
          };
        }[];
      };
    };
    name: string;
    offset: { x: number; y: number; z: number };
    ref: string;
  };
  sectors: X4MapSectorInterface[];
}

export interface X4MapInterface {
  clusters: X4MapClusterInterface[];
  gateConnections: { dlc: string[]; start: { x: number; z: number }; exit: { x: number; z: number }; id: string }[];
  sectorHighways: {
    dlc: string[];
    start: { x: number; z: number };
    exit: { x: number; z: number };
  }[];
}

export const getX4Map = createAsyncThunk('x4Map/getMap', async () => {
  const response = await fetch(`/api/x4/map`);
  return await response.json();
});

const initialState: {
  map: X4MapInterface | null;
} = {
  map: null,
};

export const x4Map = createSlice({
  name: 'x4Map',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getX4Map.fulfilled, (state, action) => {
      state.map = action.payload;
    });
  },
});

export default x4Map.reducer;
