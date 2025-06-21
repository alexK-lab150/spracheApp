import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {toggleLibraryScreen} from 'src/redux/slices/uiSlice';
import {RootState} from '@/redux/store';
import {Set} from 'src/redux/slices/setsSlice';
import {SetCover} from 'src/components/SetCover';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LibraryScreen: React.FC = () => {
  const sets = useSelector((state: RootState) => state.sets.sets);
  const dispatch = useDispatch();
  const isLibraryScreenVisible = useSelector(
    (state: RootState) => state.ui.isLibraryScreenVisible,
  );

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

      <View style={styles.footer}>
        <FooterIcon
          name="school"
          label="BIBLIOTHEK"
          active={isLibraryScreenVisible}
          onPress={() => dispatch(toggleLibraryScreen())}
        />
        <FooterIcon name="book" label="BIBLIOTHEK" active />
        <FooterIcon name="account" label="KONTO" />
      </View>
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

type FooterIconProps = {
  name: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

const FooterIcon: React.FC<FooterIconProps> = ({
  name,
  label,
  active,
  onPress,
}) => (
  <TouchableOpacity style={styles.footerItem} onPress={onPress}>
    <Icon name={name} size={24} color={active ? '#1e88e5' : '#888'} />
    <Text style={[styles.footerLabel, active && {color: '#1e88e5'}]}>
      {label}
    </Text>
  </TouchableOpacity>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerItem: {alignItems: 'center'},
  footerLabel: {fontSize: 12, color: '#888', marginTop: 2},
});
export default LibraryScreen;
