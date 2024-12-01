import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

const CurrencyItemInBottomSheet = React.memo(({ item, toggleFavorite }) => {
  const { colors } = useSelector((state) => state.theme);
  const styles = useStyles();

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={styles.currency}>{item.currency}</Text>
        <Text style={styles.label}>{item.label}</Text>
      </View>
      <Pressable onPress={toggleFavorite} style={styles.starContainer}>
        <AntDesign
          name={item.isFavorite ? 'star' : 'staro'}
          size={20}
          color={item.isFavorite ? colors.favorite : colors.unfavorite}
        />
      </Pressable>
    </View>
  );
});

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);

  return StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 0.2,
      width: '100%',
      paddingRight: 20,
      paddingLeft: 20,
      borderBottomColor: colors.borderBottom,
    },
    flag: {
      width: 24,
      height: 24,
      marginRight: 12,
      borderRadius: 13,
    },
    currencyInfo: {
      flex: 1,
      marginRight: 12,
    },
    currency: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.currency,
    },
    label: {
      fontSize: 12,
      color: colors.label,
    },
    starContainer: {
      marginLeft: 10,
    },
  });
};

export default CurrencyItemInBottomSheet;
