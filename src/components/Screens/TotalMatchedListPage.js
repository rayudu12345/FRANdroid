import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Alert,
  Navigator,
  ListView,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Platform,
  Easing,
  ActivityIndicator
} from 'react-native';
import Prompt from 'react-native-prompt';
import ZoomImage from 'react-native-zoom-image';
import { SERVICE_URL } from '../Constants'
import OfflineNotice from './OfflineNotice';
import ViewTransformer from 'react-native-view-transformer';

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
import Modal from "react-native-modal";
import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import * as dropdownActions from '../../store/dropdown/actions';
import * as dropdownSelectors from '../../store/dropdown/reducer';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import DashBoard from './DashBoard';
import IndividualPersonList from './IndividualPersonList';
import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';

export class TotalMatchedListPage extends React.Component {
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
           refreshing: false,
           comment_value:false,
           JSON_from_server: [],
           comment: '',
           comment_data:'',
           modalVisible: false,
           compareVisible:false,
           promptVisible: false
           //dataSource: ds.cloneWithRows([]),
        }
      }


      componentDidMount(){
        this.fetch_more_data_from_server();

        }

    fetch_more_data_from_server =()=>  {
    const { page } = this.state;
      var person_id =this.props.OTPVerificationResponse.data.id

      this.setState({ loading: true });
          fetch(SERVICE_URL+`matched-case-records-list?id=${person_id}&page=${page}`)
              .then((response) => response.json())
              .then((responseJson) =>{

                  this.setState({
                    JSON_from_server: page === 1 ? responseJson : [...this.state.JSON_from_server, ...responseJson],
                     error: responseJson.error || null,
                     loading: false,
                     refreshing: false
                  });
                  console.log(responseJson,'responseJson');
                  console.log(this.state.JSON_from_server,'more');
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
  if(nextProps.isIndividual==true){
    this.props.navigator.push({
      component:IndividualPersonList,
      name:'individual-person-list'
    });
  }else if(nextProps.isComment==true){
  this.setState({comment_data:nextProps.getComment})
  console.log(nextProps.getComment,'nextProps');
  loaderHandler.hideLoader('Load..');
}

  }



onProfileSubmit(profile_id){
loaderHandler.showLoader('Load..');
  var params={
    person_id:profile_id.person_id,
    case_id:profile_id.folder
  }
  console.log(params,'params person_id');
  this.props.dispatch(faceActions.setEmpty({}));
  this.props.dispatch(faceActions.loadIndividualListFace({params:params}));

loaderHandler.hideLoader();

}




onPressComment(profile_id){
  console.log(profile_id,'profile_id');
  this.setState({ promptVisible: true });
  var params = { profile_id:profile_id.id};
  this.props.dispatch(dropdownActions.setPersonId(params:params));
// if(this.state.comment_value==true){
//   var params = {
//     matched_id:profile_id.id,
//     name:this.props.OTPVerificationResponse.data.name,
//     comment:this.state.comment
//   }
//   this.props.dispatch(dropdownActions.detectComment({params:params}));
// }
}

setModalVisible(visible,dd) {

  var params = {
    matched_id:dd.id,
    case_id:dd.folder,
    id:this.props.OTPVerificationResponse.data.id

  }
  console.log(params,'dd');
  this.props.dispatch(dropdownActions.getComment({params:params}))
    this.setState({modalVisible: visible,detected_by:dd.detected_by,detected_on:dd.detected_on,detection_comment:dd.detection_comment});
  }

  closeModal = () => {
      this.setState({modalVisible: false,detected_by:'',detected_on:'',detection_comment:''})
  }

  setCompareModalVisible(visible,dd) {
      this.setState({compareVisible: visible,score: dd.matched_score,source:dd.source_image,img_name:dd.photo,folderName:dd.folder});
    }

    closeCompare = () => {
        this.setState({compareVisible: false})
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

render(){
  console.log(this.state.comment_data,'getComment');
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
              <Text style={{color:'#374176',fontSize:height/40}}>Total Matched Detected List</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

            </View>
          </View>
          <View style={{borderBottomWidth:0.5,marginLeft:15,marginRight:15,marginTop:10,paddingBottom:10,borderBottomColor:"#ccc",flexDirection:'row'}}>

          <View style={{flex:0.2}}>
            <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Subject Image</Text>
          </View>
            <View style={{flex:0.17}}>
              <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Matched Image</Text>
            </View>
            <View  style={{flex:0.13}}>
              <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Compare</Text>
            </View>

            <View  style={{flex:0.3}}>
              <Text style={{paddingRight:8,fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Full Name</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:moderateScale(10,0.5),fontWeight:'600',color:'#000'}}>Comment</Text>
            </View>


          </View>
          <FlatList
          data={this.state.JSON_from_server || []}
          style={{backgroundColor:'#fff',marginLeft:15,paddingRight:15,marginBottom:40}}
          renderItem={({ item }) =>(<TouchableOpacity onPress={this.onProfileSubmit.bind(this,item)} style={{borderBottomColor:'#ccc',borderBottomWidth:0.5}}>
                    <View style={{paddingTop:8,paddingBottom:8,flexDirection:'row'}}>

                      <View style={{flex:0.2}}>

                      <ZoomImage
                      duration={200}
                      imgStyle={{height:50,width:50,borderRadius:25}}
                      moveCapture={true}
                      enableScaling={false}
                      easingFunc={Easing.ease}
                      source={{uri:SERVICE_URL+`fr_images/persons-search-history/${item.source_image}`}}
                      style={{height:50,width:50,borderRadius:25}}/>
                      </View>
                      <View style={{flex:0.17}}>
                        <ZoomImage
                        duration={200}
                        imgStyle={{height:50,width:50,borderRadius:25}}
                        moveCapture={true}
                        enableScaling={false}
                        easingFunc={Easing.ease}
                         source={{uri:SERVICE_URL+`enrolled_images/`+item.folder+'/'+item.photo}}
                         style={{height:50,width:50,borderRadius:25}}/>
                      </View>

                      <TouchableOpacity   style={{flex:0.13,alignItems:'center',justifyContent:'center'}} onPress={() => {this.setCompareModalVisible(true ,item)}}>
                      <Image  source={require('../../images/compare.png')} style={{height:30,width:30}}/>
                      </TouchableOpacity>
                      <View style={{flex:0.3,justifyContent:'center'}}>
                        <Text style={{marginRight:10,borderBottomColor:'#e3231e',fontSize:moderateScale(12,0.5),color:'#374176'}} numberOfLines={1}>{item.name}</Text>
                      </View>
                      <TouchableOpacity onPress={() => {this.setModalVisible(true ,item)}} style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                          <Text style={{borderWidth:1, borderColor:'#ab8ce4',backgroundColor:'#ab8ce4',padding:5,color:'#fff',fontSize:moderateScale(10,0.5)}}>Comment</Text>
                      </TouchableOpacity>


                    </View>

                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
             ItemSeparatorComponent={this.FlatListItemSeparator}

             ListFooterComponent={this.Render_Footer}
             onRefresh={this.handleRefresh}
             refreshing={this.state.refreshing}
             onEndReached={this.handleLoadMore}
             onEndReachedThreshold={50}
                />
                <Modal  isVisible={this.state.modalVisible}
                backdropColor="#333"
                backdropOpacity={0.5}
              onRequestClose={() => {}}>

              <View style={{paddingTop:30,paddingBottom:30,alignSelf: 'center',alignItems:'center',justifyContent:'center'}}>
              <View style={{paddingTop:30,paddingBottom:30,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
               <View  style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#ccc',paddingLeft:10,paddingRight:10}}>
              <View style={{flex:0.4}}>
                <Text style={{color:'#000',fontSize:14}}>Comment</Text>

              </View>
              <View style={{flex:0.3,paddingLeft:5}}>
              <Text style={{color:'#000',fontSize:14}}>Comment By</Text>


              </View>
              <View style={{flex:0.3,paddingLeft:5}}>
              <Text style={{color:'#000',fontSize:14}}>Comment On</Text>


              </View>
              </View>
              {this.state.comment_data!=''?this.state.comment_data.comments.map((i,index)=>{ return <View  key={index} style={{flexDirection:'row',paddingLeft:10,paddingRight:10}}>
              <View style={{flex:0.4}}>
                <Text >{i.comment}</Text>

              </View>
              <View style={{flex:0.3,paddingLeft:5}}>
              <Text>{i.comment_by}</Text>


              </View>
              <View style={{flex:0.3,paddingLeft:5}}>
              <Text>{i.commented_on}</Text>


              </View>
              </View>}):<Text>No Comments</Text>}

              </View>
              <TouchableHighlight  style={{marginTop:height/40,alignItems:'center'}} onPress={() => {
                  this.closeModal ()
                }}>
                  <Text style={{color:'#fff',fontSize:16,width:100,height:30,textAlign:'center',paddingTop:3,backgroundColor:'#ff3020'}}>Close</Text>
                </TouchableHighlight>
                </View>
            </Modal >
            <Modal  style={{ flex:1,width:width/1.1,backgroundColor:'#333'}} backdropColor="black"
            backdropOpacity={1} visible={this.state.compareVisible}
          onRequestClose={() => {}}>
          <TouchableOpacity style={{alignItems:'flex-end',justifyContent:'flex-end'}} onPress={() => {
             this.closeCompare ()
           }}>
              <Image source={require('../../images/19-512.png')} style={{height:30,width:30}}
              />
          </TouchableOpacity>

          <View style={{flex:1,alignSelf: 'center',alignItems:'center',justifyContent:'center'}}>
          <View style={{flexDirection:'row',paddingLeft:scale(8),paddingRight:scale(8)}}>
          <View style={{flex:0.5}}>
            <Text style={{color:'#fff',fontSize:moderateScale(10)}}>Subject Image</Text>
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
            source={{uri:SERVICE_URL+`fr_images/persons-search-history/`+this.state.source}} style={{borderWidth:1,borderColor:'#000',width: width/2.1, height: height/2}} />
              </ViewTransformer>
          </View>
          <View style={{flex:0.5,paddingLeft:5}}>
          <View style={{flexDirection:'row'}}>
          <View style={{flex:0.6}}>
          <Text style={{color:'#fff',fontSize:moderateScale(10)}}>Matched Image</Text>
          </View>
          <View style={{flex:0.4,alignItems:'flex-end'}}>
          <Text style={{color:'#fff',fontSize:moderateScale(8),textAlign:'center'}}>Score:{this.state.score}</Text>
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

          </View>
          </View>

          {/*<TouchableHighlight  style={{marginTop:height/20,alignItems:'center'}} onPress={() => {
              this.closeModal ()
            }}>
              <Text style={{color:'#fff',fontSize:16,width:100,height:30,textAlign:'center',paddingTop:3,backgroundColor:'#ff3020'}}>Close</Text>
            </TouchableHighlight>*/}
            </View>

        </Modal >
                <Prompt
                  title="Comment"
                  placeholder="Enter Comment"
                  visible={this.state.promptVisible}
                  onCancel={() => this.setState({ promptVisible: false, comment: "You cancelled" })}
                  onSubmit={(value) => this.setState({ promptVisible: false, comment_value:true, comment: `${value}` },this.onPressCommentSubmit())}/>
                <BusyIndicator/>
           </View>
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
    person_id:dropdownSelectors.getPersonIdResponse(state),
    isIndividual:faceSelectors.isIndividual(state),
    getComment:dropdownSelectors.getCommentData(state),
    isComment:dropdownSelectors.isComment(state)
  };
}

export default connect(mapStateToProps)(TotalMatchedListPage);
