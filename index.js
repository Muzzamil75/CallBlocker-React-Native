/* eslint-disable prettier/prettier */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Handler from './Handler';


AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('Handler', () => Handler);
