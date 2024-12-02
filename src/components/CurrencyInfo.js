import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const getRateInfoText = (rate, currency) => `1 UAH = ${rate.toFixed(2)} ${currency}`;


const CurrencyInfo = ({ symbol, convertedAmount, onInputChange, rate, currency }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.symbol}>{symbol}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={convertedAmount}
          onChangeText={onInputChange}
        />
      </View>
      <Text style={styles.rateInfo}>{getRateInfoText(rate, currency)}</Text>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    container: {
      alignItems: 'flex-end',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    symbol: {
      fontSize: 18,
      marginRight: 8,
      color: colors.text,
    },
    input: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'right',
    },
    rateInfo: {
      fontSize: 14,
      color: colors.label,
    },
  });
};

export default CurrencyInfo;
