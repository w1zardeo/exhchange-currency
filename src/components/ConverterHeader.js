import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/ThemeSlice'; 
import { useTranslation } from 'react-i18next'; 

const ConverterHeader = ({ searchQuery, setSearchQuery, toggleBottomSheet, onEditToggle, isEditing }) => {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);
  
  const colors = useSelector((state) => state.theme.colors); 

  const handleCancel = () => {
    setSearchQuery(''); 
    setIsSearching(false); 
  };

  return (
    <View style={[styles.headerContainer, {backgroundColor: colors.background}]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={styles.editText}>{isEditing ? t('text.done') : t('text.edit')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={24} color="#13518f" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{t('text.header')}</Text>
      <View style={styles.searchRow}>
        <View style={[styles.searchContainer, isSearching && styles.searchActive, {backgroundColor: colors.searchContainer}]}>
          <Icon name="search" size={18} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder={t('text.search')}
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)} 
          />
        </View>
        {isSearching && (
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>{t('text.cancel')}</Text>
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
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 35,
    flex: 1,
  },
  searchActive: {
    flex: 0.99, 
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
