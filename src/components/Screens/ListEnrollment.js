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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';

export class ListEnrollment extends Component {
  constructor(props) {
    debugger;
    super(props);
  }

  componentDidMount() {
    debugger;
    this.props.dispatch(faceActions.loadGalleryView({}));
  }

  onPressButton(rowData){
    this.props.dispatch(faceActions.loadGalleryViewSubject(rowData))
    this.props.navigator.push({
      component:ProfileData,
      rowData: rowData,
      name:'profile-data'
    });
    //this.props.navigation.navigate('ProfileData',rowData)
  }

onPressText(){
  this.props.navigator.push({
    component:FaceRecognition,
    name:'face-recognition'
  });
}

onPressHome(){
  this.props.navigator.push({
    component:HomePage,
    name:'home-page'
  });
}

render(){

      debugger;
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => { row1 !== row2;}});

        var ListRecordsData = (
          <ListView
          dataSource={ds.cloneWithRows( this.props.records )}
          enableEmptySections={true}
          style={Platform.select({
            ios:{paddingLeft:30, paddingRight:30},
            android:{paddingLeft:20, paddingRight:20}
          })}
          renderRow={(rowData) =>
              <TouchableOpacity onPress={this.onPressButton.bind(this, rowData)}>
              <View style={{flexDirection:'row', paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#e6e6e6'}}>
                  <View style={{flex:0.7, flexDirection:'column', justifyContent:'center'}}>
                      <Text style={{fontSize:20}}>{rowData.toUpperCase()}</Text>
                  </View>
                  <View style={{alignItems:'flex-end',justifyContent:'center',flex:0.3}}>
                     <Image source={require('../../images/person.png')} style={{borderColor:"#fff",borderWidth:1,borderRadius:60/2,height:60,width:60}}/>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        );

        return(
          <View style={{flex:1}}>
          <View style={{alignItems:'center'}}>
            <HeaderBar title={'LIST ENROLLMENT'} />
            </View>
            {ListRecordsData}
            <BottomBar navigator={this.props.navigator}/>
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
    records: faceSelectors.getGalleryView(state)
  };
}

export default connect(mapStateToProps)(ListEnrollment);
