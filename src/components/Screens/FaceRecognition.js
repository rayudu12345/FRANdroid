import React, { Component } from 'react';
import {Modal, TouchableHighlight,Alert,Picker,NativeModules,Easing,AppState,TouchableNativeFeedback,Dimensions, StyleSheet, ScrollView,ListView, Platform,View, TextInput, TouchableOpacity, Navigator, Text, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import ZoomImage from 'react-native-zoom-image';
import Prompt from 'react-native-prompt';
//import Modal from 'react-native-modal';
import ViewTransformer from 'react-native-view-transformer';
import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';

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
  Button,
  Right,
  Thumbnail
 } from 'native-base';

import ListEnrollment from './ListEnrollment';
import HomePage from './HomePage';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';

import * as faceActions from '../../store/face/actions';
import * as dropdownActions from '../../store/dropdown/actions';
import * as faceSelectors from '../../store/face/reducer';
import AlertBox from '../../Core/AlertBox';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import ImagePicker from 'react-native-image-picker';

import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import EnrolFaceDetection from './EnrolFaceDetection';
import DashBoard from './DashBoard';
import EnrollmentForm from './EnrollmentForm';
import MatchedListPage from './MatchedListPage';
import LabelSelect from '../react-native-label-select';
import ComparisonSlider from "react-native-comparison-slider";
import OfflineNotice from './OfflineNotice';
import Compare, { Before, After, DefaultDragger, Dragger } from '@malik.aliyev.94/react-native-before-after-slider';
import ViewControl from 'react-native-zoom-view'
import ImageZoom from 'react-native-image-pan-zoom';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import { SERVICE_URL } from '../Constants'

