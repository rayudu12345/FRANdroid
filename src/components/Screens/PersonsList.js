import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Modal,
  Navigator,
  ListView,
  Alert,
  Dimensions,
  Platform,
  TextInput,
  Easing,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { SERVICE_URL } from '../Constants'
import IndividualPersonList from './IndividualPersonList';
import PopupDialog, { DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
import LabelSelect from '../react-native-label-select';
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
  Icon ,
  Button,
  Right,
  Thumbnail
 } from 'native-base';
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import AlertBox from '../../Core/AlertBox';
import ZoomImage from 'react-native-zoom-image';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownSelectors from '../../store/dropdown/reducer';
import * as dropdownActions from '../../store/dropdown/actions';
import ViewControl from 'react-native-zoom-view'

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import SideMenu from 'react-native-side-menu';
import ImageZoom from 'react-native-image-pan-zoom';
import Menu from './Menu';
import EditPerson from './EditPerson';
import DashBoard from './DashBoard';
import OfflineNotice from './OfflineNotice';
 import AndroidBackButton from "react-native-android-back-button"


export class PersonsList extends React.Component {
  constructor(props) {
    debugger;

     //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
        this.state={
        loading: false,
         page: 1,
         error: null,
         refreshing: false,
           modalVisible: false,
          isOpen:false,
          isLoading: true,
          file_source:'',
          filters:false,
          display: false,
          searching:false,
          search_request:'',
          JSON_from_server: [],
          person_id:'',
          total_data:'',
          person_case_type:this.props.case_type_id.case_type_id,
          case_category:[],
           //dataSource: ds.cloneWithRows([]),
        }
      }


      componentDidMount(){
        loaderHandler.hideLoader();
        this.fetch_more_data_from_server(this.state.file_source,this.state.search_request);


        }

        _getPersonType(){
          if(this.props.case_type_person.data!=undefined){
          var ddds =[];
          let length = this.props.case_type_person.data.length;
          for(let i=0 ; i<length ; i++){
            let t = this.props.case_type_person.data[i].title;
            let s = this.props.case_type_person.data[i].id;
            if(s!=7){
              ddds.push(<Picker.Item key={i} label ={t} value ={s}/>)
            }
          }
        }
          return(
            ( ddds.length>0)?
            <View style={{marginLeft:8,paddingLeft:10,height:40,justifyContent:'center',paddingRight:10,borderWidth:1,borderColor:'#ccc'}}>
            <Picker style={{marginLeft:5,borderWidth:1,borderColor:'#333'}}
              selectedValue={this.state.person_case_type}
              onValueChange={(person_case_type) => ( this.setState({person_case_type:person_case_type}))} >



                {ddds}

         </Picker></View>:  <View/>
          )

        }

        onValueChange = (key: string, value: string) => {
              debugger;
            const newState = {};
            newState[key] = value;

            this.setState(newState);
            }






    fetch_more_data_from_server =(file_source,search_request)=>  {
    //const { page } = this.state;
      var role =this.props.OTPVerificationResponse.data.role
      var id=this.props.OTPVerificationResponse.data.id
      var ps_id=this.props.OTPVerificationResponse.data.ps_id
      var search_request = search_request;
      var district_id=this.props.OTPVerificationResponse.data.district_id
      var file_source=(file_source=='')?null:file_source;
    //  console.log(file_source+'search_request'+search_request,'file_source');
      var case_type_id = this.props.case_type_id.case_type_id;
      console.log(case_type_id,'case_type_id');

      this.setState({ loading: true });
      if (this.state.searching && case_type_id!=1){
        this.setState({page:1})
      }
      var url =SERVICE_URL+`case-types-list?file_source=${file_source}&search_request=${search_request}&id=${id}&ps_id=${ps_id}&district_id=${district_id}&role=${role}&case_type_id=${case_type_id}&page=${this.state.page}`
      console.log(url,'url');
          fetch(url)
              .then((response) => response.json())
              .then((responseJson) =>{
                if(this.state.filters){
                    this.setState({JSON_from_server:[]})
                    this.setState({
                      JSON_from_server: this.state.page === 1 ? responseJson : [...this.state.JSON_from_server, ...responseJson],
                       error: responseJson.error || null,
                       loading: false,
                       refreshing: false
                    });
                }else if (this.state.searching && case_type_id!=1){
                  this.setState({JSON_from_server:[]})
                  this.setState({
                    JSON_from_server: this.state.page === 1 ? responseJson : [...this.state.JSON_from_server, ...responseJson],
                     error: responseJson.error || null,
                     loading: false,
                     refreshing: false
                  });
                }else{
                  this.setState({
                    JSON_from_server: this.state.page === 1 ? responseJson : [...this.state.JSON_from_server, ...responseJson],
                     error: responseJson.error || null,
                     loading: false,
                     refreshing: false
                  });
                }
                  loaderHandler.hideLoader();
                  //console.log(responseJson,'responseJson');
                  //console.log(this.state.JSON_from_server,'more stae');
              }).catch((error) => {
                this.setState({ error, loading: false });
                  console.log(error,'error');
              });
            }


