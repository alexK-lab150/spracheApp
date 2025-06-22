import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {RootState} from '@/redux/store';
import {Set} from 'src/redux/slices/setsSlice';
import {SetCover} from 'src/components/SetCover';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterTabBar from 'src/components/footer/FooterTabBar';

const LibraryScreen: React.FC = () => {
  const sets = useSelector((state: RootState) => state.sets.sets);
  const recentlyOpenedSets: Set[] = sets.slice(0, 3);
  const mySources: Set[] = sets;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={24} />
        <View style={styles.languageSelector}>
          <Text style={styles.flag}>🇩🇪</Text>
          <Text style={styles.languageText}>DEUTSCH</Text>
          <Icon name="chevron-down" size={20} />
        </View>
        <Icon name="magnify" size={24} />
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <Section title="Zuletzt geöffnet" data={recentlyOpenedSets} />
            <Section title="Meine Quellen" data={mySources} />
          </>
        }
        data={[]}
        renderItem={null}
        keyExtractor={() => ''}
      />
      <FooterTabBar />
    </SafeAreaView>
  );
};

type SectionProps = {
  title: string;
  data: Set[];
};

const Section: React.FC<SectionProps> = ({title, data}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <SetCover set={item} />}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f7fc'},
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
  flag: {fontSize: 18},
  languageText: {fontWeight: 'bold', fontSize: 16},
  section: {marginTop: 12},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
export default LibraryScreen;
