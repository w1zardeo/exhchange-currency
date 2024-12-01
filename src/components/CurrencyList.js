import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../redux/currencySlice';
import ConverterHeader from './ConverterHeader';
import CurrencyItem from './CurrencyItem';
import BottomSheet from './BottomSheet';
import { useTranslation } from 'react-i18next';

const CurrencyList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [baseAmount, setBaseAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { currencies = [], loading } = useSelector((state) => state.currency);
  const styles = useStyles();

  useEffect(() => {
    if (!currencies.length) {
      dispatch(fetchCurrencies());
    }
  }, [dispatch, currencies]);

  const handleAmountChange = (value, rate) => {
    const newAmount = parseFloat(value.replace(',', '.')) / rate || 1;
    setBaseAmount(newAmount);
  };

  const toggleBottomSheet = () => setSheetOpen((prev) => !prev);
  const onEditToggle = () => setIsEditing((prev) => !prev);

  const filteredCurrencies = currencies.filter((currency) =>
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
        <ActivityIndicator size="large" color={styles.activityIndicator.color} />
      ) : filteredCurrencies.length === 0 ? (
        <Text style={styles.emptyText}>{t('text.emptyText')}</Text>
      ) : (
        <FlatList
          data={filteredCurrencies}
          renderItem={({ item }) => (
            <CurrencyItem
              item={item}
              baseAmount={baseAmount}
              onAmountChange={handleAmountChange}
              isEditing={isEditing}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <BottomSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
    </View>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    activityIndicator: {
      color: colors.activityIndicator,
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
