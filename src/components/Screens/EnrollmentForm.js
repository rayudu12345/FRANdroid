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
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  NativeModules,

} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Picker,
  FooterTab,
  Form, Item, Input,
  Label,
  Radio,
  ListItem,
  List,
  Button,
  Right
 } from 'native-base';

var ImagePicker = NativeModules.ImageCropPicker;
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import ListEnrollment from './ListEnrollment';
import ProfileData from './ProfileData';
import LabelSelect from '../react-native-label-select';
import * as formValidator from '../../Util';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import DatePicker from 'react-native-datepicker';
import OfflineNotice from './OfflineNotice';
import RadioForm,
        {RadioButton,
         RadioButtonInput,
         RadioButtonLabel} from 'react-native-simple-radio-button';

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownActions from '../../store/dropdown/actions';

import * as dropdownSelectors from '../../store/dropdown/reducer';

import AlertBox from '../../Core/AlertBox';

import * as ageCalculate from '../../Core';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';


let index=0;
let case_category = [
  {label:'Accused',value:1},
  {label:'Person Missing',value:2},
  {label:'Person Found',value:3},
  {label:'Dead Body',value:4},
  {label:'Victim',value:5},
  {label:'Others',value:6}];
let case_types = [
  {label: 'Chain Snatcher',value:1},
  {label: 'Gangster',value:2},
  {label: 'Hired Assasin',value:3},
  {label: 'Gambler',value:4},
  {label: 'Mafia',value:5},
  {label: 'Hawala Operator',value:6},
  {label: 'Kidnapper',value:7},
  {label: 'Radical',value:8}]

  var rescue_cci_selection = [
    {label: 'Rescue Home',  value: 'Rescue' },
    {label: 'CCI',  value: 'CCI' }
  ];

var j = 0;
var reg = /^([a-zA-Z0-9]){15,150}$/;
export class EnrollmentForm extends React.Component {
  constructor(props) {
        debugger;
        super(props);
        this.pressed = false;
        this.dashboard_pressed=false


      var crime = [];
      var rows = [index];


  for (var i = 0; i < crime.length; i++) {
    rows.push(i);
  }
  this.selectConfirm = this.selectConfirm.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.selectLanguage = this.selectLanguage.bind(this);
  this.deleteLanguage = this.deleteLanguage.bind(this);
  this.selectConfirmType = this.selectConfirmType.bind(this);
  this.deleteItemType = this.deleteItemType.bind(this);
  console.log(this.props.image_data,'this.props.image_dataenroll form');
  this.allowKeyboardTimeout = null;
  this.state = {
    case_category :[],
    nationalityData:['India','Myanmar ','Pakistan'],
    heightFit:['Foot',"1","2","3","4","5","6","7"],
    heightInch:['Inches','0','1','2','3','4','5','6','7','8','9','10','11'],
    case_types : [
      {label: 'Chain Snatcher', isSelected: false,value:1},
      {label: 'Gangster', isSelected: false,value:2},
      {label: 'Hired Assasin', isSelected: false,value:3},
      {label: 'Gambler', isSelected: false,value:4},
      {label: 'Mafia', isSelected: false,value:5},
      {label: 'Hawala Operator', isSelected: false,value:6},
      {label: 'Kidnapper', isSelected: false,value:7},
      {label: 'Radical', isSelected: false,value:8}],
      languages : [],
      rows: rows,
      crime:crime,
      isOpen:false,
    photo: this.props.image_data || '',
    rescue_cci_selection:'',
    single_category:'',
    rescue_cci_selectionIndex:'',
    person_case_type :[],
    person_case_category:[],
    fir_no:[],
    name:'',
    state:'',
    nationality:'',
    inch:'',
    oraganization:'',
    alias_name:'',
    allow_keyboard: true,
    allow_scroll_code: true,
    aadhar_num:'',
    dob:'',
    enrolled_at:'',
    passport_no:'',
    passport_issue_date:'',
    passport_issue_place:'',
    passport_expiry_date:'',
    visa_no:'',
    visa_issue_date:'',
    visa_expiry_date:'',
    unhcr_no:'',
    individual_no:'',
    dd_length:0,
    age:'',
    height:'',
    color:'',
    guardian_type:'',
    guardian_name:'',
    gender:'',
    identification_marks:'',
    address:'',
    rstate_id:'',
    rdistrict_id:'',
    rps_id:'',
    comments:'',
    rescue_id:'',
    cci_id:'',
    gps: false,
    latitude: null,
    longitude: null,
    error: null,
    identification_proofs: null,
    month:'',
    known_languages:[]

};
console.log(this.props.ditrictResponce,'ditrictResponce');
index = this.state.crime.length;
  }

  selectConfirm(list) {

    let {case_category} = this.state;
      var dd=this.state.person_case_type || [];
    for (let item of list) {
      let index = case_category.findIndex(ele => ele === item);
      console.log(index,'index');
      if (~index) case_category[index].isSelected = true;
      //console.log(if(~index) case_category[index].isSelected = true);
      if(case_category[index].isSelected == true){
        dd.push(case_category[index])
      }
      else continue;
      this.setState({person_case_type:dd});

    }


  }

    deleteItem(item) {
      let {case_category} = this.state;
      let index = case_category.findIndex(a => a === item);
      console.log(index,'delete index');
      case_category[index].isSelected = false;
      this.state.person_case_type.pop(case_category[index]);
        this.setState({case_category:case_category});
    }


    selectLanguage(list) {

        let {languages} = this.state;
        var dd1= this.state.known_languages || [];
        for (let item of list) {
          let index = languages.findIndex(ele => ele === item);
          console.log(index,'index');
          if (~index) languages[index].isSelected = true;
          //console.log(if(~index) case_category[index].isSelected = true);
          if(languages[index].isSelected == true){
            dd1.push(languages[index])
          }
          else continue;
          this.setState({known_languages:dd1});

        }


      }
      deleteLanguage(item) {
        console.log(item,'logog');
        let {languages} = this.state;

        let index = languages.findIndex(a => a === item);
        console.log(index,'index')
        languages[index].isSelected = false;
        // if(case_category[index].isSelected == false){
        //   dd.pop(case_category[index])
        // }
        this.state.known_languages.pop(languages[index]);
          this.setState({languages:languages});
          //console.log(this.state.person_case_category);
        //lothis.setState({person_case_category:case_category});
      }


