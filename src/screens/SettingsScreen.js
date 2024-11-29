import React from 'react'; 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/ThemeSlice';
import { setDecimalPlaces } from '../redux/settingsSlice';
import { useTranslation } from 'react-i18next'; 
import i18n  from '../util/i18n';

const languages = [
  { code: 'ua', flag: require('../flags/ua-flag.png') },
  { code: 'en', flag: require('../flags/gb-flag.png') },
  { code: 'es', flag: require('../flags/spanish-flag.png') }
];

const ThemeIcon = ({ isDarkMode, colors }) => {
  return isDarkMode ? (
    <Icon name="moon-outline" size={20} color={colors.iconMoon} />
  ) : (
    <Icon name="sunny-outline" size={20} color={colors.iconSun} />
  );
};

export default function SettingsScreen() {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  
 
  const { isDarkMode, colors } = useSelector((state) => state.theme);
  const decimalPlaces = useSelector((state) => state.settings.decimalPlaces);


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
    <View style={styles.container(colors)}>
      <Text style={styles.header(colors)}>{t('settings.title')}</Text>

      <View style={styles.optionsContainer}>
        <View style={styles.combinedSection(colors)}>

          
          <View style={styles.option}>
            <Text style={styles.optionText(colors)}>{t('settings.toggleTheme')}</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleTheme}
                thumbColor={colors.switchThumb}
                trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
              />
              <ThemeIcon isDarkMode={isDarkMode} colors={colors} />
            </View>
          </View>

          <View style={styles.divider(colors)} />

         
          <View style={styles.option}>
            <Text style={styles.optionText(colors)}>{t('settings.numberOfFractionDigits')}</Text>
            <View style={styles.counterGroup}>
              <Text style={styles.counterValue(colors)}>{decimalPlaces}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={decrementDigits} style={styles.iconButton}>
                  <Icon name="remove-outline" size={20} color={colors.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={incrementDigits} style={styles.iconButton}>
                  <Icon name="add-outline" size={20} color={colors.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.divider(colors)} />

          
          <View style={styles.option}>
            <Text style={styles.optionText(colors)}>{t('settings.selectLanguage')}</Text>
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


const styles = StyleSheet.create = ({
  container: (colors) => ({
    backgroundColor: colors.background,
    flex: 1,
  }),
  header: (colors) => ({
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
    color: colors.text,
  }),
  optionsContainer: {
    flex: 1,
  },
  combinedSection: (colors) => ({
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 1,
    backgroundColor: colors.sectionBackground,
  }),
  divider: (colors) => ({
    height: 0.1,
    marginLeft: 20,
    backgroundColor: colors.devider,
  }),
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  optionText: (colors) => ({
    fontSize: 16,
    paddingTop: 5,
    paddingLeft: 7,
    color: colors.text,
  }),
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterValue: (colors) => ({
    fontSize: 18,
    paddingRight: 10,
    color: colors.text,
  }),
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