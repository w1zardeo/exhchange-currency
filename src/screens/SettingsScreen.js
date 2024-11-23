import React, { useEffect } from 'react'; // Тут не треба замніяти на ScrollView так як саписок малий
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Animated,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setTheme } from '../redux/ThemeSlice';
import { setDecimalPlaces } from '../redux/settingsSlice';
import { useTranslation } from 'react-i18next'; 
import i18n  from '../util/i18n';

export default function SettingsScreen() {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.theme.colors); 
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); 
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>{t('settings.title')}</Text>

      <ScrollView style={styles.optionsContainer}>
        <View style={[styles.combinedSection, { backgroundColor: colors.sectionBackground }]}>
          {/* Toggle theme section */}
          <View style={styles.option}>
            <Text style={[styles.optionText, { color: colors.text }]}>
              {t('settings.toggleTheme')}
            </Text>
            <View style={styles.switchContainer}>
              <Switch
                value={isDarkMode}
                onValueChange={handleToggleTheme}
                thumbColor={colors.switchThumb}
                trackColor={{ false: colors.switchTrack, true: colors.switchTrack }}
              />
              <Animated.View>
                {isDarkMode ? (
                  <Icon name="moon-outline" size={20} color="#fff" />
                ) : (
                  <Icon name="sunny-outline" size={20} color="#ffcc00" />
                )}
              </Animated.View>
            </View>
          </View>

          <View style={[styles.divider, { devider: colors.devider }]} />

          <View style={styles.option}>
            <Text style={[styles.optionText, { color: colors.text }]}>
              {t('settings.numberOfFractionDigits')}
            </Text>
            <View style={styles.counterGroup}>
              <Text style={[styles.counterValue, { color: colors.text }]}>
                {decimalPlaces} 
              </Text>
              <View style={[styles.iconContainer, { icon: colors.iconBackground }]}>
                <TouchableOpacity onPress={decrementDigits} style={styles.iconButton}>
                  <Icon name="remove-outline" size={20} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={incrementDigits} style={styles.iconButton}>
                  <Icon name="add-outline" size={20} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        
          <View style={[styles.divider, { devider: colors.devider }]} />

          <View style={styles.option}>
            <Text style={[styles.optionText, { color: colors.text }]}>
              {t('settings.selectLanguage')}
            </Text>
            <View style={styles.languageContainer}>
              <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('ua')}>
                <Image source={require('../flags/ua-flag.png')} style={{ width: 30, height: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('en')}>
                <Image source={require('../flags/gb-flag.png')} style={{ width: 30, height: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton} onPress={() => changeLanguage('es')}>
                <Image source={require('../flags/spanish-flag.png')} style={{ width: 30, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
  },
  optionsContainer: {
    flex: 1,
  },
  combinedSection: {
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 1,
    backgroundColor: '#333',
  },
  divider: {
    height: 0.1,
    backgroundColor: '#e0e0e0',
    marginLeft: 20
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
    paddingTop: -10
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  languageText: {
    marginLeft: 5,
    fontSize: 16,
  },
});
