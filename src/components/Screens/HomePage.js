import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Navigator, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import EnrollmentForm from './EnrollmentForm';
import ListEnrollment from './ListEnrollment';
import FaceRecognition from './FaceRecognition';
import ProfileData from './ProfileData';



import HeaderBar from './HeaderBar';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
export class HomePage extends React.Component {
  constructor(props){
      super(props);
    }

onPressEnrollButton(){

  this.props.navigator.push({
    component:EnrollmentForm,
    name:'enrollment-form'
  });

}


onPressListEnrollButton(){

  this.props.navigator.push({
    component:ListEnrollment,
    name:'list-enrollment'
  });

}

onPressFaceRecognitionButton() {
  this.props.navigator.replacePrevious({
    component:FaceRecognition,
    name:'face-recognition'
  });
}

  render(){
    return (
          <View style={{alignItems:'center',justifyContent:'center'}}>
               <HeaderBar title="HOME"/>
               <View style={{marginTop: height/20, alignItems:'center'}}>
               <Image source={require('../../images/Telangana_Police_Logo.png')} style={{width:height/3, height:height/2.5}} />
               </View>
               {/*<TouchableOpacity style={[styles.buttonContainer, {marginTop:20}]} onPress={this.onPressEnrollButton.bind(this)}>
                  <Text style={styles.buttonText}>NEW ENROLLMENT</Text>
               </TouchableOpacity>

               <TouchableOpacity style={[styles.buttonContainer, {marginTop:15}]} onPress={this.onPressListEnrollButton.bind(this)}>
                  <Text style={styles.buttonText}>LIST ENROLLMENT</Text>
               </TouchableOpacity>*/}

               <TouchableOpacity style={[styles.buttonContainer,{marginTop:height/15}]} onPress={this.onPressFaceRecognitionButton.bind(this)}>
                  <Text style={styles.buttonText}>FACE RECOGNITION</Text>
               </TouchableOpacity>


          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex:1,
        padding: 20,
        justifyContent:'center',
        alignItems:'center'
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
        paddingVertical:15,
        height:60,
        justifyContent:'center',
        alignItems:'center',

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
    return state;
  }

export default connect(mapStateToProps)(HomePage);
