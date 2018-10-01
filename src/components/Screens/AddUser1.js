import React, { Component } from 'react';
import { Alert , AppState,Dimensions, StyleSheet, ScrollView,ListView, Platform,View, TextInput, TouchableOpacity, Navigator, Text, Image, PixelRatio } from 'react-native';
import { connect } from 'react-redux';


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
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import DashBoard from './DashBoard';

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownSelectors from '../../store/dropdown/reducer';
import AlertBox from '../../Core/AlertBox';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import RadioForm,
        {RadioButton,
         RadioButtonInput,
         RadioButtonLabel} from 'react-native-simple-radio-button';
   import * as dropdownActions from '../../store/dropdown/actions';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import LabelSelect from '../react-native-label-select';
var role =[
  {label:'Admin',value:'admin'},
  {label:'SP',value:'sp'},
  {label:'SHO',value:'sho'},
  {label:'FS',value:'fs'}
]



    let case_type = [
     {label:'Accused',value:1},
     {label:'Person Missing',value:2},
     {label:'Person Found',value:3},
     {label:'Dead Body',value:4},
     {label:'Victim',value:5},
     {label:'Others',value:6}];
export class AddUser extends  React.PureComponent {
   static propTypes = {};
  constructor(props) {
    super(props);
    this.selectConfirm = this.selectConfirm.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      case_category : [],
      name:'',
      phone:'',
      state_id:'',
      district_id:'',
      ps_id:'',
      role:'',
      roleIndex:'',
      table_access: [],
      sub_division_id:'',
      isOpen:false
    };
  }

  onSelectedItemsPersonType =( table_access) => {

this.setState({ table_access});
};

  updateText = text => {
          this.setState({text});

      };



      selectConfirm(list) {
        var dd=[];
          let {case_category} = this.state;
          for (let item of list) {
            let index = case_category.findIndex(ele => ele === item);
            //console.log(index,'index');
            if (~index) case_category[index].isSelected = true;
            //console.log(if(~index) case_category[index].isSelected = true);
            if(case_category[index].isSelected == true){
              dd.push(case_category[index])
            }
            else continue;
            this.setState({table_access:dd});

          }


        }
        deleteItem(item) {

          let {case_category} = this.state;
          let index = case_category.findIndex(a => a === item);
          case_category[index].isSelected = false;
          // if(case_category[index].isSelected == false){
          //   dd.pop(case_category[index])
          // }
          this.state.table_access.pop(case_category[index]);
            this.setState({case_category:case_category});
            //console.log(this.state.person_case_category);
          //lothis.setState({person_case_category:case_category});
        }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  componentDidMount() {

    if(this.props.case_type_person.data!=undefined){
    let ts;
    var dds =[];
    for(let i=0 ; i<this.props.case_type_person.data.length ; i++){
      let t = this.props.case_type_person.data[i].title;
      let s = this.props.case_type_person.data[i].id;

        ts =  {'label':t, 'isSelected':false, 'value':s};
      dds.push(ts);
  }
  this.setState({case_category:dds});
}
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
  _submitDistrict(state_id){
    console.log(state_id,'state_id');
    var params={
      state_id:state_id
    }
    this.props.dispatch(dropdownActions.getAllDistrict({params:params}));
  }

  _getDistrict(){
    var disrict_picker = [];
    //console.log(this.props.allDistrict,'this.props.allDistrict');
       disrict_picker.push(<Picker.Item key='' label ='Please Select Disrict' value =''/>);
         if(this.props.allDistrict.data!=undefined){
        for(let i=0 ; i<this.props.allDistrict.data.length ; i++){

          t = this.props.allDistrict.data[i].name;
          s = this.props.allDistrict.data[i].district_cd;
          disrict_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }
    }

      return(
        ( disrict_picker.length>0)?
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.district_id}
          onValueChange={(district_id) => ( this.setState({district_id:district_id},this._submitPolice(district_id)))} >



            {disrict_picker}

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
          selectedValue={this.state.state_id}
          onValueChange={(state_id) => ( this.setState({state_id:state_id},this._submitDistrict(state_id)))} >



            {states_picker}

     </Picker>:  <View/>
      )
  }




  _submitPolice(district_id){
    console.log(district_id,'district_id');
    var params={
      d_id:district_id
    };

    this.props.dispatch(dropdownActions.districtIdbasedPolice({params:params}));
  }





  _getPolice(){
    var police_picker = [];
    //console.log(this.props.district_id_based_police_responce,'this.props.id_based_district_response');
       police_picker.push(<Picker.Item key='' label ='Please Select Police Station' value =''/>);
        if(this.props.district_id_based_police_responce.data!=undefined){
        for(let i=0 ; i<this.props.district_id_based_police_responce.data.length ; i++){

          t = this.props.district_id_based_police_responce.data[i].name;
          s = this.props.district_id_based_police_responce.data[i].id;
          police_picker.push(<Picker.Item key={i} label ={t} value ={s}/>);
      }
    }

      return(
        ( police_picker.length>0)?
        <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#ccc'}}
          selectedValue={this.state.ps_id}
          onValueChange={(ps_id) => ( this.setState({ps_id:ps_id}))} >


            {police_picker}

     </Picker>:  <View/>
      )
  }
  onPressSubmit(){
    if(this.state.name==''){
        AlertBox('Please Enter Name');
    }else if(this.state.phone==''){
    AlertBox('Please Enter 10 Phone number ');
  }else if(this.state.state_id==''){
    AlertBox('Plese Select State');
  } else if(this.state.district_id==''){
    AlertBox('Plese Select Disrict');
  } else if(this.state.ps_id==''){
    AlertBox('Plese Select Police Station');
  } else if(this.state.role==''){
    AlertBox('Plese Select Role');
  }else if(this.state.table_access.length<0){
    AlertBox('Plese Select Table Access');
  } else {
    var params={
      name:this.state.name,
      phone:this.state.phone,
      state_id:this.state.state_id,
      district_id:this.state.district_id,
      ps_id:this.state.ps_id,
      role:this.state.role,
      table_access:this.state.table_access

    };
    this.props.dispatch(faceActions.addUser({params:params}));
  }
  }

  onValueChange = (key: string, value: string) => {
        debugger;
      const newState = {};
      newState[key] = value;
      this.setState(newState);
      }

      componentWillReceiveProps(nextProps) {
        if(nextProps.isAddUser==true){
          if(nextProps.addUserReponse.success==1){
            nextProps.navigator.replace({
              component:DashBoard,
              name:'dash-board'
            })
            Alert.alert('Success',nextProps.addUserReponse.message);
          } else{
            AlertBox(nextProps.addUserReponse.message);
          }
        } else{
          //console.log(nextProps.addUserReponse.message,'nextProps');
        }
      }

      back(){
        this.props.navigator.push({
          component:DashBoard,
          name:'dash-board'
        });
      }

  render() {

    var menu = <Menu navigator = { this.props.navigator }/>
    return (
      <SideMenu
          menu={menu}
          openMenuOffset={width/1.5}
          isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <FRStatusBar/>
        <HeaderBar  toggle = {this.toggle.bind(this)} backButtonStyle={{color:'#fff',padding:5,borderWidth:1,borderColor:'#fff'}} back={this.back.bind(this)} backText={'Back'}/>
        <Content style={{backgroundColor:'#fff'}}>
        <View  style={{paddingLeft:10,paddingRight:10}}>
          <Form style={{marginTop:20}}>
        <Label style={{paddingLeft:15}}>Enter Name</Label>
          <Item>
            <Input
            style={{paddingLeft:10,borderWidth:1,borderColor:'#ccc'}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            maxLength={150}
            />
          </Item>
          <Label style={{marginTop:10,paddingLeft:15}}>Enter Mobile Number</Label>
            <Item>
              <Input
              style={{paddingLeft:10,borderWidth:1,borderColor:'#ccc'}}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
              maxLength={10}
              keyboardType='numeric'
              />
            </Item>
            <Label style={{paddingLeft:15,paddingTop:10}}>States</Label>
            <View style={{marginLeft:15,borderWidth:1,borderColor:'#ccc'}}>

              {this._getStates()}

          </View>
            <Label style={{paddingLeft:15,paddingTop:10}}>Disrict</Label>
            <View style={{marginLeft:15,borderWidth:1,borderColor:'#ccc'}}>

              {this._getDistrict()}

          </View>


          <Label style={{paddingLeft:15,paddingTop:10}}>Police Station</Label>
          <View style={{marginLeft:15,borderWidth:1,borderColor:'#ccc'}}>
            {this._getPolice()}
          </View>
          <Label style={{paddingLeft:15,paddingTop:10}}>Role</Label>
            <RadioForm
            style={{justifyContent:'space-around'}}
            radio_props={role}
            initial={this.state.roleIndex}
            formHorizontal={true}
            onPress={(value,index) => {this.setState({role:value,roleIndex:index})}}
            />
            <View style={{marginLeft:20,paddingTop:10}}>
            <LabelSelect
            TitleText='Table Access'
            title="Case Types"
            ref="select"
            style={styles.labelSelect}
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
          </View>

            <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={[styles.buttonContainer,{flex:0.3}]}>
              <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer,{marginLeft:10,flex:0.3}]}>
              <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSubmit.bind(this)} style={[styles.buttonContainer,{marginLeft:10,flex:0.3,backgroundColor:'#ff3020'}]}>
              <Text style={[styles.buttonText,{color:'#fff'}]}>Submit</Text>
          </TouchableOpacity>
          </View>
          </Form>
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
    paddingVertical:10,
    marginTop:30,
    marginBottom:80,
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
    isAddUser:faceSelectors.isAddUser(state),
    addUserReponse:faceSelectors.getAddUserResponse(state),
    case_type_person:faceSelectors.getCaseTypesResponse(state),
    id_based_district_response:dropdownSelectors.getIdBasedDistrictResponce(state),
    allDistrict:dropdownSelectors.getAllDistrictResponse(state),
    divisions:dropdownSelectors.getDivisionResponse(state),
    circle:dropdownSelectors.getCircleResponse(state),
    police:dropdownSelectors.getPoliceResponse(state),
    states:dropdownSelectors.getStates(state),
      district_id_based_police_responce:dropdownSelectors.getDistrictIdBasedPoliceResponce(state),
  }
}

export default connect(mapStateToProps)(AddUser);
