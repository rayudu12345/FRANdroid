import React from 'react';


import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
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
  Right
 } from 'native-base';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import {FRStatusBar} from '../partials/FRStatusBar';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import OTPVerification from './OTPVerification';
import DashBoard from './DashBoard';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import AlertBox from '../../Core/AlertBox';
import PhoneInput from 'react-native-phone-input';
import ModalPickerImage from 'react-native-phone-input/examples/CustomPicker/ModalPickerImage';
import OfflineNotice from './OfflineNotice';
 import AndroidBackButton from "react-native-android-back-button"
export class Login extends React.Component {

  	constructor(props) {
        debugger;
      	super(props);

        this.onPressFlag = this.onPressFlag.bind(this)
      this.selectCountry = this.selectCountry.bind(this)
      this.state = {
          setAlert:false,
            pickerData: null,
            phone:'',
            countryName:'',
            display: false
      }
    }

    componentDidMount() {



      this.setState({
          pickerData: this.refs.phone.getPickerData()
      })
  }

  popIfExists() {
  if (navigator.getCurrentIndex() > 0) {
    navigator.pop()
    return true // do not exit app
  } else {
    return false // exit app
  }
  }

    onPressFlag() {
          this.refs.myCountryPicker.open()
      }

    getAllCountries(name){
      this.refs.name.getAllCountries(name.ios2)
    }

      selectCountry(country) {
          this.refs.phone.selectCountry(country.iso2)
      }


    _handlePress() {
      debugger;
    this.setState({
      setAlert:true,

          phone: this.refs.phone.getValue()
    });

    var params = {
        phone: this.state.phone,
    };

    var phone_number  = this.state.phone;

    if (this.refs.phone.isValidNumber()) {
      debugger;
      loaderHandler.showLoader("Loading ...");
      this.props.dispatch(faceActions.setPhoneNumber(params));
      var ph_no = this.state.phone.slice(3,13) ;
      //console.log(ph_no,'ph_no');
      var params = {
          phone_num: ph_no,
      };
      this.props.dispatch(faceActions.checkOTPSent({ params: params }));
      debugger;
    } else if (this.state.phoneNumber ==='') {
      AlertBox('Enter phone number.');
    } else {
      AlertBox('Enter valid phone number.');
    }
    }

    _handleKeyPress(e) {
        this._handlePress();
    }

    componentWillReceiveProps(nextProps) {
        debugger;
        if (nextProps.isOTPVerified === true) {

            this.props.navigator.push({
              component:DashBoard,
              name:'dash-board'
            });

        } else if(nextProps.isSentOTP === true) {
              this.props.navigator.push({
                component:OTPVerification,
                name:'otp-verification'
              });
        } else if(nextProps.isSentOTP === false){
          console.log(nextProps.sentOTPResponse,'sentOTPResponse');
          if(this.state.setAlert==true){
            AlertBox('Phone number not register');
            loaderHandler.hideLoader();
          }
        } else {
          this.setState({display:true});

        }


    }

    componentWillMount(){
      debugger;
      this.props.dispatch(faceActions.loadLoginStatus());
    }

  	render() {
        debugger;
  	  	return (
          <Container>
          <FRStatusBar/>

            <Image source={require('../../images/FR-APP-Loading_BG.jpg')} style={{flex:1,width: width,height: height,alignItems:'center'}}>
            <OfflineNotice/>

                <Image source={require('../../images/FR-TSP-Logo-2.png')} style={{marginTop:height/10,height:height/3.4,width:height/3.7}}/>
                <Text style={{fontSize:14,color:'#fff'}}>FaceRecognition </Text>
                <View style={styles.textInputContainer}>
                <View style={{flex:0.9}}>
                <PhoneInput
                     ref='phone'
                     style={{marginLeft:5 }}
                     flagStyle ={{alignItems:'center',justifyContent:'center',marginLeft:5,height:20,width:25}}
                     textStyle	={{fontSize:18,height:50}}
                     onPressFlag={this.onPressFlag}
                     initialCountry ='in'
                     textProps={{placeholder:'Enter phone number'}}
                     offset ={10}
                     onChangePhoneNumber={(phone)=>this.setState({phone:phone})}
                     onSubmitEditing={(e) => this._handleKeyPress( e )}

                 />

                 <ModalPickerImage
                     ref='myCountryPicker'
                     data={this.state.pickerData}
                     onChange={(country)=>{ this.selectCountry(country) }}
                     cancelText='Cancel'
                     onSubmitEditing={(e) => this._handleKeyPress( e )}
                 />
                 </View>
                 <View style={{flex:0.1}}>
                 <Image source={require('../../images/FR-TSP-Mobile-Number_icon.png')} style={{height:20,width:20}}/>
                 </View>
             </View>
                 <TouchableOpacity style={styles.buttonBox} onPress={() => this._handlePress()}>
                  <Text style={{fontSize:height/40,color:'#fff'}}>Get OTP</Text>
                </TouchableOpacity>
                <View style={{position:'absolute',bottom:50,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff',fontSize:12}}>Powered by Telangana State Police</Text>
                </View>
                <View style={{position:'absolute',bottom:10,right:10,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#fff',fontSize:12}}>FR -v 9.2.5</Text>
                </View>
            <BusyIndicator/>


            </Image>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputContainer:{
    flexDirection:'row',
    marginTop:20,
    backgroundColor:'#fff',
    height:50,
    borderWidth:0.1,
    width:width*0.7,
    //paddingBottom:verticalScale(3),
    borderColor:'#999',
    alignItems:'center',
    justifyContent:'center'
  },

  inputBox: {
    margin: 10,
    height: 50,
    fontSize:height/45,
    padding:15,
    borderColor: '#ccc',
    backgroundColor:'#fff',
    borderWidth: 1,
    width: width/1.2
  },

  buttonBox: {
    backgroundColor:'#e5322d',
    margin: height/30,
    alignItems:'center',
    justifyContent:'center',
    width: width*0.7,
    height:50
  },
  imageBackground:{
   flex: 1,
   width: width,
   height: height,
   alignItems:'center'
 },
 logo:{
 marginTop:height/12,
 height:height/8,
 width:height/2.3,
 marginBottom:height/12
 },
});

const mapStateToProps = (state) => {
    debugger;
    return {
      isSentOTP: faceSelectors.isSentOTP(state),
      sentOTPResponse:faceSelectors.getSentOTPResponse(state),
      isOTPVerified:faceSelectors.isOTPVerified(state)
    };
}

export default connect(mapStateToProps)(Login);
