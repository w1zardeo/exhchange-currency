import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/ThemeSlice';
import { setDecimalPlaces } from '../redux/settingsSlice';
import { useTranslation } from 'react-i18next';
import i18n from '../util/i18n';
import { FLAGS } from '../constants/flags';

const languages = [
  { code: 'ua', flag: FLAGS.ua },
  { code: 'en', flag: FLAGS.en },
  { code: 'es', flag: FLAGS.es },
];

const CounterButton = ({ type, onPress, colors }) => {
  const styles = useStyles(colors);
  const iconName = type === 'decrement' ? 'remove-outline' : 'add-outline';
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <Icon name={iconName} size={20} color={colors.icon} />
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { isDarkMode, colors } = useSelector((state) => state.theme);
  const { decimalPlaces } = useSelector((state) => state.settings);

  const styles = useStyles(colors);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const incrementDigits = () => {
    dispatch(setDecimalPlaces(decimalPlaces + 1));
  };

  const decrementDigits = () => {
    if (decimalPlaces > 0) {
      dispatch(setDecimalPlaces(decimalPlaces - 1));
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings.title')}</Text>

      <View style={styles.optionsContainer}>
        <View style={styles.combinedSection}>
        
          <View style={styles.option}>
            <Text style={styles.optionText}>{t('settings.toggleTheme')}</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleTheme}
                thumbColor={colors.switchThumb}
                trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
              />
              <Icon
                name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
                size={20}
                color={colors[isDarkMode ? 'iconMoon' : 'iconSun']}
              />
            </View>
          </View>

          <View style={styles.divider} />

          
          <View style={styles.option}>
            <Text style={styles.optionText}>{t('settings.numberOfFractionDigits')}</Text>
            <View style={styles.counterGroup}>
              <Text style={styles.counterValue}>{decimalPlaces}</Text>
              <View style={styles.iconContainer}>
                {['decrement', 'increment'].map((type) => (
                  <CounterButton
                    key={type}
                    type={type}
                    onPress={type === 'decrement' ? decrementDigits : incrementDigits}
                    colors={colors}
                  />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          
          <View style={styles.option}>
            <Text style={styles.optionText}>{t('settings.selectLanguage')}</Text>
            <View style={styles.languageContainer}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageButton}
                  onPress={() => changeLanguage(language.code)}
                >
                  <Image source={language.flag} style={styles.languageFlag} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const useStyles = () => {
  const { colors } = useSelector((state) => state.theme);
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      padding: 20,
      color: colors.text,
    },
    optionsContainer: {
      flex: 1,
    },
    combinedSection: {
      borderRadius: 10,
      marginHorizontal: 20,
      paddingVertical: 1,
      backgroundColor: colors.sectionBackground,
    },
    divider: {
      height: 0.1,
      marginLeft: 20,
      backgroundColor: colors.devider,
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 15,
    },
    optionText: {
      fontSize: 16,
      paddingTop: 5,
      paddingLeft: 7,
      color: colors.text,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    counterValue: {
      fontSize: 18,
      paddingRight: 10,
      color: colors.text,
    },
    iconContainer: {
      flexDirection: 'row',
      borderRadius: 8,
    },
    iconButton: {
      paddingVertical: 5,
      paddingHorizontal: 8,
    },
    languageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    languageButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    languageFlag: {
      width: 30,
      height: 20,
    },
  });
};
