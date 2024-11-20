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

// store/currencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching currencies
export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates.');

      const data = await response.json();
      const rates = data.rates;

      // Load favorite currencies from AsyncStorage
      const favoriteCurrencies = await AsyncStorage.getItem('favoriteCurrencies');
      const favorites = favoriteCurrencies ? JSON.parse(favoriteCurrencies) : [];

      const currenciesArray = await Promise.all(
        Object.keys(rates).map(async (currency) => {
          try {
            const countryResponse = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
            if (!countryResponse.ok) throw new Error(`No data for ${currency}`);

            const countryData = await countryResponse.json();
            const flag = countryData[0]?.flags?.png || 'https://via.placeholder.com/24';
            const fullCurrencyName = countryData[0]?.currencies[currency]?.name || currency;
            const symbol = countryData[0]?.currencies[currency]?.symbol || '';

            return {
              id: currency,
              flag,
              currency,
              label: fullCurrencyName,
              symbol,
              rate: rates[currency],
              isFavorite: favorites.includes(currency),
            };
          } catch (error) {
            // Fallback для валют без доступних даних
            return {
              id: currency,
              flag: 'https://via.placeholder.com/24',
              currency,
              label: currency,
              symbol: '',
              rate: rates[currency],
              isFavorite: favorites.includes(currency),
            };
          }
        })
      );

      return currenciesArray;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Slice for currency state
const currencySlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const currency = state.currencies.find((c) => c.id === action.payload);
      if (currency) {
        currency.isFavorite = !currency.isFavorite;
  
        // Save updated favorites to AsyncStorage
        const favoriteCurrencies = state.currencies.filter((c) => c.isFavorite).map((c) => c.id);
  
        // Використовуємо async/await
        (async () => {
          await AsyncStorage.setItem('favoriteCurrencies', JSON.stringify(favoriteCurrencies));
        })();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.currencies = []; // Очистити стан
      });
  },
});

export const { toggleFavorite, updateCurrenciesOrder } = currencySlice.actions;

export default currencySlice.reducer;
