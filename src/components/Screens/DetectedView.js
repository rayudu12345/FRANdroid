import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  PixelRatio,
  Image,
  Navigator,
  TextInput,
  Alert,
  Easing,
  Dimensions
} from 'react-native';
import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';
import ZoomImage from 'react-native-zoom-image';
import ImageViewer from 'react-native-image-zoom-viewer';
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

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import EnrolFaceDetection from './EnrolFaceDetection';
import IndividualPersonList from './IndividualPersonList';
import { SERVICE_URL } from '../Constants'
import PopupDialog, { DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
import ImageZoom from 'react-native-image-pan-zoom';
import OfflineNotice from './OfflineNotice';

import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import EditPerson from './EditPerson'
import EnrollmentForm from './EnrollmentForm'
import ViewTransformer from 'react-native-view-transformer';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import AlertBox from '../../Core/AlertBox';
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownSelectors from '../../store/dropdown/reducer';
import * as dropdownActions from '../../store/dropdown/actions';
import PinchZoomView from 'react-native-pinch-zoom-view';
import ViewControl from 'react-native-zoom-view'
import { ZoomView } from "react-native-zoom";
import UpdatePerson from './UpdatePerson';

export class DetectedView extends React.Component {
  constructor(props) {
        debugger;
        super(props);
        this.state={
          photo:null,
          response_data:{},
          image_array:[],
          image_array1:[],
          isOpen:false,
          pressed1:false,
          isImageChanged:false,
          modalVisible: false,
          isShowMore:false,
          img_name:'',
          folderName:'',
          pressed:'',
          person_id:'',
        }
      }

      componentWillMount() {
        var img = [];
        console.log(this.props.detect_responce,'this.props.image_data');
        //console.log(this.props.detect_responce.response,'this.props.detect_responce.response.response[0]');
        this.props.dispatch(faceActions.setEmpty({}));
        this.setState({response_data:this.props.detect_responce.response[0]});

        //this.setState({img_name:img_name,folderName:this.props.detect_responce.response.response[0].folderName})
        //var dd = this.props.detect_responce.response.response.slice(0, 3)
        for (let i= 0 ;i<this.props.detect_responce.response.length;i++){

          //if(this.props.detect_responce.response.response[0].personSeqNumber != this.props.detect_responce.response.response[i].personSeqNumber){
            var str_ele =this.props.detect_responce.response[i].image;
            var arra_ele =str_ele.split('/');
            var img_name =arra_ele.slice(-1).pop();
            var person_id=this.props.detect_responce.response[i].personSeqNumber;
          //console.log(img_name,'img_name');
           dd = {img_name:img_name,person_id:person_id,score:this.props.detect_responce.response[i].score,folderName:this.props.detect_responce.response[i].folderName};
          img.push(dd);
          var result = img.reduce((unique, o) => {
              if(!unique.some(obj => obj.person_id === o.person_id )) {
                unique.push(o);
              }
              return unique;
          },[]);
          //console.log(result,'main array' );
          var uniqueArray = result;

           uniqueArray.sort(function (a, b) {
            //console.log(a.score, 'ojct array');
            return b.score - a.score;
          });

           this.setState({image_array1:uniqueArray});

          //}
          }




      }

      componentWillReceiveProps(nextProps){
        if(nextProps.isIndividual==true){
          loaderHandler.showLoader('Load..')
          this.props.dispatch(faceActions.setEmpty({}));
          this.props.navigator.push({
            component:IndividualPersonList,
            name:'individual-person-list'
          });
        }else if(nextProps.isUpdate==true){
          var image_data= this.props.image_data;
          this.props.dispatch(faceActions.setImageData(image_data:image_data));
          this.props.dispatch(faceActions.setEmpty({}));
          this.props.navigator.push({
            component:UpdatePerson,
            name:'update-person'
          });
        }


          //loaderHandler.hideLoader('Load..');
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        })
      }

      onProfileSubmit(){
      loaderHandler.showLoader('Load..');
      console.log(this.state.response_data,'onpress');
        var params={
          person_id:(this.state.person_id=='')?(this.state.response_data.personSeqNumber):(this.state.person_id),
          case_id:(this.state.folderName=='')?(this.state.response_data.folderName):(this.state.folderName),
        }
        console.log(params,'params person_id');
        this.props.dispatch(faceActions.setEmpty({}));

        this.props.dispatch(faceActions.loadIndividualListFace({params:params}));


        loaderHandler.hideLoader('Load..');

      }


      updateMenuState(isOpen) {
        this.setState({ isOpen });
      }

      onPressDetect(){
        loaderHandler.showLoader('Load..');
        var params={
          person_id:(this.state.person_id=='')?(this.state.response_data.personSeqNumber):(this.state.person_id),
          case_id:(this.state.folderName=='')?(this.state.response_data.folderName):(this.state.folderName)
        }
        console.log(params,'params');
        this.props.dispatch(faceActions.setEmpty({}));
      this.props.dispatch(faceActions.updateData({params:params}))

      }
      onPressEnroll(){
        loaderHandler.showLoader('Load..');
        var image_data= this.props.image_data;
      this.props.dispatch(faceActions.setImageData(image_data:image_data));
        this.props.dispatch(faceActions.setEmpty({}));
      this.props.navigator.push({
        component:EnrollmentForm,
        name:'enrollment-form'
      });
      }

