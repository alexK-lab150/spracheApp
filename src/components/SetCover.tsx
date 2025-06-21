import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Set} from 'src/redux/slices/setsSlice';

type Props = {
  set: Set;
};

const categoryColors: Record<string, string> = {
  umschulung: '#d81b60',
  alltag: '#43a047',
  beruf: '#1e88e5',
  akademisch: '#8e24aa',
};

export const SetCover: React.FC<Props> = ({set}) => {
  const color = categoryColors[set.category] || '#ccc';

  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.tag, {backgroundColor: color}]}>
        <Text style={styles.tagText}>{set.category}</Text>
      </View>
      <Text style={styles.title}>{set.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {set.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
});
