import React, { Component } from 'react';
import { Easing,AppState,Dimensions, StyleSheet, ScrollView,ListView, Platform,View, TextInput, TouchableOpacity, Navigator, Text, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import ZoomImage from 'react-native-zoom-image';
import OfflineNotice from './OfflineNotice';

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

import ListEnrollment from './ListEnrollment';
import FaceBookMatchedDetails from './FaceBookMatchedDetails';
import HomePage from './HomePage';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import AlertBox from '../../Core/AlertBox';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import ImagePicker from 'react-native-image-picker';


import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import EnrolFaceDetection from './EnrolFaceDetection';
import DashBoard from './DashBoard';
import EnrollmentForm from './EnrollmentForm';
import { SERVICE_URL } from '../Constants'


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

let case_category = [
    {label:'accused',value:1},
    {label:'person_missing',value:2},
    {label:'person_found',value:3},
    {label:'dead_body',value:4},
    {label:'victim',value:5},
    {label:'others',value:6},
    {label:'Facebook',value:7 }];

export class FaceBookDetect extends React.Component {
  constructor(props) {
      debugger;
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (row1, row2) => { row1 !== row2;}});
      this.state = {
        isOpen:false,
        avatarSource: null,
        image:null,
        recognizeStatus:false,
        empty_data:'',
        imageResponse:null,
        detectResponse: '',
        dataSource: null,
        response_data:{},
        person_case_category:[],
        isRefresh:false,
        image_name:'',
        gps: false,
        latitude: null,
        longitude: null,
        error: null,


      };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  componentDidMount() {
    console.log(this.props.case_type_person,'case_type_person');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          gps: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(position);
      },
      (error) => AlertBox(error.message),

      { enableHighAccuracy: true, timeout: 20000},

    );
    this.watchId = navigator.geolocation.watchPosition(
     (position) => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         gps:true,
         error: null,
       });
     },
     (error) => AlertBox(error.message),
     { enableHighAccuracy: true, timeout: 20000},
   );

  }
  componentWillMount() {
    this.props.dispatch(faceActions.setEmpty({}));
    this.setState({
      gps: false,
      latitude: null,
      longitude: null,
      error: null
    });
    navigator.geolocation.clearWatch()
  }



  selectPhotoTapped() {
      this.setState({detectResponse:''});
            const options = {
                quality: 0.6,
                maxWidth: 500,
                maxHeight: 500,

                storageOptions: {
                    skipBackup: true,

                }
            };

            ImagePicker.showImagePicker(options, (response) => {
                debugger;
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    debugger;
                    //let source = { uri: response.uri };
                    let source = { uri: 'data:image/jpeg;base64,' + response.data };
                    this.setState({
                        avatarSource:response.data,
                        image: response.fileName,
                        response_data:response

                    });
                    this.props.dispatch(faceActions.setEmpty({}));

                }
                this.onPressContinue();
            });
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
          this.props.navigator.resetTo({
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


  onPressContinue() {
    debugger;
    loaderHandler.showLoader('Loading...');
    if(this.state.avatarSource==null){
      AlertBox('Please Upload Image');
        loaderHandler.hideLoader();
    }
     else {
     loaderHandler.showLoader('Loading...');
      var image_data=this.state.response_data;
      console.log(image_data,'image_data');
      this.props.dispatch(faceActions.setEmpty({}));
      this.props.dispatch(faceActions.setImageData(image_data:image_data));
      this.props.dispatch(faceActions.setEmpty({}));
      var params={
        detect_image:this.state.response_data,
        detected_by:this.props.OTPVerificationResponse.data.name,
      }
    this.props.dispatch(faceActions.faceRecognition({params:params}));
  }


  }


  componentWillReceiveProps(nextProps) {
    debugger;
      console.log(nextProps.isDetected,'chandu');
    if(nextProps.isDetected == true){
        console.log(nextProps.detect_responce,'all detected ');
        loaderHandler.hideLoader();
        this.setState({detectResponse:nextProps.detect_responce});
      }
  }

  renderList(){
    console.log(this.state.detectResponse,'this.state.detectResponse');
    return  <Text> {(this.state.detectResponse.length>0)?this.state.detectResponse[0].name :'' }</Text>

    }
  onPressEnrolForm() {
    this.props.navigator.resetTo({
      component:EnrollmentForm,
      name:'enrollment-form'
    });
  }

  onPressDetectList() {

    var params={
      facebook_id:this.state.detectResponse.data[0].id
    };

    this.props.dispatch(faceActions.setFbId(params:params));

      console.log(params,'params');
    this.props.navigator.resetTo({
      component:FaceBookMatchedDetails,
      name:'facebook-matched-details'
    });
  }


    onSelectedItemsChange =( person_case_category) => {
      console.log('Selected Items: ', person_case_category);
this.setState({ person_case_category});
};

back(){
  this.props.navigator.push({
    component:DashBoard,
    name:'dash-board'
  });
}



  render(){
    debugger;
    var menu = <Menu navigator = { this.props.navigator }/>
    console.log(this.state.detectResponse,'detect state');
    return (
      <SideMenu
          menu={menu}
          openMenuOffset={width/1.5}
          isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <FRStatusBar/>
        <HeaderBar  toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
        <Image source={require('../../images/background_dashboard.jpg')} style={{height:height,width:width,flex:1}} >
        <OfflineNotice/>
        <View style={{height:40,flexDirection:'row',backgroundColor:'#fff'}}>
          <View style={{flex:0.6,justifyContent:'center'}}>
            <Text style={{marginLeft:10,color:'#374176',fontSize:height/40}}> Facebook Detect </Text>
          </View>
          <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

          </View>
        </View>
        <ScrollView style={{paddingLeft:15,paddingRight:15}}>


        <View style={{flex:1,marginTop:10}}>

        <View style={{borderColor:'#ccc',height:40,borderWidth:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity style={{flex:0.8,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={this.selectPhotoTapped.bind(this)}>
                  <View style={{flex:0.8}}>{ this.state.avatarSource === null ? <View style={{ paddingLeft:20,height:40,borderColor:'#000',flexDirection:'row',alignItems:'center'}}><Text style={{color:'#fff'}}>Take Photo</Text></View> :
                  <Text style={{paddingLeft:20,color:'#fff',fontSize:10}}>{this.state.image}</Text>
                }
                </View>
                <View style={{backgroundColor:'#fff',height:40,flex:0.2,alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../../images/FR-TSP-Camera-icon-Red.png')} style={{height:22,width:25}}/>
                </View>
          </TouchableOpacity>
          <Image source={{uri:this.state.image}} />

          </View>

        </View>
        {(this.state.detectResponse!=''&&this.props.detect_responce.data.length>0)?<View style={{alignItems:'center',marginBottom:20}}>
        <View style={{paddingBottom:15,width:width/1.1,backgroundColor:'#ebebeb',marginTop:20}}>
          <View style={{paddingLeft:10,marginRight:10}}>
          <View style={{marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{flex:0.4}}>
              <Text style={{paddingBottom:5,color:'#2d3878',fontSize:12,fontWeight:'600'}}>Source Image</Text>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <ZoomImage
              duration={200}
              imgStyle={{height:150,width:140}}
              moveCapture={true}
              enableScaling={false}
              easingFunc={Easing.ease}
              source={{uri:SERVICE_URL+`fr_images/facebook-search-history/`+this.state.detectResponse.data[0].source_image}}
              style={{height:150,width:140}}/>

              </View>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

            <Image source={require('../../images/FR-APP_Detect-Screen_Loading_15.png')} style={{height:20,width:20}}/>
            </View>
            <View style={{flex:0.4}}>
            <Text style={{paddingBottom:5,color:'#2d3878',fontSize:12,fontWeight:'600'}}>Matched Image</Text>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <ZoomImage
              duration={200}
              imgStyle={{height:150,width:140}}
              moveCapture={true}
              enableScaling={false}
              easingFunc={Easing.ease}
              source={{uri:SERVICE_URL+`fr_images/facebook/`+this.state.detectResponse.data[0].Photo}}
              style={{height:150,width:140}}/>

              </View>
            </View>
          </View>
          </View>
          </View><View style={{padding:15,width:width/1.1,backgroundColor:'#f3f3f3'}}>
          <View style={{paddingLeft:10,paddingRight:10}}>

          <View style={{height: 30,flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:12,color:'#717171'}}>FBID </Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{color:'#000'}}> {this.state.detectResponse.data[0].FBID}</Text>
          </View>


          </View >
          <View style={{height: 30,flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
            <Text style={{fontSize:12,color:'#717171'}}>Name</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Text style={{color:'#000'}}> {this.state.detectResponse.data[0].Name}</Text>
          </View>
          </View >
          <View style={{height: 30,flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
            <Text style={{fontSize:12,color:'#717171'}}>User Name</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Text style={{color:'#000'}}> {this.state.detectResponse.data[0].UserName}</Text>
          </View>
          </View>
          <View style={{height: 30,flexDirection:'row',borderBottomWidth:1,borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:12,color:'#717171'}}>Matched Total </Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{color:'#000'}}> {this.state.detectResponse.data[0].matched_total}</Text>
          </View>
          </View >
          <TouchableOpacity  onPress={this.onPressDetectList.bind(this)} style={{marginTop:20,justifyContent:'center',width:120,height:30,borderWidth:1,borderColor:'#e3231e'}}>
            <Text style={{textAlign:'center',color:'#e3231e'}}>View Details</Text>
          </TouchableOpacity>
          </View></View></View>:(this.state.detectResponse!=''&&this.props.detect_responce.data.length==0)?<View style={{alignItems:'center',justifyContent:'center',marginTop:20}}><Text style={{color:'#f00'}}>No Results Found!</Text></View>:null}
          </ScrollView>

          </Image>
          <BusyIndicator/>
          <Footer style={{height:40,backgroundColor:'#fff'}}>
          <BottomBar navigator = { this.props.navigator } disableDetect={true} detectStyle={{justifyContent:'flex-end',backgroundColor:'#dedede'}} enrollStyle={{justifyContent:'flex-end'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
          </Footer>
          </SideMenu>
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
      backgroundColor:'#374176',
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
      borderRadius:( height/3)/2,
      width: height/3,
      height: height/3
    },
    image: {
    width: 24,
    height: 24,
   },
  });

    const mapStateToProps = (state) => {
      debugger;
    return {
      isDetected:faceSelectors.isUserDetected(state),
      detect_responce:faceSelectors.getDetectResponse(state),
      OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
      image_data:faceSelectors.getImageResponse(state),
      isImageDetected:faceSelectors.isImageDetected(state),
      detectImage:faceSelectors.getDetectImageResponse(state),
      case_type_person:faceSelectors.getCaseTypesResponse(state)
    };
  }

  export default connect(mapStateToProps)(FaceBookDetect);
