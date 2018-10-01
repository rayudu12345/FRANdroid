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
  Modal,
  FlatList,
  Alert,
  Dimensions,
  Platform,
  Easing,
  ActivityIndicator
} from 'react-native';
import ViewControl from 'react-native-zoom-view'
import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';

import { SERVICE_URL } from '../Constants'
import Prompt from 'react-native-prompt';
import OfflineNotice from './OfflineNotice';
import ZoomImage from 'react-native-zoom-image';


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
import Menu from './Menu';
import DashBoard from './DashBoard';
import IndividualPersonList from './IndividualPersonList';
import * as dropdownActions from '../../store/dropdown/actions';
import * as dropdownSelectors from '../../store/dropdown/reducer';
import DetectMatched from './DetectMatched';


export class TotalSearchListPage extends React.PureComponent {
  constructor(props) {
    debugger;
     //const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
        //console.log(this.props.galleryView);
        this.state={
          isOpen:false,
          loading: false,
           page: 1,
           error: null,
           comment_value:false,
           JSON_from_server: [],
           modalVisible: false,
           comment: '',
           promptVisible: false,
           refreshing: false,
           //dataSource: ds.cloneWithRows([]),
        }
      }


      componentDidMount(){
        this.fetch_more_data_from_server();

        }

    fetch_more_data_from_server =()=>  {
    const { page } = this.state;
      var person_id =this.props.OTPVerificationResponse.data.id
      console.log(person_id,'person_id');

      this.setState({ loading: true });
          fetch(SERVICE_URL+`case-types-matched-list?&id=${person_id}&page=${page}`)
              .then((response) => response.json())
              .then((responseJson) =>{

                  this.setState({
                    JSON_from_server: page === 1 ? responseJson : [...this.state.JSON_from_server, ...responseJson],
                     error: responseJson.error || null,
                     loading: false,
                     refreshing: false
                  });

              }).catch((error) => {
                this.setState({ error, loading: false });
                  console.log(error,'error');
              });
            }

handleRefresh = () => {
   this.setState(
     {
       page: 1,
       refreshing: true
     },

     () => {
       this.fetch_more_data_from_server();
     }

   );
   console.log(this.state.page,'handleRefresh');
 };

 handleLoadMore = () => {
   this.setState(
     {
       page: this.state.page + 1
     },

     () => {
       this.fetch_more_data_from_server();
     }

   );
   console.log(this.state.page,'handleLoadMore');
 };

