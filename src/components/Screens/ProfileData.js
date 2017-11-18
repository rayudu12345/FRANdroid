import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  TouchableOpacity,
  Image,
  Navigator,
  PixelRatio,
  Text,
  Button,
  Dimensions,
  ListView,
  Platform,
  StyleSheet,

} from 'react-native';
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import ListEnrollment from './ListEnrollment';

 var width = Dimensions.get('window').width;
 var height = Dimensions.get('window').height;

 import * as faceActions from '../../store/face/actions';
 import * as faceSelectors from '../../store/face/reducer';

 export class ProfileData extends React.Component {

        constructor(props){
          super(props);
          }


        render() {
          var rowData = this.props.rowData;
          return (
            <View style={{alignItems:'center',flex:1}}>
              <HeaderBar title="PROFILE DATA" />
                <Text style={{fontSize:20,marginTop:20}}>{rowData.toUpperCase()}</Text>

        <BottomBar navigator={this.props.navigator}/>
        </View>

      );
    }
  }

  const mapStateToProps = (state) => {
    debugger;
    return {
      records: faceSelectors.getGalleryView(state)
    };
  }

  export default connect(mapStateToProps)(ProfileData);
