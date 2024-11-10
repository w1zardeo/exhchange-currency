import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ThemeStylesCurrency from '../theme/ThemeStylesCurrecny';
import { toggleTheme, setTheme } from '../redux/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'; // Імпорт локалізації
import i18n  from '../util/i18n';

const ConverterHeader = ({ searchQuery, setSearchQuery, toggleBottomSheet, onEditToggle, isEditing }) => {
  const { t } = useTranslation(); // Використання локалізації
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themeStylesCurrency = ThemeStylesCurrency({ isDarkMode });

  const handleCancel = () => {
    setSearchQuery(''); // Скидає пошуковий запит
    setIsSearching(false); // Приховує кнопку "Cancel"
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
    <View style={[styles.headerContainer, themeStylesCurrency.containerStyle]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={styles.editText}>{isEditing ? t('text.done') : t('text.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={24} color="#13518f" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, themeStylesCurrency.textStyle]}>{t('text.header')}</Text>
      <View style={styles.searchRow}>
        <View style={[styles.searchContainer, isSearching && styles.searchActive, themeStylesCurrency.searchContainer]}>
          <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder={t('text.search')}
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)} // Активує пошук
          />
        </View>
        {isSearching && (
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'black',
    padding: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editText: {
    color: '#13518f',
    fontSize: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#1c1c1e',
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 35,
    flex: 1,
  },
  searchActive: {
    flex: 0.99, // Зменшує ширину поля пошуку, коли кнопка "Cancel" активна
  },
  searchIcon: {
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    paddingVertical: 4,
  },
  cancelText: {
    color: '#007AFF',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ConverterHeader;
