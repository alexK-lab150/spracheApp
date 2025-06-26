import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {setHeaderConfig} from 'src/redux/slices/uiSlice';
import {useDispatch} from 'react-redux';

const AccountScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setHeaderConfig({
        title: 'Konto',
        showBack: true,
        showRating: true,
      }),
    );
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mein Konto</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
