import React from 'react';

import {
    Alert
} from 'react-native';

export default function(value) {
    console.log(value);
    Alert.alert('Error',value);
}
