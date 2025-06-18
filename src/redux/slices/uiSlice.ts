import {createSlice} from '@reduxjs/toolkit';

interface UIState {
  isCardModalVisible: boolean;
}

const initialState: UIState = {
  isCardModalVisible: false,
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
  },
});

export const {showCardModal, hideCardModal} = uiSlice.actions;
export default uiSlice.reducer;