 Render_Footer=()=>{
   if (!this.state.loading) return null;
     return (
       <View
         style={{
           paddingVertical: 20,
           borderTopWidth: 1,
           borderColor: "#CED0CE"
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
           backgroundColor: "#d1d1d1",
         }}
       />
     );
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

componentWillReceiveProps(nextProps){
  if(nextProps.isMatched==true){
    this.props.navigator.resetTo({
      component:DetectMatched,
      name:'detect-matched'
    })
  }
  //loaderHandler.hideLoader('Load..');

  }

onProfileSubmit(profile_id){
  var params={
    person_id:profile_id.person_id,
    matched_id:profile_id.id
  }
  console.log(params,'params person_id');
  this.props.dispatch(faceActions.setEmpty({}));
  this.props.dispatch(faceActions.loadIndividualListFace({params:params}));

  //loaderHandler.hideLoader();

}


onPressComment(profile_id){
loaderHandler.showLoader('Load..');
  console.log(profile_id,'profile_id');
  //this.setState({ promptVisible: true });
  var params = { source_image:profile_id.source_image,id:this.props.OTPVerificationResponse.data.id};
  console.log(params,'paramss');
  this.props.dispatch(dropdownActions.setEmpty({}));
  this.props.dispatch(dropdownActions.detectMatched({params:params}));

// if(this.state.comment_value==true){
//   var params = {
//     matched_id:profile_id.id,
//     name:this.props.OTPVerificationResponse.data.name,
//     comment:this.state.comment
//   }
//   this.props.dispatch(dropdownActions.detectComment({params:params}));
// }
}

onPressCommentSubmit(){
  console.log(this.state.comment,'person_id');
  //if(this.state.comment_value==true){
  setTimeout(()=>{var params = {
     matched_id:this.props.person_id.profile_id,
     name:this.props.OTPVerificationResponse.data.name,
     comment:this.state.comment
   }
   this.props.dispatch(dropdownActions.detectComment({params:params}));
   setTimeout(()=>{Alert.alert('Success','Commented Successfully');},1000);
 },1000);
}






componentWillMount(){
  console.log(this.props.person_id,'person_id');
}

back(){
  this.props.navigator.push({
    component:DashBoard,
    name:'dash-board'
  })
}

setModalVisible(visible,dd) {
    this.setState({modalVisible: visible,source_image:dd.source_image,folder:dd.folder});
  }

  closeModal = () => {
      this.setState({modalVisible: false,source_image:'',folder:''})
  }

render(){
  console.log(this.state.JSON_from_server ,'list data');
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
              <Text style={{color:'#374176',fontSize:height/40}}>Person Search History</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

            </View>
          </View>
          <View style={{borderBottomWidth:0.5,marginLeft:scale(15),marginRight:scale(15),marginTop:verticalScale(10),paddingBottom:verticalScale(10),borderBottomColor:"#ccc",flexDirection:'row'}}>
          <View style={{flex:0.2}}>
            <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Subject Image</Text>
          </View>


            <View style={{flex:0.4}}>
              <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Searched By</Text>
            </View>
            <View style={{flex:0.4}}>
              <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Searched on</Text>
            </View>



          </View>
          <FlatList
          data={this.state.JSON_from_server }
          style={{backgroundColor:'#fff',marginLeft:scale(15),paddingRight:scale(15),marginBottom:verticalScale(40)}}
          renderItem={({ item }) =>(<View  style={{borderBottomColor:'#ccc',borderBottomWidth:0.5}}>
                    <View style={{paddingTop:verticalScale(8),paddingBottom:verticalScale(8),flexDirection:'row'}}>
                    <View style={{flex:0.2}}>
                    <TouchableOpacity onPress={() => {this.setModalVisible(true,item)}}>
                    <Image source={{uri:SERVICE_URL+`fr_images/${item.folder}-search-history/${item.source_image}`}}
                    style={{height:50,width:50,borderRadius:25}}/>
                    </TouchableOpacity>

                    </View>

                      <View style={{flex:0.4,justifyContent:'center'}}>
                        <Text onPress ={this.onPressComment.bind(this,item)} style={{marginRight:scale(10),borderBottomColor:'#e3231e',fontSize:moderateScale(12,0.5),color:'#374176'}} >{item.detected_by}</Text>
                      </View>
                      <View style={{flex:0.4,justifyContent:'center'}}>
                        <Text style={{marginRight:scale(10),borderBottomColor:'#e3231e',fontSize:moderateScale(12,0.5),color:'#374176'}} >{item.created_at}</Text>
                      </View>


                    </View>

                  </View>
                )}
                keyExtractor={item => item.id}
             ItemSeparatorComponent={this.FlatListItemSeparator}

             ListFooterComponent={this.Render_Footer}
             onRefresh={this.handleRefresh}
             refreshing={this.state.refreshing}
             onEndReached={this.handleLoadMore}
             onEndReachedThreshold={50}
                />
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
                    resizeMode={'stretch'}
                    enableScaling={false}
                    easingFunc={Easing.ease}
                    source={{uri:SERVICE_URL+`fr_images/`+this.state.folder+`-search-history/`+this.state.source_image}}
                    style={{height:height/2,width:width}}/>
                </ViewControl>
                </Modal>
                <Prompt
                  title="Comment"
                  placeholder="Enter Comment"
                  visible={this.state.promptVisible}
                  onCancel={() => this.setState({ promptVisible: false, comment: "You cancelled" })}
                  onSubmit={(value) => this.setState({ promptVisible: false, comment_value:true, comment: `${value}` },this.onPressCommentSubmit())}/>

           </View>
           <BusyIndicator/>
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
    OTPVerificationResponse:faceSelectors.getOTPVerificationResponse(state),
    person_id:faceSelectors.getPersonIdResponse(state),
    mathcedList: faceSelectors.getMatchedListView(state),
    isIndividual:faceSelectors.isIndividual(state),
    isMatched:dropdownSelectors.isMatched(state)
  };
}

export default connect(mapStateToProps)(TotalSearchListPage);
