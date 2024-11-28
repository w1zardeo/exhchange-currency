import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ConverterHeader from './ConverterHeader';
import BottomSheet from './BottomSheet';
import { useDispatch, useSelector } from 'react-redux'; 
import {
  toggleFavorite,
  updateCurrenciesOrder,
  fetchCurrencies,
} from '../redux/currencySlice'; 
import { useTranslation } from 'react-i18next'; 

import Icon from 'react-native-vector-icons/MaterialIcons';

// Константи
const DECIMAL_PLACES = 2; // Замість використання state.decimalPlaces
const DEFAULT_BASE_AMOUNT = 0;
const DEFAULT_SEARCH_QUERY = '';

const EditMode = ({ onDrag }) => {
  const colors = useSelector((state) => state.theme.colors); 
  return (
    <TouchableOpacity style={styles.editIcon} onLongPress={onDrag}>
      <Icon name="menu" size={18} color={colors.iconMenu} />
    </TouchableOpacity>
  );
};

const CurrencyInfo = ({ symbol, convertedAmount, rate, currency, decimalPlaces, onInputChange, colors }) => (
  <View style={styles.rateInfo}>
    <View style={styles.inputContainer}>
      <Text style={[styles.symbol, { color: colors.text }]}>{symbol}</Text>
      <TextInput
        style={[styles.rate, { color: colors.text }]}
        keyboardType="numeric"
        value={convertedAmount}
        onChangeText={onInputChange}
        numberOfLines={1}
        maxLength={10}
        scrollEnabled={true}
      />
    </View>
    <Text style={[styles.rateText, { color: colors.rate }]}>
      {`1 UAH = ${rate.toFixed(decimalPlaces)} ${currency}`}
    </Text>
  </View>
);

const CurrencyItem = ({ item, baseAmount, onAmountChange, isEditing, onDrag }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors); 

  const convertedAmount = (baseAmount * item.rate)
    .toFixed(DECIMAL_PLACES)
    .replace('.', ',')
    .replace(/,00$/, '');

  const handleInputChange = (value) => {
    const formattedValue = value.replace(',', '.');
    const numericValue = parseFloat(formattedValue);
    if (!isNaN(numericValue)) {
      const newAmount = numericValue / item.rate || 1;
      const formattedAmount = newAmount
        .toString()
        .replace('.', ',')
        .replace(/,00$/, '');
      onAmountChange(formattedAmount, item.rate);
    } else {
      onAmountChange('0', item.rate);
    }
  };

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(item.id));
  };

  return (
    <View style={[styles.itemContainer, { borderBottomColor: colors.line }]}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={[styles.currency, { color: colors.text }]}>{item.currency}</Text>
        <Text style={[styles.label, { color: colors.label }]}>{item.label}</Text>
      </View>
      {isEditing ? (
        <EditMode onDrag={onDrag} />
      ) : (
        <CurrencyInfo
          symbol={item.symbol}
          convertedAmount={convertedAmount}
          onInputChange={handleInputChange}
          rate={item.rate}
          currency={item.currency}
          decimalPlaces={DECIMAL_PLACES}
          colors={colors}
        />
      )}
    </View>
  );
};

const CurrencyList = () => {
  const { t } = useTranslation();
  const [baseAmount, setBaseAmount] = useState(DEFAULT_BASE_AMOUNT);
  const [searchQuery, setSearchQuery] = useState(DEFAULT_SEARCH_QUERY);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const colors = useSelector((state) => state.theme.colors); 

  const dispatch = useDispatch();
  const { currencies = [], loading } = useSelector((state) => state.currency);

  useEffect(() => {
    if (!Array.isArray(currencies) || currencies.length === 0) {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, currencies]);

  const toggleBottomSheet = () => setSheetOpen((prev) => !prev);
  const onEditToggle = () => setIsEditing((prev) => !prev);

  const handleAmountChange = (value, rate) => {
    const newAmount = parseFloat(value.replace(',', '.')) / rate || 1;
    setBaseAmount(newAmount);
  };

  const handleToggleFavorite = (currencyId) => {
    dispatch(toggleFavorite(currencyId));
  };

  const handleDragEnd = ({ data }) => {
    if (!isEditing) {
      dispatch(updateCurrenciesOrder(data));
    }
  };

  const favoriteCurrencies = currencies.filter((currency) => currency.isFavorite);

  const filteredFavoriteCurrencies = favoriteCurrencies.filter((currency) =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ConverterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleBottomSheet={toggleBottomSheet}
        onEditToggle={onEditToggle}
        isEditing={isEditing}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.ativityIndicator} />
        </View>
      ) : filteredFavoriteCurrencies.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.empty }]}>
          {t('text.emptyText')}
        </Text>
      ) : (
        <FlatList
          data={filteredFavoriteCurrencies}
          renderItem={({ item, drag }) => (
            <CurrencyItem
              item={item}
              baseAmount={baseAmount}
              onAmountChange={handleAmountChange}
              toggleFavorite={() => handleToggleFavorite(item.id)}
              isEditing={isEditing}
              onDrag={isEditing ? drag : undefined}
            />
          )}
          keyExtractor={(item) => item.id}
          onDragEnd={handleDragEnd}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <BottomSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  listContainer: {
    paddingBottom: 130,
  },
  symbol: {
    fontSize: 18,
    marginLeft: 10,
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    marginLeft: 15,
  },
  flag: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginLeft: 10,
    borderRadius: 13,
  },
  currencyInfo: {
    flex: 1,
    marginRight: 12,
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
  },
  rateInfo: {
    alignItems: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 150,
    overflow: 'hidden',
  },
  rate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    overflow: 'hidden',
    textAlign: 'right',
    paddingLeft: 5,
  },
  rateText: {
    fontSize: 13,
    marginRight: 10,
    marginBottom: 10,
  },
  editIcon: {
    padding: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default CurrencyList;
