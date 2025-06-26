import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from 'src/redux/store';

export const useSaveRating = () => {
  const {currentRating, dailyRatings, lastUpdatedDate} = useSelector(
    (state: RootState) => state.rating,
  );

  useEffect(() => {
    AsyncStorage.setItem(
      '@ratingData',
      JSON.stringify({currentRating, dailyRatings, lastUpdatedDate}),
    );
  }, [currentRating, dailyRatings, lastUpdatedDate]);
};
