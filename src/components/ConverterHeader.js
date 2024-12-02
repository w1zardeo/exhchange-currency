import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const ADD_ICON_SIZE = 24;

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
  const { colors } = useSelector((state) => state.theme);

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
  });
};

export default ConverterHeader;
