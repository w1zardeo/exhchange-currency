import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/UAH';
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/currency';

const DEFAULT_FLAG_URL = 'https://via.placeholder.com/24';


export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(EXCHANGE_RATE_API_URL);
      const data = await response.json();
      const rates = data.rates;

      const currenciesArray = await Promise.all(
        Object.keys(rates).map(async (currency) => {
          try {
            const countryResponse = await fetch(`${COUNTRIES_API_URL}/${currency}`);
            const countryData = await countryResponse.json();
            const flag = countryData[0]?.flags?.png || DEFAULT_FLAG_URL;
            const fullCurrencyName = countryData[0]?.currencies?.[currency]?.name || currency;
            const symbol = countryData[0]?.currencies?.[currency]?.symbol || '';

            return {
              id: currency,
              flag: flag,
              currency: currency,
              label: fullCurrencyName,
              symbol: symbol,
              rate: rates[currency],
            };
          } catch (error) {
            console.error(`Error fetching data for currency: ${currency}`, error);
            return null; 
          }
        })
      );

      return currenciesArray.filter(Boolean); 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const currencySlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: [],
    favoriteCurrencies: [],
    loading: false,
    status: STATUS.IDLE, 
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const currencyId = action.payload;
      const isFavorite = state.favoriteCurrencies.includes(currencyId);

      if (isFavorite) {
        state.favoriteCurrencies = state.favoriteCurrencies.filter(
          (id) => id !== currencyId
        );
      } else {
        state.favoriteCurrencies.push(currencyId);
      }

      const currency = state.currencies.find((c) => c.id === currencyId);
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
        state.status = STATUS.LOADING; 
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.status = STATUS.SUCCEEDED; 

        const fetchedCurrencies = action.payload || [];
        fetchedCurrencies.forEach((currency) => {
          currency.isFavorite = state.favoriteCurrencies.includes(currency.id);
        });

        state.currencies = fetchedCurrencies;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.loading = false;
        state.status = STATUS.FAILED; 
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, updateCurrenciesOrder } = currencySlice.actions;

export default currencySlice.reducer;
