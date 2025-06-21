import {createSlice} from '@reduxjs/toolkit';

interface UIState {
  isCardModalVisible: boolean;
  isLearningScreenVisible: boolean;
  isLibraryScreenVisible: boolean;
}

const initialState: UIState = {
  isCardModalVisible: false,
  isLearningScreenVisible: false,
  isLibraryScreenVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showCardModal(state) {
      state.isCardModalVisible = true;
    },
    hideCardModal(state) {
      state.isCardModalVisible = false;
    },
    showLearningScreen(state) {
      state.isLearningScreenVisible = true;
    },
    hideLearningScreen(state) {
      state.isLearningScreenVisible = false;
    },
    toggleLibraryScreen(state) {
      state.isLibraryScreenVisible = !state.isLibraryScreenVisible;
    },
  },
});

export const {
  showCardModal,
  hideCardModal,
  showLearningScreen,
  hideLearningScreen,
  toggleLibraryScreen,
} = uiSlice.actions;
export default uiSlice.reducer;
