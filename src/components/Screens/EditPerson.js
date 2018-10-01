import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Navigator,
  TextInput,
  Alert,
  Dimensions,
  Easing,
  ListView,
  Picker,
  NativeModules,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';
import { SERVICE_URL } from '../Constants'
import ZoomImage from 'react-native-zoom-image';
import OfflineNotice from './OfflineNotice';

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
  Right
 } from 'native-base';
var ImagePicker = NativeModules.ImageCropPicker;
import { connect } from 'react-redux';
import DashBoard from './DashBoard';
import ListEnrollment from './ListEnrollment';
import ProfileData from './ProfileData';
import LabelSelect from '../react-native-label-select';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import {AliasName} from '../partials/AliasName';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import DatePicker from 'react-native-datepicker';
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
var id =0 ;
export class EditPerson extends Component {
  constructor(props) {
        debugger;
        super(props);
        this.pressed = false;
        this.dashboard_pressed=false

ds = new ListView.DataSource({rowHasChanged: (row1, row2) => { row1 !== row2;}});
      var crime = [];
      var address1=[];

      //var alias_name1=[];
      var rows = [index];
      var addressRow = [index];

      //var aliasNameRow=[index];

console.log(this.props.edit_person,'this.props.edit_person');

  for (var i = 0; i < crime.length; i++) {
    rows.push(i);
  }
  for (var i = 0; i < address1.length; i++) {
    addressRow.push(i);
  }
  // for(let j=0;j<this.props.edit_person.data.length;j++){
  //   let dd  = {}
  //   dd['aliasNameRow'+j]=aliasNameRow;
  //   let length = Object.keys(dd).length;
  //   let s_length= length;
  //   console.log(dd,'g');
  //   console.log(s_length,'s_length');
  //   console.log(dd.length,'s_length');
  //   for (var i = 0; i < s_length; i++) {
  //     aliasNameRow.push(i);
  //
  // }
  // }

  // console.log(aliasNameRow,'aliasNameRow for');

  console.log(this.props.edit_person,'gfgf');
  this.state = {
    case_category :  [],
    case_types : [],
    languages : [],
      rows: [],
      addressRow:[],
      aliasNameRow:[],
      crime:crime,
      isOpen:false,
    photo: null,
    isSelect:false,
    enlarge:false,
    id:'',
    person_case_type :[],
    person_case_category:[],
    known_languages:[],
    heightFit:['Foot',"1","2","3","4","5","6","7"],
    heightInch:['Inches','0','1','2','3','4','5','6','7','8','9','10','11'],
    crime_display:false,
    inch:(this.props.edit_person.data)?this.props.edit_person.data.inch:null ||'',
    rstate_id:(this.props.edit_person.data)?this.props.edit_person.data.rstate_id:null ||'',
    rdistrict_id:(this.props.edit_person.data)?this.props.edit_person.data.rdistrict_id:'' ||'',
    rps_id:(this.props.edit_person.data)?this.props.edit_person.data.rps_id:'' ||'',
    rescue_id:(this.props.edit_person.data)?this.props.edit_person.data.rescue_home_id:'' || '',
    cci_id:(this.props.edit_person.data)?this.props.edit_person.data.cci_id:'' || '',
    name:(this.props.edit_person.data)?this.props.edit_person.data.name:null || '',
    alias_name:(this.props.edit_person.data)?this.props.edit_person.data.alias_name:null ||'',
    alias_name1:[],
    address1:address1,
    aadhar_num:(this.props.edit_person.data)?this.props.edit_person.data.aadhar_num:null ||'',
    dob:(this.props.edit_person.data)?this.props.edit_person.data.pdob:null ||'',
    age:(this.props.edit_person.data)?this.props.edit_person.data.age:null ||'',
    height:(this.props.edit_person.data)?this.props.edit_person.data.height:null ||'',
    color:(this.props.edit_person.data)?this.props.edit_person.data.color:null ||'',
    guardian_type:(this.props.edit_person.data)?this.props.edit_person.data.guardian_type:null ||'',
    guardian_name:(this.props.edit_person.data)?this.props.edit_person.data.guardian_name:null ||'',
    gender:(this.props.edit_person.data)?this.props.edit_person.data.gender:null ||'',
    identification_marks:(this.props.edit_person.data)?this.props.edit_person.data.identification_marks:null ||'',
    address:(this.props.edit_person.data)?this.props.edit_person.data.address:null ||'',
    gps: false,
    display:false,
    dd_length:0,
    comments:(this.props.edit_person.data)?this.props.edit_person.data.comments:null ||'',
    rescue_cci_selection:(this.props.edit_person.data.name_of_home==null||this.props.edit_person.data.name_of_home=='')?'CCI':'Rescue',
    rescue_cci_selectionIndex:(this.props.edit_person.data.name_of_home==null||this.props.edit_person.data.name_of_home=='')?1:0,
    latitude:(this.props.edit_person.data)?this.props.edit_person.data.latitude:null || null,
    longitude:(this.props.edit_person.data)?this.props.edit_person.data.longitude:null || null,
    error: null,
    month:'',
    enrolled_at:(this.props.edit_person.data)?this.props.edit_person.data.enrolled_at:null || '',
    dd_data : (this.props.edit_person.data)?this.props.edit_person.data.person_idproofs:[] || [],
    dd_photo:(this.props.edit_person.data)?this.props.edit_person.data.person_gallery_images:[] || [],
    identification_proofs: [],

};
//index = this.state.crime.length;
  }

