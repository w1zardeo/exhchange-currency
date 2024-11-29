import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, updateCurrenciesOrder, fetchCurrencies } from '../redux/currencySlice';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useStyles from './useStyles'; // імпортуємо хук useStyles

const EditMode = ({ onDrag }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.editIcon} onLongPress={onDrag}>
      <Icon name="menu" size={18} color={styles.iconMenu.color} />
    </TouchableOpacity>
  );
};

const CurrencyInfo = ({ symbol, convertedAmount, rate, currency, decimalPlaces, onInputChange }) => {
  const styles = useStyles();
  const formattedRate = rate.toFixed(decimalPlaces);
  const rateText = `1 UAH = ${formattedRate} ${currency}`;

  return (
    <View style={styles.rateInfo}>
      <View style={styles.inputContainer}>
        <Text style={styles.symbol}>{symbol}</Text>
        <TextInput
          style={styles.rate}
          keyboardType="numeric"
          value={convertedAmount}
          onChangeText={onInputChange}
          numberOfLines={1}
          maxLength={10}
          scrollEnabled={true}
        />
      </View>
      <Text style={styles.rateText}>{rateText}</Text>
    </View>
  );
};

const CurrencyItem = ({ item, baseAmount, onAmountChange, isEditing, onDrag }) => {
  const styles = useStyles();
  const decimalPlaces = useSelector((state) => state.settings.decimalPlaces);

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
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={styles.currency}>{item.currency}</Text>
        <Text style={styles.label}>{item.label}</Text>
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
          decimalPlaces={decimalPlaces}
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

  const dispatch = useDispatch();
  const { currencies = [], loading, status } = useSelector((state) => state.currency);
  const styles = useStyles();

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

  const favoriteCurrencies = currencies.filter((currency) => currency.isFavorite);

  const filteredFavoriteCurrencies = favoriteCurrencies.filter((currency) =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ConverterHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleBottomSheet={toggleBottomSheet}
        onEditToggle={onEditToggle}
        isEditing={isEditing}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={styles.activityIndicator.color} />
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
          contentContainerStyle={styles.listContainer}
        />
      )}
      <BottomSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
    </View>
  );
};

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const colors = useSelector((state) => state.theme.colors);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: 50,
    },
    activityIndicator: {
      color: colors.activityIndicator,
    },
    listContainer: {
      paddingBottom: 130,
    },
    iconMenu: {
      color: colors.iconMenu,
    },
    symbol: {
      fontSize: 18,
      marginLeft: 10,
      color: colors.text,
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
      borderBottomColor: colors.line,
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
      color: colors.text,
    },
    label: {
      fontSize: 12,
      color: colors.label,
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
      color: colors.text,
    },
    rateText: {
      fontSize: 13,
      marginRight: 10,
      marginBottom: 10,
      color: colors.rate,
    },
    editIcon: {
      padding: 10,
    },
    emptyText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: colors.empty,
    },
  });
};

export default CurrencyList;
