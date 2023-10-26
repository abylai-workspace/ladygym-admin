/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './app/App'
import './ignoreWarnings'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
