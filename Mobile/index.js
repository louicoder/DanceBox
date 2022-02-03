/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './src/Store';
import { name as appName } from './app.json';

LogBox.ignoreLogs([ 'Non-serializable values were found in the navigation state.', 'Require cycles are allowed,' ]);

AppRegistry.registerComponent(appName, () => App);
