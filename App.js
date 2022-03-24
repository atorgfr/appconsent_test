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
  const [consent, setConsent] = useState(false);

  AppConsent.configureWith('a1d95433-3c84-4368-99d9-cd07e744678b', true, true);

  useEffect(() => {
    if (consent === false) {
      try {
        AppConsent.present(false);
      } catch (ex) {}
    }
  }, [consent]);

  return (
    <SafeAreaView>
      <View>
        <Button
          title="SHOW MODAL CONSENT"
          onPress={() => {
            AppConsent.consentGiven().then(() => {
              console.log('CONSENT GIVEN 2');
            });
            AppConsent.clearConsent();
            AppConsent.present(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
