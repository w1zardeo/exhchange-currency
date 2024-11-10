import { View, StyleSheet, SafeAreaView } from 'react-native';
import ConverterHeader from '../components/ConverterHeader'; // Імпортуємо компонент Header
import CurrencyList from '../components/CurrencyList'; // Імпортуємо компонент CurrencyList
import BottomSheet from '../components/BottomSheet';
import { CurrencyProvider } from '../redux/CurrencyContext';

const CurrencyConverterApp = () => {
  return (
    <CurrencyProvider>
    <SafeAreaView style={styles.container}>
      {/* Компонент заголовка */}
      
      {/* Компонент списку валют */}
      <CurrencyList />
      <BottomSheet/>
    </SafeAreaView>
    </CurrencyProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Фон чорний для відповідності зображенню
  },
});

export default CurrencyConverterApp;