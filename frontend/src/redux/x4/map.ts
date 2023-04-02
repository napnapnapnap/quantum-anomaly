import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface X4Station {
  id: string;
  tags: string;
  owner: string;
  race: string;
  position: { x: number; z: number };
}

export interface X4MapSector {
  adjusted: { x: number; y: number; z: number };
  description: string;
  label: string;
  name: string;
  owner: string;
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
    gates: {
      position: { x: number; y: number; z: number };
    }[];
  }[];
}

export interface X4MapInterface {
  clusters: {
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
    }[];
    sectors: X4MapSector[];
  }[];
  gates: {
    [key: number]: {
      dlc: string[];
      start: { x: number; z: number };
      end: { x: number; z: number };
    };
  };
  sectorHighways: {
    dlc: string[];
    origin: { x: number; y: number };
    destination: { x: number; y: number };
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
