/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import AppConsent from 'appconsent-reactnative';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (consent === false) {
      AppConsent.configureWith(
        'a1d95433-3c84-4368-99d9-cd07e744678b',
        true,
        true,
      );

      AppConsent.consentGiven().then(() => {
        setConsent(true);
        console.log('CONSENT GIVENT');
      });
      try {
        AppConsent.consentAlreadyGiven().then(statusConsent => {
          console.log('statusConsent', statusConsent);
          if (statusConsent === true) {
            setConsent(true);
          } else {
            AppConsent.present(false);
          }
        });
      } catch (ex) {}
    }
  }, [consent]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Button
          title="SHOW MODAL CONSENT"
          onPress={() => {
            AppConsent.clearConsent();
            AppConsent.present(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
