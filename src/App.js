import React from 'react';

import {
  Navigator
} from 'react-native';

import RouteMapper from './components/Routes';

export default class App extends React.Component {
  render() {
    var initialRoute = {
      //name: 'enrollment-form',
      name: 'home-page',
    };
    var layout =
         <Navigator initialRoute = { initialRoute } configureScene = { () => Navigator.SceneConfigs.FadeAndroid } renderScene = { RouteMapper } />;
          return layout;
  }
}
