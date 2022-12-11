import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export enum EveEpicArcFactions {
  amarr = 'amarr',
  caldari = 'caldari',
  minmatar = 'minmatar',
  gallente = 'gallente',
}

export interface EveEpicArcInfo {
  race: string;
  iconID: string;
  name: string;
  empire: string;
  desc: string[];
  rewards: string[];
  notes: string[];
  missionIndex: { [key: string]: number };
  missions?: [
    {
      name: string;
      type: string;
      desc: string[];
      agent: string;
      enemy?: string | string[];
      objective: string;
      source: string;
      start: string;
      dest: string;
      canAcptRmty: boolean;
      tips: string[];
      pockets?: [
        {
          range: number;
          enemies: [
            {
              quantity: number;
              names: string[];
              notice: string;
            }
          ];
        }
      ][];
    }
  ];
}

export const getEveEpicArcs = createAsyncThunk('eveEpicArcs/getEveEpicArcs', async () => {
  const response = await fetch(`/api/epic-arcs/info`);
  return await response.json();
});

export const getEveEpicArcFactionMissions = createAsyncThunk(
  'eveEpicArcs/getEveEpicArcFactionMissions',
  async (faction: EveEpicArcFactions) => {
    const response = await fetch(`/api/epic-arcs/${faction}`);
    return {
      data: (await response.json())[faction],
      faction: faction,
    };
  }
);

const initialState: { eveEpicArcs: { [key in EveEpicArcFactions]?: EveEpicArcInfo } } = {
  eveEpicArcs: {},
};

export const eveEpicArcs = createSlice({
  name: 'eveEpicArcs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEveEpicArcs.fulfilled, (state, action) => {
        state.eveEpicArcs = action.payload;
      })
      .addCase(getEveEpicArcFactionMissions.fulfilled, (state, action) => {
        state.eveEpicArcs[action.payload.faction]!.missions = action.payload.data;
      });
  },
});

export default eveEpicArcs.reducer;
