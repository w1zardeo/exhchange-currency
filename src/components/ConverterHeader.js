import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useStyles from './useStyles'; // Імпортуємо хук

const ICON_SIZE = 18;
const ADD_ICON_SIZE = 24;
const SEARCH_PLACEHOLDER_KEY = 'text.search';
const CANCEL_TEXT_KEY = 'text.cancel';
const HEADER_TEXT_KEY = 'text.header';
const EDIT_TEXT_KEY = 'text.edit';
const DONE_TEXT_KEY = 'text.done';

const SearchBar = ({ searchQuery, setSearchQuery, isSearching, setIsSearching }) => {
  const { t } = useTranslation();
  const styles = useStyles(); // Використовуємо стилі з хука

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.searchRow}>
      <View style={[styles.searchContainer, isSearching && styles.searchActive]}>
        <Icon name="search" size={ICON_SIZE} style={styles.searchIcon} />
        <TextInput
          placeholder={t(SEARCH_PLACEHOLDER_KEY)}
          placeholderTextColor={styles.searchInput.color} // Вибираємо колір з styles
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
      </View>
      {isSearching && (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>{t(CANCEL_TEXT_KEY)}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ConverterHeader = ({ searchQuery, setSearchQuery, toggleBottomSheet, onEditToggle, isEditing }) => {
  const { t } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);

  const styles = useStyles(); // Використовуємо стилі з хука

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={styles.textBase}>
            {isEditing ? t(DONE_TEXT_KEY) : t(EDIT_TEXT_KEY)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={ADD_ICON_SIZE} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{t(HEADER_TEXT_KEY)}</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </View>
  );
};

import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const colors = useSelector((state) => state.theme.colors);

  return StyleSheet.create({
    headerContainer: {
      padding: 10,
      backgroundColor: colors.background,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      backgroundColor: colors.searchContainer,
    },
    searchActive: {
      flex: 0.99,
    },
    searchIcon: {
      marginRight: 0,
      color: colors.placeholder,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      paddingVertical: 4,
      color: colors.searchInput,
    },
    textBase: {
      fontSize: 16,
      color: colors.edit,
    },
    addIcon: {
      color: colors.addIcon,
    },
    title: {
      fontSize: 27,
      fontWeight: 'bold',
      marginTop: 5,
      color: colors.text,
    },
    cancelText: {
      marginLeft: 10,
      color: colors.cancelText,
    },
  });
};

export default ConverterHeader;
