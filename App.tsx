import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {setCards} from './src/redux/slices/cardsSlice';
import testCards from './assets/test/testCards.json';
import {Card} from './src/redux/slices/cardsSlice';
import {USE_TEST_CARDS} from 'src/utils/devConfig';
import Main from './src/Main';

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (USE_TEST_CARDS) {
      dispatch(setCards(testCards as Card[]));
      console.log('[DEV] Загружены тестовые карточки');
    }
  }, [dispatch]);

  return <Main />;
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContent />
    </PersistGate>
  </Provider>
);

export default App;
