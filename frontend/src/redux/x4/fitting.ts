import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum X4ShipClassEnum {
  ship_xl = 'ship_xl',
  ship_l = 'ship_l',
  ship_m = 'ship_m',
  ship_s = 'ship_s',
}

export interface X4ShipInterface {
  id: string;
  name: string;
  description: string;
  race: string;
  type: string;
  manufacturer: string;
  hull: number;
  mass: number;
  variation: string;
  shortvariation: string;
  dlc: string;
  engines: {
    quantity: number;
    size: string;
  };
  shields: {
    quantity: number;
    size: string;
  };
  inertia: {
    pitch: number;
    roll: number;
    yaw: number;
  };
  drag: {
    forward: number;
    horizontal: number;
    pitch: number;
    reverse: number;
    roll: number;
    vertical: number;
    yaw: number;
  };
  armaments: {
    weapons: {
      extralarge: number;
      large: number;
      medium: number;
      small: number;
    };
    turrets: {
      extralarge: number;
      large: number;
      medium: number;
      small: number;
    };
  };
  outfit?: {
    thrusters: string;
    engines: string;
    shields: string;
  };
  speed: {
    pitch: number;
    roll: number;
    yaw: number;
    forward: number;
    acceleration: number;
    boost: {
      speed: number;
      attack: number;
      duration: number;
      release: number;
    };
    travel: {
      speed: number;
      attack: number;
      charge: number;
      release: number;
    };
  };
  shield: {
    max: number;
    rate: number;
    delay: number;
  };
  class: X4ShipClassEnum;
  storage: {
    people: number;
    deployable: number;
    missile: number;
    countermeasure: number;
    unit: number;
    capacityType: string;
    capacity: number;
  };
  price: {
    min: number;
    average: number;
    max: number;
  };
  shipstorage: {
    pads_m: number;
    pads_s: number;
    dock_m: number;
    dock_s: number;
  };
}

export interface X4ShipInterfaceWithTradeAttributes extends X4ShipInterface {
  tradeIndex: number;
  accelerationTime: number;
  distanceToMaxTravelSpeed: number;
  runsOutOfDistance: boolean;
  travelTime: number;
  tradeScore: number;
  isTrader: boolean;
  isTraderExpanded: boolean;
  isSolidMiner: boolean;
  isLiquidMiner: boolean;
  creditsPerHour: number;
}

export interface X4ShipsInterface {
  [key: string]: X4ShipInterface;
}

export const getX4Ships = createAsyncThunk('x4Fitting/getShips', async () => {
  const response = await fetch(`/api/x4/ships`);
  return await response.json();
});

export const getX4Equipment = createAsyncThunk('x4Fitting/getEquipment', async () => {
  const response = await fetch(`/api/x4/equipment`);
  return await response.json();
});

const initialState: { ships: X4ShipsInterface | null; equipment: any | null } = {
  ships: null,
  equipment: null,
};

export const x4Fitting = createSlice({
  name: 'x4Fitting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getX4Ships.fulfilled, (state, action) => {
        state.ships = action.payload;
      })
      .addCase(getX4Equipment.fulfilled, (state, action) => {
        state.equipment = {
          ...action.payload.extralarge,
          ...action.payload.large,
          ...action.payload.medium,
          ...action.payload.small,
        };
      });
  },
});

export default x4Fitting.reducer;
