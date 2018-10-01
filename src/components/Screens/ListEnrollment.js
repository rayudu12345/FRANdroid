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
  ListView,
  Dimensions,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import FaceRecognition from './FaceRecognition';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import ProfileData from './ProfileData';
import AlertBox from '../../Core/AlertBox';
import { SERVICE_URL } from '../Constants'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';

export class ListEnrollment extends Component {
  constructor(props) {
    debugger;
    super(props);
        //console.log(this.props.galleryView);
        this.state={
        }
      }


onPressHome(){
  this.props.navigator.push({
    component:HomePage,
    name:'home-page'
  });
}


renderList(props){
  var listResponse = this.props.recognizeResponse.data;
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

if (listResponse.length !== 0) {
  console.log(listResponse.length);
  return  <ListView
      dataSource={ds.cloneWithRows(this.props.recognizeResponse.data)}
      enableEmptySections={true}
      ref={ref => this.listView = ref}
            onContentSizeChange={() => {
            this.listView.scrollTo({y: 0})
             }}
      style={Platform.select({
        ios:{paddingLeft:30, paddingRight:30},
        android:{paddingLeft:30,paddingRight:30,marginBottom:100}
      })}
      renderRow={(rowData) =>

          <View style={{justifyContent:'center',flex:1,paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#e6e6e6'}}>

                    <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                      <Text style={{fontSize:16,flex:0.5}}>Name</Text>
                      <Text style={{fontSize:14,flex:0.5}}>{rowData.Name}</Text>
                  </View>
                  <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                    <Text style={{fontSize:16,flex:0.5}}>FBID</Text>
                    <Text style={{fontSize:14,flex:0.5}}>{rowData.FBID}</Text>
                </View>
                <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                <Text style={{fontSize:16,flex:0.5}}>Source Image</Text>
                <View style={{flex:0.5}}>
                  <Image source={{uri:SERVICE_URL+`fr_images/facebook-search-history/` + rowData.source_image}} style={{height:50,width:50}} />
                </View>
            </View>
                <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                  <Text style={{fontSize:16,flex:0.5}}>Detected Image</Text>
                  <View style={{flex:0.5}}>
                    <Image source={{uri:SERVICE_URL+`fr_images/facebook/` + rowData.Photo}} style={{height:50,width:50}} />
                  </View>
                  </View>

              </View>
        }
      />
    } else {
          return <Text style={{textAlign:'center',color:'#f00',fontSize:20}}>No data found ! </Text>


    }
  }


render(){

      const list = this.renderList(this.props.recognizeResponse);
        return(
          <View style={{flex:1}}>
          <View style={{alignItems:'center'}}>
            <HeaderBar title={'DATA DISPLAY'} />
            </View>
            {list}

            <BottomBar navigator={this.props.navigator} />
           </View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    },
  input: {
    height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom:10,
    color:'#000',
    paddingHorizontal:10
  },
  buttonContainer:{
    backgroundColor:'#F05137',
    width:180,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:10
  },
  buttonContainer1:{
    width:300,
    height:40,
    borderColor:'#F05137',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    textAlign:'center',
    color:'#000',
    fontWeight:'600'
  },
  text:{
    textAlign:'center',
    color:'#000',
    fontWeight:'600'
  }
});

const mapStateToProps = (state) => {
  debugger;
  return {
    recognizeResponse: faceSelectors.getRecognizeResponse(state),
    recognizeStatus: faceSelectors.getRecognizeStatus(state),

  };
}

export default connect(mapStateToProps)(ListEnrollment);
