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
import AlertBox from '../../Core/AlertBox';
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

  selectPhotoTapped() {
            const options = {
                quality: 1.0,
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
                        avatarSource:response.uri,
                        image: response.data
                    });
                }
            });
        }

  onPressContinue() {
    debugger;
    loaderHandler.showLoader("Loading");
    var params = {
      image: this.state.image

    };
    this.props.dispatch(faceActions.faceRecognition({params:params}));
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.recognizeStatus == true) {
        /*this.props.navigator.push({
          component:ListEnrollment,
          name:'list-enrollment'
        });*/
        this.setState({recognizeStatus:nextProps.recognizeStatus});
        loaderHandler.hideLoader();
    } else {
      debugger;
      AlertBox(
        nextProps.recognizeResponse.Errors.message);
      loaderHandler.hideLoader();
    }
  }

  onPressHome() {
    this.props.navigator.push({
      component:HomePage,
      name:'home-page'
    });
  }



  _renderTransaction(data) {
    debugger;
        return (
          <View>

          <Text>status: {data.status}</Text>
          <Text>confidence: {data.confidence}</Text>
          <Text>quality: {data.quality}</Text>
          <Text>subject_id: {data.subject_id}</Text>
          <Text>face_id: {data.face_id}</Text>
          <Text>-----------------------------------------------</Text>
          </View>
        );
  }

  _renderCandidate(candidates) {
    debugger;
      return candidates.map((data, i) => {
        debugger;
        return (
          <View key={i}>

          <Text>subject id: {data.subject_id}</Text>
          <Text>confidence: {data.confidence}</Text>
          <Text>face_id: {data.face_id}</Text>

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
        <Text style={{color:'#0C303F'}}>Transaction</Text>
        { that._renderTransaction(image.transaction) }

        <Text style={{color:'#0C303F'}}>Candidates</Text>
        { that._renderCandidate(image.candidates) }
        </View>)
    })}
  </ScrollView>)
  }

  render(){
    debugger;
    return (
          <View style={{flex:1}}>
          <View style={{alignItems:'center'}}>
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
            <Image source={{uri:this.state.image}} />
            </View>

            {(this.state.recognizeStatus)? (this.props.recognizeResponse.images)?
              this._renderResponse(this.props.recognizeResponse.images, this)
              :<View><Text style={{color:'#f00', marginTop:20, marginLeft:80}}>no faces found in the image!</Text></View>:
              <View></View>
            }

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
      debugger;
    return {

      recognizeStatus: faceSelectors.getRecognizeStatus(state),
      recognizeResponse: faceSelectors.getRecognizeResponse(state)

    };
  }

  export default connect(mapStateToProps)(FaceRecognition);
