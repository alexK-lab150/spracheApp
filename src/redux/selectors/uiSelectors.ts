import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectUI = (state: RootState) => state.ui;

export const selectIsAddCardModalVisible = createSelector(
  [selectUI],
  ui => ui.isAddCardModalVisible,
);

// export const selectIsLibraryScreenVisible = createSelector(
//   [selectUI],
//   ui => ui.isLibraryScreenVisible,
// );
