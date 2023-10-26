import React, {Suspense, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {I18nextProvider} from 'react-i18next';
import i18n from 'services/i18n';

import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator, LogBox} from 'react-native';
import AppStack from 'navigation/AppStack';
import {PortalProvider} from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    const ignoreWarns = [
      'new NativeEventEmitter',
      'EventEmitter.removeListener',
      '[fuego-swr-keys-from-collection-path]',
      'Setting a timer for a long period of time',
      'ViewPropTypes will be removed from React Native',
      'AsyncStorage has been extracted from react-native',
      "exported from 'deprecated-react-native-prop-types'.",
      'Non-serializable values were found in the navigation state.',
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ];

    LogBox.ignoreLogs(ignoreWarns);
  }, []);

  return (
    <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
      <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#3651fe' }}>
        <PortalProvider>
          <Provider store={store}>
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </Provider>
        </PortalProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Suspense>
  );
};

export default App;
