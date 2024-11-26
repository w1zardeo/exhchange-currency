import { Pressable, StyleSheet, Text, View, Animated, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux'; 
import { toggleFavorite } from '../redux/currencySlice'; 
import { useTranslation } from 'react-i18next'; 

const BottomSheet = ({ sheetOpen, setSheetOpen }) => {
  const currencies = useSelector((state) => state.currency.currencies); 
  const [searchQuery, setSearchQuery] = useState('');
  const sheetAnimation = useRef(new Animated.Value(0)).current;
  const coverOpacityAnimation = useRef(new Animated.Value(0)).current;
  const [isSearching, setIsSearching] = useState(false);
  const { t } = useTranslation();
  const colors = useSelector((state) => state.theme.colors); 

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const openSheet = () => {
    Animated.timing(sheetAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(coverOpacityAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(sheetAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(coverOpacityAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const sheetAnimationInterpolate = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-95%', '0%'],
  });

  const coverOpacityAnimationInterpolate = sheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

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
        <Animated.View style={[styles.BottomSheetShadowCover, { opacity: coverOpacityAnimationInterpolate }]} />
      </Pressable>
      <Animated.View style={[styles.BottomSheetMainContainer, { bottom: sheetAnimationInterpolate }]}>
        <Text style={styles.addCurrencies}>{t('text.addCurrencies')}</Text>
        <View style={[styles.searchRow]}>
          <View style={[styles.searchContainer, isSearching && styles.searchActive]}>
            <Icon name="search" size={18} color={colors.placeholder} style={styles.searchIcon} />
            <TextInput
              placeholder={t('text.search')}
              placeholderTextColor={colors.placeholder}
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
        <FlatList
          data={filteredCurrencies}
          renderItem={({ item }) => (
            <CurrencyItemInBotomSheet
              item={item}
              toggleFavorite={() => dispatch(toggleFavorite(item.id))} 
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={() => (
            <Text style={styles.noResults}>{t('text.noResults')}</Text>
         )}
        />
      </Animated.View>
    </View>
  );
};

const CurrencyItemInBotomSheet = ({ item, toggleFavorite }) => {
  const colors = useSelector((state) => state.theme.colors); 
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
    backgroundColor: '#000000b3',
  },
  BottomSheetMainContainer: {
    position: 'absolute',
    width: '100%',
    height: '95%',
    bottom: 0,
    backgroundColor: '#1c1c1e',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 12,
    alignItems: 'center',
  },
  addCurrencies: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: '#313036',
    borderRadius: 9,
    paddingHorizontal: 6,
    height: 35,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 4,
  },
  cancelButton: {
    flex: 0.25,
  },
  cancelText: {
    color: '#007AFF',
    marginLeft: 10,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#1a1a1a',
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
    color: '#efefef',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 50,
  },
  starContainer: {
    marginLeft: 10,
  },
  searchActive: {
    flex: 0.99
  },
  noResults: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default BottomSheet;