    selectConfirmType(list) {

        let {case_types} = this.state;
          var dd= this.state.person_case_category || [];
        for (let item of list) {
          let index = case_types.findIndex(ele => ele === item);
          console.log(index,'index');
          if (~index) case_types[index].isSelected = true;
          //console.log(if(~index) case_category[index].isSelected = true);
          if(case_types[index].isSelected == true){
            dd.push(case_types[index])
          }
          else continue;
          this.setState({person_case_category:dd});

        }


      }
      onReset(){
        var len = this.state.known_languages.length
        var ddd = this.state.known_languages.slice(len)
        this.setState({
          crime:[],
          isOpen:false,
        photo:  '',
        comments:'',
        person_case_type :[],
        person_case_category:[],
        known_languages:[],
        fir_no:[],
        name:'',
        alias_name:'',
        aadhar_num:'',
        dob:'',
        dd_length:0,
        age:'',
        height:'',
        color:'',
        guardian_type:'',
        guardian_name:'',
        gender:'',
        identification_marks:'',
        address:'',
        gps: false,
        latitude: null,
        longitude: null,
        error: null,
        rstate_id:'',
        rdistrict_id:'',
        rps_id:'',
        rescue_id:'',
        cci_id:'',
        identification_proofs: null,
        month:''

        })
      }

      onCancel(){
        this.props.navigator.pop()
      }

      ageCalculateFunction(date){
    let year_diff = ageCalculate.datePickerValidation(date);
    let len       = year_diff.length;
    if(len>0){
      if(year_diff[0].flag==true){
        this.setState({
          age:year_diff[0].years>0?`${year_diff[0].years}`:`0`,
          month : year_diff[0].month
        }) //year_diff[0].years;
        //months = year_diff[0].month;
        console.log(year_diff[0],'year_diff[0] if');
        return date;
      }else{
        this.setState({
          age:year_diff[0].years>0?`${year_diff[0].years}`:`0`,
          month : year_diff[0].month
        })
         // age = year_diff[0].years;
         // months = year_diff[0].month;
         console.log(year_diff[0],'year_diff[0] else');
        return '';
      }
    }
  }


      deleteItemType(item) {

        let {case_types} = this.state;
        let index = case_types.findIndex(a => a === item);
        case_types[index].isSelected = false;
        // if(case_category[index].isSelected == false){
        //   dd.pop(case_category[index])
        // }
        this.state.person_case_category.pop(case_category[index]);
          this.setState({case_types:case_types});
          //console.log(this.state.person_case_category);
        //lothis.setState({person_case_category:case_category});
      }


