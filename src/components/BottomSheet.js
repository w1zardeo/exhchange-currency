import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text, Pressable, Animated, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import CurrencyItemInBottomSheet from './CurrencyItemInBottomSheet';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../redux/currencySlice';
import { useTranslation } from 'react-i18next';

const DURATION = 300;

const runAnimation = (animation, toValue) => {
  Animated.timing(animation, {
    toValue,
    duration: DURATION,
    useNativeDriver: false,
  }).start();
};

const BottomSheet = ({ sheetOpen, setSheetOpen }) => {
  const { currencies } = useSelector((state) => state.currency);
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const sheetAnimation = useRef(new Animated.Value(0)).current;
  const coverOpacityAnimation = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openSheet = () => {
    runAnimation(sheetAnimation, 1);
    runAnimation(coverOpacityAnimation, 1);
  };

  const closeSheet = () => {
    runAnimation(sheetAnimation, 0);
    runAnimation(coverOpacityAnimation, 0);
  };

  useEffect(() => {
    if (sheetOpen) {
      openSheet();
    } else {
      closeSheet();
    }
  }, [sheetOpen]);

  const filteredCurrencies = currencies.filter((currency) =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.BottomSheet}>
      <Pressable onPress={() => setSheetOpen(false)} style={{ pointerEvents: sheetOpen ? 'auto' : 'none' }}>
        <Animated.View
          style={[styles.BottomSheetShadowCover, { opacity: coverOpacityAnimation }]}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.BottomSheetMainContainer,
          {
            bottom: sheetAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['-95%', '0%'],
            }),
          },
        ]}
      >
        <Text style={styles.addCurrencies}>{t('text.addCurrencies')}</Text>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <FlatList
          data={filteredCurrencies}
          renderItem={({ item }) => (
            <CurrencyItemInBottomSheet
              item={item}
              toggleFavorite={() => dispatch(toggleFavorite(item.id))}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={() =>
            filteredCurrencies.length === 0 && (
              <Text style={styles.noResults}>{t('text.noResults')}</Text>
            )
          }
        />
      </Animated.View>
    </View>
  );
};

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);

  return StyleSheet.create({
    BottomSheet: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
    BottomSheetShadowCover: {
      height: '100%',
      width: '100%',
    },
    BottomSheetMainContainer: {
      backgroundColor: colors.bottomSheetMain,
      position: 'absolute',
      width: '100%',
      height: '95%',
      bottom: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingTop: 12,
      alignItems: 'center',
    },
    addCurrencies: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.addCurrencies,
    },
    listContainer: {
      paddingBottom: 50,
    },
    noResults: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: colors.noResults,
    },
  });
};

export default BottomSheet;
