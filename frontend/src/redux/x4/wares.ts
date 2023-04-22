import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface X4WareInterface {
  id: string;
  name: string;
  transport: string;
  volume: string;
  price: {
    min: string;
    average: string;
    max: string;
  };
}

export interface X4WaresInterface {
  transport: { [key: string]: X4WareInterface };
}

export const getX4Wares = createAsyncThunk('x4Wares/getWares', async () => {
  const response = await fetch(`/api/x4/wares`);
  return await response.json();
});

const initialState: {
  wares: X4WaresInterface | null;
} = {
  wares: null,
};

export const x4Wares = createSlice({
  name: 'x4Wares',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getX4Wares.fulfilled, (state, action) => {
      const transport: X4WaresInterface['transport'] = {};

      Object.keys(action.payload.wares.ware)
        .sort()
        .forEach((wareKey) => {
          const ware = action.payload.wares.ware[wareKey];
          const hasTags = ware.tags;

          if (hasTags) {
            if (ware.transport === 'container') transport[wareKey] = ware;
            if (ware.transport === 'solid') transport[wareKey] = ware;
            if (ware.transport === 'liquid') transport[wareKey] = ware;
          }
        });

      state.wares = {
        transport,
      };
    });
  },
});

export default x4Wares.reducer;
