import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {updateCardRating} from '../redux/slices/cardsSlice';
import {increaseRating} from '../redux/slices/ratingSlice';
import {BlurView} from '@react-native-community/blur';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Card} from '../redux/slices/cardsSlice';
import {setHeaderConfig} from '../redux/slices/uiSlice';
import Icon from 'react-native-vector-icons/FontAwesome6';

const {height} = Dimensions.get('window');

const LearningScreen = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const visibleCards = useMemo(() => {
    return cards
      .filter((card: Card) => card.status !== 'known')
      .sort((a: Card, b: Card) => a.rating - b.rating);
  }, [cards]);

  const currentCard = visibleCards[currentCardIndex];

  useEffect(() => {
    setIsTranslationVisible(false);
    setIsReversed(Math.random() < 0.5);
  }, [currentCardIndex]);

  useEffect(() => {
    dispatch(
      setHeaderConfig({
        title: 'Learning',
        showBack: true,
        showRating: true,
      }),
    );
  }, [dispatch]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentCard) return;
    const delta = direction === 'right' ? 1 : -1;
    dispatch(updateCardRating({id: currentCard.id, delta}));
    if (direction === 'right') {
      dispatch(increaseRating());
    }
    const nextIndex = (currentCardIndex + 1) % visibleCards.length;
    setCurrentCardIndex(nextIndex);
  };

  const handleNext = () => handleSwipe('right');
  const handlePrev = () => {
    const prevIndex =
      (currentCardIndex - 1 + visibleCards.length) % visibleCards.length;
    setCurrentCardIndex(prevIndex);
  };

  if (!currentCard) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.infoText}>Нет доступных карточек для изучения</Text>
      </View>
    );
  }

  const word = isReversed ? currentCard.translation : currentCard.word;
  const translation = isReversed ? currentCard.word : currentCard.translation;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Учёба</Text>
        <TouchableOpacity onPress={() => setIsTranslationVisible(true)}>
          <Text style={styles.revealButton}>Показать перевод</Text>
        </TouchableOpacity>
      </View>

      <GestureRecognizer
        onSwipeLeft={() => handleSwipe('left')}
        onSwipeRight={() => handleSwipe('right')}
        style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardWord}>{word}</Text>
          {isTranslationVisible ? (
            <View style={styles.translationBlock}>
              <Text style={styles.cardTranslation}>{translation}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.wrongButton}
                  onPress={() => handleSwipe('left')}>
                  <Icon name="xmark" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.correctButton}
                  onPress={() => handleSwipe('right')}>
                  <Icon name="check" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <BlurView style={styles.blur} blurType="light" blurAmount={10} />
          )}
        </View>
      </GestureRecognizer>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handlePrev}>
          <Text style={styles.footerButton}>Предыдущая</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.footerButton}>Следующая</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LearningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  revealButton: {
    color: '#0f0',
    marginTop: 8,
    fontSize: 16,
  },
  cardContainer: {
    height: height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '60%',
    backgroundColor: '#222',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardWord: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
  },
  cardTranslation: {
    fontSize: 22,
    color: '#fff',
  },
  blur: {
    width: '100%',
    height: 30,
    borderRadius: 4,
  },
  translationBlock: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 40,
  },
  correctButton: {
    backgroundColor: '#00C851',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  wrongButton: {
    backgroundColor: '#ff4444',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  footer: {
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  footerButton: {
    color: '#0f0',
    fontSize: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  infoText: {
    color: '#ccc',
    fontSize: 18,
  },
});
