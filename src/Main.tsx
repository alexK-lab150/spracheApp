import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import LearningScreen from './screens/LearningScreen';
import AccountScreen from './screens/AccountScreen';
import LearningModeSelectionScreen from './screens/LearningModeSelectionScreen';
import SynonymGameScreen from './screens/SynonymsGameScreen';
import {RootState} from './redux/store';
import FooterTabBar from './components/footer/FooterTabBar';
import CustomHeader from 'src/components/header/CustomHeader';

const Main = () => {
  const isDarkMode = false;
  const {
    activeScreen,
    isLearningScreenVisible,
    isLearningModeSelectionVisible,
    isSynonymGameVisible,
  } = useSelector((state: RootState) => state.ui);

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  const renderScreen = () => {
    // Порядок проверки важен - сначала специфичные экраны, затем общие
    if (isSynonymGameVisible) return <SynonymGameScreen />;
    if (isLearningModeSelectionVisible) return <LearningModeSelectionScreen />;
    if (isLearningScreenVisible) return <LearningScreen />;

    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <CustomHeader />
      <View style={styles.screenContainer}>{renderScreen()}</View>
      {/* Скрываем FooterTabBar для всех "модальных" экранов */}
      {!isLearningScreenVisible &&
        !isLearningModeSelectionVisible &&
        !isSynonymGameVisible && <FooterTabBar />}
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
