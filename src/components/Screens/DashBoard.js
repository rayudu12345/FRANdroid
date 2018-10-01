import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Navigator,
  TextInput,
  Alert,
  Dimensions,
  AsyncStorage,
  ListView,
  Platform,
  AppState
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
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

import BottomBar from './BottomBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import HeaderBar from './HeaderBar';
import PersonsList from './PersonsList';
import FaceRecognition from './FaceRecognition';
import EnrolFaceDetection from './EnrolFaceDetection';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownSelectors from '../../store/dropdown/reducer';
import * as dropdownActions from '../../store/dropdown/actions';
import AlertBox from '../../Core/AlertBox';
import OfflineNotice from './OfflineNotice';
import Login from './Login';
import TotalMatchedListPage from './TotalMatchedListPage';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';

export class DashBoard extends Component {


    constructor(props){
      super(props);

this._handleAppStateChange= this._handleAppStateChange.bind(this)
this.props.dispatch(faceActions.setEmpty());
    this.state ={
      display_data : this.props.userDashboard.data  ,
      isOpen:false,
      phone:this.props.OTPVerificationResponse.data.phone,
      appState: AppState.currentState,
      latitude:null,
      longitude:null,
      error:null,
      isdisplay:false,

    }

  }



  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

    onPressEnrol(){
      this.props.navigator.resetTo({
        component:EnrolFaceDetection,
        name:'enrol-face-detection'
      });
    }

    onPressDetect(){
      this.props.navigator.resetTo({
        component:FaceRecognition,
        name:'face-recognition'
      });
    }
    componentWillReceiveProps(nextProps){
      //console.log(nextProps.user_login,'nextProps');
      if(nextProps.user_login.success==2){
        var params={
          phone:this.state.phone
        }
        this.props.dispatch(faceActions.userLogout({params:params}));
        AsyncStorage.removeItem('LOGIN_STATUS',()=>{
          this.props.dispatch(faceActions.logout());
          Alert.alert('Alert','Login Mobile Number Expired. Contact Admin');
          this.props.navigator.resetTo({
               component: Login,
               name: 'login'
          });
        });
      }else{
        this.setState({isdisplay:true})
      }
    }