  addAliasInput(event) {
    for(let j=0;j<this.props.edit_person.data.length;j++){

    let alias_name1 = this.state.alias_name1;

     alias_name1[event.index] = {...alias_name1[event.index], [event.id]:event.data.id,[event.element]:event.value};

    this.setState({
        ...this.state,
        alias_name1:alias_name1
    });


    }


  }




  addAddressInput (event) {
    console.log(event,'event');
    let address1 = this.state.address1;
    address1[event.index] = {...address1[event.index], [event.element]:event.value};
    this.setState({
        ...this.state,
        address1:address1
    });
  }




      pickMultiple(data) {
        var dd=[];
          ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            cropping: true,
            compressImageMaxWidth:500,
            compressImageMaxHeight:500,
          }).then(identification_proofs => {
            this.setState({
              identification_proofs:[...this.state.identification_proofs,...identification_proofs.map(i => {
                console.log('received image', i);
                return {uri: i.path, id:data.id ,width: i.width, height: i.height, mime: i.mime};
              })]
            })

            dd[data.id]=this.state.identification_proofs;
            console.log(this.state.identification_proofs,'identification_proofs');
            console.log(this.state.dd,'dd');

          }).catch(e => alert(e));
        }




  componentDidMount() {
this.props.dispatch(faceActions.setEmpty({}));
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
      let db_languages_array;
    var photo = this.props.edit_person.data?this.props.edit_person.data.photo:null;
     parray= (photo!=null)?photo.split(','):[];

    var dds   = parray.length>0?parray.map(function(a){return a.trim()}):[];
    this.setState({dd_photo:dds});



}



  _addRow(data){
     debugger;
     this.state.rows.push(index++)
     this.setState({ rows: this.state.rows,id:data.id })

   }

   _addAddress(data){
      debugger;
      this.state.addressRow.push(index++)
      this.setState({ addressRow: this.state.addressRow,id:data.id })
    }

    _addAlias(data,j){

       const update = {};
       let test_array = [];
       var dd = [];

       this.setState({id:data.id,enlarge:true,value1:j})
       dd.push(j);
       console.log(dd,'dd');
      // if(this.state.value1==j){
      //var dd = this.state.aliasNameRow[j]

       this.state.aliasNameRow.push(index++)
       console.log(dd,'index dd');
       update['aliasNameRow'+j] = this.state.aliasNameRow;


       this.setState({ aliasNameRow: this.state.aliasNameRow})
       console.log(this.state.aliasNameRow,'aliasNameRow');
       //console.log(j,'aliasNameRow j');
       //console.log(update,'update row');
     //}
     }

   _removeRow(){
     debugger;
     this.state.rows.pop(--index)
     this.setState({ rows: this.state.rows });
      }

   _deleteImage(delete_data){
     let {dd_data} = this.state;
     Alert.alert('DELETE',
          " Are you sure to delete from server ",
           [
             {text: 'Cancel', onPress: () => {this.setState({display: true})}},
             {text: 'OK', onPress: () => {
               var params = {
                  img:delete_data.name,
                  id:delete_data.person_id
               };
               console.log(params,'params');
                 this.props.dispatch(dropdownActions.imageDelete({params:params}));
                 let new_data = [...this.state.dd_data];
                 let index = new_data.indexOf(delete_data)
                  new_data.splice(index,1)
                 this.setState({dd_data:new_data});
                 console.log(this.state.dd_data);
              }},
           ]
          );

   }

   ageCalculateFunction(date){
   let year_diff = ageCalculate.datePickerValidation(date);
   let len       = year_diff.length;
   if(len>0){
   if(year_diff[0].flag==true){
     this.setState({
       age:year_diff[0].years>0?`${year_diff[0].years}`:`0`,
       month : year_diff[0].month
     })
     return date;
   }else{
     this.setState({
       age:year_diff[0].years>0?`${year_diff[0].years}`:`0`,
       month : year_diff[0].month
     })


     return '';
   }
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
     for(let i=0;i<nextProps.enrolResponse.pgi.length ;i++){
       var img_name=nextProps.enrolResponse.pgi[i];
       var dd1 = this.state.photo[i].uri.split('/');

       var ss1 = dd1.slice(-1).pop();
       var detect_data = {
           uri:this.state.photo[i].uri,
           type:'image/jpeg',
           Filename:ss1
         };
         var params={
           name:nextProps.enrolResponse.data.name,
           psqno:nextProps.enrolResponse.data.id,
           folderNames:ss.join(','),
           imageName:img_name,
           image:detect_data
         };
         console.log(params,'enrolsdk');
         nextProps.dispatch(faceActions.enrolSDKUser({params:params}));
     }

     nextProps.dispatch(faceActions.setEmpty({}));

   }


   componentWillReceiveProps(nextProps) {

     if(nextProps.isUpdatedin == true){
       console.log(nextProps.enrolResponse,'enrolResponse');
       if(nextProps.enrolResponse.pgi.length==0){
         this.props.dispatch(faceActions.setEmpty());
         Alert.alert('Success','Person Data Updated Successfully ');
        nextProps.navigator.push({
           component:DashBoard,
           name:'dash-board'
         });
     }else{
         this.onPressSaveDetect(nextProps);
      }
     }else if(nextProps.isSDKEnroledin==true){
        j=j+1;
       console.log(nextProps.SDKEnrolResponse ,'ffff');
       console.log(this.state.dd_length +'___'+ j,'SDKEnrolResponse');
       if(this.state.dd_length == j){
       Alert.alert('Success','Person Data Updated Successfully ');
       this.props.navigator.push({
         component:DashBoard,
         name:'dash-board'
       });
     }
     }
   }


  onPressSubmit() {
    this.pressed = true;
    //loaderHandler.showLoader('Load..');
    var img_n = [];
    var photo_n = [];
    //console.log(this.state.identification_proofs,'this.state.identification_proofs');
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
  if(this.state.photo!=null){
    for(let i=0 ; i<this.state.photo.length;i++){
    var dd1 = this.state.photo[i].uri.split('/');

    var ss1 = dd1.slice(-1).pop();
    var type1 = this.state.photo[i].mime;
    var uri1=this.state.photo[i].uri;
    var tt1 = {uri:uri1,type:type1,name:ss1};
    photo_n.push (tt1);
    }
  }
  var crime_d = []


   var crime_s=this.state.crime;

if( this.state.name!=''){
        var i=index;
        var params ={
          photo:photo_n,
          name:this.state.name,
          alias_name:this.state.alias_name,
          aadhar_num:this.state.aadhar_num,
          dob:this.state.dob,
          age:this.state.age,
          height:this.state.height,
          inch:this.state.inch,
          color:this.state.color,
          comments:this.state.comments,
          enrolled_at:this.state.enrolled_at,
          rstate_id:(this.state.rstate_id==''||this.state.rstate_id==null)?0:this.state.rstate_id,
          rdistrict_id:(this.state.rdistrict_id==''||this.state.rdistrict_id==null)?0:this.state.rdistrict_id,
          rps_id:(this.state.rps_id==''|| this.state.rps_id==null)?0:this.state.rps_id,
          rescue_id:(this.state.rescue_id==''||this.state.rescue_id==null)?0:this.state.rescue_id,
          cci_id:(this.state.cci_id==''||this.state.cci_id==null)?0:this.state.cci_id,
          guardian_type:this.state.guardian_type,
          guardian_name:this.state.guardian_name,
          gender:this.state.gender,
          known_languages:this.state.known_languages,
          identification_marks:this.state.identification_marks,
          address:this.state.address,
          person_case_type:this.state.person_case_type,
          person_case_category:this.state.person_case_category,
          crime_details:crime_s,
          user_id:this.props.OTPVerificationResponse.data.id,
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          person_id:this.props.edit_person.data.id,
          identification_proofs:img_n
        }
        console.log(params,'params');
        //this.props.dispatch(faceActions.setEmpty({}));
        //this.props.dispatch(faceActions.updateEnrol({params:params}));
        // this.props.navigator.replace({
        //   component:DashBoard,
        //   name:'dash-board'
        // });
      }else if(this.state.name==''){
        AlertBox('Name Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.height=='' || this.state.height=='Foot'){
        this.pressed = false;
        AlertBox('Foot Field is Required');
        loaderHandler.hideLoader();
      }else if(this.state.inch==''|| this.state.inch=='Inches'){
        this.pressed = false;
        AlertBox('Inches Field is Required');
        loaderHandler.hideLoader();
      }


  }

  onReset(){
    this.setState({
      photo:null,
      crime:[],
    name:this.props.edit_person.data.name,
    alias_name:this.props.edit_person.data.alias_name,
    aadhar_num:this.props.edit_person.data.aadhar_num,
    dob:this.props.edit_person.data.dob,
    rstate_id:this.props.edit_person.data.rstate_id,
    rdistrict_id:this.props.edit_person.data.rdistrict_id,
    rps_id:this.props.edit_person.data.rps_id,
    rescue_id:this.props.edit_person.data.rescue_home_id,
    cci_id:this.props.edit_person.data.cci_id,
    age:this.props.edit_person.data.age,
    height:this.props.edit_person.data.height,
    enrolled_at:this.props.edit_person.data.enrolled_at,
    color:this.props.edit_person.data.color,
    guardian_type:this.props.edit_person.data.guardian_type,
    guardian_name:this.props.edit_person.data.guardian_name,
    gender:this.props.edit_person.data.gender,
    identification_marks:this.props.edit_person.data.identification_marks,
    address:this.props.edit_person.data.address,
    latitude:this.props.edit_person.data.latitude,
    longitude:this.props.edit_person.data.longitude,
    dd_data :this.props.edit_person.data.person_idproofs,
    identification_proofs: null

    })
  }

  onCancel(){
    this.props.navigator.resetTo({
      component:DashBoard,
      name:'dash-board'
    });
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
                  this.props.dispatch(faceActions.detectUser({params:params}));
                }
            });
        }




  onValueChange = (key: string, value: string) => {
        debugger;
      const newState = {};
      newState[key] = value;
      this.setState(newState);
      }

  _inputChangeHandler(event) {
    debugger;
    var crime = this.state.crime;
    crime[event.index] = {...crime[event.index], [event.element]:event.value};
    console.log(crime,'crime');
    this.setState({
        ...this.state,
        crime:crime
    });
}


    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }

    renderImage(image) {
        return <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={image || {uri:SERVICE_URL+`id_proofs/50791/${image.name}`}} />
      }

      renderAsset(image) {
    return this.renderImage(image);
  }

  renderPhoto(photo) {
      return <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={photo } />
    }

    renderAssetPhoto(photo) {
  return this.renderPhoto(photo);
}

