import React from 'react';

import {
  StyleSheet,
  Platform,
  PixelRatio,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const INPUT_BORDER_COLOR = '#1D211F';
const INPUT_BACKGROUND_COLOR = '#FFF';
const INPUT_COLOR = '#4D4D4D';
const FONT_FAMILY = 'AvenirNext-Bold';
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;
const getPixelSize = (pixel) => {
  var value = pixel / 3;
  return value;
};

export {STATUSBAR_HEIGHT ,
        APPBAR_HEIGHT,
        INPUT_BORDER_COLOR,
        INPUT_BACKGROUND_COLOR,
        INPUT_COLOR,FONT_FAMILY,
        scale,
        verticalScale,
        width,
        height,
        getPixelSize,
        moderateScale};
