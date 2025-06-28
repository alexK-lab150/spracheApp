import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {updateCardRating} from '../redux/slices/cardsSlice';
import {increaseRating} from '../redux/slices/ratingSlice';

const SCREEN_WIDTH = Dimensions.get('window').width;

const LearningScreen = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [position] = useState(new Animated.ValueXY());

  const currentCard = cards[currentIndex];

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  const handleSwipe = (direction: 'right' | 'left') => {
    if (!showTranslation) return;

    if (direction === 'right') {
      dispatch(updateCardRating({id: currentCard.id, delta: 1}));
      dispatch(increaseRating());
    } else {
      dispatch(updateCardRating({id: currentCard.id, delta: -1}));
    }

    setShowTranslation(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
    position.setValue({x: 0, y: 0});
  };

  const panResponder = {
    onMoveShouldSetResponder: () => true,
    onResponderMove: (e: GestureResponderEvent) => {
      if (!showTranslation) return;
      const dx = e.nativeEvent.pageX - SCREEN_WIDTH / 2;
      position.setValue({x: dx, y: 0});
    },
    onResponderRelease: () => {
      if (!showTranslation) return;
      //@ts-ignore _value — неофициальное свойство
      const dx = position.x._value;

      if (dx > 120) {
        handleSwipe('right');
      } else if (dx < -120) {
        handleSwipe('left');
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    },
  };

  useEffect(() => {
    position.setValue({x: 0, y: 0});
  }, [currentIndex, position]);

  if (!currentCard) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneText}>Все карточки пройдены!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder}
        style={[styles.card, {transform: [{translateX: position.x}]}]}>
        <Text style={styles.word}>{currentCard.word}</Text>
        {showTranslation ? (
          <Text style={styles.translation}>{currentCard.translation}</Text>
        ) : (
          <View style={styles.translationBlur} />
        )}
      </Animated.View>

      {!showTranslation && (
        <TouchableOpacity
          onPress={handleShowTranslation}
          style={styles.showButton}>
          <Text style={styles.showButtonText}>Показать перевод</Text>
        </TouchableOpacity>
      )}

      {showTranslation && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => handleSwipe('left')}
            style={[styles.answerButton, styles.incorrectButton]}>
            <Text style={styles.showButtonText}>Неправильно</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSwipe('right')}
            style={[styles.answerButton, styles.correctButton]}>
            <Text style={styles.showButtonText}>Правильно</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  card: {
    width: '90%',
    minHeight: 220,
    backgroundColor: '#1e1e1e',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 5,
  },
  word: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  translation: {
    fontSize: 24,
    color: '#8f8',
    textAlign: 'center',
  },
  translationBlur: {
    width: 200,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#444',
  },
  showButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  showButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 20,
  },
  answerButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  incorrectButton: {
    backgroundColor: '#F44336',
  },
  doneText: {
    fontSize: 22,
    color: '#aaa',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
  },
});

export default LearningScreen;
