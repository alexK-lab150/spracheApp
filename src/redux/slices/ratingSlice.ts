import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DailyRating {
  date: string; // формат YYYY-MM-DD
  rating: number;
}

interface RatingState {
  currentRating: number;
  dailyRatings: DailyRating[];
  lastUpdatedDate: string | null;
}

const initialState: RatingState = {
  currentRating: 0,
  dailyRatings: [],
  lastUpdatedDate: null,
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    loadRatingData(
      state,
      action: PayloadAction<{
        currentRating: number;
        dailyRatings: DailyRating[];
        lastUpdatedDate: string;
      }>,
    ) {
      state.currentRating = action.payload.currentRating;
      state.dailyRatings = action.payload.dailyRatings;
      state.lastUpdatedDate = action.payload.lastUpdatedDate;
    },
    resetRating(state, action: PayloadAction<string>) {
      // сохраняем предыдущий день в историю
      if (state.lastUpdatedDate) {
        state.dailyRatings.push({
          date: state.lastUpdatedDate,
          rating: state.currentRating,
        });
      }
      state.currentRating = 0;
      state.lastUpdatedDate = action.payload;
    },
    increaseRating(state) {
      state.currentRating += 0.5;
    },
  },
});

export const {loadRatingData, resetRating, increaseRating} =
  ratingSlice.actions;
export default ratingSlice.reducer;
