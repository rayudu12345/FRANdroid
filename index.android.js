/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator,
   TouchableOpacity,
   PixelRatio,
   Image
 } from 'react-native';
 import { Provider } from 'react-redux';
 import { createStore, applyMiddleware } from 'redux';
 import thunk from 'redux-thunk';

 import App from './src/App';
 import reducer from './src/store/reducers';

export default class FaceRecognition extends Component {
  constructor(props) {
        debugger;
        super(props);
        this.state = {
       store: createStore(reducer, applyMiddleware(thunk))
     };

  }



  render() {
     /*return (<App />);*/
     return (

       <Provider store = {this.state.store} >
               
                <App store = {this.state.store} />
              </Provider>

     );
   }

}

AppRegistry.registerComponent('FaceRecognition', () => FaceRecognition);
