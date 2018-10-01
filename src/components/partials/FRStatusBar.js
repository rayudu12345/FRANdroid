import React from 'react';
import {
  View,
  StatusBar,
  Platform,
  StyleSheet
} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const backgroundColor = '#01487d';

export const FRStatusBar = ({...props}) => (
  <View style={{height:STATUSBAR_HEIGHT,backgroundColor:backgroundColor }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);
