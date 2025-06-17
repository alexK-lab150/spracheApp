import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.swipeInstructions}>
        <Text style={styles.swipeTextLeft}>
          Wenn du es nicht wusstest{'\n'}
          <Text style={styles.bold}>nach links wischen</Text>
        </Text>
        <Text style={styles.swipeTextRight}>
          Wenn du recht hattest{'\n'}
          <Text style={styles.bold}>nach rechts wischen</Text>
        </Text>
      </View>

      <Image
        source={require('../../assets/img/musterImg.png')}
        style={styles.image}
      />

      <Text style={styles.translationText}>Область применения</Text>
      <Text style={styles.wordText}>Anwendungsbereich</Text>

      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="edit" size={26} color="#00A4EF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="edit" size={26} color="#00A4EF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  swipeInstructions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  swipeTextLeft: {
    color: '#CC5555',
    textAlign: 'left',
    flex: 1,
    fontSize: 13,
  },
  swipeTextRight: {
    color: '#55AA55',
    textAlign: 'right',
    flex: 1,
    fontSize: 13,
  },
  bold: {
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  translationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  wordText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default Card;