    componentDidMount() {

    navigator.geolocation.getCurrentPosition(
       (position) => {
         //console.log("wokeeey");
         //console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
     AppState.addEventListener('change', this._handleAppStateChange);
     this.props.dispatch(faceActions.setEmpty());
     //console.log(this.props.OTPVerificationResponse.data.id,'fdfdf')
     var params = {
       id:this.props.OTPVerificationResponse.data.id
     }
     console.log(params,'dashboard');
       this.props.dispatch(faceActions.setEmpty());
     this.props.dispatch(faceActions.userDashboard({params:params}));
   }



    _handleAppStateChange = (nextAppState) => {
      console.log(nextAppState+'__'+'App has come to the foregrounderer!')
      if (nextAppState.match(/inactive||background/) && nextAppState === 'active') {
        console.log(nextAppState+'__'+'App has come to the foreground!')
        var params = {
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            phone: this.state.phone,
        };
        this.props.dispatch(faceActions.setEmpty());
        console.log(params,'params');
        this.props.dispatch(faceActions.userLogin({params:params}));
      }else{
        var params={
          phone:this.state.phone
        }
        this.props.dispatch(faceActions.userLogout({params:params}));
      this.setState({appState: nextAppState});
       console.log('App has come to the background!');
       AsyncStorage.removeItem('LOGIN_STATUS',()=>{
         this.props.dispatch(faceActions.logout());
         //Alert.alert('Alert','Login Mobile Number Expired. Contact Admin');
         this.props.navigator.resetTo({
              component: Login,
              name: 'login'
         });
       });
     }
    }
    componentWillUnmount = () => {
      //this.props.dispatch(faceActions.setEmpty());
      AppState.removeEventListener('change', this._handleAppStateChange);
      //navigator.geolocation.clearWatch(this.watchId)
    }


    onProfileSubmit(profile_id){
      var params ={
        title:profile_id.title,
        case_type_id:profile_id.id
      };
      console.log(profile_id,'person_id');
      this.props.dispatch(faceActions.setCaseId(params:params));
      this.props.navigator.replace({
        component:PersonsList,
        name:'persons-list'
      });
    }

    renderRow(rowData){
      //if(this.state.display_data.length!=0){
      console.log(rowData,'rowData');
       return(
         <View>
         {(rowData.id==7&&rowData.count==0)?null:<TouchableOpacity onPress={rowData.id==12?this.onPressTotalMatched.bind(this):this.onProfileSubmit.bind(this,rowData)} style={{width: (width / 2.1) - 15, marginLeft: 10,marginTop:10,borderWidth:1,paddingLeft:20,borderColor:'#ededed',height:150,backgroundColor:(rowData.id==1)?'#9e2f92':(rowData.id==2)?'#efca2e':(rowData.id==3)?'#888227':(rowData.id==4)?'#181819':(rowData.id==12)?'#c06f26':(rowData.id==8)?'#329900':(rowData.id==6)?'#02bd52':(rowData.id==7)?'#6430ea':(rowData.id==9)?'#a3c6f6':(rowData.id==10)?'#0073b7':(rowData.id==11)?'#ec5e19':'#d33838'}}>
            {rowData.id==7&&rowData.count==0?null:<Text style={{color:'#fff',paddingTop:20,fontSize:14}}>{rowData.title}</Text>}
            <Text style={{fontSize:(`${rowData.count}`.length<4)?28:28,color:'#fff'}}>{rowData.count.toString()}</Text>
          </TouchableOpacity>}
          </View>
          )

    }

    onPressTotalMatched(){
      this.props.navigator.replace({
        component:TotalMatchedListPage,
        name:'total-matched-list-page'
      });
    }
    render(){

      var menu = <Menu navigator = { this.props.navigator } navigator = { this.props.navigator }/>
       var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => { row1 !== row2;}});
        //var ddd = this.props.userDashboard?this.props.userDashboard.data:[]
        //this.setState({display_data:ddd})
       console.log(this.props.userDashboard,'display_data');
      return(

        <SideMenu
        menu={menu}
        openMenuOffset={width/1.5}
        isOpen={this.state.isOpen}
      onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <FRStatusBar/>

        <HeaderBar toggle = {this.toggle.bind(this)} navigator = { this.props.navigator }/>
          <Content style={{backgroundColor:'#fff'}}>
          <OfflineNotice/>
          <View style={{marginTop:20,paddingLeft:10,paddingRight:10}}>
          <Text style={{marginLeft: 10,color:'#183159',fontFamily:'Roboto',fontSize:height/40}}>Dashboard</Text>
          <ListView
          contentContainerStyle={{marginBottom:20,flexDirection: 'row',flexWrap:'wrap'}}


                dataSource={ds.cloneWithRows(this.props.userDashboard.data ||[])}
                enableEmptySections={true}
            renderRow={(rowData)=>this.renderRow(rowData)}/>

            </View>
          </Content>
          <Footer style={{paddingBottom:8,height:40,backgroundColor:'#fff'}}>
          <BottomBar navigator = { this.props.navigator } disableDashboard={true} detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end'}} dashBoardStyle={{backgroundColor:'#dedede',justifyContent:'flex-end'}}/>
          </Footer>
        </SideMenu>
      )
    }
}
const mapStateToProps = (state) => {
  debugger;
  return {
    OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
    userDashboard:faceSelectors.getUserDashboardResponse(state),
    updateResponse:dropdownSelectors.getUpdateResponce(state),
    user_login:faceSelectors.getUserLoginResponse(state)
  };
}

export default connect(mapStateToProps)(DashBoard);
