import React from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,Text
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Form, Item, Input,
  Label,
  Radio,
  ListItem,
  List,
  Picker,
  Button,
  Right,
  Thumbnail
 } from 'native-base';

import HomePage from './HomePage';
import FaceRecognition from './FaceRecognition';

import EnrolFaceDetection from './EnrolFaceDetection';
import DashBoard from './DashBoard';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';

import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';
         
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class BottomBar extends React.Component {

    constructor(props) {
        super(props);
      //  this.onPressDashboard = this.onPressDashboard.bind(this);
        //this.onPressDetect = this.onPressDetect.bind(this);
        //this.onPressEnrol = this.onPressEnrol.bind(this);

        debugger;
    }

    static defaultProps = {
      disableDashboard:false,
      disableDetect:false,
      disableEnroll:false
    }

    onPressDetect() {
      //this.props.dispatch(faceActions.setEmpty({}));
      this.props.navigator.resetTo({
          component: FaceRecognition,
          name: 'face-recognition'
      });

    }

    onPressDashboard() {
      //this.props.dispatch(faceActions.setEmpty({}));
      this.props.navigator.push({
          component: DashBoard,
          name: 'dash-board'
      });

    }

    onPressEnrol() {
      //this.props.dispatch(faceActions.setEmpty({}));
      this.props.navigator.resetTo({
        component:EnrolFaceDetection,
        name:'enrol-face-detection'
      });

      }

  render() {
    const {
      dashBoardStyle,
      detectStyle,
      enrollStyle,
      disableDashboard,
      disableDetect,
      disableEnroll
    } = this.props;
    return <FooterTab style={{paddingBottom:8,justifyContent:'flex-end',height:40,backgroundColor:'#fff'}}>

    <Button style={dashBoardStyle}  disabled={this.props.disableDashboard} onPress={this.onPressDashboard.bind(this)}>
      <Thumbnail square  size={80} source={require('../../images/FR-Dashboard_icon.png')}  style={{width:19,height:14}}/>
      <Text style={{textAlign:'center',fontSize:12}}>Dashboard</Text>
      </Button>
      <Button style={detectStyle}  disabled={this.props.disableDetect} onPress={this.onPressDetect.bind(this)}>
        <Thumbnail square  size={80} source={require('../../images/FR-Detect_icon.png')}  style={{width:15,height:15}}/>
        <Text style={{textAlign:'center',fontSize:12}}>Detect</Text>
        </Button>
        <Button style={enrollStyle} disabled={this.props.disableEnroll} onPress={this.onPressEnrol.bind(this)}>
          <Thumbnail square  size={80} source={require('../../images/FR-TSP-Enroll_icon.png')}  style={{width:15,height:15}}/>
          <Text style={{textAlign:'center',fontSize:12}}>Enroll</Text>
          </Button>
    </FooterTab>
  }
}

const styles = StyleSheet.create({
  searchFavListButton:{
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center'
  }
});
