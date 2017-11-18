import React, { Component } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Navigator, Text, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import EnrollmentForm from './EnrollmentForm';
import ListEnrollment from './ListEnrollment';
import HomePage from './HomePage';
import ProfileData from './ProfileData';
import ImagePicker from 'react-native-image-picker';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import AlertBox from '../../../index';
//import * as formValidator from '../../Util';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export class FaceRecognition extends React.Component {
  constructor(props) {
      debugger;
      super(props);
      this.state = {
        avatarSource: null,
        image:null,
        recognizeStatus:false,

      };
  }

  onPressContinue() {
    debugger;
    loaderHandler.showLoader("Loading");
    var params = {
      image: this.state.image,

    };
    this.props.dispatch(faceActions.faceRecognition({params:params}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recognizeStatus == true) {
        /*this.props.navigator.push({
          component:ListEnrollment,
          name:'list-enrollment'
        });*/
        this.setState({recognizeStatus:nextProps.recognizeStatus});
        loaderHandler.hideLoader();
    } else {
      Alert.alert(
        'Error',
        nextProps.recognizeResponse.Errors.message,
      );
      loaderHandler.hideLoader();
    }
  }

  onPressHome() {
    this.props.navigator.push({
      component:HomePage,
      name:'home-page'
    });
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
                    this.setState({
                        avatarSource:response.uri,
                        image: response.data
                    });
                }
            });
        }

  _renderTransaction(data) {
        return (
          <View>
          <Text>status: {data.status}</Text>
          <Text>confidence: {data.confidence}</Text>
          <Text>quality: {data.quality}</Text>
          <Text>-----------------------------------------------</Text>
          </View>
        );
  }

  _renderCandidate(candidates) {
      return candidates.map((data, i) => {
        return (
          <View key={i}>
          <Text>subject id: {data.subject_id}</Text>
          <Text>confidence: {data.confidence}</Text>
          <Text>-----------------------------------------------</Text>
          </View>
        )
      })
  }

  render(){
    return (
          <View style={{alignItems:'center',flex:1}}>
            <HeaderBar title="FACE RECOGNITION" />
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginTop: 20,alignItems:'center',justifyContent:'center'}]}>
                    { this.state.avatarSource === null ? <View style={{ height:50,borderColor:'#000',flexDirection:'row',alignItems:'center',justifyContent:'center'}}><Text style={{textAlign:'center'}}>Take Photo</Text></View> :
                    <Image style={{borderRadius:74,width:140,height:140}} source={{uri:this.state.avatarSource}} />
                    }
                    <BusyIndicator />
                </View>
            </TouchableOpacity>



              <TouchableOpacity style={[styles.buttonContainer,{marginTop:15, marginRight:20, marginLeft:20}]} onPress={this.onPressContinue.bind(this)}>

               <Text style={styles.buttonText}>CONTINUE</Text>

              </TouchableOpacity>

              {(this.state.recognizeStatus)? (this.props.recognizeResponse.images)?
              <ScrollView style={{marginTop:20}}>
                <Text style={{color:'#0C303F'}}>Transaction</Text>
                { this._renderTransaction(this.props.recognizeResponse.images[0].transaction) }

                <Text style={{color:'#0C303F'}}>Candidates</Text>
                { this._renderCandidate(this.props.recognizeResponse.images[0].candidates) }
              </ScrollView>:<View><Text>Result not found!</Text></View>:
              <View></View>}

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
        recognizeStatus: faceSelectors.getRecognizeStatus(state),
        recognizeResponse: faceSelectors.getRecognizeResponse(state)
      };
    }

    export default connect(mapStateToProps)(FaceRecognition);