  componentDidMount() {
      this.props.dispatch(faceActions.setEmpty({}));
    //console.log(this.props.personType,'personType');
    if(this.props.languages.languages!=undefined){
    let tl;
    var ddl =[];

    for(let i=0 ; i<this.props.languages.languages.length ; i++){

      let s = this.props.languages.languages[i].id;
      let n = this.props.languages.languages[i].name

      tl =  {'label':n, 'isSelected':false, 'value':s};
        ddl.push(tl);

  }
  this.setState({languages:ddl});
}
    if(this.props.case_type_person.data!=undefined){
    let ts;
    var ddds =[];
    //let db_ccategory       = this.props.personType.join();
    let db_ccategory       = this.props.personType;
    console.log(db_ccategory,'db_ccategory');
          //let db_ccategory_array =db_ccategory.split(',');
    //console.log(this.props.case_type_person,'this.props.case_type_person');
    let length = this.props.case_type_person.data.length;
    console.log(length,'length');
    for(let i=0 ; i<length ; i++){
      console.log(i+1, 'index count');
      let t = this.props.case_type_person.data[i].title;
      let s = this.props.case_type_person.data[i].id;
      let n = this.props.case_type_person.data[i].name
      let ss= [];
      if (db_ccategory.indexOf(t) >= 0) {
        ts =  {'label':t, 'isSelected':true,'name':n, 'value':s};
        //console.log(ts,'ts if');
        ss.push(ts);
        var result = ss.reduce((unique, o) => {
            if(!unique.some(obj => obj.value === o.value )) {
              unique.push(o);
            }
            return unique;
        },[]);

        this.setState({person_case_type:result});
      }else{
        if(s!=7){
          ts =  {'label':t, 'isSelected':false,'name':n, 'value':s};
          //console.log(ts,'ts');
        }
      }
      ddds.push(ts);
      var result1 = ddds.reduce((unique, o) => {
          if(!unique.some(obj => obj.value === o.value )) {
            unique.push(o);
          }
          return unique;
      },[]);

  }
  //console.log(result1,'result1');
  this.setState({case_category:result1});
}
console.log(this.props.oraganization,'this.props.oraganization');
if(this.props.case_category_person.data!=undefined){
  var ddc =[];
  let tc;
  for(let i=0 ; i<this.props.case_category_person.data.length ; i++){
    let t = this.props.case_category_person.data[i].title;
    let s = this.props.case_category_person.data[i].id;
      tc =  {'label':t, 'isSelected':false, 'value':s};


    ddc.push(tc);
}
  this.setState({case_types:ddc});
}
navigator.geolocation.getCurrentPosition(
      (position) => {
        //console.log("wokeeey");
        //console.log(position);
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

  componentWillMount() {
    //navigator.geolocation.clearWatch()
  }

  _addRow(){
     debugger;
     this.state.rows.push(index++)
     this.setState({ rows: this.state.rows })
   }

   _removeRow(){
     debugger;
     if(this.state.rows.length>1){
     this.state.rows.pop(--index)
     this.setState({ rows: this.state.rows });
   }
   }




  onPressSubmit() {

    //if(this.state.gps==true){
    var img_n = [];
    var photo_n = [];
    loaderHandler.showLoader('Load..');
    this.pressed = true;
    //console.log(this.state.person_case_type, 'person_case_type');
    var db_ccategory = [this.state.single_category];
    //console.log(db_ccategory,'db_ccategory');
      let length = this.props.case_category_person.data.length;
      for(let i=0 ; i<length ; i++){
        let t = this.props.case_category_person.data[i].title;
        let s = this.props.case_category_person.data[i].id;
        let n = this.props.case_category_person.data[i].name

        if (db_ccategory.indexOf(s) >= 0) {
          let ssds= [];
           let ts =  {'label':t, 'isSelected':true,'name':n, 'value':s};
          //console.log(ts,'ts if');
          this.state.person_case_category.push(ts);
          // console.log(ssds,'ss');
          // this.setState({person_case_category:ssds});

        }
      }



    if(this.state.identification_proofs!=null){

    for(let i=0 ; i<this.state.identification_proofs.length;i++){
    var dd = this.state.identification_proofs[i].uri.split('/');

    var ss = dd.slice(-1).pop();
    var type = this.state.identification_proofs[i].mime;
    var uri=this.state.identification_proofs[i].uri;
    var tt = {uri:uri,type:type,name:ss};
    img_n.push (tt);
  }
}
//console.log(this.state.photo,'this.state.photo');
if(this.state.photo.fileSize){
  var dd1 = this.state.photo.uri.split('/');
  var ss1 = dd1.slice(-1).pop();
  var type1 = 'image/jpeg';
  var uri1=this.state.photo.uri;
  var tt1 = {uri:uri1,type:type1,name:ss1};
  photo_n.push (tt1);
} else{
for(let i=0 ; i<this.state.photo.length;i++){
var dd1 = this.state.photo[i].uri.split('/');

var ss1 = dd1.slice(-1).pop();
var type1 = 'image/jpeg';
var uri1=this.state.photo[i].uri;
var tt1 = {uri:uri1,type:type1,name:ss1};
photo_n.push (tt1);
}
}
  console.log(img_n);
  var pcategory = [];
  pcategory.push(this.state.person_case_category[0]);
      if(this.state.photo==null){
        AlertBox('Please Insert Photo');
        loaderHandler.hideLoader();
      }else if(this.state.name==''){
        this.pressed = false;
        AlertBox('Name Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.age==''){
        this.pressed = false;
        AlertBox('Age Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.height=='' || this.state.height=='Foot'){
        this.pressed = false;
        AlertBox('Foot Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.inch==''|| this.state.inch=='Inches'){
        this.pressed = false;
        AlertBox('Inches Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.color==''){
        this.pressed = false;
        AlertBox('Please Enter Colour ');
        loaderHandler.hideLoader();
      } else if(this.state.known_languages.length==0){
        this.pressed = false;
        AlertBox('Please Select Atleast One Language');
        loaderHandler.hideLoader();
      }else if(this.state.single_category==''){
        this.pressed = false;
        AlertBox('Please Select Person Category');
        loaderHandler.hideLoader();

      }else if(this.props.personType.indexOf('Foreigners-Overstay') >= 0 && this.state.passport_no==''){
        this.pressed = false;
        AlertBox('Please Enter Passport Number');
        loaderHandler.hideLoader();
      }else if(this.props.personType.indexOf('CIC Suspects') >= 0  && this.state.oraganization==''){
        this.pressed = false;
        AlertBox('Please Select Organization');
        loaderHandler.hideLoader();
      }else if(this.props.personType.indexOf('Foreigners-Overstay') >= 0 && this.state.visa_no==''){
        this.pressed = false;
        AlertBox('Please Enter VISA Number');
        loaderHandler.hideLoader();
      }else if(formValidator.isEnrolled(this.state.enrolled_at) === false){
        this.pressed = false;
        AlertBox('Please Enter Atleast 15 Characters For Enrollment Place');
        loaderHandler.hideLoader();
      }else{
        var params ={
          photo:photo_n,
          name:this.state.name,
          alias_name:this.state.alias_name,
          aadhar_num:this.state.aadhar_num,
          dob:this.state.dob,
          age:this.state.age,
          height:this.state.height,
          color:this.state.color,
          comments:this.state.comments,
          state:this.state.state,
          nationality:this.state.nationality,
          guardian_type:this.state.guardian_type,
          guardian_name:this.state.guardian_name,
          gender:this.state.gender,
          identification_marks:this.state.identification_marks,
          address:this.state.address,
          rstate_id:this.state.rstate_id,
          rdistrict_id:this.state.rdistrict_id,
          rps_id:this.state.rps_id,
          passport_no:this.state.passport_no,
          passport_issue_date:this.state.passport_issue_date,
          passport_issue_place:this.state.passport_issue_place,
          passport_expiry_date:this.state.passport_expiry_date,
          visa_no:this.state.visa_no,
          visa_issue_date:this.state.visa_issue_date,
          visa_expiry_date:this.state.visa_expiry_date,
          unhcr_no:this.state.unhcr_no,
          individual_no:this.state.individual_no,
          rescue_id:this.state.rescue_id,
          cci_id:this.state.cci_id,
          oraganization:this.state.oraganization,
          enrolled_at:this.state.enrolled_at,
          known_languages:this.state.known_languages,
          person_case_type:this.state.person_case_type,
          person_case_category:pcategory,
          crime_details:this.state.crime,
          user_id:this.props.OTPVerificationResponse.data.id,
          latitude:this.state.latitude,
          inch:this.state.inch,
          longitude:this.state.longitude,
          identification_proofs:img_n
        }
        console.log(params,'params');

        this.props.dispatch(faceActions.setEmpty({}));
        this.props.dispatch(faceActions.enrolUser({params:params}));
      }


  }

  onPressSaveDetect(nextProps){
    var ss =[];
    j=0;
    this.setState({dd_length:nextProps.enrolResponse.pgi.length});
    for(let i=0; i<this.state.person_case_type.length;i++){
      var t = this.state.person_case_type[i].name;
      ss.push(t);
    }
    console.log(ss,'ss');
    for(let i=0;i<nextProps.enrolResponse.pgi.length ;i++){
      var img_name=nextProps.enrolResponse.pgi[i];
      if(this.state.photo.fileSize){
        var dd1 = this.state.photo.uri.split('/');
        var ss1 = dd1.slice(-1).pop();
        var type1 = this.state.photo.type;
        var uri1=this.state.photo.uri;
        var detect_data = {
            uri:uri1,
            type:type1,
            Filename:ss1
          };
      } else{
      var dd1 = this.state.photo[i].uri.split('/');

      var ss1 = dd1.slice(-1).pop();
      var detect_data = {
          uri:nextProps.image_data[i].uri,
          type:'image/jpeg',
          Filename:ss1
        };
      }
        var params={
          name:nextProps.enrolResponse.data.name,
          psqno:nextProps.enrolResponse.data.id,
          folderNames:ss.join(','),
          imageName:img_name,
          image:detect_data
        };
        console.log(params,'enrolsdk');
        this.props.dispatch(faceActions.setEmpty({}));
        nextProps.dispatch(faceActions.enrolSDKUser({params:params}));
    }
    //var img_name=nextProps.enrolResponse.data.squence_number
    // var detect_data = {
    //     uri:nextProps.image_data.uri,
    //     type:'image/jpeg',
    //     Filename:nextProps.image_data.fileName
    //   };
    // var params={
    //   name:nextProps.enrolResponse.data.name,
    //   psqno:nextProps.enrolResponse.data.id,
    //   imageName:img_name,
    //   image:detect_data
    // };
    // //console.log(params,'enrolsdk');
    // nextProps.dispatch(faceActions.enrolSDKUser({params:params}));

    //nextProps.dispatch(faceActions.setEmpty({}));

  }


  componentWillUpdate(nextProps) {

    if(nextProps.isEnroledin == true){
      console.log(nextProps.enrolResponse,'enrolResponse');

        this.onPressSaveDetect(nextProps);
    }else if(nextProps.isSDKEnroledin==true){
       j=j+1;

      console.log(nextProps.SDKEnrolResponse ,'ffff');
      console.log(this.state.dd_length +'___'+ j,'SDKEnrolResponse');
      if(this.state.dd_length == j){
      Alert.alert('Success','Person Data Saved Successfully ');

      this.props.navigator.resetTo({
        component:DashBoard,
        name:'dash-board'
      });
    }

    }


  }

  _handleKeyPress(e) {
     this.onPressSubmit();
   }

   back(){
     loaderHandler.hideLoader();
     this.props.navigator.pop()
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
                        //image:response.data,
                        photo:response.uri
                    });
                    var detect_data = {
                      uri:response.uri,
                      type:'image/jpeg',
                      Filename:response.fileName
                    };
                    var params={
                      image:detect_data
                    }
                    console.log(params,'params');
                  this.props.dispatch(faceActions.detectUser({params:params}));
                }
            });
        }


  //       onSelectedItemsChange =( person_case_category) => {
  //         //console.log('Selected Items: ', person_case_category);
  //   this.setState({ person_case_category});
  // };


  onValueChange = (key: string, value: string) => {
        debugger;
      const newState = {};
      newState[key] = value;
      this.setState(newState);
      }
      _inputChangeHandler(event) {
        debugger;
        //console.log(event);
        var crime = this.state.crime;
        crime[event.index] = {...crime[event.index], [event.element]:event.value};
        //console.log(crime);
        this.setState( {
            ...this.state,
            crime:crime
        });
        //console.log(this.state);
    }


    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }


    pickMultiple() {
        ImagePicker.openPicker({
          multiple: true,
          waitAnimationEnd: false,
          includeExif: true,
          cropping: true,
          compressImageMaxWidth:500,
          compressImageMaxHeight:500,
        }).then(identification_proofs => {
          this.setState({
            identification_proofs: identification_proofs.map(i => {
              console.log('received image', i);
              return {uri: i.path,response:i.response, width: i.width, height: i.height, mime: i.mime};
            })
          });
        }).catch(e => alert(e));
      }


    renderImage(image) {
        return <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={image} />
      }

      renderAsset(image) {

    return this.renderImage(image);
  }

  _submitDistrict(district_id){
    console.log(district_id,'district_id');
    var params={
      d_id:district_id
    }
    this.props.dispatch(dropdownActions.districtIdbasedPolice({params:params}));
    var params={
      district_id:district_id
    }

    this.props.dispatch(dropdownActions.getRecursiveHome({params:params}));
    this.props.dispatch(dropdownActions.getCCI({params:params}));
  }


  _getDistrict(){
    var disrict_picker = [];
    //console.log(this.props.allDistrict,'this.props.allDistrict');
       disrict_picker.push(<Picker.Item key='' label ='Please Select Disrict' value =''/>);
         if(this.props.ditrictResponce.data!=undefined){
        for(let i=0 ; i<this.props.ditrictResponce.data.length ; i++){

          t = this.props.ditrictResponce.data[i].name;
          s = this.props.ditrictResponce.data[i].district_cd;
          disrict_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }
    }

      return(
        ( disrict_picker.length>0)?
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.rdistrict_id}
          onValueChange={(rdistrict_id) => ( this.setState({rdistrict_id:rdistrict_id},this._submitPolice(rdistrict_id)))} >



            {disrict_picker}

     </Picker>:  <View/>
      )
  }
  _submitNation(nationality){
    console.log(nationality,'nationality');
    var params={
      nation_id:nationality
    }
    this.props.dispatch(dropdownActions.getEnrollState({params:params}));
  }

_getNationality(){
  var nationality = [];
  //console.log(this.props.allDistrict,'this.props.allDistrict');
     nationality.push(<Picker.Item key='' label ='Please Select Nationality' value =''/>);
       if(this.props.nations.nations!=undefined){
      for(let i=0 ; i<this.props.nations.nations.length ; i++){

        t = this.props.nations.nations[i].name;
        s = this.props.nations.nations[i].id;
        nationality.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }
  }

    return(
      ( nationality.length>0)?
      <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
      <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
        selectedValue={this.state.nationality}
        onValueChange={(nationality) => ( this.setState({nationality:nationality},this._submitNation(nationality)))} >



          {nationality}

   </Picker>
   </View>:  <View/>
    )
}

