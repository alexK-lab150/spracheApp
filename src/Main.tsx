import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './screens/HomeScreen';
import LearningScreen from './screens/LearningScreen';
import {RootState} from './redux/store';

const Main = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const isLearningScreenVisible = useSelector(
    (state: RootState) => state.ui.isLearningScreenVisible,
  );

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View style={styles.screenContainer}>
        {isLearningScreenVisible ? <LearningScreen /> : <HomeScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default Main;