            componentWillReceiveProps(nextProps){
              if(nextProps.isIndividual==true){
                this.props.dispatch(faceActions.setEmpty({}));
                this.props.navigator.push({
                  component:IndividualPersonList,
                  name:'individual-person-list'
                });
              } else if(nextProps.isEdited==true){

                this.props.navigator.push({
                  component:EditPerson,
                  name:'edit-person'
                });
              }else if(nextProps.isPersonDelete==true){
                console.log(nextProps.person_delete,'person_delete');
              }else if(nextProps.isMoved==true) {
                console.log(nextProps.movePersonType,'movePersonType')
                let new_data = [...this.state.JSON_from_server];
                let index = new_data.indexOf(this.state.total_data)
                   console.log(index, 'index new');
                 new_data.splice(index,1)
                 console.log(new_data,'3');
                this.setState({JSON_from_server:new_data});
              }

              //loaderHandler.hideLoader();
            }

handleRefresh = () => {
   this.setState(
     {
       page: 1,
       refreshing: true
     },

     () => {
       this.fetch_more_data_from_server(this.state.file_source,this.state.search_request);
     }

   );
   //console.log(this.state.page,'handleRefresh');
 };



 handleLoadMore = () => {
   this.setState(
     {
       page: this.state.page + 1
     },

     () => {
       this.fetch_more_data_from_server(this.state.file_source,this.state.search_request);
     }

   );
   //console.log(this.state.page,'handleLoadMore');
 };

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        })
      }

      updateMenuState(isOpen) {
        this.setState({ isOpen });
      }

componentWillMount(){
  //console.log(this.props.case_type_id,'case_type_id');
    this.props.dispatch(faceActions.setEmpty({}));
}

Render_Footer=()=>{
  if (!this.state.loading) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );

  }

  FlatListItemSeparator =()=> {
    return (
      <View
        style={{
          height: 1,

        }}
      />
    );
  }

  onPressEdit(profile_id){
    loaderHandler.showLoader('Load..');
  console.log(profile_id,'peofile_id');

    var params={
      person_id:profile_id.id,
      case_id:profile_id.folder
    }
    console.log(params,'params');
      this.props.dispatch(faceActions.setEmpty({}));
    this.props.dispatch(faceActions.editPerson({params:params}))

  //loaderHandler.hideLoader();
}

