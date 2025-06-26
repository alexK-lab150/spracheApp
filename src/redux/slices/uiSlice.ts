import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Screen = 'home' | 'library' | 'account';

interface HeaderConfig {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showRating?: boolean;
}

interface UIState {
  isCardModalVisible: boolean;
  isLearningScreenVisible: boolean;
  activeScreen: Screen;
  headerConfig: HeaderConfig;
}

const initialState: UIState = {
  isCardModalVisible: false,
  isLearningScreenVisible: false,
  activeScreen: 'home',
  headerConfig: {
    title: 'Home',
    showSearch: true,
  },
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
    setHeaderConfig(state, action: PayloadAction<HeaderConfig>) {
      state.headerConfig = action.payload;
    },
  },
});

export const {
  showCardModal,
  hideCardModal,
  showLearningScreen,
  setActiveScreen,
  hideLearningScreen,
  setHeaderConfig,
} = uiSlice.actions;
export default uiSlice.reducer;
