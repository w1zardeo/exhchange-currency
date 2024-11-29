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
          styles.searchContainer(colors),
          isSearching && styles.searchActive
        ]}
      >
        <Icon name="search" size={ICON_SIZE} style={styles.searchIcon(colors)} />
        <TextInput
          placeholder={t(SEARCH_PLACEHOLDER_KEY)}
          placeholderTextColor={colors.placeholder}
          style={styles.searchInput(colors)}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
        />
      </View>
      {isSearching && (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={[styles.textBase, styles.cancelText(colors)]}>
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
    <View style={[styles.headerContainer(colors)]}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={styles.textBase(colors)}>
            {isEditing ? t(DONE_TEXT_KEY) : t(EDIT_TEXT_KEY)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={ADD_ICON_SIZE} color={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.textBase, styles.title(colors)]}>{t(HEADER_TEXT_KEY)}</Text>
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
  headerContainer: (colors) => ({
    padding: 10,
    backgroundColor: colors.background
  }),
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: (colors) => ({
    color: colors.placeholder
  }),
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  searchContainer: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 35,
    flex: 1,
    backgroundColor: colors.searchContainer,
  }),
  searchActive: {
    flex: 0.99,
  },
  searchIcon: (colors) => ({
    marginRight: 0,
    color: colors.placeholder
  }),
  searchInput: (colors) => ({
    flex: 1,
    fontSize: 14,
    paddingVertical: 4,
    color: colors.searchInput
  }),
  textBase: (colors) => ({
    fontSize: 16,
    color: colors.edit
  }),
  addIcon: (colors) => ({
    color: colors.addIcon
  }),
  title: (colors) => ({
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.text
  }),
  cancelText:  (colors) => ({
    marginLeft: 10,
    color: colors.cancelText
  }),
});

export default ConverterHeader;