  _getEnrollState(){
    var enroll_state_picker = [];
    //console.log(this.props.allDistrict,'this.props.allDistrict');
       enroll_state_picker.push(<Picker.Item key='' label ='Please Select State' value =''/>);
         if(this.props.enroll_state.states!=undefined){
        for(let i=0 ; i<this.props.enroll_state.states.length ; i++){

          t = this.props.enroll_state.states[i].name;
          s = this.props.enroll_state.states[i].id;
          enroll_state_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }
    }

      return(
        ( enroll_state_picker.length>0)?
        <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.state}
          onValueChange={(state) => ( this.setState({state:state}))} >



            {enroll_state_picker}

     </Picker>
     </View>:  <View/>
      )
  }

  _submitPolice(district_id){
    console.log(district_id,'district_id');
    var params={
      d_id:district_id
    }
    this.props.dispatch(dropdownActions.districtIdbasedRecursivePolice({params:params}));
    var params={
      district_id:district_id
    }

    this.props.dispatch(dropdownActions.getRecueHome({params:params}));
    this.props.dispatch(dropdownActions.getRescueCCI({params:params}));
  }


_getRecursive(){

  var recursive_picker = [];
  //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
     recursive_picker.push(<Picker.Item key='' label ='Please Select Rescue Home' value =''/>);
      if(this.props.rescue_home.rhomes!=undefined){
      for(let i=0 ; i<this.props.rescue_home.rhomes.length ; i++){

        t = this.props.rescue_home.rhomes[i].name_of_home;
        s = this.props.rescue_home.rhomes[i].id;
        recursive_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }
  }

    return(
      ( recursive_picker.length>0)?
      <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
        selectedValue={this.state.rescue_id}
        onValueChange={(rescue_id) => ( this.setState({rescue_id:rescue_id}))} >


          {recursive_picker}

   </Picker>:  <View/>
    )

}

_getOrganization(){

  var oraganization_picker = [];
  //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
     oraganization_picker.push(<Picker.Item key='' label ='Please Select Organization' value =''/>);
      if(this.props.oraganization.data!=undefined){
      for(let i=0 ; i<this.props.oraganization.data.length ; i++){

        t = this.props.oraganization.data[i].title;
        s = this.props.oraganization.data[i].id;
        oraganization_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }
  }

    return(
      ( oraganization_picker.length>0)?
      <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
        selectedValue={this.state.oraganization}
        onValueChange={(oraganization) => ( this.setState({oraganization:oraganization}))} >


          {oraganization_picker}

   </Picker>:  <View/>
    )

}

_getCategory(){

  var category_picker = [];

  //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
     category_picker.push(<Picker.Item key='' label ='Please Select Person Category' value =''/>);
      if(this.props.case_category_person.data!=undefined){
      for(let i=0 ; i<this.props.case_category_person.data.length ; i++){

        t = this.props.case_category_person.data[i].title;
        s = this.props.case_category_person.data[i].id;
        category_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }
  }

    return(
      ( category_picker.length>0)?
      <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
        selectedValue={this.state.single_category}
        onValueChange={(single_category) => ( this.setState({single_category:single_category}))} >


          {category_picker}

   </Picker>:  <View/>
    )

}

