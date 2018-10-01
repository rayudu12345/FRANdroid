import React, { Component } from 'react';
import ZoomImage from 'react-native-zoom-image';
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
  Platform,
  Easing,
  Modal,
  ScrollView
} from 'react-native';
import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';
import OfflineNotice from './OfflineNotice';
import ViewControl from 'react-native-zoom-view'

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
  Thumbnail,
  Right
 } from 'native-base';
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import AlertBox from '../../Core/AlertBox';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import SideMenu from 'react-native-side-menu';
import { SERVICE_URL } from '../Constants'
import Menu from './Menu';
import ViewTransformer from 'react-native-view-transformer';

import * as dropdownActions from '../../store/dropdown/actions';
import * as dropdownSelectors from '../../store/dropdown/reducer';

export class IndividualPersonList extends React.Component {
  constructor(props) {
    debugger;
     //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
        console.log(this.props.individualList,'this.props.individualList.data');

        this.state={
          isOpen:false,
          list: [],
          image_data:'',
          iscomment:false,
          modalVisible: false,
          modalVisible1: false,
          documentVisible:false,
          pressed:'',
          mathced_data:'',
           //dataSource: ds.cloneWithRows([]),
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

onPressHome(){
  this.props.navigator.push({
    component:HomePage,
    name:'home-page'
  });
}
componentDidMount(){
 var data = this.props.individualList.data.matched_details;
 this.setState({mathced_data:data});

}

back(){
  loaderHandler.hideLoader();
  this.props.navigator.pop()
}


onPressImage(data){
  console.log(data,'data');
  this.setState({pressed:data.id});
  var params={
    matched_id:data.id
  }
  this.props.dispatch(dropdownActions.imageDetails({params:params}));
}
componentWillReceiveProps(nextProps){
  if(nextProps.isImage==true){
    this.setState({image_data:nextProps.image_details});
    console.log(nextProps.image_details,'image_details');
  }
}

toggle1() {
  this.setState({
    iscomment: !this.state.iscomment,
  })
}

setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  closeModal = () => {
      this.setState({modalVisible: false})
  }

  setModalVisible1(visible,dd) {
    console.log(dd,'dd');
      this.setState({modalVisible1: visible ,img_data:dd});
    }

    closeModal1 = () => {
        this.setState({modalVisible1: false})
    }

    setDocumentVisible(visible,dd) {
      console.log(dd,'dd doc');
        this.setState({documentVisible: visible ,name:dd.name});
      }

      closeDocument = () => {
          this.setState({documentVisible: false})
      }
      _renderdata(){
        //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(this.state.iscomment==true){
      return <View>{(this.props.individualList.data[0].detect_comments.length>0)?<View style={{borderColor:'#000',borderWidth:1}}>
              <View style={{flexDirection:'row',borderWidth:1,borderBottomColor:'#000'}} >
              <View style={{flex:0.07}}>
                <Text style={{fontWeight:'600',fontSize:12}}>S.N</Text>
              </View>
                <View style={{flex:0.3,borderLeftWidth:1}}>
                <Text style={{fontWeight:'600',fontSize:12}}>Comment</Text>
                </View>
                <View style={{flex:0.2,borderLeftWidth:1}}>
                <Text style={{fontWeight:'600',fontSize:12}}>Comment By</Text>
                </View>
                <View style={{flex:0.2,borderLeftWidth:1}}>
                <Text style={{fontWeight:'600',fontSize:12}}>Comment On</Text>
                </View>
                <View style={{flex:0.23,borderLeftWidth:1}}>
                <Text style={{fontWeight:'600',fontSize:12}}>Phone</Text>
                </View>
                </View>
            {(this.props.individualList.data[0].detect_comments.length>0)?this.props.individualList.data[0].detect_comments.map((i,index)=>{return <View horizontal={true} key={index} style={{borderBottomColor:'#000',borderBottomWidth:1,flexDirection:'row'}}>
            <View style={{flex:0.07}}>
              <Text style={{fontSize:12}}>{index+1}</Text>
            </View>
              <View   style={{paddingLeft:1,flex:0.3,borderLeftWidth:1}}>
              <Text style={{paddingLeft:1,fontSize:12}}>{i.comment}</Text>
              </View>
              <View style={{flex:0.2,borderLeftWidth:1}}>
              <Text style={{fontSize:12}}>{i.commented_by}</Text>
              </View>
              <View style={{flex:0.2,borderLeftWidth:1}}>
              <Text style={{fontSize:12}}>{i.commented_on}</Text>
              </View>
              <View style={{flex:0.23,borderLeftWidth:1}}>
              <Text style={{fontSize:12}}>{i.commented_phone}</Text>
              </View>
            </View>}):<Text>No Comments</Text>}
            </View>:<Text>No Comments</Text>}</View>
        }else{
          return <View/>      }


      }
render(){
    //console.log(this.props.individualList,'individualList');

      //var photo =dd.split(',');
      var menu = <Menu navigator = { this.props.navigator }/>
      //console.log(this.props.individualList.data.matched_details,'this.props.individualList.data');
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      //const list = this.renderList(this.props.recognizeResponse);
        return(
          <SideMenu
              menu={menu}
              openMenuOffset={width/1.5}
              isOpen={this.state.isOpen}
            onChange={(isOpen) => this.updateMenuState(isOpen)}>
            <FRStatusBar/>
            <HeaderBar  toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
            <Content style={{flex:1,backgroundColor:'#fff'}}>
              <OfflineNotice/>
              <View style={{paddingBottom:20,marginLeft:20,marginRight:20}}>
                <View style={{marginTop:10,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:12,color:'#000',textAlign:'center',fontWeight:'600',borderBottomColor:'#000'}}>Person Profile</Text>
                </View>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Profile ID:{this.props.individualList.data[0].id}</Text>
                </View>
                {(this.props.individualList.data)?this.props.individualList.data.map((data,index)=>{return <View key={index}>
                {this.props.individualList.data.length>1?<Text style={{textAlign:'center',fontSize:moderateScale(14,0.5),color:'#000',paddingBottom:3,borderBottomColor:'#000',borderBottomWidth:1,fontWeight:'600'}}>Enrollment {index+1}</Text>:null}
                <View style={{flexDirection:'row',marginTop:10}}>
                  <View style={{flex:0.8}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>File Source:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.file_source}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Person Type:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{(data.case_types=='CIC Suspects' || data.case_types=='SIB Suspects')?data.case_types.substring(0, data.case_types.length-1):data.case_types}</Text>
                      </View>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Person Category:</Text>
                        </View>
                        <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.case_category_types}</Text>
                        </View>
                    </View>
                    {data.case_types=='CIC Suspects' || data.case_types=='SIB Suspects'?<View style={{flexDirection:'row'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Organization:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.organization}</Text>
                      </View>
                  </View>:null}
                  </View>
                  <View style={{flex:0.2}}>
                  <TouchableOpacity onPress={() => {this.setModalVisible(true,this.setState({img:data.photo[0]}))}}>
                  <Image
                  source={{uri:SERVICE_URL+'enrolled_images/'+data.folder+'/'+data.photo[0]}}
                  style={{height:60,width:60,alignItems:'center'}}/>
                  </TouchableOpacity>
                  <Modal  style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}} visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
                   this.closeModal ()
                 }}>
                    <Image source={require('../../images/19-512.png')} style={{height:20,width:20}}
                    />
                </TouchableOpacity>
                  <ViewControl cropWidth={width}
                  cropHeight={height}
                  clickDistance={height}
                  imageWidth={width}
                  imageHeight={width}>
                      <ZoomImage
                      duration={10}
                      imgStyle={{height:height/2,width:width}}
                      moveCapture={true}
                      resizeMode='contain'
                      enableScaling={false}
                      easingFunc={Easing.ease}
                      source={{uri:SERVICE_URL+'enrolled_images/'+data.folder+'/'+this.state.img}}
                      style={{height:height/2,width:width}}/>
                  </ViewControl>
                  </Modal>
                  </View>

                </View>
                <ScrollView horizontal={true}>{data.photo.map((i,index)=>{ return <View key={index} style={{marginLeft:10,marginTop:10,flexDirection:'row'}}>{index!=0?<TouchableOpacity onPress={() => {this.setModalVisible1(true,i)}}><Image

                source={{uri:SERVICE_URL+'enrolled_images/'+data.folder+'/'+i.replace(/ /g,'')}}
                style={{height:60,width:60,alignItems:'center'}}/></TouchableOpacity>:null}</View>
              })}
              </ScrollView>
              <Modal  style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}} visible={this.state.modalVisible1}
            onRequestClose={() => {}}>
            <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
               this.closeModal1 ()
             }}>
                <Image source={require('../../images/19-512.png')} style={{height:20,width:20}}
                />
            </TouchableOpacity>
              <ViewControl cropWidth={width}
              cropHeight={height}
              clickDistance={height}
              imageWidth={width}
              imageHeight={width}>
                  <ZoomImage
                  duration={10}
                  imgStyle={{height:height/2,width:width}}
                  moveCapture={true}
                  resizeMode='contain'
                  enableScaling={false}
                  easingFunc={Easing.ease}
                  source={{uri:SERVICE_URL+'enrolled_images/'+data.folder+'/'+this.state.img_data}}
                  style={{height:height/2,width:width}}/>
              </ViewControl>
              </Modal>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#fff',fontWeight:'600'}}>Person Details:</Text>
                </View>
                <View style={{paddingLeft:8}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Name: </Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.name}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Alias:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.alias_name}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Parentage:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.guardian_name}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>DOB:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.dob=='00-00-0000' || data.dob=='0000-00-00' || data.dob=='01-01-1970' || data.dob== '1-1-1970'?null:data.dob}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Age(Years):</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.dob=='01-01-1970'?null:data.age}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Gender:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.gender}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Known Language(s):</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.known_languages}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Nationality:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.nationality}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>State:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.state}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Address:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.address}</Text>
                  </View>
                </View>
                </View>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Descriptive Roll (D.R):</Text>
                </View>
                <View style={{paddingLeft:8}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Height(Foot & Inches):</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    {data.height==null?null:<Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.height}{"\'"} {data.inch}{'\"'}</Text>}
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Colour:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.color}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Identification Marks:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.identification_marks}</Text>
                  </View>
                </View>
                </View>
                {data.case_types=='Rohingyas'?<View>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Identification Numbers:</Text>
                </View>
                <View style={{paddingLeft:8}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Individual Number:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.individual_no}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>UNHCR Number:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.unhcr_no}</Text>
                  </View>
                </View>
                </View>
                </View>:null}
                {data.case_types=='Foreigners-Overstay'?<View>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Passport Details:</Text>
                </View>
                <View style={{paddingLeft:8}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Number:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_no}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Issue Date:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_issue_date}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Expiry Date:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_expiry_date}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Issue Place:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_issue_place}</Text>
                  </View>
                </View>
                </View>
                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>VISA Details:</Text>
                </View>
                <View style={{paddingLeft:8}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Number:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_no}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Issue Date:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_issue_date}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Expiry Date:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_expiry_date}</Text>
                  </View>
                </View>

                </View>
                </View>:null}


                <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Crime Details:</Text>
                </View>
                        {data.crime_details.map((i,index)=>{return <View key={index} style={{alignItems:'flex-start'}}><Text style={{fontSize:16,color:'#000',fontWeight:'600',borderBottomColor:'#000',paddingBottom:5}}>Crime {index+1}:</Text>

                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Crime No.:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.fir_no}</Text>
                          </View>
                        </View>
                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Crime Year:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.fir_date}</Text>
                          </View>
                        </View>
                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Section Of Law:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.section}</Text>
                          </View>
                        </View>
                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Police Station:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.ps_name}</Text>
                          </View>
                        </View>
                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>District:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.districtname}</Text>
                          </View>
                        </View>
                        <View style={{paddingLeft:8,flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>State:</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{i.statename}</Text>
                          </View>
                        </View>
                        </View>})}
                        <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                          <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Attachments:</Text>
                        </View>
                        <ScrollView  style={{marginTop:10}} horizontal={true}>
                        {data.person_idproofs.map((i, index)=>{ return <TouchableOpacity style={{marginLeft:3}} onPress={() => {this.setDocumentVisible(true,i),this.setState({folder:data.folder})}} key ={index}><Image

                        style={{height:50,width:50}}
                         source={{uri: SERVICE_URL+`id_proofs/thumbs/${data.folder}/${i.name}`}} /></TouchableOpacity>})
                        }
                        </ScrollView>

                        <View><View style={{marginLeft:-10,marginTop:10,marginBottom:15,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                          <Text style={{marginLeft:10,fontSize:height/45,color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Comments During Enrollment:</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                          <View style={{flex:0.5}}>
                              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Comment :</Text>
                          </View>
                          <View style={{flex:0.5}}>
                            {(data.comments!=null)?<Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.comments}</Text>:<Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3}}>No Comments</Text>}
                          </View>
                        </View>
                        </View>

                      {(data.case_types== 'Person Found')?<View><View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                        <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Rescue Home/CCI Details:</Text>
                      </View>
                      <View style={{paddingLeft:5}}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Name of District :</Text>
                        </View>
                        <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.district_name}</Text>
                        </View>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Name of Rescue Home:</Text>
                        </View>
                        <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.name_of_home}</Text>
                        </View>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:0.5}}>
                            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Name of CCI:</Text>
                        </View>
                        <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.cci_name}</Text>
                        </View>

                      </View>
                      </View></View>:null}
                      <View style={{marginTop:5,height:1,borderColor:'#000',borderWidth:1}}/>
                  <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                    <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Enrolled On:</Text>
                    </View>
                    <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.created_at}</Text>
                    </View>
                  </View>
                  <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                      <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,fontWeight:'600'}}>Enrolled At:</Text>
                  </View>
                  <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
                    <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Enrolled At :</Text>
                    </View>
                    <View style={{flex:0.5,justifyContent:'center'}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}> {data.enrolled_at}</Text>
                    </View>
                  </View >
                  <View >
                    <View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                        <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,fontWeight:'600'}}>Enrolled By:</Text>
                    </View>
                    </View>
                    <View style={{paddingLeft:8}}>
                    <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Name:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.enrolled_by}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Rank:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.enrolled_role}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>PS:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.enrolled_ps}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                      <View style={{flex:0.5}}>
                          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Unit:</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.enrolled_district}</Text>
                      </View>
                    </View>


                  <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                    <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Mobile:</Text>
                    </View>
                    <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.enrolled_user_no}</Text>
                    </View>
                  </View>
                </View>
                </View>}):null}
                <TouchableOpacity onPress={this.toggle1.bind(this)} style={{marginBottom:10,marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start',flexDirection:'row'}}>
                <View style={{flex:0.7}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',borderBottomColor:'#000',fontWeight:'600'}}>Comments During Detect:</Text>
                  </View>
                  <View style={{flex:0.3,alignItems:'flex-end'}}>
                  {(this.state.iscomment==true)?<Image source={require("../../images/list_minus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />:<Image source={require("../../images/FR-TSP-Logo-plus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />}
                  </View>
                </TouchableOpacity>
                <View>{this._renderdata()}</View>
                <Modal  style={{flex:1,alignSelf: 'center',alignItems:'center'}} visible={this.state.documentVisible}
              onRequestClose={() => {}}>
              <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
                 this.closeDocument ()
               }}>
                  <Image source={require('../../images/19-512.png')} style={{height:30,width:30}}
                  />
              </TouchableOpacity>
                <ViewTransformer enableTransform={true}
                enableScale={true}
                enableTranslate={true}
                style={{width:width,height:height}}
                enableResistance={true}
                maxScale={90}>
                    <Image
                    resizeMode='contain'
                    source={{uri:SERVICE_URL+`id_proofs/`+this.state.folder+'/'+this.state.name}}
                    style={{height:height/1.12,width:width}}/>
                </ViewTransformer>
                </Modal>
              </View>
             </Content>
           <Footer style={{height:40,backgroundColor:'#fff'}}>
           <BottomBar navigator = { this.props.navigator } detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
           </Footer>
           </SideMenu>
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
    individualList: faceSelectors.getIndividualListFaceView(state),
    isImage:dropdownSelectors.isImage(state),
    image_details:dropdownSelectors.getImageDetailsResponce(state)
  };
}

export default connect(mapStateToProps)(IndividualPersonList);