let case_category = [
  {label:'Accused', isSelected: false,value:1},
{label:'Person Missing', isSelected: false,value:2},
{label:'Person Found', isSelected: false,value:3},
{label:'Dead Body', isSelected: false,value:4},
{label:'Victim', isSelected: false,value:5},
{label:'Others', isSelected: false,value:6}];
var img =[];
let sssd= [];
let ssss = [];
export class FaceRecognition extends React.Component  {
  constructor(props) {
      debugger;
      super(props);

      ds = new ListView.DataSource({rowHasChanged: (row1, row2) => { row1 !== row2;}});
      this.state = {
        case_category : [],
         imageArray: [],
        isOpen:false,
        isDrop:false,
        isImageChanged:false,
        avatarSource: null,
        isShowMore:false,
        image:null,
          pressed:'',
          pressed1:false,
          modalVisible: false,
        recognizeStatus:false,
        empty_data:'',
         isModalOpen: false,
         isModalVisible:false,
        imageResponse:null,
        detectResponse: '',
        documentVisible:false,
        detectResponseMessage:'',
        dataSource: null,
        response_data:{},
        person_case_category:[],
        isRefresh:false,
        scrollEnabled:false,
        image_name:'',
        iscomment:false,
        gps: false,
        latitude: null,
        longitude: null,
        error: null,
        threshhold:'',
        comment_value:false,
        comment: '',
        promptVisible: false,
        render_values:['20','25','30','35','40','45','50','55','60','65','70','80','85','90']


      };


  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  dropToggle() {
    this.setState({
      isDrop: !this.state.isDrop,
    })
  }

  onPressComment(){
    //console.log(this.state.detectResponse.matched_id,'profile_id');
    this.setState({ promptVisible: true,comment:'' });
    //var params = { profile_id:profile_id.id};
    //this.props.dispatch(dropdownActions.setPersonId(params:params));
  // if(this.state.comment_value==true){
  //   var params = {
  //     matched_id:profile_id.id,
  //     name:this.props.OTPVerificationResponse.data.name,
  //     comment:this.state.comment
  //   }
  //   this.props.dispatch(dropdownActions.detectComment({params:params}));
  // }
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  componentDidMount() {
    this.props.dispatch(faceActions.setEmpty({}));
    let ts;
    var dds =[];
    this.selectConfirm = this.selectConfirm.bind(this);
 this.deleteItem = this.deleteItem.bind(this);
 this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  //  console.log(this.props.case_type_person.data,'ddid');
    if(this.props.case_type_person.data!=undefined){
    for(let i=0 ; i<this.props.case_type_person.data.length ; i++){
      let t = this.props.case_type_person.data[i].title;
      let s = this.props.case_type_person.data[i].id;
      let n = this.props.case_type_person.data[i].name

        ts =  {'label':t, 'isSelected':false,'name':n, 'value':s};
      dds.push(ts);

  }
}
this.setState({case_category:dds});
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


//console.log(this.state.gps,'case_type_person');
//console.log(this.state.error,'error');

  }


_renderData1(){
  //var Casetypes=[];
  for(let i=0 ; i<this.props.case_type_person.length ; i++){
              n = this.props.case_type_person[i].title;
              v = this.props.case_type_person[i].id;

       case_category.push(label ={n}, value ={v});
       //console.log(case_category,'case_category');
    }

    return case_category;
}

  selectPhotoTapped() {
      this.setState({detectResponse:'',avatarSource:null});
            const options = {
              title: 'SELECT PHOTO',
              takePhotoButtonTitle:`Take Photo`,
              chooseFromLibraryButtonTitle:'Choose from Library',
                maxWidth: 500,
                maxHeight: 500,
                quality:0.6,
                storageOptions: {
                    skipBackup: true,

                }
            };

            ImagePicker.showImagePicker(options, (response) => {
                debugger;
                console.log('Response = ',response);

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
                        avatarSource:response.data,
                        image: response.fileName,
                        response_data:response

                    });
                    this.props.dispatch(faceActions.setEmpty({}));

                }
                this.onPressContinue();
            });
        }


        onPressDetect() {
          //this.props.dispatch(faceActions.setEmpty({}));
          this.props.navigator.resetTo({
              component: FaceRecognition,
              name: 'face-recognition'
          });

        }

        onPressDashboard() {
          //this.props.dispatch(faceActions.setEmpty({}));
          this.props.navigator.resetTo({
              component: DashBoard,
              name: 'dash-board'
          });

        }

        onPressEnrol() {
          //this.props.dispatch(faceActions.setEmpty({}));
          this.props.navigator.resetTo({
            component:EnrolFaceDetection,
            name:'enrol-face-detection'
          });

          }


  onPressContinue() {
    debugger;
     img =[];sssd=[];ssss =[];

     this.setState({isShowMore:false,img_name:'',pressed:'',source:'',person_id:'',folderName:'',score:'',pressed1:false})
     //console.log(this.state.person_case_category,'this.state.person_case_category');
    this.setState({detectResponse:'',image_name:''});
    loaderHandler.showLoader('Searching...');
    var ss =[];

    if(this.state.avatarSource==null){
      AlertBox('Please Upload Image');
        loaderHandler.hideLoader();
    }else{
      for(let i=0; i<this.state.person_case_category.length;i++){
        var t = this.state.person_case_category[i].name;
        ss.push(t);
      }
      //console.log(ss,'ss');
      var image_data=this.state.response_data;
      //console.log(image_data,'image_data');
      this.props.dispatch(faceActions.setEmpty({}));
      this.props.dispatch(faceActions.setImageData(image_data:image_data));
      var detect_data = {
          uri:this.state.response_data.uri,
          type:'image/jpeg',
          Filename:this.state.response_data.fileName
        };

      var params={
        image:detect_data,
        folderNames:ss.join(','),
        matchingthreshhold:this.state.threshhold==''?20:parseInt(this.state.threshhold)
      }
      //console.log(params,'params');
      this.props.dispatch(faceActions.setEmpty({}));
    this.props.dispatch(faceActions.detectUserOnly({params:params}));
  }




  }
  onPressSaveDetect(nextProps){
    var isDetected = true
    //console.log(nextProps.detect_responce.response.response[0].folderName,'this.state.image_name.response[0].folderName');
    //if(this.state.gps==true){
    var data = [];
    if(nextProps.detect_responce.response.code!=100){
      var result = nextProps.detect_responce.response.response.reduce((unique, o) => {
          if(!unique.some(obj => obj.personSeqNumber === o.personSeqNumber )) {
            unique.push(o);
          }
          return unique;
      },[]);
      data = result
      console.log(data,'result');
      var folder=[];
      var match_id = [];
      var score_data= [];


      for (let i = 0 ; i<result.length;i++){
        //if(nextProps.detect_responce.response.response[0].personSeqNumber != nextProps.detect_responce.response.response[i].personSeqNumber){
          fol=result[i].folderName
          folder.push(fol);
          mat=result[i].personSeqNumber
          match_id.push(mat);
          score1 =result[i].score
          score_data.push(score1);
        //}

      }

    }
    console.log(folder,'folder');
    console.log(match_id,'match_id');

    //return ;

    var dd_folder = (nextProps.detect_responce.response.code!=100)?folder.slice(0, 6):null;
    var dd_mathch = (nextProps.detect_responce.response.code!=100)?match_id.slice(0, 6):null;
    var dd_score = (nextProps.detect_responce.response.code!=100)?score_data.slice(0, 6):null;
    //console.log(folder,'folder');
    var params ={
      isDetected:nextProps.isDetected,
      login_user_id:nextProps.OTPVerificationResponse.data.id,
      image_name:this.state.avatarSource,
      folder_name:dd_folder,
      matched_id:dd_mathch,
      score:dd_score,
      person_type:this.state.person_case_category,
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      detected_by:nextProps.OTPVerificationResponse.data.name,
    };
    //console.log(this.state.latitude+'__'+this.state.longitude);
    //console.log(params,'gffggg');
    nextProps.dispatch(faceActions.detectImage({params:params}));

    nextProps.dispatch(faceActions.setEmpty({}));



  }

  componentWillReceiveProps(nextProps) {
    debugger;
    this.setState({image_name:''});
      //console.log(nextProps.isDetected,'chandu');
    if(nextProps.isDetected == true){
      this.setState({image_name:''});
        console.log(nextProps.detect_responce,'all detected ');
      if(nextProps.detect_responce.response.code==100){
        this.onPressSaveDetect(nextProps);
        loaderHandler.hideLoader();
        //console.log(nextProps.detect_responce,'not detected ');
        AlertBox('No Person Detected ');
        this.setState({empty_data:nextProps.detect_responce});
      } else{
        console.log(nextProps.detect_responce,'detected ');
        this.setState({image_name:nextProps.detect_responce.response});
        this.onPressSaveDetect(nextProps);

        //console.log(this.state.image_name,'image_name state');
      }
    }else if(nextProps.isIndividual==true){
      console.log(nextProps.individualList,'individualList');
      this.setState({detectResponse:nextProps.individualList});

    }else if(nextProps.isImageDetected == true){
    //   console.log('detectImage');
    //   console.log(nextProps.detectImage,'detectImage');
    // this.setState({detectResponse:nextProps.detectImage});
      loaderHandler.hideLoader();
      if(nextProps.detectImage.message!='Person has data'){
        console.log(nextProps.detectImage,'detectImageif');
        this.setState({empty_data:nextProps.detectImage});

      }else{
        console.log(nextProps.detectImage,'detectImageelse');
        this.setState({detectResponse:nextProps.detectImage})
    }

  }
  }

  renderList(){
    //console.log(this._renderData(),'this.state.detectResponse');
    return  <Text> {(this.state.detectResponse.length>0)?this.state.detectResponse[0].name :'' }</Text>

    }

    onPressDetectList() {
      //console.log(this.state.detectResponse,'gggggggggggg');
      var params={
        person_name:this.state.detectResponse.data.name,
        person_id:this.state.detectResponse.data.id
      };
      //console.log(params,'params');

        //this.props.dispatch(faceActions.loadMatchedList({params:params}));
      this.props.dispatch(faceActions.setPersonId(params:params));


      this.props.navigator.resetTo({
        component:MatchedListPage,
        name:'matched-list-page'
      });
    }

  onPressEnrolForm() {
    this.props.navigator.resetTo({
      component:EnrollmentForm,
      name:'enrollment-form'
    });
  }





