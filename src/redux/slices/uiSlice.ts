import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Screen = 'home' | 'library' | 'account';

interface UIState {
  isCardModalVisible: boolean;
  isLearningScreenVisible: boolean;
  activeScreen: Screen;
}

const initialState: UIState = {
  isCardModalVisible: false,
  isLearningScreenVisible: false,
  activeScreen: 'home',
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
    setActiveScreen(state, action: PayloadAction<Screen>) {
      state.activeScreen = action.payload;
    },
  },
});

export const {
  showCardModal,
  hideCardModal,
  showLearningScreen,
  setActiveScreen,
  hideLearningScreen,
} = uiSlice.actions;
export default uiSlice.reducer;
