import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Імпортуємо створений Redux Store
import ConverterHeader from '../components/ConverterHeader'; // Імпортуємо компонент Header
import CurrencyList from '../components/CurrencyList'; // Імпортуємо компонент CurrencyList
import BottomSheet from '../components/BottomSheet'; // Імпортуємо компонент BottomSheet

const CurrencyConverterApp = () => {
  return (
    // Обгортаємо весь додаток у Provider для доступу до Redux Store
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* Компонент заголовка */}
        {/* <ConverterHeader /> */}
        
        {/* Компонент списку валют */}
        <CurrencyList />
        
        {/* Компонент для нижнього вікна */}
        <BottomSheet />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Фон чорний для відповідності загальному дизайну
  },
});

export default CurrencyConverterApp;