_getCCI(){

  var CCI_picker = [];
  //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
     CCI_picker.push(<Picker.Item key='' label ='Please Select CCI ' value =''/>);
      if(this.props.rescue_cci.rhomes!=undefined){
      for(let i=0 ; i<this.props.rescue_cci.rhomes.length ; i++){

        t = this.props.rescue_cci.rhomes[i].cci_name;
        s = this.props.rescue_cci.rhomes[i].id;
        CCI_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }
  }

    return(
      ( CCI_picker.length>0)?
      <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
        selectedValue={this.state.cci_id}
        onValueChange={(cci_id) => ( this.setState({cci_id:cci_id}))} >


          {CCI_picker}

   </Picker>:  <View/>
    )

}

  _getStates(){
    var states_picker = [];
    //console.log(this.props.allDistrict,'this.props.allDistrict');
       states_picker.push(<Picker.Item key='' label ='Please Select States' value =''/>);
        for(let i=0 ; i<this.props.states.states.length ; i++){

          t = this.props.states.states[i].name;
          s = this.props.states.states[i].id;
          states_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }

      return(
        ( states_picker.length>0)?
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.rstate_id}
          onValueChange={(rstate_id) => ( this.setState({rstate_id:rstate_id}))} >



            {states_picker}

     </Picker>:  <View/>
      )
  }










  _getPolice(){
    var police_picker = [];
    //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
       police_picker.push(<Picker.Item key='' label ='Please Select Police Station' value =''/>);
        if(this.props.rescue_police.data!=undefined){
        for(let i=0 ; i<this.props.rescue_police.data.length ; i++){

          t = this.props.rescue_police.data[i].name;
          s = this.props.rescue_police.data[i].id;
          police_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }
    }

      return(
        ( police_picker.length>0)?
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.rps_id}
          onValueChange={(rps_id) => ( this.setState({rps_id:rps_id}))} >


            {police_picker}

     </Picker>:  <View/>
      )
  }

  render() {
    //const { navigate } = this.props.navigation;
    var menu = <Menu navigator = { this.props.navigator }/>
     const { selectedItems } = this.state;
     const onMultilineScroll = () => {
    if (this.state.allow_scroll_code) {
      if (this.allowKeyboardTimeout) {
        clearTimeout(this.allowKeyboardTimeout)
      }

      this.setState({allow_keyboard: false});
      this.allowKeyboardTimeout = setTimeout(() => this.setState({allow_keyboard: true}), 500);
    }
  };

  const onMultilineFocus = () => {
    this.setState({ allow_scroll_code: false });
  };

  const onMultilineBlur = () => {
    this.setState({ allow_scroll_code: true });
  };
  let CheckIndex = i => {
            if((i % 2) == 0) {
            return styles.gray
          }
        }

     let rows = this.state.rows.map((r, i) => {
       var state_picker = [];
            state_picker.push(<Picker.Item key='' label ='Please Select State' value =''/>);
           for(let i=0 ; i<this.props.states.states.length ; i++){

             t = this.props.states.states[i].name;
             s = this.props.states.states[i].id;
             state_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
         }
       var data_picker = [];
          data_picker.push(<Picker.Item key='' label ='Please Select Disrict' value =''/>);
           for(let i=0 ; i<this.props.id_based_district_response.data.length ; i++){

             t = this.props.id_based_district_response.data[i].name;
             s = this.props.id_based_district_response.data[i].district_cd;
             data_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
         }

         var police_data_picker = [];
           police_data_picker.push(<Picker.Item key='' label ='Select Police Station' value =''/>);
         if(this.props.district_id_based_police_responce.data!=undefined){

             for(let i=0 ; i<this.props.district_id_based_police_responce.data.length ; i++){

               n = this.props.district_id_based_police_responce.data[i].name;
               v = this.props.district_id_based_police_responce.data[i].id;

               police_data_picker.push(<Picker.Item key={i} label ={n} value ={v}/>);
           }
         }
         var cci_data_picker = [];
           cci_data_picker.push(<Picker.Item key='' label ='Please Select CCI' value =''/>);
         if(this.props.cci_data.rhomes!=undefined){

             for(let i=0 ; i<this.props.cci_data.rhomes.length ; i++){

               n = this.props.cci_data.rhomes[i].cci_name;
               v = this.props.cci_data.rhomes[i].id;

               cci_data_picker.push(<Picker.Item key={i} label ={n} value ={v}/>);
           }
         }
         var rescui_data_picker = [];
           rescui_data_picker.push(<Picker.Item key='' label ='Please Select Rescue Home' value =''/>);
         if(this.props.home_recursive.rhomes!=undefined){

             for(let i=0 ; i<this.props.home_recursive.rhomes.length ; i++){

               n = this.props.home_recursive.rhomes[i].name_of_home;
               v = this.props.home_recursive.rhomes[i].id;

               rescui_data_picker.push(<Picker.Item key={i} label ={n} value ={v}/>);
           }
         }



       return  <View key={ i } style={[styles.row,{marginTop:20}, CheckIndex(i)]}>
                   {this.state.rows.length>1?<View style={{marginTop:10,marginLeft:15,justifyContent:'center',alignItems:'flex-start'}}>
                   <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',padding:1,backgroundColor:'#089680'}}>Crime{i+1}</Label>
                   </View>:null}
                  <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingTop:5,paddingLeft:15}}>Fir Number</Label>
                   <Item >
                       <Input
                       style={{borderWidth:1,height:40,borderColor:'#ccc'}}
                        maxLength={25}
                        value={(this.state.crime[i])?this.state.crime[i].fir_no:''}
                        onChangeText={(value) => this._inputChangeHandler({index:i, element:'fir_no', value:value})}
                       />
                   </Item>
                   <View style={{flexDirection:'row'}}>
                   <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Fir Date</Label>
                   <View style={{marginLeft:15,borderColor:'#ccc'}}>
                   <DatePicker style={{width:180,height:40,paddingBottom:10}}
                       placeholder="Select Date"
                       value={(this.state.crime[i])?this.state.crime[i].fir_date:''}
                       date={(this.state.crime[i])?this.state.crime[i].fir_date:''}
                       mode="date"
                       confirmBtnText ="Ok"
                       cancelBtnText = 'Cancel'
                       onDateChange={(value) => this._inputChangeHandler({index:i, element:'fir_date', value:value})}
                   />
                   </View>
                   </View>
                   <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>State</Label>
                   <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
                   <Picker style={{marginLeft:5}}
                     selectedValue={(this.state.crime[i])?this.state.crime[i].state_id:''}
                     onValueChange={(selectedValue) =>this._inputChangeHandler({index:i, element:'state_id', value:selectedValue})} >
                     {state_picker}
                 </Picker>
                 </View>
                 </View>
                 </View>
                 <View style={{flexDirection:'row'}}>
                 <View style={{flex:0.5}}>
                 <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>District</Label>
                 <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
                 <Picker style={{marginLeft:5}} selectedValue={(this.state.crime[i])?this.state.crime[i].district_id:''}
                 onValueChange={(selectedValue) =>this._inputChangeHandler({index:i, element:'district_id', value:selectedValue},this._submitDistrict(selectedValue))} >
                 {data_picker}
              </Picker>
               </View>
               </View>
               <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Police Station</Label>
                   <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,justifyContent:'center',height:40,borderWidth:1,borderColor:'#ccc'}}>
                   <Picker style={{marginLeft:5}} selectedValue={(this.state.crime[i])?this.state.crime[i].ps_id:''}
                     onValueChange={(selectedValue) =>this._inputChangeHandler({index:i, element:'ps_id', value:selectedValue})}>
                    {police_data_picker}
                 </Picker>
                 </View>
                 </View>
                 </View>

                 <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Acts</Label>
                <Item >
                    <Input
                    style={{paddingLeft:10,paddingRight:10,borderWidth:1,height:40,borderColor:'#ccc'}}
                    value={(this.state.crime[i])?this.state.crime[i].act:''}
                    onChangeText={(value) => this._inputChangeHandler({index:i, element:'act', value:value})}
                    />
                </Item>
                 <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Section</Label>
               <Item >

                   <Input
                    style={{paddingLeft:10,paddingRight:10,borderWidth:1,height:40,borderColor:'#ccc'}}
                    value={(this.state.crime[i])?this.state.crime[i].section:''}
                    onChangeText={(value) => this._inputChangeHandler({index:i, element:'section', value:value})}
                   />
               </Item>


               </View>
             })
              var head = this.props.personType.join(', ');
              var s_head = (this.props.personType.indexOf('CIC Suspects') >= 0 || this.props.personType.indexOf('SIB Suspects') >= 0)?head.substring(0, head.length-1):head;

    return (
      <SideMenu
        menu={menu}
        openMenuOffset={width/1.5}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <FRStatusBar/>
      <HeaderBar toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
      <Content style={{backgroundColor:'#fff'}}>
      <OfflineNotice/>
      <View style={{backgroundColor:'#fff'}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,color:'#61659D',fontSize:height/40}}>Enrolment For </Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:12,fontFamily:'Roboto-Light',paddingLeft:15,color:'#61659D',fontSize:height/40}}>`{s_head}`</Text>
        </View>
      </View>

      <View  style={{paddingLeft:10,paddingRight:10}}>
        <Form>
        {(this.state.photo!='')?<ScrollView horizontal={true} style={{paddingLeft:10,paddingRight:10}}>
            {this.state.photo ?this.state.photo.map((i,index) => {
              return (<TouchableOpacity style={{flexDirection:'row'}} key = {index} ><Image style={{width: 50, height: 50, resizeMode: 'contain'}}  source={{uri: `${i.uri}`}} /></TouchableOpacity>)
            }) : null}

          </ScrollView>:null}
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15}}>Enter Name *</Label>
        <Item>
          <Input
          style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          maxLength={150}
          />
        </Item>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingTop:5,paddingLeft:15}}>Enter Alias Name</Label>
        <Item >
          <Input
          style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
          onChangeText={(alias_name) => this.setState({alias_name})}
          value={this.state.alias_name}
          maxLength={150}
          />
        </Item>
        <View style={{flexDirection:'row'}}>
        <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Select Nationality</Label>

        {this._getNationality()}
      </View>
        <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingTop:5,paddingLeft:15}}>Select State Name</Label>
        {this._getEnrollState()}
      </View>


    </View>

        <View style={{flexDirection:'row'}}>
        <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Select Gender</Label>
        <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
        <Picker style={{marginLeft:5}}
          selectedValue={this.state.gender}
          onValueChange={this.onValueChange.bind(this, 'gender')} >
          <Picker.Item label = "Please Select Gender" value = "" />
          <Picker.Item label = "Male" value = "Male" />
          <Picker.Item label = "Female" value = "Female" />
      </Picker>
      </View>
      </View>
      <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingTop:5,paddingLeft:15}}>Aadhar Number</Label>
        <Item >

            <Input
            style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
            onChangeText={(aadhar_num) => this.setState({aadhar_num})}
            value={this.state.aadhar_num}
            maxLength={12}
            keyboardType={'numeric'}
            />
          </Item>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Date Of Birth</Label>
          <View style={{marginLeft:15,borderColor:'#ccc'}}>
          <DatePicker style={{width:190,height:40,paddingBottom:10}}
              placeholder="Select Date"
              value={this.state.dob}
              date={this.state.dob}
              mode="date"
              confirmBtnText ="Ok"
              cancelBtnText = 'Cancel'
              onDateChange={(dob) => this.setState({dob:this.ageCalculateFunction(dob)})}
          />
          </View>
          </View>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Age *</Label>
          <Item >
              <Input
              style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
              onChangeText={(age) => this.setState({age:age})}
              value={this.state.age}
              keyboardType={'numeric'}
              maxLength={2}
              />
          </Item>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Height(foot&inches)*</Label>
          <View style={{flexDirection:'row'}}>
          <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc',flex:0.5}}>
          <Picker style={{width:width/6}}

            selectedValue={this.state.height}
            onValueChange={this.onValueChange.bind(this, 'height')} >
          {this.state.heightFit.map((i,index)=> {return <Picker.Item key= {index} label = {i} value = {i} />})}
        </Picker>
        </View>
        <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc',flex:0.5}} >
        <Picker style={{width:width/6}}

          selectedValue={this.state.inch}
          onValueChange={this.onValueChange.bind(this, 'inch')} >
        {this.state.heightInch.map((i,index)=> {return <Picker.Item key= {index} label = {i} value = {i} />})}
      </Picker>
      </View>
        </View>
          {/*<Item >
              <Input
              style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
              onChangeText={(height) => this.setState({height})}
              value={this.state.height}
              maxLength={3}
              keyboardType={'numeric'}
              />
          </Item>*/}
          </View>

          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Colour  *</Label>
          <Item >

              <Input
              style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
              onChangeText={(color) => this.setState({color})}
              value={this.state.color}
              maxLength={15}
              />
          </Item>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Guardian Type</Label>
          <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Picker style={{marginLeft:5}}
            itemTextStyle={{color:'#f00',fontSize:8}}
            selectedValue={this.state.guardian_type}
            onValueChange={this.onValueChange.bind(this, 'guardian_type')} >
            <Picker.Item label = "Select Guardian Type" value = "" />
            <Picker.Item label = "Mother" value = "Mother" />
            <Picker.Item label = "Father" value = "Father" />
            <Picker.Item label = "Spouse" value = "Spouse" />
        </Picker>
        </View>
        </View>
        <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Guardian Name</Label>
          <Item >

              <Input
              style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
              onChangeText={(guardian_name) => this.setState({guardian_name})}
              value={this.state.guardian_name}
              maxLength={50}
              />
          </Item>
          </View>
          </View>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Identification Mark(s)</Label>
        <Item >
            <Input
            style={{paddingLeft:10,paddingRight:10,height:60,borderWidth:1,borderColor:'#ccc'}}
            onChangeText={(identification_marks) => this.setState({identification_marks})}
            value={this.state.identification_marks}
            returnKeyType={'done'}
            maxLength={150}
            numberOfLines={5}
            keyboardType={'default'}
            editable={ true }
            blurOnSubmit={false}
            multiline={true}
            />
        </Item>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Address</Label>
        <Item >
            <Input
            style={{paddingLeft:10,paddingRight:10,height:80,borderWidth:1,borderColor:'#ccc'}}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
            maxLength={150}
            numberOfLines={5}
            returnKeyType={'done'}
            keyboardType={'default'}
            editable={ true }
            blurOnSubmit={false}
            multiline={true}
            />
        </Item>
        <View style={{paddingTop:5,marginLeft:15,marginRight:1}}>
        <LabelSelect
        TitleText='Select Language *'
        title="Languages"
        ref="select"
        style={styles.labelSelect}
        onConfirm={this.selectLanguage}
      >
        {this.state.languages.filter(item => item.isSelected).map((item, index) =>
          <LabelSelect.Label
            key={'label-' + index}
            data={item}
            onCancel={() => {this.deleteLanguage(item);}}
          >{item.label}</LabelSelect.Label>
        )}
        {this.state.languages.filter(item => !item.isSelected).map((item, index) =>
          <LabelSelect.ModalItem
            key={'modal-item-' + index}
            data={item}
          >{item.label}</LabelSelect.ModalItem>
        )}
      </LabelSelect>
      </View>

      <View >
      <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of Person Category *</Label>
      <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,borderWidth:1,height:40,justifyContent:'center',borderColor:'#ccc'}}>
      {this._getCategory()}
    </View>
      {/*<LabelSelect
      TitleText='Select Person Category'
      title="Person Category"
      ref="select"
      style={styles.labelSelect}
      onConfirm={this.selectConfirmType}
    >
      {this.state.case_types.filter(item => item.isSelected).map((item, index) =>
        <LabelSelect.Label
          key={'label-' + index}
          data={item}
          onCancel={() => {this.deleteItemType(item);}}
        >{item.label}</LabelSelect.Label>
      )}
      {this.state.case_types.filter(item => !item.isSelected).map((item, index) =>
        <LabelSelect.ModalItem
          key={'modal-item-' + index}
          data={item}
        >{item.label}</LabelSelect.ModalItem>
      )}
    </LabelSelect>*/}
    </View>
    {this.state.person_case_type.map((i,index)=>{return <View key={index}>{(i.label=='CIC Suspects' || i.value==10 || i.label == 'SIB Suspects' || i.value==11)?<View><Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of Organization</Label>
    <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,borderWidth:1,height:40,justifyContent:'center',borderColor:'#ccc'}}>
    {this._getOrganization()}
  </View></View>:null}</View>})}
    {this.state.person_case_type.map((i,index)=>{return <View key={index}>{(i.label=='Foreigners-Overstay' || i.value==9)?<View><View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
    <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>Passport Details</Label>
    </View>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Passport Number</Label>
    <Item >
        <Input
        style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
        onChangeText={(passport_no) => this.setState({passport_no})}
        value={this.state.passport_no}
        maxLength={30}
        keyboardType={'default'}
        />
    </Item>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:0.5}}>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Passport Issue Date</Label>
    <View style={{marginLeft:15,borderColor:'#ccc'}}>
    <DatePicker style={{width:190,height:40,paddingBottom:10}}
        placeholder="Select Date"
        value={this.state.passport_issue_date}
        date={this.state.passport_issue_date}
        mode="date"
        confirmBtnText ="Ok"
        cancelBtnText = 'Cancel'
        onDateChange={(passport_issue_date) => this.setState({passport_issue_date})}
    />
    </View>
    </View>
    <View style={{flex:0.5}}>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Passport Expiry Date</Label>
    <View style={{marginLeft:15,borderColor:'#ccc'}}>
    <DatePicker style={{width:190,height:40,paddingBottom:10}}
        placeholder="Select Date"
        value={this.state.passport_expiry_date}
        date={this.state.passport_expiry_date}
        mode="date"
        confirmBtnText ="Ok"
        cancelBtnText = 'Cancel'
        onDateChange={(passport_expiry_date) => this.setState({passport_expiry_date})}
    />
    </View>
    </View>
    </View>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Passport Issue Place</Label>
    <Item >
        <Input
        style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
        onChangeText={(passport_issue_place) => this.setState({passport_issue_place})}
        value={this.state.passport_issue_place}
        maxLength={50}
        keyboardType={'default'}
        />
    </Item>
    <View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
    <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>VISA Details</Label>
    </View>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>VISA Number</Label>
    <Item >
        <Input
        style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
        onChangeText={(visa_no) => this.setState({visa_no})}
        value={this.state.visa_no}
        maxLength={50}
        keyboardType={'default'}
        />
    </Item>
    <View style={{flexDirection:'row'}}>
    <View style={{flex:0.5}}>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>VISA Issue Date</Label>
    <View style={{marginLeft:15,borderColor:'#ccc'}}>
    <DatePicker style={{width:190,height:40,paddingBottom:10}}
        placeholder="Select Date"
        value={this.state.visa_issue_date}
        date={this.state.visa_issue_date}
        mode="date"
        confirmBtnText ="Ok"
        cancelBtnText = 'Cancel'
        onDateChange={(visa_issue_date) => this.setState({visa_issue_date})}
    />
    </View>
    </View>
    <View style={{flex:0.5}}>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>VISA Expiry Date</Label>
    <View style={{marginLeft:15,borderColor:'#ccc'}}>
    <DatePicker style={{width:190,height:40,paddingBottom:10}}
        placeholder="Select Date"
        value={this.state.visa_expiry_date}
        date={this.state.visa_expiry_date}
        mode="date"
        confirmBtnText ="Ok"
        cancelBtnText = 'Cancel'
        onDateChange={(visa_expiry_date) => this.setState({visa_expiry_date})}
    />
    </View>
    </View>
    </View>
    </View>:null}</View>})}
    {this.state.person_case_type.map((i,index)=>{return <View key={index}>{(i.label=='Rohingyas' || i.value==8)?<View><View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
    <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>Identification Numbers</Label>
    </View>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>UNHCR Number</Label>
    <Item >
        <Input
        style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
        onChangeText={(unhcr_no) => this.setState({unhcr_no})}
        value={this.state.unhcr_no}
        maxLength={50}
        keyboardType={'default'}
        />
    </Item>
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Individual Number</Label>
    <Item >
        <Input
        style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
        onChangeText={(individual_no) => this.setState({individual_no})}
        value={this.state.individual_no}
        maxLength={50}
        keyboardType={'default'}
        />
    </Item>
  </View>:null}</View>})}
    <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Attachments</Label>
  <TouchableOpacity onPress={this.pickMultiple.bind(this)} >
  {this.state.identification_proofs==null?<View style={{alignItems:'center',justifyContent:'center'}}><View style={[styles.buttonContainer,{marginRight:10,width:300,justifyContent:'center',alignItems:'center'}]}><Text style={styles.buttonText}>Select Attachments</Text></View></View>:<ScrollView horizontal={true}>
      {this.state.identification_proofs ? this.state.identification_proofs.map(i => <View style={{marginTop:15,marginLeft:15,marginRight:15}} key={i.uri}>{this.renderAsset(i)}</View>) : null}
    </ScrollView>}
    </TouchableOpacity>


        <View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
        <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>Crime Details</Label>
        </View>
          <View style={{backgroundColor:'#fff',paddingRight:10}}>
          {rows}
          <View style={{flexDirection:'row',paddingLeft:15,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={[styles.buttonContainer,{width:150,marginRight:10,flex:0.5}]} onPress={ this._addRow.bind(this) }>
              <Text style={styles.buttonText}>Add Crime</Text>
          </TouchableOpacity>
          {this.state.rows.length>1?<TouchableOpacity style={[styles.buttonContainer,{flex:0.5}]} onPress={ this._removeRow.bind(this) }>
              <Text style={styles.buttonText}>Remove Crime</Text>
          </TouchableOpacity>:<TouchableOpacity style={{flex:0.5}} />}
          </View>
          <View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#fff',textAlign:'center',paddingLeft:15}}>Comments</Label>
          </View>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Comment(s)</Label>
          <Item >
              <Input

              numberOfLines={5}
              keyboardType={'default'}
              returnKeyType={'done'}
              editable={ true }
              blurOnSubmit={false}
              multiline={true}
              style={{paddingLeft:10,paddingRight:10,borderWidth:1,height:80,borderColor:'#ccc'}}
              onChangeText={(comments) => this.setState({comments})}
              value={this.state.comments}
              />
          </Item>
          {this.state.person_case_type.map((i,index)=>{return <View key={index}>{(i.label=='Person Found' || i.value==3)?<View><View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
          <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>Rescue Home/CCI Details </Label>
          </View>
          <RadioForm style={{marginTop:15,justifyContent:'space-around'}}
                          radio_props={rescue_cci_selection}
                          initial={this.state.rescue_cci_selectionIndex}
                          labelStyle={{fontSize:width/35}}
                          buttonSize={height/45}
                          buttonColor={'#089680'}
                          formHorizontal={true}

                          onPress={(value,index) => {this.setState({rescue_cci_selection:value,rescue_cci_selectionIndex:index})}}
                      />
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of State</Label>
          <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,borderWidth:1,height:40,justifyContent:'center',borderColor:'#ccc'}}>
          {this._getStates()}
        </View>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of District</Label>
        <View style={{marginLeft:15,paddingLeft:10,justifyContent:'center',height:40,paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
          {this._getDistrict()}
      </View>

        {this.state.rescue_cci_selection=='Rescue'?<View><Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of Rescue Home</Label>
        <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,justifyContent:'center',height:40,borderWidth:1,borderColor:'#ccc'}}>
        {this._getRecursive()}
      </View></View>:null}
      {this.state.rescue_cci_selection=='CCI'?<View><Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Name of CCI</Label>
      <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,justifyContent:'center',height:40,borderWidth:1,borderColor:'#ccc'}}>
      {this._getCCI()}
    </View></View>:null}</View>:null}</View>})}


          </View>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enrolled At *</Label>
          <Item >
              <Input
              placeholder='Please Enter Enrollment Place'
              numberOfLines={5}
              returnKeyType={'done'}
              value={this.state.enrolled_at}
              multiline={true}
              style={{paddingLeft:10,paddingRight:10,borderWidth:1,height:80,borderColor:'#ccc'}}
              onChangeText={(enrolled_at) => this.setState({enrolled_at:enrolled_at})}

              />
          </Item>
          <View style={{flexDirection:'row',paddingLeft:15,paddingRight:10}}>
        <TouchableOpacity onPress={this.onCancel.bind(this)} style={[styles.buttonContainer,{flex:0.3}]}>
            <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onReset.bind(this)} style={[styles.buttonContainer,{marginLeft:10,flex:0.3}]}>
            <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        {(this.pressed==false)?<TouchableOpacity onPress={this.onPressSubmit.bind(this)} style={[styles.buttonContainer,{marginLeft:10,flex:0.3,backgroundColor:'#ff3020'}]}>
            <Text style={[styles.buttonText,{color:'#fff'}]}>Submit</Text>
        </TouchableOpacity>:<TouchableOpacity disabled={true} onPress={this.onPressSubmit.bind(this)} style={[styles.buttonContainer,{marginLeft:10,flex:0.3,backgroundColor:'#ff3020'}]}>
            <Text style={[styles.buttonText,{color:'#fff'}]}>Submit</Text>
        </TouchableOpacity>}
        </View>
        </Form>
        </View>

          </Content>
          <BusyIndicator/>
          <Footer style={{height:40,backgroundColor:'#fff'}}>
          <BottomBar navigator = { this.props.navigator }  disableEnroll={true} detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end',backgroundColor:'#dedede'}} dashBoardStyle={{justifyContent:'flex-end'}}/>
          </Footer>
     </SideMenu>


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
  text_input:{
    borderWidth:1,
    borderColor:'#ccc'
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
    borderWidth:1,
    borderColor:'#ff3020',
    width: width*0.8,
    paddingVertical:7,
    marginTop:10,
    marginBottom:20,
    //marginLeft:20,
    //marginRight:20
  },
  buttonText:{
    textAlign:'center',
    color:'#ff3020'
  }

});

