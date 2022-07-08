/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './src/Store';
// import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
  'Require cycle:',
  'Sending `onAnimatedValueUpdate` with no listeners registered.'
]);

AppRegistry.registerComponent(appName, () => App);
