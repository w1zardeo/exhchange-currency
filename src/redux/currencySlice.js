// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/UAH';
// const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/currency';

// const DEFAULT_FLAG_URL = 'https://via.placeholder.com/24';


// export const STATUS = {
//   IDLE: 'idle',
//   LOADING: 'loading',
//   SUCCEEDED: 'succeeded',
//   FAILED: 'failed',
// };

// export const fetchCurrencies = createAsyncThunk(
//   'currencies/fetchCurrencies', 
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(EXCHANGE_RATE_API_URL);
//       const data = await response.json();
//       const rates = data.rates;

//       const currenciesArray = await Promise.all(
//         Object.keys(rates).map(async (currency) => {
//           try {
//             const countryResponse = await fetch(`${COUNTRIES_API_URL}/${currency}`);
//             const countryData = await countryResponse.json();
//             const flag = countryData[0]?.flags?.png || DEFAULT_FLAG_URL;
//             const fullCurrencyName = countryData[0]?.currencies?.[currency]?.name || currency;
//             const symbol = countryData[0]?.currencies?.[currency]?.symbol || '';

//             return {
//               id: currency,
//               flag: flag,
//               currency: currency,
//               label: fullCurrencyName,
//               symbol: symbol,
//               rate: rates[currency],
//             };
//           } catch (error) {
//             console.error(`Error fetching data for currency: ${currency}`, error);
//             return null; 
//           }
//         })
//       );

//       return currenciesArray.filter(Boolean); 
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const currencySlice = createSlice({
//   name: 'currencies',
//   initialState: {
//     currencies: [],
//     favoriteCurrencies: [],
//     loading: false,
//     status: STATUS.IDLE, 
//     error: null,
//   },
//   reducers: {
//     toggleFavorite: (state, action) => {
//       const currencyId = action.payload;
//       const isFavorite = state.favoriteCurrencies.includes(currencyId);

//       if (isFavorite) {
//         state.favoriteCurrencies = state.favoriteCurrencies.filter(
//           (id) => id !== currencyId
//         );
//       } else {
//         state.favoriteCurrencies.push(currencyId);
//       }

//       const currency = state.currencies.find((c) => c.id === currencyId);
//       if (currency) {
//         currency.isFavorite = !currency.isFavorite;
//       }
//     },
//     updateCurrenciesOrder: (state, action) => {
//       state.currencies = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCurrencies.pending, (state) => {
//         state.loading = true;
//         state.status = STATUS.LOADING; 
//       })
//       .addCase(fetchCurrencies.fulfilled, (state, action) => {
//         state.loading = false;
//         state.status = STATUS.SUCCEEDED; 

//         const fetchedCurrencies = action.payload || [];
//         fetchedCurrencies.forEach((currency) => {
//           currency.isFavorite = state.favoriteCurrencies.includes(currency.id);
//         });

//         state.currencies = fetchedCurrencies;
//       })
//       .addCase(fetchCurrencies.rejected, (state, action) => {
//         state.loading = false;
//         state.status = STATUS.FAILED; 
//         state.error = action.payload;
//       });
//   },
// });

// export const { toggleFavorite, updateCurrenciesOrder } = currencySlice.actions;

// export default currencySlice.reducer;


import { takeLatest, call, put } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';

const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/UAH';
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/currency';

const DEFAULT_FLAG_URL = 'https://via.placeholder.com/24';

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};

// Async function to fetch exchange rates
async function fetchExchangeRates() {
  const response = await fetch(EXCHANGE_RATE_API_URL);
  const data = await response.json();
  return data.rates;
}

// Async function to fetch country details by currency
async function fetchCountryDetails(currency) {
  const response = await fetch(`${COUNTRIES_API_URL}/${currency}`);
  const data = await response.json();
  return data[0];
}

// Saga to handle the fetching of currencies
function* fetchCurrenciesSaga() {
  try {
    yield put({ type: 'currencies/fetchCurrenciesStart' }); // Dispatch loading action

    // Fetch the exchange rates
    const rates = yield call(fetchExchangeRates);

    // Fetch country data for each currency
    const currenciesArray = yield Promise.all(
      Object.keys(rates).map(async (currency) => {
        try {
          const countryData = await call(fetchCountryDetails, currency);
          const flag = countryData?.flags?.png || DEFAULT_FLAG_URL;
          const fullCurrencyName = countryData?.currencies?.[currency]?.name || currency;
          const symbol = countryData?.currencies?.[currency]?.symbol || '';

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

    // Filter out any null values and dispatch success action
    yield put({
      type: 'currencies/fetchCurrenciesSuccess',
      payload: currenciesArray.filter(Boolean),
    });
  } catch (error) {
    yield put({
      type: 'currencies/fetchCurrenciesFailure',
      payload: error.message,
    });
  }
}

// Watcher saga to trigger the fetchCurrenciesSaga
function* watchFetchCurrencies() {
  yield takeLatest('currencies/fetchCurrenciesRequest', fetchCurrenciesSaga);
}

// Reducer slice to handle actions and state
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
    fetchCurrenciesRequest: (state) => {
      state.loading = true;
      state.status = STATUS.LOADING;
    },
    fetchCurrenciesStart: (state) => {
      state.loading = true;
      state.status = STATUS.LOADING;
    },
    fetchCurrenciesSuccess: (state, action) => {
      state.loading = false;
      state.status = STATUS.SUCCEEDED;

      const fetchedCurrencies = action.payload || [];
      fetchedCurrencies.forEach((currency) => {
        currency.isFavorite = state.favoriteCurrencies.includes(currency.id);
      });

      state.currencies = fetchedCurrencies;
    },
    fetchCurrenciesFailure: (state, action) => {
      state.loading = false;
      state.status = STATUS.FAILED;
      state.error = action.payload;
    },
  },
});

export const { toggleFavorite, updateCurrenciesOrder, fetchCurrenciesRequest } = currencySlice.actions;
export default currencySlice.reducer;
export { watchFetchCurrencies };
