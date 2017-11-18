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
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import ListEnrollment from './ListEnrollment';
import ProfileData from './ProfileData';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';

export class EnrollmentForm extends Component {
  constructor(props) {
        debugger;
        super(props);

  this.state = {
    avatarSource: null,
    image: null,
    subject_id:''
};
  }

  onPressHome(){
    this.props.navigator.push({
      component:HomePage,
      name:'home-page'
    });
  }

  onPressSubmit() {
    if (this.state.subject_id == '') {
        Alert.alert(
          'Error',
          'Enter enrollment name',
        )
    } else {
        debugger;
        loaderHandler.showLoader("Loading");
        var params = {
          subject_id:this.state.subject_id,
          image: this.state.image
        };
        this.props.dispatch(faceActions.enrollment({params:params}));
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.enrollmentStatus == true) {
        this.props.navigator.push({
          component:ListEnrollment,
          name:'list-enrollment'
        });
        loaderHandler.hideLoader();
    } else {
      Alert.alert(
        'Error',
        nextProps.enrollmentResponse.Errors[0].message,
      );
      loaderHandler.hideLoader();
    }

  }

  _handleKeyPress(e) {
     this.onPressSubmit();
   }


  selectPhotoTapped() {
            const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                    skipBackup: true
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
                    let source = { uri: response.uri };
                    console.log(response);
                    this.setState({
                        image:response.data,
                        avatarSource:response.uri
                    });
                }
            });
        }
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <View style={{alignItems:'center'}}>
        <HeaderBar title="ENROLLMENT FORM" />

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginTop: 20,alignItems:'center',justifyContent:'center'}]}>
                { this.state.avatarSource === null ? <View style={{ flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text style={{textAlign:'center'}}>Take Photo</Text></View> :
                <Image style={{borderRadius:74,width:140,height:140}} source={{uri:this.state.avatarSource}} />
              }
              <BusyIndicator />
            </View>
        </TouchableOpacity>

        <TextInput
            style={{  width: width*0.8,height: 50,marginTop:70, borderColor: 'gray', borderWidth: 1}}
            value={this.state.subject_id}
            onSubmitEditing={(e) => this._handleKeyPress( e )}
            placeholder='Enter Enrollment Name'
            underlineColorAndroid='#fff'
            onChangeText={(subject_id) => this.setState({subject_id})}
          />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onPressSubmit.bind(this)}>
            <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>


        <BottomBar navigator={this.props.navigator}/>
     </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    //justifyContent: 'center',
    alignItems: 'center',
    marginLeft:100,
    marginRight:100
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  buttonContainer:{
    backgroundColor:'#0C303F',
    width: width*0.8,
    paddingVertical:15,
    marginTop:30,
    //marginLeft:20,
    //marginRight:20
  },
  buttonText:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'600'
  }

});

const mapStateToProps = (state) => {
  debugger;
  return {
    enrollmentStatus: faceSelectors.getEnrollmentStatus(state),
    enrollmentResponse: faceSelectors.getEnrollmentResponse(state)
  };
}

export default connect(mapStateToProps)(EnrollmentForm);