selectConfirm(list) {

    let {case_category} = this.state;
    var dd= this.state.person_case_category  || [];
    for (let item of list) {
      let index = case_category.findIndex(ele => ele === item);
      //console.log(index,'index');
      if (~index) case_category[index].isSelected = true;

      if(case_category[index].isSelected == true){
        dd.push(case_category[index])
      }
      else continue;
      this.setState({person_case_category:dd});

    }
    if(this.state.avatarSource!=null){
    this.onPressContinue();
  }


  }
  deleteItem(item) {

    let {case_category} = this.state;
    let index = case_category.findIndex(a => a === item);
    case_category[index].isSelected = false;
    // if(case_category[index].isSelected == false){
    //   dd.pop(case_category[index])
    // }
    this.state.person_case_category.pop(case_category[index]);
      this.setState({case_category:case_category});
    //   if(this.state.avatarSource!=null){
    //   this.onPressContinue();
    // }
      //console.log(this.state.person_case_category);
    //lothis.setState({person_case_category:case_category});
  }

back(){
  this.props.navigator.push({
    component:DashBoard,
    name:'dash-board'
  })
}

onValueChange = (key: string, value: string) => {
      debugger;
    const newState = {};
    newState[key] = value;
    this.setState(newState);
    }

_getDistrict(){

//console.log(disrict_picker,'disrict_picker');
return(

  <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
    selectedValue={this.state.threshhold}
    onValueChange={this.onValueChange.bind(this, 'threshhold')} >


      {serviceItems}

</Picker>
)
}

