// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currencies, setCurrencies] = useState([]);

//   const fetchCurrencies = async () => {
//     try {
//       const response = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
//       const data = await response.json();
//       const rates = data.rates;

//       const favoriteCurrencies = await loadFavoriteCurrencies();

//       const currenciesArray = await Promise.all(
//         Object.keys(rates).map(async (currency) => {
//           const countryResponse = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
//           const countryData = await countryResponse.json();
//           const flag = countryData[0]?.flags?.png || 'https://via.placeholder.com/24';
//           const fullCurrencyName = countryData[0]?.currencies[currency]?.name || currency;
//           const symbol = countryData[0]?.currencies[currency]?.symbol || '';

//           return {
//             id: currency,
//             flag: flag,
//             currency: currency,
//             label: fullCurrencyName,
//             symbol: symbol,
//             rate: rates[currency],
//             isFavorite: favoriteCurrencies.includes(currency), // Set isFavorite based on stored data
//           };
//         })
//       );

//       setCurrencies(currenciesArray);
//     } catch (error) {
//       console.error('Error fetching currency data:', error);
//     }
//   };

//   const toggleFavorite = async (currencyId) => {
//     setCurrencies((prevCurrencies) =>
//       prevCurrencies.map((currency) =>
//         currency.id === currencyId ? { ...currency, isFavorite: !currency.isFavorite } : currency
//       )
//     );

//     // Update AsyncStorage with new favorites
//     const updatedFavorites = currencies
//       .filter((currency) => (currency.id === currencyId ? !currency.isFavorite : currency.isFavorite))
//       .map((currency) => currency.id);
//     await saveFavoriteCurrencies(updatedFavorites);
//   };

//   const saveFavoriteCurrencies = async (favoriteCurrencies) => {
//     try {
//       await AsyncStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
//     } catch (error) {
//       console.error('Error saving favorite currencies:', error);
//     }
//   };

//   const loadFavoriteCurrencies = async () => {
//     try {
//       const favoriteCurrencies = await AsyncStorage.getItem('favoriteCurrencies');
//       return favoriteCurrencies ? JSON.parse(favoriteCurrencies) : [];
//     } catch (error) {
//       console.error('Error loading favorite currencies:', error);
//       return [];
//     }
//   };

//   const updateCurrenciesOrder = (newOrder) => {
//     setCurrencies(newOrder);
//   };

//   useEffect(() => {
//     fetchCurrencies();
//   }, []);

//   return (
//     <CurrencyContext.Provider value={{ currencies, toggleFavorite, updateCurrenciesOrder }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = () => {
//   return useContext(CurrencyContext);
// };

