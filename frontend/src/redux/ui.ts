import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { deleteCookie, getCookie, setCookie } from '../helpers/cookies';

const isInitialDarkMode = () => {
  let isDarkMode = false;
  if (getCookie('dark-mode')) isDarkMode = true;
  return isDarkMode;
};

const initialState: { isDarkMode: boolean; isNavigationOpen: boolean } = {
  isDarkMode: isInitialDarkMode(),
  isNavigationOpen: false,
};

export const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      if (action.payload === true) setCookie('dark-mode');
      else deleteCookie('dark-mode');
    },
    setIsNavigationOpen: (state, action: PayloadAction<boolean>) => {
      state.isNavigationOpen = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsNavigationOpen } = ui.actions;
export default ui.reducer;
