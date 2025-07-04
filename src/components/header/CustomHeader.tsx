import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootState} from 'src/redux/store';
import RatingDisplay from 'src/components/RatingDisplay';
import {
  setActiveScreen,
  hideLearningScreen,
  setSynonymGameVisible,
} from 'src/redux/slices/uiSlice';

const CustomHeader = () => {
  const {activeScreen, isLearningScreenVisible, isSynonymGameVisible} =
    useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const isLearningOrAccountOrGame =
    isLearningScreenVisible ||
    activeScreen === 'account' ||
    isSynonymGameVisible;
  const showRating =
    activeScreen === 'home' ||
    isLearningScreenVisible ||
    activeScreen === 'account';

  const handleBack = () => {
    if (isSynonymGameVisible) {
      dispatch(setSynonymGameVisible(false));
    } else if (isLearningScreenVisible) {
      dispatch(hideLearningScreen());
    } else {
      dispatch(setActiveScreen('home'));
    }
  };

  return (
    <View style={styles.header}>
      {isLearningOrAccountOrGame ? (
        <TouchableOpacity onPress={handleBack}>
          <Icon name="chevron-left" size={28} />
        </TouchableOpacity>
      ) : (
        <Icon name="menu" size={24} />
      )}

      <View style={styles.languageSelector}>
        <Text style={styles.flag}>🇩🇪</Text>
        <Text style={styles.languageText}>DEUTSCH</Text>
        <Icon name="chevron-down" size={20} />
      </View>

      {showRating ? <RatingDisplay /> : <Icon name="magnify" size={24} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },
  languageText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomHeader;
