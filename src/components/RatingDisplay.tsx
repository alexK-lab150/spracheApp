import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

  const iconName = rating > 25 ? 'magnifying-glass' : 'chart-simple';

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={18} color={getColor()} style={styles.icon} />
      <Text style={[styles.ratingText, {color: getColor()}]}>
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 16, // уменьшено для соответствия хедеру
    fontWeight: 'bold',
  },
});

export default RatingDisplay;
