import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const selectCards = (state: RootState) => state.cards.cards;

export const selectCardStats = createSelector([selectCards], cards => {
  const total = cards.length;
  const newCount = cards.filter(c => c.status === 'new').length;
  const learningCount = cards.filter(c => c.status === 'learning').length;
  const knownCount = cards.filter(c => c.status === 'known').length;

  return {total, newCount, learningCount, knownCount};
});
