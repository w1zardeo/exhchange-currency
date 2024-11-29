import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import ConverterHeader from '../components/ConverterHeader'; 
import CurrencyList from '../components/CurrencyList'; 
import BottomSheet from '../components/BottomSheet'; 
import { useSelector } from 'react-redux';

const CurrencyConverterApp = () => {
  const colors = useSelector((state) => state.theme.colors);
  return (
    <Provider store={store}>
      <SafeAreaView style={[styles.container(colors)]}>
        <CurrencyList />
        <BottomSheet />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create = ({
  container: (colors) => ({
    flex: 1,
    backgroundColor: colors.black
  }),
});

export default CurrencyConverterApp;