back(){
    loaderHandler.hideLoader('Load..');
  this.props.navigator.pop ();
}

onPressImage(data){


  console.log(data,'data');
  if((this.state.pressed==''&&this.state.pressed1==false) || (this.state.pressed!=data.person_id&&this.state.pressed1==true)){
  this.setState({pressed:data.person_id,pressed1:true,person_id:data.person_id,isImageChanged:true,img_name:data.img_name,folderName:data.folderName,score:data.score});
}else if(this.state.pressed1==true&&this.state.pressed==data.person_id){
  this.setState({pressed1:false,isImageChanged:false,pressed:'',img_name:'',folderName:'',score:''})
}
}

showMore(){
  this.setState({isShowMore:true});
}
setModalVisible(visible,dd) {
  console.log(dd,'dd');
    this.setState({person_id:dd.person_id,modalVisible: visible,source:this.props.image_data[0].uri,img_name:dd.img_name,folderName:dd.folderName,score:dd.score});
  }

  closeModal = () => {
      this.setState({modalVisible: false})
  }

    render(){
      var menu = <Menu navigator = { this.props.navigator }/>

      return(
        <SideMenu
            menu={menu}
            openMenuOffset={width/1.5}
            isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <FRStatusBar/>
        <HeaderBar  toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
        <Image source={require('../../images/FR-APP_Photo-already-Match_BG.jpg')} style={styles.imageBackground}>
          <OfflineNotice/>

        <View style={{height:50,flexDirection:'row',backgroundColor:'#fff'}}>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{paddingLeft:15,color:'#61659D',fontSize:height/40}}> Enrollment</Text>
          </View>
          <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>

          </View>
        </View>
        <ScrollView vertical={true} style={{paddingBottom:verticalScale(150),paddingLeft:20,paddingRight:20}}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={{textAlign:'center',marginTop:10,marginBottom:10,color:'#c1c8d1'}}>Record Matched</Text>

        <View style={{alignItems:'center',marginBottom:20}}><View style={{paddingBottom:15,width:width/1.1,backgroundColor:'#ebebeb',marginTop:20}}>
          <View style={{paddingLeft:scale(10),marginRight:10}}>
          <View style={{marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{flex:0.4}}>
              <Text style={{paddingBottom:5,fontSize:12,color:'#2d3878', fontWeight:'600'}}>Subject Image</Text>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              {/*<ImageZoom cropWidth={width/2}
                       cropHeight={height/2}
                       imageWidth={150}
                       imageHeight={150}>
                       <Image style={{width:150, height:150}}
                       source={{uri:this.props.image_data[0].uri}}/>
                       </ImageZoom>*/}

              <ZoomImage
              duration={200}
              resizeMode={'stretch'}
              imgStyle={{height:150,width:140}}
              moveCapture={true}
              startCapture={true}
              enableScaling={false}
              easingFunc={Easing.ease}
              source={{uri:this.props.image_data[0].uri}}
              style={{height:150,width:140}}/>

              </View>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../images/FR-APP_Detect-Screen_Loading_15.png')} style={{height:20,width:20}}/>
            </View>
            <View style={{flex:0.4}}>
            <Text style={{paddingBottom:5,fontSize:12,color:'#2d3878', fontWeight:'600'}}>Matched Image</Text>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <ZoomImage
              duration={200}
              resizeMode={'stretch'}
              imgStyle={{height:150,width:140}}
              moveCapture={true}
              enableScaling={false}
              easingFunc={Easing.ease}
              source={{uri:(this.state.isImageChanged==false)?(this.state.image_array1.length>0)?SERVICE_URL+`enrolled_images/`+this.state.image_array1[0].folderName+'/'+this.state.image_array1[0].img_name:null:SERVICE_URL+`enrolled_images/`+this.state.folderName+'/'+this.state.img_name}}
              style={{height:150,width:140}}/>

              </View>
            </View>
          </View>
          </View>
          </View>
          </View>

          <View style={{alignItems:'center'}}>
          <View style={{alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
          {this.state.image_array1.length>0?this.state.image_array1.map((i,index) => {return (<TouchableOpacity  onPress={() => {this.setModalVisible(true,i)}} style={{alignItems:'center'}} key={index}>{(this.state.isShowMore==false?index<=5:index<=11)? <View style={{width:(width / 3.3) - 15,alignItems:'center',borderWidth:3,borderColor:this.state.pressed==i.person_id&&this.state.pressed1==true?"#f00":'#fff',marginLeft:10,marginTop:10}} >
          <ScrollView>
          <Image
          resizeMode={'stretch'}
          source={{uri:SERVICE_URL+`enrolled_images/thumbs/`+i.folderName+'/'+i.img_name}}
          style={{height:scale(80),width:scale(80)}}/>
            <View style={{height:verticalScale(30),alignItems:'center',justifyContent:'center'}}><Text onPress = {this.onPressImage.bind(this, i)} style={{color:'#fff',textAlign:'center',fontSize:moderateScale(14,0.5)}}>Score:{i.score}</Text></View>
            </ScrollView>
          </View>:null}</TouchableOpacity>
        )}):null}
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.7}}/>
          {this.state.isShowMore==false && this.state.image_array1.length>6?<TouchableOpacity  onPress={this.showMore.bind(this)}   style={{flex:0.3,alignItems:'flex-end',marginTop:8,height:40}}>
              <Text style={{color:'#fff',padding:5,backgroundColor:'#ab8ce4'}}>Show More</Text>
          </TouchableOpacity>:null}
          </View>
        <View style={{justifyContent:'center'}}>


          <View>

          <Modal  style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}} visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
           this.closeModal ()
         }}>
            <Image source={require('../../images/19-512.png')} style={{height:30,width:30}}
            />
        </TouchableOpacity>

        <View style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}}>
        <View style={{flexDirection:'row',paddingLeft:scale(8),paddingRight:scale(8)}}>

        <View style={{flex:0.5}}>
          <Text style={{color:'#000',fontSize:moderateScale(10)}}>Subject Image</Text>

          <ViewTransformer
          enableTransform={true}
          enableScale={true}
          enableTranslate={true}
          style={{width:width/2.1,height:height/2}}
          enableResistance={true}
          maxScale={100}><ZoomImage
        duration={200}
        resizeMode={'stretch'}
        imgStyle={{borderWidth:1,borderColor:'#000', height: height/2}}
        moveCapture={true}
        enableScaling={false}
        easingFunc={Easing.ease}
          source={{uri:this.state.source}} style={{borderWidth:1,borderColor:'#000',width: width/2.1, height: height/2}} />
          </ViewTransformer>
        </View>
        <View style={{flex:0.5,paddingLeft:5}}>
        <View style={{flexDirection:'row'}}>
        <View style={{flex:0.6}}>
        <Text style={{color:'#000',fontSize:moderateScale(10)}}>Matched Image</Text>
        </View>
        <View style={{flex:0.4,alignItems:'flex-end'}}>
        <Text style={{color:'#000',fontSize:moderateScale(8),textAlign:'center'}}>Score:{this.state.score}</Text>
        </View>
        </View>
        <ViewTransformer
        enableTransform={true}
        enableScale={true}
        enableTranslate={true}
      style={{width:width/2.1,height:height/2}}
        enableResistance={true}
        maxScale={100}>
          <ZoomImage
          duration={200}
          resizeMode={'stretch'}
          imgStyle={{borderWidth:1,borderColor:'#000', height: height/2}}
          moveCapture={true}
          enableScaling={false}
          easingFunc={Easing.ease}
            source={{uri:SERVICE_URL+`enrolled_images/`+this.state.folderName+'/'+this.state.img_name}} style={{borderWidth:1,borderColor:'#000',height: height/2}} />
            </ViewTransformer>
            <Text style={{color:'#000',textAlign:'right',fontSize:moderateScale(10)}}>Person ID: {this.state.person_id}</Text>
        </View>

        </View>

        {/*<TouchableHighlight  style={{marginTop:height/20,alignItems:'center'}} onPress={() => {
            this.closeModal ()
          }}>
            <Text style={{color:'#fff',fontSize:16,width:100,height:30,textAlign:'center',paddingTop:3,backgroundColor:'#ff3020'}}>Close</Text>
          </TouchableHighlight>*/}
          </View>


      </Modal >
            <Text style={{color:'#fff',marginTop:height/50,fontSize:height/40,textAlign:'center'}}>Matched!</Text>
            <Text style={{color:'#ededed',textAlign:'center',fontSize:height/50}}>Record is Matched {'\n'} Please Click to View or Update or Enroll</Text>
          </View>

        <TouchableOpacity  onPress={this.onProfileSubmit.bind(this)}   style={[styles.buttonContainer]}>
            <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',marginBottom:verticalScale(40)}}>
        <TouchableOpacity   onPress={this.onPressDetect.bind(this)} style={{width: width*0.4,paddingVertical:height/40,justifyContent:'center',marginTop:10,alignItems:'center',borderColor:'#fff',borderWidth:1,flexDirection:'row'}}>

            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../../images/FR-TSP-add-other-arrow.png')} style={{height:10,width:10}}/>
            </View>
            <View style={{flex:0.8,alignItems:'flex-start'}}>
            <Text style={{color:'#fff',fontWeight:'600'}}>Upadate Record</Text>
            </View>

        </TouchableOpacity>
        <TouchableOpacity  onPress={this.onPressEnroll.bind(this)} style={{marginLeft:10,width: width*0.4,paddingVertical:height/40,justifyContent:'center',marginTop:10,alignItems:'center',borderColor:'#fff',borderWidth:1,flexDirection:'row'}}>



            <Text style={{color:'#fff',fontWeight:'600'}}>Enroll Record</Text>


        </TouchableOpacity>
        </View>
        </View>
        </View>
        </View>
        </ScrollView>

        </Image>
        <BusyIndicator/>
        <Footer style={{height:40,backgroundColor:'#fff'}}>
        <BottomBar navigator = { this.props.navigator } disableEnroll={true} detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end',backgroundColor:'#dedede'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
        </Footer>
        </SideMenu>

      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  imageBackground:{
    flex: 1,
    width: width,
    height: height
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
    backgroundColor:'#B2343F',
    width: width*0.8,
    paddingVertical:height/40,
    marginTop:10,
      //marginBottom:80,
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
    isDetected:faceSelectors.isUserDetected(state),
    detect_responce:faceSelectors.getDetect1Response(state),
    loginResponse: faceSelectors.getLoginResponse(state),
    image_data:faceSelectors.getImageResponse(state),
    isIndividual:faceSelectors.isIndividual(state),
    isUpdate:faceSelectors.isUpdate(state)
  };
}

export default connect(mapStateToProps)(DetectedView);
