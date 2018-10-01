import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  PixelRatio,
  Image,
  Navigator,
  ListView,
  FlatList,
  Dimensions,
  Platform,
  Easing,
  ActivityIndicator
} from 'react-native';
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
  Picker,
  Button,
  Right
 } from 'native-base';
import { connect } from 'react-redux';
import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';
import {FRStatusBar} from '../partials/FRStatusBar';
import AlertBox from '../../Core/AlertBox';
import * as dropdownActions from '../../store/dropdown/actions';
import * as dropdownSelectors from '../../store/dropdown/reducer';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import * as faceActions from '../../store/face/actions';
import * as faceSelectors from '../../store/face/reducer';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import DashBoard from './DashBoard';
import { SERVICE_URL } from '../Constants'
import IndividualPersonList from './IndividualPersonList';

import Prompt from 'react-native-prompt';

export class FaceBookTotalMatchedListPage extends Component {
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
           JSON_from_server: [],
           comment: '',
           promptVisible: false
           //dataSource: ds.cloneWithRows([]),
        }
      }


      componentDidMount(){
        this.fetch_more_data_from_server();

        }

    fetch_more_data_from_server =()=>  {
    const { page } = this.state;
      var person_id =this.props.person_id.person_id

      this.setState({ loading: true });
          fetch(SERVICE_URL+`facebook-matched-json-history-list?&page=${page}`)
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

onProfileSubmit(profile_id){
loaderHandler.showLoader('Load..');
  var params={
    person_id:profile_id.person_id
  }
  console.log(params,'params person_id');

  this.props.dispatch(faceActions.loadIndividualList({params:params}));
  setTimeout(()=> {
    this.props.navigator.push({
      component:IndividualPersonList,
      name:'individual-person-list'
    });
  }, 10);

}



onPressComment(profile_id){
  console.log(profile_id,'profile_id');
   this.setState({ promptVisible: true });
   var params = { profile_id:profile_id.matched_id};
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

onPressCommentSubmit(){
  console.log(this.state.comment,'person_id');
  //if(this.state.comment_value==true){
  setTimeout(()=>{var params = {
     matched_id:this.props.person_id.profile_id,
     name:this.props.OTPVerificationResponse.data.name,
     comment:this.state.comment
   }
   this.props.dispatch(dropdownActions.faceBookDetectComment({params:params}));
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
  //console.log(this.props.mathcedList.data ,'list data');
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
              <Text style={{color:'#374176',fontSize:height/40}}>Facebook Total Matched Detected List</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>

            </View>
          </View>
          <View style={{borderBottomWidth:0.5,marginLeft:15,marginRight:15,marginTop:10,paddingBottom:10,borderBottomColor:"#ccc",flexDirection:'row'}}>
            <View  style={{flex:0.4}}>
              <Text style={{paddingRight:8,fontSize:10,fontWeight:'600',color:'#000'}}>Full Name</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={{fontSize:10,fontWeight:'600',color:'#000'}}>Subject Image</Text>
            </View>
            <View style={{flex:0.2}}>
              <Text style={{fontSize:10,fontWeight:'600',color:'#000'}}>Matched Image</Text>
            </View>
            <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:10,fontWeight:'600',color:'#000'}}>Comment</Text>
            </View>


          </View>
          <FlatList
          data={this.state.JSON_from_server || []}
          style={{backgroundColor:'#fff',marginLeft:15,paddingRight:15,marginBottom:40}}
          renderItem={({ item }) =>(<TouchableOpacity  style={{borderBottomColor:'#ccc',borderBottomWidth:0.5}}>
                    <View style={{paddingTop:8,paddingBottom:8,flexDirection:'row'}}>
                      <View style={{flex:0.4,justifyContent:'center'}}>
                        <Text style={{color:'#000'}} numberOfLines={1}>{item.Name}</Text>
                      </View>
                      <View style={{flex:0.2}}>

                      <ZoomImage
                      duration={200}
                      imgStyle={{height:50,width:50,borderRadius:25}}
                      moveCapture={true}
                      enableScaling={false}
                      easingFunc={Easing.ease}
                      source={item.source_image!=null?{uri:SERVICE_URL+`fr_images/facebook-search-history/${item.source_image}`}:require('../../images/person.png')}
                      style={{height:50,width:50,borderRadius:25}}/>
                      </View>
                      <View style={{flex:0.2}}>
                        <ZoomImage
                        duration={200}
                        imgStyle={{height:50,width:50,borderRadius:25}}
                        moveCapture={true}
                        enableScaling={false}
                        easingFunc={Easing.ease}
                         source={item.photo!=null?{uri:SERVICE_URL+`fr_images/facebook/`+item.photo}:require('../../images/person.png')}
                         style={{height:50,width:50,borderRadius:25}}/>
                      </View>
                      <TouchableOpacity onPress ={this.onPressComment.bind(this,item)} style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
                          <Text style={{borderWidth:1, borderColor:'#ab8ce4',backgroundColor:'#ab8ce4',padding:5,color:'#fff',fontSize:12}}>Comment</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.matched_id}
             ItemSeparatorComponent={this.FlatListItemSeparator}

             ListFooterComponent={this.Render_Footer}
             onRefresh={this.handleRefresh}
             refreshing={this.state.refreshing}
             onEndReached={this.handleLoadMore}
             onEndReachedThreshold={50}
                />
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
    mathcedList: faceSelectors.getMatchedListView(state)
  };
}

export default connect(mapStateToProps)(FaceBookTotalMatchedListPage);
