import React from 'react';


import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {FRStatusBar} from '../partials/FRStatusBar';

import {
  Container,
  Header,
  Content,
  Footer
 } from 'native-base';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';

import AlertBox from '../../Core/AlertBox';
import { connect } from 'react-redux';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import DashBoard from './DashBoard';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import OfflineNotice from './OfflineNotice';

export class OTPVerification extends React.Component {
  	constructor(props) {
      	super(props);
        debugger;
        this.state = {
          setAlert:false,
            otp:'',
            latitude:null,
            longitude:null,
            error:null,
            phone: this.props.phone || '+918790087843',
            isOTPVerified:false,
        };
    }
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(
         (position) => {
           console.log("wokeeey");
           console.log(position);
           this.setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             error: null,
           });
         },
         (error) => this.setState({ error: error.message }),
         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
       );
     }

    componentWillUnmount() {
      //this.props.dispatch(faceActions.setEmpty({}));

      //navigator.geolocation.clearWatch(this.watchId)
    }
    _handlePress() {
      this.setState({setAlert:true})
      var ph_no = this.state.phone.slice(3,13) ;
      var params = {
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          phone: ph_no,
      };
      this.props.dispatch(faceActions.userLogin({params:params}));
      //console.log(ph_no,'ph_no');
      var params = {
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          otp: this.state.otp,
          phone_num: ph_no,
          isOTPVerified:this.state.isOTPVerified
      };
      console.log(params,'params');
      if (/^\d{6}$/.test(this.state.otp)) {
        loaderHandler.showLoader("Loading ...");
        this.props.dispatch(faceActions.otpVerify({ params: params }));
      } else {
        AlertBox('Please enter 6 digits OTP verification code.');
      }

    }
    _handleKeyPress(e) {
         this._handlePress();
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if(nextProps.isOTPVerified === true) {
          //console.log(nextProps.OTPVerificationResponse,'OTPVerificationResponse');
          this.props.navigator.resetTo({
            component:DashBoard,
            name:'dash-board'
          });
        } else if(nextProps.isOTPVerified === false){
            if(this.state.setAlert==true){
            AlertBox('Enter Wrong OTP');
          }
        } else{
            //AlertBox(nextProps.OTPVerificationResponse.message);
        }
        loaderHandler.hideLoader();
    }

_resendOtp(){
  var ph_no = this.state.phone.slice(3,13) ;
      var params = {
        phone_num: ph_no,
    };
    //console.log(params,'params');
    this.props.dispatch(faceActions.checkOTPSent({ params: params }));
  }

  	render() {
  	  	return (
      <Container>
      <FRStatusBar/>
        <Image source={require('../../images/FR-APP-Loading_BG.jpg')} style={{flex:1,width: width,height: height,alignItems:'center'}}>
        <OfflineNotice/>
            <Image source={require('../../images/FR-TSP-Logo-2.png')} style={{marginTop:height/5,height:height/3.4,width:height/3.7}}/>
            <Text style={{fontSize:18,color:'#fff'}}>Face Recognition</Text>
            <View style={{height:50,marginLeft:25,marginRight:25,marginTop:20,flexDirection:'row',width:width/1.5,borderWidth:0.1,borderColor:'#ccc'}}>
              <View style={{flex:0.6}}>
                <TextInput
                  keyboardType="numeric"
                  value={this.state.otp}
                  placeholder='ENTER OTP'
                  maxLength={6}
                  secureTextEntry={true}
                  style={{paddingLeft:10,fontSize:16,backgroundColor:'#fff'}}
                  underlineColorAndroid='transparent'
                  onChangeText={(otp) => this.setState({otp})}
                />
              </View>

              <TouchableOpacity style={{flex:0.4,backgroundColor:'#e5322d',alignItems:'center',justifyContent:'center'}} onPress={this._handlePress.bind(this)}>
                <Text style={{color:'#fff'}}>Submit</Text>
              </TouchableOpacity>



            </View>
            <Text  style={{borderBottomColor:'#F00',borderBottomWidth:1,color:'#fff',fontSize:14,textAlign:'center',marginTop:15}} onPress={this._resendOtp.bind(this)}> Resend Code</Text>
            <BusyIndicator/>
          </Image>
          </Container>



        );
    }
}
const mapStateToProps = (state) => {
    debugger;
    return {
      phone: faceSelectors.getPhone(state),
      isOTPVerified:faceSelectors.isOTPVerified(state),
      OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state)
    };
}

export default connect(mapStateToProps)(OTPVerification);
