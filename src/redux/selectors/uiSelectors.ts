import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

const selectUI = (state: RootState) => state.ui;

export const selectIsCardModalVisible = createSelector(
  [selectUI],
  ui => ui.isCardModalVisible,
);

// export const selectIsLibraryScreenVisible = createSelector(
//   [selectUI],
//   ui => ui.isLibraryScreenVisible,
// );