const mapStateToProps = (state) => {
  debugger;
  return {
    OTPVerificationResponse: faceSelectors.getOTPVerificationResponse(state),
    image_data:faceSelectors.getImageResponse(state),
    personType:faceSelectors.getPersonType(state),
    isEnroledin:faceSelectors.isUserEnroledin(state),
    enrolResponse:faceSelectors.getEnrolResponse(state),
    isSDKEnroledin:faceSelectors.isSDKUserEnroledin(state),
    SDKEnrolResponse:faceSelectors.getSDKEnrolResponse(state),
    case_type_person:faceSelectors.getCaseTypesResponse(state),
    case_category_person:faceSelectors.getCaseCategoryResponse(state),
    id_based_district_response:dropdownSelectors.getIdBasedDistrictResponce(state),
    languages:dropdownSelectors.getAllLanguages(state),
    states:dropdownSelectors.getAllStates(state),
    ditrictResponce:dropdownSelectors.getRescueDitrictResponce(state),
    district_id_based_police_responce:dropdownSelectors.getDistrictIdBasedPoliceResponce(state),
    home_recursive:dropdownSelectors.getHomeRecursive(state),
    cci_data:dropdownSelectors.getCCI(state),
    rescue_police:dropdownSelectors.getDistrictIdBasedRescuePoliceResponce(state),
    rescue_home:dropdownSelectors.getRecueHome(state),
    rescue_cci:dropdownSelectors.getRescueCCI(state),
    enroll_state:dropdownSelectors.getEnrollState(state),
    nations:dropdownSelectors.getNationality(state),
    oraganization:dropdownSelectors.getOraganizationResponce(state)
  };
}

export default connect(mapStateToProps)(EnrollmentForm);
