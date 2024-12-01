import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';

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

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);

  return StyleSheet.create ({
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
    searchActive: {
      flex: 0.99,
    },
  });
};

export default SearchBar;