_renderpolice(index){
  var police_data_picker = [];
    police_data_picker.push(<Picker.Item key='' label ='Select Police Station' value =''/>);
  if(this.props.district_id_based_police_responce.data!=undefined){

      for(let i=0 ; i<this.props.district_id_based_police_responce.data.length ; i++){

        n = this.props.district_id_based_police_responce.data[i].name;
        v = this.props.district_id_based_police_responce.data[i].unit_cd;
        police_data_picker.push(<Picker.Item key={i} label ={n} value ={v}/>);
    }
    return police_data_picker;
  }

}

_submitDistrict(district_id,i){
  var params={
    d_id:district_id
  }
  this.props.dispatch(dropdownActions.districtIdbasedPolice({params:params}));

}

addTextInput = (key) => {
    let alias_name1 = this.state.alias_name1;
    alias_name1.push(<TextInput key={key} />);
    this.setState({ alias_name1 })
  }




  render() {
    let CheckIndex = i => {
        if((i % 2) == 0) {
        return styles.gray
      }
    }

let ad_address= this.state.addressRow.map((r, i) => {
return <View key={ i } style={[styles.row, CheckIndex(i)]}>
<Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Alias Name {i+1}</Label><Input
style={{marginLeft:15,marginTop:4,paddingLeft:10,paddingRight:10,height:80,borderWidth:1,borderColor:'#ccc'}}
value={(this.state.address1[i])?this.state.address1[i].address1:''}
onChangeText={(value) => this.addAddressInput({index:i, id:'id',element:'address1', value:value})}
maxLength={150}
multiline={true}
numberOfLines={5}
placeholder='Enter Alias'
returnKeyType={'done'}
editable={ true }
blurOnSubmit={false}
multiline={true}
/>
       </View>
})
let rows = this.state.rows.map((r, i) => {
  var crime_state_picker = [];
       crime_state_picker.push(<Picker.Item key='' label ='Please Select States' value =''/>);
      for(let i=0 ; i<this.props.states.states.length ; i++){

        t = this.props.states.states[i].name;
        s = this.props.states.states[i].id;
        crime_state_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
    }

    var data_picker = [];
       data_picker.push(<Picker.Item key='' label ='Please Select Disrict' value =''/>);
        for(let i=0 ; i<this.props.id_based_district_response.data.length ; i++){

          t = this.props.id_based_district_response.data[i].name;
          s = this.props.id_based_district_response.data[i].district_cd;
          data_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
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

              <View style={{marginTop:10,marginLeft:15,justifyContent:'center',alignItems:'flex-start'}}>
              <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',padding:1,backgroundColor:'#089680'}}>Crime{i+1}</Label>
              </View>
             <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Fir Number</Label>
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
                {crime_state_picker}
            </Picker>
            </View>
            </View>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flex:0.5}}>
           <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>District</Label>
            <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
            <Picker style={{marginLeft:5}} selectedValue={(this.state.crime[i])?this.state.crime[i].district_id:'' }
            onValueChange={(selectedValue) =>this._inputChangeHandler({index:i, element:'district_id', value:selectedValue},this._submitDistrict(selectedValue,i))} >
            {data_picker}
         </Picker>
          </View>
          </View>
          <View style={{flex:0.5}}>
             <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Police Station</Label>
              <View style={{marginLeft:15,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
              <Picker style={{marginLeft:5}} selectedValue={(this.state.crime[i])?this.state.crime[i].ps_id:''}
                onValueChange={(selectedValue,index) =>this._inputChangeHandler({index:i, element:'ps_id', value:selectedValue})}>
               {this._renderpolice()}
            </Picker>
            </View>
            </View>
            </View>
            <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Acts</Label>
            <Item >
                <Input
                style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
                value={(this.state.crime[i])?this.state.crime[i].act:''}
                onChangeText={(value) => this._inputChangeHandler({index:i, element:'act', value:value})}
                />
            </Item>
           <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Section</Label>
          <Item >

              <Input
               style={{paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
               value={(this.state.crime[i])?this.state.crime[i].section:''}
               onChangeText={(value) => this._inputChangeHandler({index:i, element:'section', value:value})}
              />
          </Item>

          </View>
        })

    var fld = this.props.edit_person.data?this.props.edit_person.data.folder:null
    var folder_array = (fld !=null)? fld.split(','):[];
    var menu = <Menu navigator = { this.props.navigator }/>
     const { selectedItems } = this.state;


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
      <View style={{height:50,flexDirection:'row',backgroundColor:'#fff'}}>
        <View style={{flex:0.5,justifyContent:'center'}}>
          <Text style={{paddingLeft:15,color:'#61659D',fontSize:height/40}}> Enrollment</Text>
        </View>
        <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>

        </View>
      </View>
      <View  style={{paddingLeft:10,paddingRight:10}}>
        <Form>
        {(this.props.edit_person.data)?this.props.edit_person.data.map((data,j)=>{return <View  key={j}>
        <Text style={{textAlign:'center',fontSize:14,color:'#000',paddingBottom:3,borderBottomColor:'#000',borderBottomWidth:1,fontWeight:'600'}}>Enrollment {j+1} </Text>
        <ScrollView horizontal={true} style={{paddingLeft:10}}>
            {data.photo.map((i,index) => {
              return (<TouchableOpacity style={{flexDirection:'row'}} key = {index} ><Image style={{width: 50, height: 50, resizeMode: 'contain'}}  source={{uri: SERVICE_URL+`enrolled_images/`+data.folder+'/'+i}} /></TouchableOpacity>)
            })}
        </ScrollView>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Act</Label>
         <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
         <Text style={{fontSize:16,color:'#ccc'}}>{data.name}</Text>
         </View>


          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{flex:0.8}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Alias Name</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.alias_name}</Text>
          </View>
          </View>
          <View style={{flex:0.2,justifyContent:'center'}}>
          <Button  transparent={true}  onPress={() => this.addTextInput(this.state.alias_name1.length)} >
             <Image source={require('../../images/blue-plus-sign-md.png')} style={{width:30,height:30}}/>
          </Button>

          </View>

          </View>
          {this.state.alias_name1.map((value, index) => {
          return value
        })}
          {this.state.enlarge==true?<Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Alias Name {j+1}</Label>:null}
          {this.state.enlarge==true?((this.state.aliasNameRow)).map((r, i) => {
          return <View key={ i } style={[styles.row, CheckIndex(i)]}>
          <Input
          style={{marginLeft:15,marginTop:4,paddingLeft:10,paddingRight:10,height:40,borderWidth:1,borderColor:'#ccc'}}
          value={(this.state.alias_name1[i])?this.state.alias_name1[i].alias_name1:''}
          onChangeText={(value) => this.addAliasInput({index:i, id:'id' , element:'alias_name1', value:value,data})}
          maxLength={150}
          multiline={true}
          numberOfLines={5}
          placeholder='Enter Alias'
          returnKeyType={'done'}
          editable={ true }
          blurOnSubmit={false}
          multiline={true}
          />
         </View>
      }):null}
      <View style={{flexDirection:'row'}}>
      <View style={{flex:0.5}}>
      <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Nationality</Label>
      <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
        <Text style={{fontSize:16,color:'#ccc'}}>{data.nationality}</Text>
      </View>
      </View>
      <View style={{flex:0.5}}>
      <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Statenationality</Label>
      <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
        <Text style={{fontSize:16,color:'#ccc'}}>{data.state}</Text>
      </View>
      </View>
      </View>

        <View style={{flexDirection:'row'}}>
        <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Gender</Label>
        <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.gender}</Text>
        </View>
        </View>
        <View style={{flex:0.5}}>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Gender</Label>
        <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.aadhar_num}</Text>
        </View>
        </View>
        </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Date Of Birth</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.dob}</Text>
          </View>
          </View>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Age *</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.age}</Text>
          </View>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Height(foot&inches)*</Label>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc',flex:0.5}}>

            <Text style={{fontSize:16,color:'#ccc'}}>{data.height}</Text>

        </View>
        </View>
        <View style={{flex:0.5}}>
        <View style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc',flex:0.5}} >

          <Text style={{fontSize:16,color:'#ccc'}}>{data.inch}</Text>

      </View>
        </View>

          </View>
          </View>

          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enter Colour  *</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.color}</Text>
          </View>
          </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Guardian Type</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.guardian_type}</Text>
          </View>
        </View>
        <View style={{flex:0.5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Guardian Name</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.guardian_name}</Text>
          </View>
          </View>
          </View>

       <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Identification Marks</Label>
       <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
         <Text style={{fontSize:16,color:'#ccc'}}>{data.identification_marks}</Text>
       </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <View style={{flex:0.8}}>
       <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Address</Label>
       <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
         <Text style={{fontSize:16,color:'#ccc'}}>{data.address}</Text>
       </View>
        </View>
        <View style={{flex:0.2,justifyContent:'center'}}>
        <Button  transparent={true}  onPress={ this._addAddress.bind(this,data) } >
           <Image source={require('../../images/blue-plus-sign-md.png')} style={{width:30,height:30}}/>
        </Button>

        </View>

        </View>

        {this.state.id==data.id?ad_address:null}

        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Known Language *</Label>
        <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.known_languages}</Text>
        </View>

        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Person Type *</Label>
        <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.case_types}</Text>
        </View>
        <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Person Category</Label>
        <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.case_category_types}</Text>
        </View>
      <View style={{flexDirection:'row'}}>
      <View style={{flex:0.8}}>
     <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Attachments</Label>
     </View>
     <View style={{flex:0.2,justifyContent:'center'}}>
     <Button  transparent={true}  onPress={this.pickMultiple.bind(this,data)} >
        <Image source={require('../../images/blue-plus-sign-md.png')} style={{width:30,height:30}}/>
     </Button>
     </View>
     </View>
    <ScrollView horizontal={true}>
        {data.person_idproofs.map((i,index) => {
          return (<TouchableOpacity style={{flexDirection:'row'}} key = {index} onPress={this._deleteImage.bind(this,i)}><ZoomImage
          duration={100}
          imgStyle={{height:50,width:50,resizeMode:'contain'}}
          moveCapture={true}
          enableScaling={false}
          easingFunc={Easing.ease}
          rebounceDuration={500}
          style={{height:50,width:50}}
           source={{uri: SERVICE_URL+`id_proofs/${data.folder}/${i.name}`}} /><Image source={require('../../images/delete.png')} style={{width:10,height:10}}/></TouchableOpacity>)
        }) }

      </ScrollView>
      <ScrollView horizontal={true}>
          {this.state.identification_proofs ? this.state.identification_proofs.map(i => <View style={{marginTop:5,marginLeft:5,marginRight:5}} key={i.uri }>{this.renderAsset(i)}</View>) : null}
        </ScrollView>




      <View style={{marginTop:10,marginLeft:15,justifyContent:'center',height:20,backgroundColor:'#089680',justifyContent:'center',alignItems:'center'}}>
      <Label style={{fontSize:12,color:'#fff',fontFamily:'Roboto-Black',textAlign:'center',paddingLeft:15}}>Crime Details</Label>
      </View>
          <View style={{backgroundColor:'#fff',paddingRight:10}}>

                  {data.crime_details.map((rowData,index)=>{return <View key={index}>
                   <Label style={{fontSize:12,color:'#ccc',fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Fir Number</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.fir_no}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,color:'#ccc',fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Fir Date</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.fir_date}</Text>
                    </View>
                    </View>
                    <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,color:'#ccc',fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>State</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,justifyContent:'center',paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.state}</Text>
                    </View>
                    </View></View>
                    <View style={{flexDirection:'row'}}>
                    <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,color:'#ccc',fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>District</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.districtname}</Text>
                    </View>
                    </View>
                    <View style={{flex:0.5}}>
                   <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Police Station</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.ps_name}</Text>
                    </View>
                    </View>
                    </View>
                    <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Act</Label>
                     <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                     <Text style={{fontSize:16,color:'#ccc'}}>{rowData.act}</Text>
                     </View>
                   <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Section</Label>
                    <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
                    <Text style={{fontSize:16,color:'#ccc'}}>{rowData.section}</Text>
                    </View>



                  </View>

                })}

          </View>
          {this.state.id==data.id?rows:null}
          {(data.case_types== 'Person Found')?<View><View style={{marginLeft:-10,marginTop:10,justifyContent:'center',height:30,backgroundColor:'#089680',alignItems:'flex-start'}}>
            <Text style={{marginLeft:10,fontSize:moderateScale(14,0.5),color:'#fff',paddingBottom:3,borderBottomColor:'#000',fontWeight:'600'}}>Rescue Home/CCI Details:</Text>
          </View>
          <View style={{paddingLeft:5}}>
          <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Name of State</Label>
           <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
           <Text style={{fontSize:16,color:'#ccc'}}>{data.rstate_id}</Text>
           </View>

           <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Name of District</Label>
            <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
            <Text style={{fontSize:16,color:'#ccc'}}>{data.district_name}</Text>
            </View>

            <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Name of Rescue Home</Label>
             <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
             <Text style={{fontSize:16,color:'#ccc'}}>{data.name_of_home}</Text>
             </View>
             <Label style={{fontSize:12,fontFamily:'Roboto-Black',color:'#ccc',paddingLeft:15,paddingTop:5}}>Name of CCI</Label>
              <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:40,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
              <Text style={{fontSize:16,color:'#ccc'}}>{data.cci_name}</Text>
              </View>

          </View>
          </View>:null}
          <View style={{flexDirection:'row',paddingLeft:15,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={[styles.buttonContainer,{width:150,marginRight:10,flex:0.5}]} onPress={ this._addRow.bind(this,data) }>
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

           <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:60,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
           <Text style={{fontSize:16,color:'#ccc'}}>{data.comments}</Text>
           </View>


          <Label style={{fontSize:12,fontFamily:'Roboto-Black',paddingLeft:15,paddingTop:5}}>Enrolled At</Label>
          <View   style={{marginLeft:15,paddingLeft:10,paddingRight:10,height:80,justifyContent:'center',borderWidth:1,borderColor:'#ccc'}}>
          <Text style={{fontSize:16,color:'#ccc'}}>{data.enrolled_at}</Text>
          </View>

        </View>}):null}

          <View style={{flexDirection:'row',paddingLeft:15,paddingRight:10}}>
        <TouchableOpacity onPress = {this.onCancel.bind(this)} style={[styles.buttonContainer,{flex:0.3}]}>
            <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.onReset.bind(this)} style={[styles.buttonContainer,{marginLeft:10,flex:0.3}]}>
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
    marginBottom:10,
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
    isUpdatedin:faceSelectors.isUpdatedin(state),
    enrolResponse:faceSelectors.getUpdateResponce(state),
    isSDKEnroledin:faceSelectors.isSDKUserEnroledin(state),
    SDKEnrolResponse:faceSelectors.getSDKEnrolResponse(state),
    case_type_person:faceSelectors.getCaseTypesResponse(state),
    case_category_person:faceSelectors.getCaseCategoryResponse(state),
    id_based_district_response:dropdownSelectors.getIdBasedDistrictResponce(state),
    district_id_based_police_responce:dropdownSelectors.getDistrictIdBasedPoliceResponce(state),
    edit_person:faceSelectors.getEditPersonResponce(state),
    img_delete:dropdownSelectors.getDeleteResponse(state),
    states:dropdownSelectors.getAllStates(state),
    languages:dropdownSelectors.getAllLanguages(state),
    home_recursive:dropdownSelectors.getHomeRecursive(state),
    cci_data:dropdownSelectors.getCCI(state),
    ditrictResponce:dropdownSelectors.getRescueDitrictResponce(state),
    rescue_police:dropdownSelectors.getDistrictIdBasedRescuePoliceResponce(state),
    rescue_home:dropdownSelectors.getRecueHome(state),
    rescue_cci:dropdownSelectors.getRescueCCI(state),
  };
}

export default connect(mapStateToProps)(EditPerson);
