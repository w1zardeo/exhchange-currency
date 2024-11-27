import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import ConverterHeader from '../components/ConverterHeader'; 
import CurrencyList from '../components/CurrencyList'; 
import BottomSheet from '../components/BottomSheet'; 

const CurrencyConverterApp = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <CurrencyList />
        <BottomSheet />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', 
  },
});

export default CurrencyConverterApp;