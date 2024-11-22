import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for fetching currencies
export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
      const data = await response.json();
      const rates = data.rates;

      // Load favorite currencies from AsyncStorage
      const favoriteCurrencies = await AsyncStorage.getItem('favoriteCurrencies');
      const favorites = favoriteCurrencies ? JSON.parse(favoriteCurrencies) : [];

      const currenciesArray = await Promise.all(
        Object.keys(rates).map(async (currency) => {
          try {
            const countryResponse = await fetch(`https://restcountries.com/v3.1/currency/${currency}`);
            const countryData = await countryResponse.json();
            const flag = countryData[0]?.flags?.png || 'https://via.placeholder.com/24';
            const fullCurrencyName = countryData[0]?.currencies?.[currency]?.name || currency;
            const symbol = countryData[0]?.currencies?.[currency]?.symbol || '';

            return {
              id: currency,
              flag: flag,
              currency: currency,
              label: fullCurrencyName,
              symbol: symbol,
              rate: rates[currency],
              isFavorite: favorites.includes(currency),
            };
          } catch (error) {
            console.error(`Error fetching data for currency: ${currency}`, error);
            return null; // Handle error gracefully
          }
        })
      );

      return currenciesArray.filter(Boolean); // Filter out null entries
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice for currency state
const currencySlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: [], // Ensure this always exists as an array
    loading: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const currency = state.currencies.find((c) => c.id === action.payload);
      if (currency) {
        currency.isFavorite = !currency.isFavorite;
      }
    },
    updateCurrenciesOrder: (state, action) => {
      state.currencies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.currencies = action.payload || []; // Ensure array, even if payload is undefined
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Async function for saving favorites to AsyncStorage
export const saveFavoritesToAsyncStorage = () => async (dispatch, getState) => {
  const favorites = getState().currencies.currencies
    .filter((currency) => currency.isFavorite)
    .map((currency) => currency.id);

  try {
    await AsyncStorage.setItem('favoriteCurrencies', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorite currencies:', error);
  }
};

export const { toggleFavorite, updateCurrenciesOrder } = currencySlice.actions;

export default currencySlice.reducer;
