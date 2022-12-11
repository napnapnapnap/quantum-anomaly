import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface X4ModificationsModInterface {
  description: string;
  max: string;
  min: string;
  name: string;
  production: { ware: string; amount: string }[];
  quality: string;
  ware: string;
  bonus?: any;
  totalWeight: number;
}

export interface X4ModificationsGroupsInterface {
  [key: string]: {
    [key: string]: X4ModificationsModInterface[];
  };
}

export interface X4ModificationsInterface {
  [key: string]: X4ModificationsGroupsInterface;
}

export const getX4Modifications = createAsyncThunk('x4Modifications/getModifications', async () => {
  const response = await fetch(`/api/x4/modifications`);
  return await response.json();
});

const initialState: {
  modifications: X4ModificationsInterface;
} = {
  modifications: {},
};

export const x4Modifications = createSlice({
  name: 'x4Modifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getX4Modifications.fulfilled, (state, action) => {
      state.modifications = action.payload;

      Object.values(state.modifications).forEach((modificationCategory) => {
        Object.values(modificationCategory).forEach((modificationGroup) => {
          Object.values(modificationGroup).forEach((mods) => {
            Object.values(mods).forEach((mod) => {
              mod.totalWeight = 0;
              if (mod.bonus) {
                Object.values(mod.bonus).forEach((bonus: any) => {
                  if (bonus.weight) mod.totalWeight += parseInt(bonus.weight);
                });
                Object.values(mod.bonus).forEach((bonus: any) => {
                  if (bonus.weight) {
                    bonus.chanceToGet = parseFloat(bonus.weight) / mod.totalWeight;
                  }
                });
              }
            });
          });
        });
      });
    });
  },
});

export default x4Modifications.reducer;
