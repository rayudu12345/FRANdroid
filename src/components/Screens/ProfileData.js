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
  StyleSheet
} from 'react-native';
import HeaderBar from './HeaderBar';
import BottomBar from './BottomBar';
import ListEnrollment from './ListEnrollment';

 var width = Dimensions.get('window').width;
 var height = Dimensions.get('window').height;
 import * as faceActions from '../../store/face/actions';
 import * as faceSelectors from '../../store/face/reducer';

export class ProfileData extends React.Component {
  constructor(props) {
      debugger;
      super(props);
      this.state = {
          record: this.props.records || {}
          }
    }

  onPressHome() {
    this.props.navigator.push({
      component:HomePage,
      name:'home-page'
    });
  }

  _renderEmotions(data) {
        return (
          <View>
          <Text>anger: {data.anger}</Text>
          <Text>joy: {data.joy}</Text>
          <Text>sadness: {data.sadness}</Text>
          <Text>-----------------------------------------------</Text>
          </View>
        );
  }

  _renderDemographics(demographics) {
      return demographics.map((data, i) => {
        return (
          <View key={i}>
          <Text>age group: {data.age_group}</Text>
          <Text>gender: {data.gender}</Text>
          <Text>-----------------------------------------------</Text>
          </View>
        )
      })
  }

  _renderResponse(images, that) {
    debugger;
    return (<ScrollView key={images} style={{marginLeft:40,marginBottom:50,marginTop:20}}>
    {images.map(function(image, i){
      return (<View key={i}>
        <Text style={{color:'#0C303F'}}>Emotions</Text>
        { that._renderEmotions(image.emotions) }

        <Text style={{color:'#0C303F'}}>Demographics</Text>
        { that._renderDemographics(image.demographics) }
        </View>)
    })}
    </ScrollView>)
  }

  render(rowData){
    var rowData=this.props.rowData;
    return (
          <View style={{flex:1}}>
          <View style={{alignItems:'center'}}>
            <HeaderBar title="PROFILE DATA" />
            <Text style={{fontSize:20,marginTop:20}}>{rowData.toUpperCase()}</Text>
            <View>{this._renderEmotions(this.props.records)}</View>
          </View>

            <BottomBar navigator={this.props.navigator}/>

          </View>
        );

    }
    }

const styles = StyleSheet.create({
    container: {
      flex:1,
      padding: 20
      },
    input: {
      height:40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom:10,
      color:'#000',
      paddingHorizontal:10
    },
    buttonContainer:{
      backgroundColor:'#0C303F',
      width: width*0.8,
      paddingVertical:15
    },
    buttonText:{
      textAlign:'center',
      color:'#fff',
      fontWeight:'600'
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:80,
      marginRight:80
    },
    avatar: {
      borderRadius: 75,
      width: 150,
      height: 150
    },
    image: {
    width: 24,
    height: 24,
   },
  });

    const mapStateToProps = (state) => {
    return {
      records: faceSelectors.getGalleryView(state),
      records: faceSelectors.getMedia(state)

    };
  }

  export default connect(mapStateToProps)(ProfileData);
