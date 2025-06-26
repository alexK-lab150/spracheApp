import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppDispatch} from 'src/redux/store';
import {loadRatingData, resetRating} from 'src/redux/slices/ratingSlice';
import {getToday} from './utils';

export const loadAndInitRating = async (dispatch: AppDispatch) => {
  const saved = await AsyncStorage.getItem('@ratingData');
  const today = getToday();

  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.lastUpdatedDate !== today) {
      dispatch(resetRating(today));
    } else {
      dispatch(loadRatingData(parsed));
    }
  } else {
    dispatch(resetRating(today));
  }
};
