import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CurrencyList from '../components/CurrencyList';
import BottomSheet from '../components/BottomSheet';
import { useSelector } from 'react-redux';

const CurrencyConverterApp = () => {
  const colors = useSelector((state) => state.theme.colors);
  const styles = useStyles(colors);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CurrencyList />
        <BottomSheet />
      </SafeAreaView>
    </Provider>
  );
};

const useStyles = (colors) => StyleSheet.create = ({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
});

export default CurrencyConverterApp;