onPressImage(data){
  console.log(data,'data');
  if((this.state.pressed==''&&this.state.pressed1==false) || (this.state.pressed!=data.person_id&&this.state.pressed1==true)){
  this.setState({isImageChanged:true,pressed1:true,pressed:data.person_id,img_name:data.img_name,folderName:data.folderName,score:data.score});
  var params={
    person_id:data.person_id,
    case_id:data.folderName
  }
  //console.log(params,'params person_id');

  this.props.dispatch(faceActions.loadIndividualListFace({params:params}));
}else if(this.state.pressed1==true&&this.state.pressed==data.person_id){
  this.setState({pressed1:false,isImageChanged:false,pressed:'',img_name:'',folderName:'',score:''})
}



}
onPressCommentSubmit(){
  console.log(this.state.comment,'comment');
  //return;
  //if(this.state.comment_value==true){
  if(this.state.comment==''){
    AlertBox('Please enter comment');
  }else{
var params = {
     matched_id:this.state.detectResponse.data[0].matched_id,
     name:this.props.OTPVerificationResponse.data.name,
     comment:this.state.comment,
     user_id:this.props.OTPVerificationResponse.data.id,
     case_id:this.state.detectResponse.data[0].folder,
     type:1
   }
console.log(params,'params');
   this.props.dispatch(dropdownActions.detectComment({params:params}));

  Alert.alert('Success','Comment Added Successfully');

}

}

onPressNotCommentSubmit(){
  //console.log(this.state.comment,'person_id');
  //if(this.state.comment_value==true){
setTimeout(()=>{var params = {
     matched_id:this.state.detectResponse.data[0].match_id,
     name:this.props.OTPVerificationResponse.data.name,
     user_id:this.props.OTPVerificationResponse.data.id,
     comment:this.state.comment,
     type:2,
     case_id:this.state.detectResponse.data[0].folder

   }

   this.props.dispatch(dropdownActions.detectComment({params:params}));
   setTimeout(()=>{Alert.alert('Success','Not Detect Status Saved');},1000);
},1000);
}

