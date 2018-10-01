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
  Dimensions,
  ScrollView,
  NativeModules
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
  Right,
  Thumbnail
 } from 'native-base';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = NativeModules.ImageCropPicker;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import DetectedView from './DetectedView';
import EnrollmentForm from './EnrollmentForm';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import FaceRecognition from './FaceRecognition';
import OfflineNotice from './OfflineNotice';
import PopoverTooltip from 'react-native-popover-tooltip';


import DashBoard from './DashBoard';



import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import AlertBox from '../../Core/AlertBox';
import * as faceActions from '../../store/face/actions';
import * as dropdownActions from '../../store/dropdown/actions';
import * as faceSelectors from '../../store/face/reducer';
import PopupDialog, { DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
import LabelSelect from '../react-native-label-select';

export class EnrolFaceDetection extends Component {
  constructor(props) {
        debugger;
        super(props);
        this.state={
          photo:null,
          isOpen:false,
          c_photo:null,
          gps: false,
          latitude: null,
          longitude: null,
          error: null,
          case_category : [],
          person_case_category:[],
          person_single:'',
          response_data:{}
        }
      }


      onPressDetect() {
        //this.props.dispatch(faceActions.setEmpty({}));
        this.props.navigator.resetTo({
            component: FaceRecognition,
            name: 'face-recognition'
        });

      }

componentDidMount(){
  let ts;
  var dds =[];
  this.selectConfirm = this.selectConfirm.bind(this);
this.deleteItem = this.deleteItem.bind(this);
this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
 //console.log(this.props.case_type_person.data,'ddid');
  if(this.props.case_type_person.data!=undefined){
  for(let i=0 ; i<this.props.case_type_person.data.length ; i++){
    let t = this.props.case_type_person.data[i].title;
    let s = this.props.case_type_person.data[i].id;
    let n = this.props.case_type_person.data[i].name
      if(s!=7){
      ts =  {'label':t, 'isSelected':false,'name':n, 'value':s};
    dds.push(ts);
  }
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
}
      onPressDashboard() {
        //this.props.dispatch(faceActions.setEmpty({}));
        this.props.navigator.push({
            component: DashBoard,
            name: 'dash-board'
        });

      }


      selectConfirm(list) {

          let {case_category} = this.state;
          var dd= this.state.person_case_category  || [];
          for (let item of list) {
            let index = case_category.findIndex(ele => ele === item);
            //console.log(index,'index');
            if (~index) case_category[index].isSelected = true;
            //console.log(if(~index) case_category[index].isSelected = true);
            if(case_category[index].isSelected == true){
              dd.push(case_category[index])
            }
            else continue;
            this.setState({person_case_category:dd});

          }
          if(this.state.avatarSource!=null){
          this.onPressSubmit();
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
            if(this.state.avatarSource!=null){
            this.onPressSubmit();
          }
            //console.log(this.state.person_case_category);
          //lothis.setState({person_case_category:case_category});
        }



        _getOraganization(){

          var oraganization_picker = [];
          //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
             oraganization_picker.push(<Picker.Item key='' label ='Please Select  Person Type' value =''/>);
              if(this.props.case_type_person.data!=undefined){
              for(let i=0 ; i<this.props.case_type_person.data.length ; i++){

                t = this.props.case_type_person.data[i].title;
                s = this.props.case_type_person.data[i].id;
                if(s!=7){
                oraganization_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
              }
            }
          }

            return(
              ( oraganization_picker.length>0)?
              <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc',color:'#fff'}}
                selectedValue={this.state.person_single}
                onValueChange={(person_single) => ( this.setState({person_single:person_single}))} >


                  {oraganization_picker}

           </Picker>:  <View/>
            )

        }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        })
      }

      updateMenuState(isOpen) {
        this.setState({ isOpen });
      }

    selectPhotoTapped() {
      //AlertBox('hello')
      this.setState({c_photo:null});
      this.popupDialog.dismiss()
      ImagePicker.openPicker({
        multiple: true,
        waitAnimationEnd: false,
        includeExif: true,
        cropping: true,
        includeBase64:true,
        compressImageMaxWidth:500,
        compressImageMaxHeight:500
      }).then(photo => {
        this.setState({
          photo: photo.map(i => {
            console.log('received image', i);
            return {uri: i.path, data:i.data,width: i.width, height: i.height, mime: i.mime};
          })
        })

      }).catch(e => alert(e));

          }


      onPressSubmit(){
        debugger;
        var db_ccategory = [this.state.person_single];
        console.log(db_ccategory,'db_ccategory');
          let length = this.props.case_type_person.data.length;
        for(let i=0 ; i<length ; i++){
          let t = this.props.case_type_person.data[i].title;
          let s = this.props.case_type_person.data[i].id;
          let n = this.props.case_type_person.data[i].name

          if (db_ccategory.indexOf(s) >= 0) {
            let ssds= [];
             let ts =  {'label':t, 'isSelected':true,'name':n, 'value':s};
            console.log(ts,'ts if');
            ssds.push(ts);
            console.log(ssds,'ss');
            this.setState({person_case_category:ssds});
            console.log(this.state.person_case_category,'tthis.state.person_case_category');
          loaderHandler.showLoader('Loading...');
           if(ssds.length==0){
            AlertBox('Please Select  Person Type');
            loaderHandler.hideLoader();
          }else if( (this.state.c_photo || this.state.photo) == null){
            AlertBox('Please Upload Image');
              loaderHandler.hideLoader();
          }else{
            var img_n = [];
            console.log(this.state.c_photo,'this.state.photo');
            if(this.state.c_photo!=null){
              var dd = this.state.c_photo.uri.split('/');

              var ss = dd.slice(-1).pop();
              var type = 'image/jpeg';
              var uri=this.state.c_photo.uri;
              var tt = {uri:uri,type:type,name:ss};
              img_n.push (tt);
            }else{
            if(this.state.photo!=null){

            //for(let i=0 ; i<this.state.photo.length;i++){
            var dd = this.state.photo[0].uri.split('/');

            var ss = dd.slice(-1).pop();
            var type = 'image/jpeg';
            var uri=this.state.photo[0].uri;
            var tt = {uri:uri,type:type,name:ss};
            img_n.push (tt);
          //}
        }
      }
            var image_data=(this.state.photo==null)?img_n:this.state.photo;
            console.log(image_data,'image_data');
            this.props.dispatch(faceActions.setEmpty({}));
            this.props.dispatch(faceActions.setImageData(image_data:image_data));
            var dd=[];
            for(let i=0 ;i<ssds.length;i++){
              var label=ssds[i].label;
              dd.push(label);
            }
            var params= dd;
            this.props.dispatch(faceActions.setPersonType(params:params));
            var params = {
              case_type_id:ssds[0].value
            }
            console.log(params,'params');
            this.props.dispatch(faceActions.caseCategory({params:params}));
            var params = {
              case_id:ssds[0].value
            }
            this.props.dispatch(dropdownActions.oraganization({params:params}));
            // var detect_data = {
            //     uri:this.state.response_data.uri,
            //     type:'image/jpeg',
            //     Filename:this.state.response_data.fileName
            //   };
              var ss =[];
            for(let i=0; i<ssds.length;i++){
              var t = ssds[i].name;
              ss.push(t);
            }

            var params={
              image:tt,
              folderNames:ss.join(','),
            }
            console.log(params,'params');
            this.props.dispatch(faceActions.setEmpty({}));
          this.props.dispatch(faceActions.detectUser({params:params}));
        }

          }

        }


    }
selectSinglePhoto(cropping){
  this.popupDialog.dismiss();
  this.setState({c_photo:null,photo:null});
    ImagePicker.openCamera({
      cropping: cropping,
      compressImageMaxWidth:500,
      compressImageMaxHeight:500,
      includeExif: true,
      includeBase64:true,
    }).then(c_photo => {

      this.setState({
        c_photo: {uri: c_photo.path,data:c_photo.data, width: c_photo.width, height: c_photo.height,mime:c_photo.mime}

      });
      console.log(c_photo,'c_photo');
    }).catch(e => alert(e));
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
      //console.log(data,'result');
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
    //console.log(folder,'folder');
    //console.log(match_id,'match_id');

    //return ;

    var dd_folder = (nextProps.detect_responce.response.code!=100)?folder.slice(0, 6):null;
    var dd_mathch = (nextProps.detect_responce.response.code!=100)?match_id.slice(0, 6):null;
      var dd_score = (nextProps.detect_responce.response.code!=100)?score_data.slice(0, 6):null;
    //console.log(this.state.photo[0],'this.state.photo[0]');
    var params ={
      isDetected:nextProps.isDetected,
      login_user_id:nextProps.OTPVerificationResponse.data.id,
      image_name:this.state.photo!=null?this.state.photo[0].data:this.state.c_photo.data,
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
    var params=  nextProps.detect_responce.response;
    nextProps.dispatch(faceActions.setDetect(params:params));



  }

    componentWillReceiveProps(nextProps) {
      if(nextProps.isDetected == true){
        if(nextProps.detect_responce.response.code == 100){
          var params={
            id:nextProps.OTPVerificationResponse.data.id
          }
            this.onPressSaveDetect(nextProps);
            this.props.dispatch(faceActions.setEmpty({}));
            this.props.navigator.push({
            component:EnrollmentForm,
            name:'enrollment-form'
          });
          loaderHandler.hideLoader('Loading...');
        } else {
          this.props.dispatch(faceActions.setEmpty({}));
          this.onPressSaveDetect(nextProps);

          this.props.navigator.push({
            component:DetectedView,
            name:'detected-view'
          });
          //loaderHandler.hideLoader('Loading...');
          //console.log(nextProps.detect_responce.response.response[0].image,'dd');
          //AlertBox('This Record is Already Updated in Our Database ');
        }
        //console.log(nextProps.detect_responce,'detect_responce');
      }

    }

    renderImage(image) {
      //console.log(this.state.photo.length,'this.state.photo.length');
        return <Image style={{borderRadius:100,width:200,height:200}} source={image } />
      }

      renderAsset(image) {
    return this.renderImage(image)
  }

    back(){
      this.props.navigator.push({
        component:DashBoard,
        name:'dash-board'
      })
    }

    render(){

      var menu = <Menu navigator = { this.props.navigator }/>
      var pp = this.state.photo?this.state.photo.slice(1):null;
      return(
        <SideMenu
          menu={menu}
          openMenuOffset={width/1.5}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenuState(isOpen)}>
          <FRStatusBar/>
        <HeaderBar toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
        <Image source={require('../../images/FR-APP-Loading_BG.jpg')} style={styles.imageBackground}>
        <OfflineNotice/>

        <View style={{height:50,flexDirection:'row',backgroundColor:'#fff'}}>
          <View style={{flex:0.5,justifyContent:'center'}}>
            <Text style={{paddingLeft:15,color:'#61659D',fontSize:height/40}}> Enrollment</Text>
          </View>
          <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>

          </View>
        </View>
        <ScrollView style={{flex:1,marginTop:15,paddingLeft:15,paddingRight:15}}>
        <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,justifyContent:'center',height:40,borderWidth:1,borderColor:'#ccc'}}>
        {this._getOraganization()}
      </View>
        {/*<LabelSelect
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
      </LabelSelect>*/}
        <View  style={{flex:1,paddingBottom:height/2,marginTop:10, alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={() => {
        this.popupDialog.show();
      }}>
      <View style={[styles.avatar, styles.avatarContainer, {marginTop: 5,alignItems:'center',justifyContent:'center'}]}>
          { (this.state.photo || this.state.c_photo) == null? <View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../images/FR-TSP-Select-Photo_icon.png')} style={{height:60,width:60}}/><Text style={{marginTop:20,textAlign:'center',color:'#636363'}}>Select Photo ..</Text></View> :<ScrollView scrollEnabled = {true} horizontal={true}>
          {this.state.c_photo != null?<View><Image style={{borderRadius:100,width:200,height:200}} resizeMode={'contain'} source={{uri:this.state.c_photo.uri}} /></View>:null}
          {this.state.photo ?this.state.photo.map(i => <View  key={i.uri }>{this.renderAsset(i)}</View>): null}

        </ScrollView >}
      </View>
          </TouchableOpacity>
          <ScrollView style={{marginTop:5}} horizontal={true}>

          {this.state.photo ?pp.map(i => <View  key={i.uri } style={{paddingLeft:10}}><Image style={{width:80,height:80}} source={i } /></View>): null}
          </ScrollView>
          <PopupDialog
          width={0.75}
          containerStyle={{justifyContent:'center',alignItems:'center'}}
          overlayBackgroundColor="transparent"
          overlayPointerEvents="auto"
          dialogStyle={{justifyContent:'center'}}
          height={0.3}
      ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      dialogTitle={<DialogTitle title="Select a Photo" />}

    >

      <Text style={{fontSize:20,paddingLeft:10,paddingVertical:8}} onPress={() => this.selectSinglePhoto(false)}>Take Photo....</Text>
      <Text style={{fontSize:20,paddingLeft:10,paddingVertical:8}} onPress={this.selectPhotoTapped.bind(this)}>Choose from Library...</Text>
      <Text style={{textAlign:'center',fontSize:20,color:'#3E47A6',paddingVertical:8,borderTopWidth:1,backgroundColor:'#ccc'}}  onPress={() => {
        this.popupDialog.dismiss();
      }}>Cancel</Text>
    </PopupDialog>

        {/*<View >
        <PopoverTooltip
          ref='tooltip1'
          buttonComponent={


                <View style={[styles.avatar, styles.avatarContainer, {marginTop: 20,alignItems:'center',justifyContent:'center'}]}>
                    { (this.state.photo || this.state.c_photo) == null? <View style={{alignItems:'center',justifyContent:'center'}}><Image source={require('../../images/FR-TSP-Select-Photo_icon.png')} style={{height:60,width:60}}/><Text style={{marginTop:20,textAlign:'center',color:'#636363'}}>Select Photo ..</Text></View> :<ScrollView scrollEnabled = {true} horizontal={true}>
                    {this.state.c_photo != null?<View><Image style={{borderRadius:100,width:200,height:200}} source={{uri:this.state.c_photo.uri}} /></View>:null}
                    {this.state.photo ?this.state.photo.map(i => <View  key={i.uri }>{this.renderAsset(i)}</View>): null}

                  </ScrollView >}
                </View>

          }
          items={[
            {
              label: 'Take Photo',
              onPress: (cropping) => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(c_photo => {

      this.setState({
        c_photo: {uri: c_photo.path, width: c_photo.width, height: c_photo.height, mime:c_photo.mime}

      });
    }).catch(e => alert(e));
  }
            },
            {
              label: 'Choose From Library',
              onPress: () => {ImagePicker.openPicker({
                multiple: true,
                waitAnimationEnd: false,
                includeExif: true,
              }).then(photo => {
                this.setState({
                  photo: photo.map(i => {
                    console.log('received image', i);
                    return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
                  })
                })

              }).catch(e => alert(e));}
            }
          ]}



          // animationType='timing'
          // using the default timing animation
          />
          </View>*/}

        <TouchableOpacity  onPress={this.onPressSubmit.bind(this)} style={[styles.buttonContainer]}>
            <Text style={styles.buttonText}>Search And Enroll </Text>
        </TouchableOpacity>
        </View>

        </ScrollView>
        </Image>
        <BusyIndicator/>
        <Footer style={{height:40,backgroundColor:'#fff'}}>
        <BottomBar navigator = { this.props.navigator }  disableEnroll={true} detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end',backgroundColor:'#dedede'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
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
    backgroundColor:'#fff',
    borderWidth: 1 / PixelRatio.get(),
    //justifyContent: 'center',
    alignItems: 'center',
    marginLeft:100,
    marginRight:100
  },
  avatar: {
    borderRadius: 100,
    width: 200,
    height: 200
  },
  buttonContainer:{
    backgroundColor:'#B2343F',
    width: width*0.8,
    paddingVertical:height/40,
    marginTop:10,
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
    empty:faceSelectors.getEmptyData(state),
    isDetected:faceSelectors.isUserDetected(state),
    case_type_person:faceSelectors.getCaseTypesResponse(state),
    detect_responce:faceSelectors.getDetectResponse(state),
    OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
  };
}

export default connect(mapStateToProps)(EnrolFaceDetection);
