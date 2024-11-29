import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/ThemeSlice';
import { useTranslation } from 'react-i18next';

const ICON_SIZE = 18;
const ADD_ICON_SIZE = 24;
const SEARCH_PLACEHOLDER_KEY = 'text.search';
const CANCEL_TEXT_KEY = 'text.cancel';
const HEADER_TEXT_KEY = 'text.header';
const EDIT_TEXT_KEY = 'text.edit';
const DONE_TEXT_KEY = 'text.done';

const SearchBar = ({ searchQuery, setSearchQuery, isSearching, setIsSearching }) => {
  const colors = useSelector((state) => state.theme.colors);
  const { t } = useTranslation();

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.searchRow}>
      <View
        style={[
          styles.searchContainer,
          isSearching && styles.searchActive,
          { backgroundColor: colors.searchContainer },
        ]}
      >
        <Icon name="search" size={ICON_SIZE} color={colors.placeholder} style={styles.searchIcon} />
        <TextInput
          placeholder={t(SEARCH_PLACEHOLDER_KEY)}
          placeholderTextColor={colors.placeholder}
          style={[styles.searchInput, { color: colors.searchInput }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
      </View>
      {isSearching && (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={[styles.textBase, styles.cancelText, { color: colors.cancelText }]}>
            {t(CANCEL_TEXT_KEY)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ConverterHeader = ({ searchQuery, setSearchQuery, toggleBottomSheet, onEditToggle, isEditing }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const colors = useSelector((state) => state.theme.colors);

  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={[styles.textBase, { color: colors.edit }]}>
            {isEditing ? t(DONE_TEXT_KEY) : t(EDIT_TEXT_KEY)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={ADD_ICON_SIZE} color={colors.addIcon} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.textBase, styles.title, { color: colors.text }]}>{t(HEADER_TEXT_KEY)}</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
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
  },
  searchActive: {
    flex: 0.99,
  },
  searchIcon: {
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
  },
  textBase: {
    fontSize: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cancelText: {
    marginLeft: 10,
  },
});

export default ConverterHeader;
