import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';

const RatingDisplay = () => {
  const rating = useSelector((state: RootState) => state.rating.currentRating);

  const getColor = () => {
    if (rating > 50) return 'red';
    if (rating >= 30) return 'orange';
    if (rating >= 20) return 'green';
    if (rating >= 10) return 'blue';
    return '#666';
  };

  return (
    <Text style={[styles.ratingText, {color: getColor()}]}>
      {rating.toFixed(1)}
    </Text>
  );
};

const styles = StyleSheet.create({
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RatingDisplay;
