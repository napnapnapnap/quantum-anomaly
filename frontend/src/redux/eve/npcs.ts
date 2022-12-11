import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface EveNpcs {
  [key: string]: {
    capacity: number;
    dogma_attributes: { name: string; value: number }[];
    graphic_id: number;
    group_id: number;
  };
}

export const getEveNpcs = createAsyncThunk('eveNpcs/getEveNpcs', async (indices: string) => {
  const response = await fetch(`/api/npcs/${indices}`);
  return await response.json();
});

const initialState: {
  eveNpcs: EveNpcs;
} = {
  eveNpcs: {},
};

export const eveNpcs = createSlice({
  name: 'epicArcs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEveNpcs.fulfilled, (state, action) => {
      state.eveNpcs = { ...state.eveNpcs, ...action.payload };
    });
  },
});

export default eveNpcs.reducer;
