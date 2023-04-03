import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface X4TerraformPlanetInterface {
  system: string;
  name: string;
  stats: { [key: string]: number };
  objectives: { population: number; projects: string[] };
  recommendedPath: string[];
  notes: string;
  rewards: string[];
}
export interface X4TerraformStatInterface {
  id: string;
  name: string;
  default: string;
  icon: string;
  inactivetext: string;
  range: any[];
}

export interface X4TerraformProjectWare {
  ware: string;
  amount: number;
  quantity: number;
  group: string;
  pricePerUnit: number;
  volume: number;
  totalCost: number;
}

export interface X4TerraformProjectInterface {
  id: string;
  group: string;
  name: string;
  description: string;
  duration: string;
  repeatcooldown: string;
  version: string;
  effects: any;
  rebates?: { waregroup: string; value: string }[];
  resources: {
    price: number;
    wares: X4TerraformProjectWare[];
  };
  deliveries: any;
}

export interface X4TerraformInterface {
  projectgroups: { id: string; name: string }[];
  stats: X4TerraformStatInterface[];
  projects: { [key: string]: X4TerraformProjectInterface };
  planets: { [key: string]: X4TerraformPlanetInterface };
}

export const getX4Terraform = createAsyncThunk('x4Terraform/getTerraform', async () => {
  const response = await fetch(`/api/x4/terraform`);
  return await response.json();
});

const initialState: {
  terraform: X4TerraformInterface | null;
} = {
  terraform: null,
};

export const x4Terraform = createSlice({
  name: 'x4Terraform',
  initialState,
  reducers: {
    toggleProjectInPlanet: (state, action: PayloadAction<{ planet: string; project: string }>) => {
      const { planet, project } = action.payload;

      if (state.terraform && state.terraform.planets[planet]) {
        if (state.terraform.planets[planet].recommendedPath.indexOf(project) !== -1)
          state.terraform.planets[planet].recommendedPath.splice(
            state.terraform.planets[planet].recommendedPath.indexOf(project),
            1
          );
        else state.terraform.planets[planet].recommendedPath.unshift(project);
      }
    },
    moveProjectInPlanet: (
      state,
      action: PayloadAction<{ planet: string; project: string; direction: 'up' | 'down' }>
    ) => {
      const { planet, project, direction } = action.payload;

      if (state.terraform && state.terraform.planets[planet]) {
        if (state.terraform.planets[planet].recommendedPath.indexOf(project) !== -1) {
          const currentIndex = state.terraform.planets[planet].recommendedPath.indexOf(project);
          const element = state.terraform.planets[planet].recommendedPath[currentIndex];
          let toIndex = currentIndex;
          if (direction === 'up') toIndex -= 1;
          else if (direction === 'down') toIndex += 1;
          state.terraform.planets[planet].recommendedPath.splice(currentIndex, 1);
          state.terraform.planets[planet].recommendedPath.splice(toIndex, 0, element);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getX4Terraform.fulfilled, (state, action) => {
      state.terraform = action.payload;
    });
  },
});

export const { toggleProjectInPlanet, moveProjectInPlanet } = x4Terraform.actions;
export default x4Terraform.reducer;