onProfileSubmit(profile_id){
loaderHandler.showLoader('Load..');
  console.log(profile_id,'profile_id person_id');
  var params={
    person_id:profile_id.id,
    case_id:profile_id.folder
  }
  console.log(params,'params person_id');
  this.props.dispatch(faceActions.setEmpty({}));

  this.props.dispatch(faceActions.loadIndividualListFace({params:params}));


  loaderHandler.hideLoader('Load..');

}


  back(){
    loaderHandler.hideLoader();
    this.props.navigator.resetTo({
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
      setModalVisible(visible,dd) {
        console.log(dd,'uri:');
          this.setState({modalVisible: visible,img_name:dd.photo,folderName:(!dd.FBID)?dd.folder:'facebook'});
        }

        closeModal = () => {
            this.setState({modalVisible: false,img_name:'',folderName:''})
        }

        popIfExists() {
        if (navigator.getCurrentIndex() > 0) {
          navigator.pop()
          return true // do not exit app
        } else {
          return false // exit app
        }
        }

        _deleteImage(delete_data){
          console.log(delete_data,'delete_data');
          let {JSON_from_server} = this.state;



          Alert.alert('DELETE',
               " Are you sure to delete from server ",
                [
                  {text: 'Cancel', onPress: () => {this.setState({display: true})}},
                  {text: 'OK', onPress: () => {
                    var params = {
                       person_id:delete_data.id,
                       case_id:delete_data.case_id
                    };
                    console.log(params,'params');
                      this.props.dispatch(dropdownActions.personDelete({params:params}));
                      let new_data = [...this.state.JSON_from_server];
                      let index = new_data.indexOf(delete_data)
                         console.log(index, 'index new');
                       new_data.splice(index,1)
                       console.log(new_data,'3');
                      this.setState({JSON_from_server:new_data});

                   }},
                ]
               );

        }

        onPressMove(data){
          console.log(data,'data');
          this.popupDialog.show();
          this.setState({person_id:data.id,total_data:data})
        }

        _submitMove(){
          var params = {
            person_id:this.state.person_id,
            new_case_id:this.state.person_case_type,
            old_case_id:this.props.case_type_id.case_type_id
          }
          this.props.dispatch(dropdownActions.setEmpty({}));
          this.props.dispatch(faceActions.movePersonType({params:params}))
          this.popupDialog.dismiss();
          this.setState({person_case_type:this.props.case_type_id.case_type_id})

        }

render(){

//  console.log(this.state.JSON_from_server,'personList');
      var menu = <Menu navigator = { this.props.navigator }/>
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
          <View style={{flex:1,backgroundColor:'#fff'}}>
          <OfflineNotice/>

          <View style={{height:40,marginLeft:15,marginRight:15,borderBottomColor:'#ccc',borderBottomWidth:0.5,flexDirection:'row',backgroundColor:'#fff'}}>
            <View style={{flex:0.6,justifyContent:'center'}}>
              <Text style={{color:'#374176',fontSize:height/40}}> {this.props.case_type_id.title} List</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:10}}>

            <View style={{flex:0.5}}>
              <TextInput
              placeholder="Name Search ..."
              onChangeText={(search_request) => this.setState({search_request:search_request,searching:true},this.fetch_more_data_from_server(this.state.file_source,search_request:search_request))}
              value={this.state.search_requeste}
              underlineColorAndroid={'transparent'}
              style={{paddingLeft:10,marginLeft:15,width:width/2.5,borderWidth:1,borderColor:'#ccc'}}/>
            </View>
            {this.props.case_type_id.case_type_id==1?<View style={{flex:0.5,marginRight:10,borderWidth:1,borderColor:'#ccc'}}>
                  <Picker selectedValue={this.state.file_source}
                    style={{width:width/2.8}}
                    onValueChange={(file_source) => ( this.setState({file_source:file_source,filters:true},this.fetch_more_data_from_server(file_source:file_source,this.state.search_request)))}>
                  <Picker.Item label = "Select File Source" value = '' />
                  <Picker.Item label = "CCRB" value = 'CCRB' />
                  <Picker.Item label = "CCTNS" value = 'CCTNS' />
                  <Picker.Item label = "CIS" value = 'CIS' />
                  <Picker.Item label = "JRMS" value = 'JRMS' />
                  <Picker.Item label = "SNS" value = 'SNS' />
                  </Picker>
            </View>:null}
          </View>
          <View><View style={{borderBottomWidth:0.5,marginLeft:15,marginRight:15,marginTop:10,paddingBottom:10,borderBottomColor:"#ccc",flexDirection:'row'}}>
            <View  style={{flex:0.2}}>
              <Text style={{textAlign:'center',fontSize:12,fontWeight:'600',color:'#000'}}>Photo</Text>
            </View>
            <View style={{flex:0.3,justifyContent:'center'}}>
              <Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>Full Name</Text>
            </View>
            <View style={{flex:0.3}}>
              {(this.props.case_type_id.case_type_id==7)?<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>FBID</Text>:<Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>Enrolled by</Text>}
            </View>
            <View style={{flex:0.2,justifyContent:'center'}}>
              <Text style={{fontSize:12,fontWeight:'600',color:'#000'}}>Edit</Text>
            </View>

          </View>
          <FlatList
          data={this.state.JSON_from_server || []}
          style={{backgroundColor:'#fff',marginLeft:15,paddingRight:15,marginBottom:80}}
          renderItem={({ item }) => (<TouchableOpacity   onPress={this.onProfileSubmit.bind(this,item)} style={{paddingTop:5,paddingBottom:5,borderBottomWidth:0.5,borderBottomColor:"#dedede",alignItems:'center',flexDirection:'row'}}>
                      <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                      <TouchableOpacity onPress={() => {this.setModalVisible(true,item)}}>
                      <Image
                      resizeMode='contain'
                      source={item.photo!=null?{uri:this.props.case_type_id.case_type_id==7?SERVICE_URL+'fr_images/facebook/'+item.photo:SERVICE_URL+'enrolled_images/thumbs/'+item.folder+'/'+item.photo} :require('../../images/person.png')}
                      style={{height:60,width:60,borderRadius:30}}/>
                      </TouchableOpacity>

                      </View>
                      <View style={{flex:0.3,paddingLeft:10,justifyContent:'center'}}>
                        <Text style={{fontSize:height/45}}>{item.name}</Text>

                      </View>
                      <View style={{paddingLeft:10,flex:0.3}}>
                        {(this.props.case_type_id.case_type_id==7)?<Text style={{color:'#000',fontSize:height/45}}>{item.FBID.toString()}</Text>:<Text style={{color:'#000',fontSize:height/45}}>{item.enrolled_by}</Text>}
                      </View>
                      {(this.props.OTPVerificationResponse.data.phone=='8790087842'|| this.props.OTPVerificationResponse.data.phone=='8977988889'|| this.props.OTPVerificationResponse.data.phone=='1234567890' ||this.props.OTPVerificationResponse.data.phone=='9490618755' )?<TouchableOpacity onPress={this.onPressMove.bind(this,item)} style={{justifyContent:'center'}}>

                          <Image source={require("../../images/1024px-Page_issue_icon_-_move.svg.png")} style={{height:20,width:20,alignItems:'center'}} />
                      </TouchableOpacity>:null}
                      <TouchableOpacity style={{flex:0.2,paddingLeft:10,justifyContent:'center'}}>

                          <Image source={require("../../images/edit.png")} style={{height:30,width:30,alignItems:'center'}} />
                      </TouchableOpacity>
                      {(this.props.OTPVerificationResponse.data.phone=='8790087842'|| this.props.OTPVerificationResponse.data.phone=='8977988889'|| this.props.OTPVerificationResponse.data.phone=='1234567890' ||this.props.OTPVerificationResponse.data.phone=='9490618755' )?<TouchableOpacity onPress={this._deleteImage.bind(this,item)} style={{justifyContent:'center'}}>

                          <Image source={require("../../images/delete.png")} style={{height:20,width:20,alignItems:'center'}} />
                      </TouchableOpacity>:null}

                  </TouchableOpacity>
                )}
                keyExtractor={item => (this.props.case_type_id.case_type_id==7)?item.FBID:item.id}
             ItemSeparatorComponent={this.FlatListItemSeparator}

             ListFooterComponent={this.Render_Footer}
             onRefresh={this.handleRefresh}
             refreshing={this.state.refreshing}
             onEndReached={this.handleLoadMore}
             onEndReachedThreshold={50}
                /></View>
                <Modal  style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}} visible={this.state.modalVisible}
              onRequestClose={() => {}}>
              <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
                 this.closeModal ()
               }}>
                  <Image source={require('../../images/19-512.png')} style={{height:30,width:30}}
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
                    source={{uri:SERVICE_URL+`enrolled_images/${this.state.folderName}/${this.state.img_name}`}}
                    style={{height:height/2,width:width}}/>
                </ViewControl>
                </Modal>
                <PopupDialog
                width={0.75}
                containerStyle={{justifyContent:'center',alignItems:'center'}}
                dialogStyle={{color:'#f00'}}
                overlayBackgroundColor="transparent"
                overlayPointerEvents="auto"
                dialogStyle={{justifyContent:'center'}}
                height={0.3}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogTitle={<DialogTitle title="Select Person Type" />}

          >
          <View style={{backgroundColor:'#fff'}}>

          {this._getPersonType()}
          <View style={{marginTop:10,marginBottom:10,flexDirection:'row',justifyContent:'center'}}>

          <TouchableOpacity onPress={this._submitMove.bind(this)} style={{flex:0.5,marginLeft:8}}>
              <Text style={{textAlign:'center',fontSize:20,color:'#fff',paddingVertical:8,backgroundColor:'#F05137'}}>Move</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:0.5,marginLeft:8}} onPress={() => {
            this.popupDialog.dismiss();
          }}>
          <Text style={{textAlign:'center',fontSize:20,color:'#3E47A6',paddingVertical:8,backgroundColor:'#ccc'}}  >Cancel</Text>
          </TouchableOpacity>
          </View>
          </View>

          </PopupDialog>
           </View>
           <BusyIndicator/>
           <Footer style={{height:40,backgroundColor:'#fff'}}>
           <BottomBar navigator = { this.props.navigator } detectStyle={{justifyContent:'flex-end'}} enrollStyle={{justifyContent:'flex-end'}} Style={{justifyContent:'flex-end'}}/>
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
    height:40,
    backgroundColor:'#F05137',
    borderColor:'#F05137',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'600'
  },
  text:{
    textAlign:'center',
    color:'#000',
    fontWeight:'600'
  },
  footerStyle:
  {
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: '#009688'
  },

  TouchableOpacity_style:
  {
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336',
    borderRadius: 5,
  },

  TouchableOpacity_Inside_Text:
  {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },

  flatList_items:
  {
    fontSize: 20,
    color: '#000',
    padding: 10
  }
});

const mapStateToProps = (state) => {
  debugger;
  return {
    case_type_id:faceSelectors.getCaseIdResponse(state),
    personList: faceSelectors.getPersonListView(state),
    OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
    isEdited:faceSelectors.isEdited(state),
    isIndividual:faceSelectors.isIndividual(state),
    person_delete:dropdownSelectors.getPersonDeleteResponse(state),
    isPersonDelete:dropdownSelectors.isPersonDelete(state),
    case_type_person:faceSelectors.getCaseTypesResponse(state),
    isMoved:faceSelectors.isMoved(state),
    movePersonType:faceSelectors.getMovePersonType(state)
  };
}

export default connect(mapStateToProps)(PersonsList);
