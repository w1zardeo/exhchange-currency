import { Pressable, FlatList, Animated, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
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

const SearchBar = ({ searchQuery, setSearchQuery, isSearching, setIsSearching }) => {
  const styles = useStyles(); // Використовуємо хук для стилів
  const { t } = useTranslation();

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.searchRow}>
      <View style={[styles.searchContainer, isSearching && styles.searchActive]}>
        <Icon name="search" size={18} color={styles.searchInput.color} style={styles.searchIcon} />
        <TextInput
          placeholder={t('text.search')}
          placeholderTextColor={styles.searchInput.color}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
      </View>
      {isSearching && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>{t('text.cancel')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const CurrencyItemInBottomSheet = React.memo(({ item, toggleFavorite }) => {
  const styles = useStyles(); // Використовуємо хук для стилів
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
          color={item.isFavorite ? styles.currency.color : styles.label.color}
        />
      </Pressable>
    </View>
  );
});

const BottomSheet = ({ sheetOpen, setSheetOpen }) => {
  const styles = useStyles(); // Використовуємо хук для стилів
  const currencies = useSelector((state) => state.currency.currencies);
  const [searchQuery, setSearchQuery] = useState('');
  const sheetAnimation = useRef(new Animated.Value(0)).current;
  const coverOpacityAnimation = useRef(new Animated.Value(0)).current;
  const [isSearching, setIsSearching] = useState(false);
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

const useStyles = () => 
  StyleSheet.create({
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 9,
    paddingHorizontal: 6,
    height: 35,
    flex: 1,
    backgroundColor: colors.searchContainerBottom,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
    color: colors.searchInput,
  },
  cancelButton: {
    flex: 0.25,
  },
  cancelText: {
    marginLeft: 10,
    fontSize: 12,
    color: colors.cancelText,
  },
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
  listContainer: {
    paddingBottom: 50,
  },
  starContainer: {
    marginLeft: 10,
  },
  searchActive: {
    flex: 0.99,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: colors.noResults,
  },
});

export default BottomSheet;
