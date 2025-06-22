import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveScreen} from 'src/redux/slices/uiSlice';
import {RootState} from 'src/redux/store';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type FooterIconProps = {
  name: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

const FooterTabBar: React.FC = () => {
  const dispatch = useDispatch();
  const activeScreen = useSelector((state: RootState) => state.ui.activeScreen);

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

  return (
    <View style={styles.footer}>
      <FooterIcon
        name="school"
        label="LERNEN"
        active={activeScreen === 'home'}
        onPress={() => dispatch(setActiveScreen('home'))}
      />
      <FooterIcon
        name="book"
        label="BIBLIOTHEK"
        active={activeScreen === 'library'}
        onPress={() => dispatch(setActiveScreen('library'))}
      />
      <FooterIcon
        name="account"
        label="KONTO"
        active={activeScreen === 'account'}
        onPress={() => dispatch(setActiveScreen('account'))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default FooterTabBar;
