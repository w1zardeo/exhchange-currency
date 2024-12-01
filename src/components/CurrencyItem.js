import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CurrencyInfo from './CurrencyInfo';
import EditMode from './EditMode';

const CurrencyItem = ({ item, baseAmount, onAmountChange, isEditing }) => {
  const styles = useStyles();
  const { decimalPlaces } = useSelector((state) => state.settings);

  const convertedAmount = (baseAmount * item.rate)
    .toFixed(decimalPlaces)
    .replace('.', ',')
    .replace(/,00$/, '');

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={styles.currency}>{item.currency}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </View>
      {isEditing ? (
        <EditMode />
      ) : (
        <CurrencyInfo
          symbol={item.symbol}
          convertedAmount={convertedAmount}
          onInputChange={(value) => onAmountChange(value, item.rate)}
          rate={item.rate}
          currency={item.currency}
        />
      )}
    </View>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 0.2,
      borderBottomColor: colors.line,
    },
    flag: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    currencyInfo: {
      flex: 1,
      marginLeft: 10,
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
  });
};

export default CurrencyItem;
