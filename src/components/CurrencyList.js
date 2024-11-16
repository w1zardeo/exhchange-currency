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
import { useCurrency } from '../redux/CurrencyContext'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ThemeStylesCurrency from '../theme/ThemeStylesCurrecny';
import { toggleTheme, setTheme } from '../redux/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const CurrencyItem = ({ item, baseAmount, onAmountChange, isEditing, onDrag }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const decimalPlaces = useSelector((state) => state.settings.decimalPlaces);
  const themeStylesCurrency = ThemeStylesCurrency({ isDarkMode });
  const convertedAmount = (baseAmount * item.rate)
    .toFixed(decimalPlaces)
    .replace('.', ',')
    .replace(/,00$/, '');

  const handleInputChange = value => {
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

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('isDarkMode');
        if (savedTheme !== null) {
          dispatch(setTheme(JSON.parse(savedTheme)));
        }
      } catch (e) {
        console.log('Failed to load theme.', e);
      }
    };
    loadTheme();
  }, [dispatch]);

  return (
    <View style={[styles.itemContainer, themeStylesCurrency.stylesLine]}>
      <Image source={{uri: item.flag}} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={[styles.currency, themeStylesCurrency.textStyle]}>{item.currency}</Text>
        <Text style={[styles.label, themeStylesCurrency.labelText]}>{item.label}</Text>
      </View>
      <View style={styles.rateInfo}>
        {isEditing ? (
          <TouchableOpacity style={styles.editIcon} onLongPress={onDrag}>
            <Icon name="menu" size={18} color="#efefef" />
          </TouchableOpacity>
        ) : (
          <View style={styles.inputContainer}>
            <Text style={[styles.symbol, themeStylesCurrency.textStyle]}>{item.symbol}</Text>
            <TextInput
              style={[styles.rate, themeStylesCurrency.textStyle]}
              keyboardType="numeric"
              value={convertedAmount}
              onChangeText={handleInputChange}
              numberOfLines={1}
              maxLength={10}
              scrollEnabled={true}
            />
          </View>
        )}
        {!isEditing && (
          <Text style={[styles.rateText, themeStylesCurrency.rateText]}>{`1 UAH = ${item.rate.toFixed(decimalPlaces)} ${item.currency}`}</Text>
        )}
      </View>
    </View>
  );
};

const CurrencyList = () => {
  const { currencies, toggleFavorite, updateCurrenciesOrder } = useCurrency();
  const [baseAmount, setBaseAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themeStylesCurrency = ThemeStylesCurrency({ isDarkMode });
  
  useEffect(() => {
    const loadCurrencies = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (currencies.length > 0) {
        const favoriteCurrencies = currencies.filter(currency => currency.isFavorite);
        setData(favoriteCurrencies);
        setLoading(false);
      }
    };
  
    loadCurrencies();
  }, [currencies]);

  const toggleBottomSheet = () => setSheetOpen(prev => !prev);
  const onEditToggle = () => setIsEditing(prev => !prev);

  const handleAmountChange = (value, rate) => {
    const newAmount = parseFloat(value.replace(',', '.')) / rate || 1;
    setBaseAmount(newAmount);
  };

  const handleDragEnd = ({ data }) => {
    setData([...data]);
    if (!isEditing) {
      updateCurrenciesOrder(data);
    }
  };

  const filteredFavoriteCurrencies = data.filter(currency =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={[styles.container, themeStylesCurrency.containerStyle]}>
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
      ) : (
        <FlatList
          data={filteredFavoriteCurrencies}
          renderItem={({ item, drag }) => (
            <CurrencyItem
              item={item}
              baseAmount={baseAmount}
              onAmountChange={handleAmountChange}
              toggleFavorite={() => toggleFavorite(item.id)}
              isEditing={isEditing}
              onDrag={isEditing ? drag : undefined}
            />
          )}
          keyExtractor={item => item.id}
          onDragEnd={handleDragEnd}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <BottomSheet
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        toggleFavorite={toggleFavorite}
      />
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
  loaderContainer: { // Лоадер буде відображатися поверх списку, а не на весь екран
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
});

export default CurrencyList;
