import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  showCardModal,
  showLearningScreen,
  toggleLibraryScreen,
} from 'src/redux/slices/uiSlice';
import CardModal from './../components/CardModal';
import {selectCardStats} from 'src/redux/selectors/cardsSelectors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import LibraryScreen from './LibraryScreen';
import {
  selectIsCardModalVisible,
  selectIsLibraryScreenVisible,
} from 'src/redux/selectors/uiSelectors';
import FooterTabBar from 'src/components/footer/FooterTabBar';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {newCount, learningCount, knownCount} = useSelector(selectCardStats);
  const isCardModalVisible = useSelector(selectIsCardModalVisible);
  const isLibraryScreenVisible = useSelector(selectIsLibraryScreenVisible);

  if (isLibraryScreenVisible) {
    return <LibraryScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>Deutsch</Text>
          <View style={styles.ratingContainer}>
            <Icon name="chart-simple" size={20} color="#0077CC" />
            <Text style={styles.ratingText}>125</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatBox
            number={newCount.toString()}
            label="Lernen"
            color="#00AA00"
          />
          <StatBox
            number={learningCount.toString()}
            label="Bekannt"
            color="#0077CC"
          />
          <StatBox
            number={knownCount.toString()}
            label="Gelernt"
            color="#CCAA00"
          />
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => dispatch(showLearningScreen())}>
          <Text style={styles.startButtonText}>ANFANG</Text>
        </TouchableOpacity>

        <View style={styles.cardSection}>
          <Text style={styles.cardLabel}>Karten</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(showCardModal())}>
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navBar}>
          <Text
            style={
              !isLibraryScreenVisible ? styles.navItemActive : styles.navItem
            }>
            LERNEN
          </Text>

          <TouchableOpacity onPress={() => dispatch(toggleLibraryScreen())}>
            <Text
              style={
                isLibraryScreenVisible ? styles.navItemActive : styles.navItem
              }>
              BIBLIOTHEK
            </Text>
          </TouchableOpacity>

          <Text style={styles.navItem}>KONTO</Text>
        </View>
      </ScrollView>

      <CardModal isVisible={isCardModalVisible} />
      <FooterTabBar />
    </SafeAreaView>
  );
};

const StatBox = ({
  number,
  label,
  color,
}: {
  number: string;
  label: string;
  color: string;
}) => (
  <View style={[styles.statBox, {borderColor: color}]}>
    <Text style={[styles.statNumber, {color}]}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F1FA',
  },
  inner: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef6ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  ratingText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077CC',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  statBox: {
    width: 90,
    height: 70,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  startButton: {
    backgroundColor: '#00A4EF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  addButton: {
    backgroundColor: '#00A4EF',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
    width: '100%',
  },
  navItem: {
    fontSize: 14,
    color: '#777',
  },
  navItemActive: {
    fontSize: 14,
    color: '#00A4EF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
