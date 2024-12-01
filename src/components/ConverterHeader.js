import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ICON_SIZE = 18;
const ADD_ICON_SIZE = 24;
const SearchBar = ({ searchQuery, setSearchQuery, isSearching, setIsSearching }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const handleCancel = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <View style={styles.searchRow}>
      <View style={[styles.searchContainer, isSearching && styles.searchActive]}>
        <Icon name="search" size={ICON_SIZE} style={styles.searchIcon} />
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
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelText}>{t('text.cancel')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ConverterHeader = ({ searchQuery, setSearchQuery, toggleBottomSheet, onEditToggle, isEditing }) => {
  const { t } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);

  const styles = useStyles(); 

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onEditToggle}>
          <Text style={styles.textBase}>
            {isEditing ? t('text.done') : t('text.edit')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Icon name="add" size={ADD_ICON_SIZE} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{t('text.header')}</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </View>
  );
};

const useStyles = () => {
  const {colors} = useSelector((state) => state.theme);

 return StyleSheet.create = ({
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
