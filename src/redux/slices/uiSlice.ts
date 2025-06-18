import {createSlice} from '@reduxjs/toolkit';

interface UIState {
  isCardModalVisible: boolean;
  isLearningScreenVisible: boolean;
}

const initialState: UIState = {
  isCardModalVisible: false,
  isLearningScreenVisible: false,
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
  },
});

export const {
  showCardModal,
  hideCardModal,
  showLearningScreen,
  hideLearningScreen,
} = uiSlice.actions;
export default uiSlice.reducer;
