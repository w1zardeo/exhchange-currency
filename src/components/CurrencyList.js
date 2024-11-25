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

const EditMode = ({ onDrag }) => (
  <TouchableOpacity style={styles.editIcon} onLongPress={onDrag}>
    <Icon name="menu" size={18} color="#efefef" />
  </TouchableOpacity>
);

const ViewMode = ({symbol,convertedAmount,onInputChange,rate,currency,decimalPlaces}) => {
  const colors = useSelector((state) => state.theme.colors); 

  return(
  <View style={styles.rateInfo}>
    <View style={styles.inputContainer}>
      <Text style={[styles.symbol, {color: colors.text}]}>{symbol}</Text>
      <TextInput
        style={[styles.rate, {color:colors.text}]}
        keyboardType="numeric"
        value={convertedAmount}
        onChangeText={onInputChange}
        numberOfLines={1}
        maxLength={10}
        scrollEnabled={true}
      />
    </View>
    <Text style={[styles.rateText, {color: colors.rate}]}>
      {`1 UAH = ${rate.toFixed(decimalPlaces)} ${currency}`}
    </Text>
  </View>
)};

const CurrencyItem = ({ item, baseAmount, onAmountChange, isEditing, onDrag }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const decimalPlaces = useSelector((state) => state.settings.decimalPlaces);
  const colors = useSelector((state) => state.theme.colors); 

  const convertedAmount = (baseAmount * item.rate)
    .toFixed(decimalPlaces)
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

  return (
    <View style={[styles.itemContainer, {borderBottomColor: colors.line}]}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={[styles.currency, styles.textStyle, {color: colors.text}]}>{item.currency}</Text>
        <Text style={[styles.label, styles.labelStyle, {color: colors.label}]}>{item.label}</Text>
      </View>
      {isEditing ? (
        <EditMode onDrag={onDrag} />
      ) : (
        <ViewMode
          symbol={item.symbol}
          convertedAmount={convertedAmount}
          onInputChange={handleInputChange}
          rate={item.rate}
          currency={item.currency}
          decimalPlaces={decimalPlaces}
          styles={styles}
        />
      )}
    </View>
  );
};

const CurrencyList = () => {
  const { t } = useTranslation();
  const [baseAmount, setBaseAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const colors = useSelector((state) => state.theme.colors); 

  const dispatch = useDispatch();
  const { currencies = [], loading, status } = useSelector((state) => state.currency);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

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
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ConverterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleBottomSheet={toggleBottomSheet}
        onEditToggle={onEditToggle}
        isEditing={isEditing}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : filteredFavoriteCurrencies.length === 0 ? (
          <Text style={styles.emptyText}>{t('text.emptyText')}</Text>
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
    backgroundColor: 'black',
    paddingBottom: 50,
  },
  listContainer: {
    paddingBottom: 130,
  },
  symbol: {
    fontSize: 18,
    color: '#efefef',
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
    color: '#efefef',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#666',
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
  symbol: {
    fontSize: 18,
    color: '#efefef',
    marginLeft: 10,
  },
  rate: {
    color: '#efefef',
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
    marginTop: -10,
  },
  editIcon: {
    padding: 10,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default CurrencyList;


