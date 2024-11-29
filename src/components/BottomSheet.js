import { Pressable, StyleSheet, Text, View, Animated, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

const SearchBar = ({ searchQuery, setSearchQuery, isSearching, setIsSearching }) => {
  const colors = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={[styles.searchRow]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.searchContainerBottom },
          isSearching && styles.searchActive,
        ]}
      >
        <Icon name="search" size={18} color={colors.placeholder} style={styles.searchIcon} />
        <TextInput
          placeholder={t('text.search')}
          placeholderTextColor={colors.placeholder}
          style={[styles.searchInput, { color: colors.searchInput }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
      </View>
      {isSearching && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={[styles.cancelText, { color: colors.cancelText }]}>{t('text.cancel')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const CurrencyItemInBottomSheet = React.memo(({ item, toggleFavorite }) => {
  const colors = useSelector((state) => state.theme.colors);
  return (
    <View style={[styles.itemContainer, { borderBottomColor: colors.borderBottom }]}>
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <View style={styles.currencyInfo}>
        <Text style={[styles.currency, { color: colors.currency }]}>{item.currency}</Text>
        <Text style={[styles.label, { color: colors.label }]}>{item.label}</Text>
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

const BottomSheet = ({ sheetOpen, setSheetOpen }) => {
  const currencies = useSelector((state) => state.currency.currencies);
  const [searchQuery, setSearchQuery] = useState('');
  const sheetAnimation = useRef(new Animated.Value(0)).current;
  const coverOpacityAnimation = useRef(new Animated.Value(0)).current;
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors);

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
          style={[
            styles.BottomSheetShadowCover,
            { backgroundColor: colors.bottomSheet },
            { opacity: coverOpacityAnimation },
          ]}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.BottomSheetMainContainer,
          { backgroundColor: colors.bottomSheetMain },
          {
            bottom: sheetAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['-95%', '0%'],
            }),
          },
        ]}
      >
        <Text style={[styles.addCurrencies, { color: colors.addCurrencies }]}>{t('text.addCurrencies')}</Text>
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
              <Text style={[styles.noResults, { color: colors.noResults }]}>{t('text.noResults')}</Text>
            )
          }
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  cancelButton: {
    flex: 0.25,
  },
  cancelText: {
    marginLeft: 10,
    fontSize: 12,
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
  },
  label: {
    fontSize: 12,
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
  },
});

export default BottomSheet;