onMoveStart() {
    this.setState({scrollEnabled: false});
  }

  onMoveEnd() {
    this.setState({scrollEnabled: true});
  }

  openModal(dd) {
    console.log(dd,'ff');
      this.setState({isModalOpen: true,img_name:dd.img_name,folderName:dd.folderName});
    }

    closeModal() {
      this.setState({isModalOpen: false});
    }

    _toggleModal = (dd) =>
   this.setState({ isModalVisible: !this.state.isModalVisible,img_name:dd.img_name,folderName:dd.folderName });

   setModalVisible(visible,dd) {
       this.setState({person_id:dd.person_id,modalVisible: visible,source:this.props.image_data.uri,img_name:dd.img_name,folderName:dd.folderName,score:dd.score});
     }

     closeModal = () => {
         this.setState({modalVisible: false})
     }

     toggle1() {
       this.setState({
         iscomment: !this.state.iscomment,
       })
     }

     _renderdata(){
       //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
       if(this.state.iscomment==true){
     return <View>{(this.state.detectResponse.data[0].detect_comments.length>0)?<View style={{borderColor:'#000',borderWidth:1}}>
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
           {(this.state.detectResponse.data[0].detect_comments.length>0)?this.state.detectResponse.data[0].detect_comments.map((i,index)=>{return <View horizontal={true} key={index} style={{borderBottomColor:'#000',borderBottomWidth:1,flexDirection:'row'}}>
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

     showMore(){
       this.setState({isShowMore:true});
     }

     setDocumentVisible(visible,dd) {
       console.log(dd,'dd doc');
         this.setState({documentVisible: visible ,name:dd.name});
       }

       closeDocument = () => {
           this.setState({documentVisible: false})
       }

  render(){
    debugger;

    if(this.state.image_name!=''){
      for (let i= 0 ;i<this.state.image_name.response.length;i++){
        var str_ele =this.state.image_name.response[i].image;
       var arra_ele =str_ele.split('/');
       var img_name =arra_ele.slice(-1).pop();
       var person_id=this.state.image_name.response[i].personSeqNumber;

       var dd = {img_name:img_name,person_id:person_id,score:this.state.image_name.response[i].score,folderName:this.state.image_name.response[i].folderName};
      img.push(dd);

  }
      var result = img.reduce((unique, o) => {
          if(!unique.some(obj => obj.person_id === o.person_id )) {
            unique.push(o);
          }
          return unique;
      },[]);
      var uniqueArray = result;

       uniqueArray.sort(function (a, b) {

        return b.score - a.score;
      });


    sssd = uniqueArray;
    }

    var menu = <Menu navigator = { this.props.navigator }/>
    console.log(this.state.detectResponse,'his.state.detectResponse');

    return (
      <SideMenu
          menu={menu}
          openMenuOffset={width/1.5}
          isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <FRStatusBar/>
        <HeaderBar  toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} backText={'Back'} back = {this.back.bind(this)}/>
        <Image source={require('../../images/background_dashboard.jpg')} style={{height:height,width:width,flex:1}} >
          <OfflineNotice/>
        <View style={{height:50,flexDirection:'row',backgroundColor:'#fff'}}>
          <View style={{flex:0.6,justifyContent:'center'}}>
            <Text style={{marginLeft:10,color:'#374176',fontSize:height/40}}> Detect </Text>
          </View>
          <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

          </View>
        </View>



      <ScrollView style={{marginTop:verticalScale(8),paddingLeft:15,paddingRight:15}}>

        <LabelSelect
        TitleText='Person Type'
        title="Person Type"
        ref="select"
        titleTextStyle={{color:'#fff',paddingRight:20}}
        style={[styles.labelSelect,{}]}
        onConfirm={this.selectConfirm}
      >
        {this.state.case_category.filter(item => item.isSelected).map((item, index) =>
          <LabelSelect.Label
            key={'label-' + index}
            data={item}
            onCancel={() => {this.deleteItem(item);}}
          >{item.label}</LabelSelect.Label>
        )}
        {this.state.case_category.filter(item => !item.isSelected).map((item, index) =>
          <LabelSelect.ModalItem
            key={'modal-item-' + index}
            data={item}
          >{item.label}</LabelSelect.ModalItem>
        )}
      </LabelSelect>



        <View style={{flex:1,marginTop:verticalScale(8)}}>

        <View style={{borderColor:'#ccc',height:40,borderWidth:1,flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity style={{flex:0.8,flexDirection:'row',alignItems:'center', justifyContent:'center'}} onPress={this.selectPhotoTapped}>
                  <View style={{flex:0.8}}>{ this.state.avatarSource === null ? <View style={{ paddingLeft:20,height:40,borderColor:'#000',flexDirection:'row',alignItems:'center'}}><Text style={{color:'#fff'}}>Take Photo</Text></View> :
                  <Text style={{paddingLeft:20,color:'#fff',fontSize:10}}>{this.state.image}</Text>
                }
                </View>
                <View style={{backgroundColor:'#fff',height:40,flex:0.2,alignItems:'center',justifyContent:'center'}}>
                  <Image source={require('../../images/FR-TSP-Camera-icon-Red.png')} style={{height:22,width:25}}/>
                </View>
          </TouchableOpacity>


          <Image source={{uri:this.state.image}} />

          </View>

        </View>
        {(this.state.detectResponse!='')?<View><View style={{paddingBottom:15,width:width/1.1,backgroundColor:'#ebebeb',marginTop:20}}>
          <View style={{paddingLeft:scale(8),marginRight:10}}>
          <View style={{marginTop:15,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <View style={{flex:0.4}}>
              <Text style={{paddingBottom:5,fontSize:12,color:'#2d3878', fontWeight:'600'}}>Subject Image</Text>
              <View style={{alignItems:'center',justifyContent:'center'}}>
              <ZoomImage
              duration={200}
              imgStyle={{height:150,width:140}}
              moveCapture={true}
              resizeMode={'stretch'}
              enableScaling={false}
              easingFunc={Easing.ease}
              source={{uri:this.props.image_data.uri}}
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
              source={{uri:(this.state.isImageChanged==false)?(sssd.length>0)?SERVICE_URL+`enrolled_images/`+sssd[0].folderName+'/'+sssd[0].img_name:null:SERVICE_URL+`enrolled_images/`+this.state.folderName+'/'+this.state.img_name}}
              style={{height:150,width:140}}/>

              </View>
            </View>
          </View>
          </View>
          </View>
          <View style={{alignItems:'center'}}>
            <View style={{alignItems:'center',flexDirection:'row',flexWrap:'wrap'}}>
            {sssd.length>0?sssd.map((i,index) => {return (<TouchableOpacity  onPress={() => {this.setModalVisible(true,i)}} style={{alignItems:'center'}} key={index}>{(this.state.isShowMore==false?index<=5:index<=11)?<View style={{alignItems:'center',width:(width / 3.3) - 15,borderWidth:3,borderColor:this.state.pressed==i.person_id&&this.state.pressed1==true?"#f00":'#fff',marginLeft:10,marginTop:verticalScale(8)}} >
            <ScrollView>
            <Image
            resizeMode={'stretch'}
            source={{uri:SERVICE_URL+`enrolled_images/thumbs/`+i.folderName+'/'+i.img_name}}
            style={{height:80,width:80}}/>
              <View style={{height:30,alignItems:'center',justifyContent:'center'}}><Text onPress = {this.onPressImage.bind(this, i)} style={{color:'#fff',textAlign:'center',fontSize:15}}>Score:{i.score}</Text></View>
              </ScrollView>
            </View>:null}</TouchableOpacity>
          )}):null}
            </View>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flex:0.7}}/>
            {this.state.isShowMore==false && sssd.length > 6?<TouchableOpacity  onPress={this.showMore.bind(this)}   style={{flex:0.3,alignItems:'flex-end',marginTop:8,height:40}}>
                <Text style={{color:'#fff',padding:5,backgroundColor:'#ab8ce4'}}>Show More</Text>
            </TouchableOpacity>:null}
            </View>
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
          imgStyle={{borderWidth:1,borderColor:'#000', height: height/2}}
          moveCapture={true}
          resizeMode={'stretch'}
          enableScaling={false}
          easingFunc={Easing.ease}
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
          maxScale={100}><ZoomImage
        duration={200}
      resizeMode={'stretch'}
        imgStyle={{borderWidth:1,borderColor:'#000', height: height/2}}
        moveCapture={true}
        enableScaling={false}
        easingFunc={Easing.ease}
              source={{uri:SERVICE_URL+`enrolled_images/`+this.state.folderName+'/'+this.state.img_name}} style={{ borderWidth:1,borderColor:'#000',height: height/2}} />
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

        </Modal ></View>:null}

        {(this.state.detectResponse!='')?this.state.detectResponse.data.map((data,index) => {return <View key={index}><View style={{alignItems:'center'}}>

          <View style={{padding:15,width:width/1.1,backgroundColor:'#f3f3f3'}}>
          {this.state.detectResponse.data.length>1?<Text style={{textAlign:'center',fontSize:moderateScale(14,0.5),color:'#000',marginBottom:3,borderBottomColor:'#000',borderBottomWidth:1,fontWeight:'600'}}>Enrollment {index+1}</Text>:null}
          <View style={{paddingLeft:scale(10),paddingRight:scale(10)}}>
          <View style={{marginLeft:-scale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Profile ID:{data.id}</Text>
          </View>
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>File Source : </Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.file_source}</Text>
          </View>
          </View >
          <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Person Type :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{(data.case_types=='CIC Suspects' || data.case_types=='SIB Suspects')?data.case_types.substring(0, data.case_types.length-1):data.case_types}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Person Category :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.case_category_types}</Text>
            </View>
            </View>
            {data.case_types=='CIC Suspects' || data.case_types=='SIB Suspects'?<View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Organization :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.organization}</Text>
              </View>
              </View>:null}
            <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
              <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#fff',fontWeight:'600'}}>Person Details:</Text>
            </View>
            <View style={{paddingLeft:scale(8)}}>
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Name :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.name}</Text>
          </View>
          </View >
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Alias Name : </Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.alias_name}</Text>
          </View>


          </View >
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Age(Years) :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.age}</Text>
          </View>
          </View >
          <View style={{flexDirection:'row'}}>
            <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Gender:</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.gender}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>DOB :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{(data.dob=='00-00-0000' || data.dob=='0000-00-00'|| data.dob=='01-01-1970'|| data.dob== '1-1-1970') ?null:data.dob}</Text>
          </View>


          </View >
          <View style={{ flexDirection:'row', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Known Languages :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.known_languages}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Nationality :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.nationality}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>State :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.state}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Guardian Type :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.guardian_type}</Text>
            </View>
          </View>
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Guardian Name :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.guardian_name}</Text>
          </View>
          </View>
            <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
            <View style={{flex:0.5, borderRightColor:'#ccc'}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Address :</Text>
            </View>
            <View style={{flex:0.5}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.address}</Text>
            </View>
          </View >
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
            <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Aadhar Number :</Text>
            </View>
            <View style={{flex:0.5}}>
            <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.aadhar_num}</Text>
            </View>
          </View >
          </View>
          <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Descriptive Roll (D.R):</Text>
          </View>
          <View style={{paddingLeft:scale(8)}}>
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Height(Foot & Inches) :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          {data.height==null?null:<Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.height}{"\'"} {data.inch}{'\"'}</Text>}
          </View>
          </View >
          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
          <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Colour :</Text>
          </View>
          <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.color}</Text>
          </View>

          </View >

          <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
            <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Identification Marks :</Text>
            </View>
            <View style={{flex:0.5,justifyContent:'center'}}>
              <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.identification_marks}</Text>
            </View>
            </View >
            </View>
            {data.case_types=='Rohingyas'?<View>
            <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
              <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Identification Numbers:</Text>
            </View>
            <View style={{paddingLeft:scale(8)}}>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Individual Number :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.individual_no}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>UNHCR Number :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.unhcr_no}</Text>
              </View>
            </View>
            </View>
            </View>:null}
            {data.case_types=='Foreigners-Overstay'?<View>
            <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
              <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Passport Details:</Text>
            </View>
            <View style={{paddingLeft:scale(8)}}>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Number :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_no}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Issue Date :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_issue_date}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Expiry Date :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_expiry_date}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>Passport Issue Place :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.passport_issue_place}</Text>
              </View>
            </View>
            </View>
            <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
              <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>VISA Details:</Text>
            </View>
            <View style={{paddingLeft:8}}>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Number :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_no}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Issue Date :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_issue_date}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', borderColor:'#ccc'}}>
              <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>VISA Expiry Date :</Text>
              </View>
              <View style={{flex:0.5}}>
                <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:3,fontWeight:'600'}}>{data.visa_expiry_date}</Text>
              </View>
            </View>

            </View>
            </View>:null}


          <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Crime Details:</Text>
          </View>

          {data.crime_details.map((rowData,index) =>{return <View key={index}>
                  <Text style={{fontSize:moderateScale(14,0.5),color:'#000',fontWeight:'600',borderBottomColor:'#000',paddingBottom:5}}>Crime {index+1}:</Text>
                    <View style={{paddingLeft:scale(8)}}>
                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>FIR Number :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.fir_no}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>FIR DATE :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.fir_date}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>State :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Telangana</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>District :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.districtname}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>PS Name :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.ps_name}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Section :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.section}</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Act :</Text>
                      </View>
                      <View style={{flex:0.5}}>
                        <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{rowData.act}</Text>
                      </View>
                    </View>
                  </View>
                  </View>
                })}
                <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Attachments :</Text>
                </View>
                <ScrollView  style={{marginTop:verticalScale(8)}} horizontal={true}>
                {data.person_idproofs.length>0?data.person_idproofs.map((i, index)=>{ return <TouchableOpacity style={{marginLeft:3}} onPress={() => {this.setDocumentVisible(true,i),this.setState({folder:data.folder})}} key ={index}><Image
                style={{height:80,width:80}}
                 source={{uri: SERVICE_URL+`id_proofs/thumbs/${data.folder}/${i.name}`}} /></TouchableOpacity> })
                :null}
                </ScrollView>
                <View>
                <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Comments During Enrollment:</Text>
                </View>
                <View style={{paddingLeft:scale(8)}}>
                <View style={{flexDirection:'row',marginBottom:20}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Comment :</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.comments}</Text>
                  </View>
                </View>
                </View>
                </View>

                {(data.case_types== 'Person Found')?<View><View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                  <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),borderBottomColor:'#000',fontWeight:'600'}}>Rescue Home/CCI Details:</Text>
                </View>
                <View style={{paddingLeft:scale(8)}}>
                <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Name of Rescue Home :</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.name_of_home}</Text>
                  </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent:'center',alignItems:'center', borderBottomColor:'#dedede'}}>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Name of CCI :</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.cci_name}</Text>
                  </View>
                </View></View></View>:null}
                <View style={{height:1,borderColor:'#000',borderWidth:1}}/>
                <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
                  <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Enrolled On :</Text>
                  </View>
                  <View style={{flex:0.5,justifyContent:'center'}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.created_at}</Text>
                  </View>
                </View >
                <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                    <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),fontWeight:'600'}}>Enrolled At:</Text>
                </View>
                <View style={{ flexDirection:'row', borderColor:'#ccc'}}>
                  <View style={{flex:0.5,justifyContent:'center', borderRightColor:'#ccc'}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Enrolled At :</Text>
                  </View>
                  <View style={{flex:0.5,justifyContent:'center'}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_at}</Text>
                  </View>
                </View >
                <View style={{marginLeft:-scale(8),marginTop:verticalScale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
                    <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:verticalScale(3),fontWeight:'600'}}>Enrolled By:</Text>
                </View>
                <View style={{paddingLeft:scale(8)}}>
                <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Name:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_by}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Rank:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_role}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>PS:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_ps}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                  <View style={{flex:0.5}}>
                      <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Unit:</Text>
                  </View>
                  <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_district}</Text>
                  </View>
                </View>


              <View style={{flexDirection:'row',borderBottomColor:'#000'}}>
                <View style={{flex:0.5}}>
                    <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>Mobile:</Text>
                </View>
                <View style={{flex:0.5}}>
                  <Text style={{fontSize:moderateScale(12,0.5),color:'#000',paddingBottom:verticalScale(3),fontWeight:'600'}}>{data.enrolled_user_no}</Text>
                </View>
              </View>
            </View>


          {/*<TouchableOpacity onPress={this.onPressDetectList.bind(this)} style={{marginTop:20,justifyContent:'center',width:120,height:30,borderWidth:1,borderColor:'#e3231e'}}>
            <Text style={{textAlign:'center',color:'#e3231e'}}>View Details</Text>
          </TouchableOpacity>*/}
          </View></View></View></View>}):<View>{(this.state.empty_data!=''&&this.state.person_case_category.length>0)?<Text style={{marginTop:15,color:'#fff'}}>No Person Matched, Please Search In Other Case</Text>:(this.state.empty_data!='')?<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={this.onPressEnrolForm.bind(this)} style={{marginTop:20,justifyContent:'center',width:120,height:30,borderWidth:1,borderColor:'#e3231e'}}>
            <Text style={{textAlign:'center',color:'#e3231e'}}>Enroll Person</Text>
          </TouchableOpacity>
        </View>:null}
          </View>}
          {this.state.detectResponse!=''?<View style={{alignItems:'center'}}  >
          <View style={{padding:15,marginBottom:20,width:width/1.1,backgroundColor:'#f3f3f3'}}>
        <TouchableOpacity onPress={this.toggle1.bind(this)} style={{marginBottom:10,marginLeft:-scale(8),justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start',flexDirection:'row'}}>
          <View style={{flex:0.7,justifyContent:'center'}}>
            <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',borderBottomColor:'#000',fontWeight:'600'}}>Comments During Detect:</Text>
            </View>
            <View style={{flex:0.3,alignItems:'flex-end'}}>
            {(this.state.iscomment==true)?<Image source={require("../../images/list_minus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />:<Image source={require("../../images/FR-TSP-Logo-plus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />}
            </View>
          </TouchableOpacity>
          {this._renderdata()}
          <Text style={{fontSize:moderateScale(10,0.5),color:'#000'}}>Please Click on Any Button</Text>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity  onPress={this.onPressComment.bind(this)} style={{marginTop:20,backgroundColor:'#089680',justifyContent:'center',flex:0.5,height:50,borderWidth:1,borderColor:'#089680'}}>
          <Text style={{textAlign:'center',fontSize:moderateScale(14,0.5),color:'#fff'}}>Detected</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={this.onPressNotCommentSubmit.bind(this)} style={{marginTop:20,backgroundColor:'#089680',justifyContent:'center',flex:0.5,marginLeft:8,height:50,borderWidth:1,borderColor:'#089680'}}>
          <Text style={{textAlign:'center',fontSize:moderateScale(14,0.5),color:'#fff'}}>Not Detected</Text>
        </TouchableOpacity>
        </View></View></View>:null}
          </ScrollView>
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
          maxScale={100}>
              <Image
              duration={10}
              imgStyle={{height:height/1.1,width:width}}
              moveCapture={true}
              enableScaling={false}
              resizeMode='contain'
              easingFunc={Easing.ease}
              source={{uri:SERVICE_URL+`id_proofs/`+this.state.folder+'/'+this.state.name}}
              style={{height:height/1.1,width:width}}/>
          </ViewTransformer>
          </Modal>
          <Prompt
            title="Comment"
            placeholder="Enter Comment"
            textInputProps ={ {height:60}}
            multiline={true}
            visible={this.state.promptVisible}
            onCancel={() => this.setState({ promptVisible: false, comment_value:false})}
            onChangeText ={(value)=>this.setState({comment_value:true, comment: `${value}` })}
            onSubmit={(value) => this.setState({ promptVisible: false, comment_value:true},this.onPressCommentSubmit())}/>
          </Image>
          <BusyIndicator />
          <Footer style={{height:40,backgroundColor:'#fff'}}>
          <BottomBar navigator = { this.props.navigator } disableDetect={true} detectStyle={{justifyContent:'flex-end',backgroundColor:'#dedede'}} enrollStyle={{justifyContent:'flex-end'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
          </Footer>
          </SideMenu>
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
      fontWeight:'300'
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderBottomWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:80,
      marginRight:80
    },
    avatar: {
      borderRadius:( height/3)/2,
      width: height/3,
      height: height/3
    },
    image: {
    width: 24,
    height: 24,
   },
  });

    const mapStateToProps = (state) => {
      debugger;
    return {
      isDetected:faceSelectors.isOnlyUserDetected(state),
      detect_responce:faceSelectors.getDetectOnlyResponse(state),
      OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
      image_data:faceSelectors.getImageResponse(state),
      isImageDetected:faceSelectors.isImageDetected(state),
      detectImage:faceSelectors.getDetectImageResponse(state),
      case_type_person:faceSelectors.getCaseTypesResponse(state),
      individualList: faceSelectors.getIndividualListFaceView(state),
      isIndividual:faceSelectors.isIndividual(state),
    };
  }

  export default connect(mapStateToProps)(FaceRecognition);
