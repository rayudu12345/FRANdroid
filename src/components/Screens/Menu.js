import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ListView,
  Alert
} from 'react-native';

import DashBoard from './DashBoard';
import FaceRecognition from './FaceRecognition';
import EnrolFaceDetection from './EnrolFaceDetection';
import AddUser from './AddUser';
import PersonsList from './PersonsList';
import Login from './Login';
import TotalMatchedListPage from './TotalMatchedListPage';
import FaceBookTotalMatchedListPage from './FaceBookTotalMatchedListPage';

import TotalSearchListPage from './TotalSearchListPage';
import FaceBookTotalSearchListPage from './FaceBookTotalSearchListPage';



import FaceBookDetect from './FaceBookDetect';
import * as faceActions from '../../store/face/actions';
import * as dropdownActions from '../../store/dropdown/actions';
import * as faceSelectors from '../../store/face/reducer';

const {width, height} = Dimensions.get('window');
export  class Menu extends Component {
  constructor(props) {
    super(props);
    this.state={
      isSelected:false,
      isOpen:false,
      isDetectOpen:false,
      isSearchOpen:false,
    }
  }
  logout() {
       debugger;
       var that = this;
       var params={
         phone:this.props.OTPVerificationResponse.data.phone
       }
       that.props.dispatch(faceActions.userLogout({params:params}));
       AsyncStorage.removeItem('LOGIN_STATUS',()=>{
         that.props.dispatch(faceActions.logout());
         Alert.alert('Alert','Logged out successfully ');
         that.props.navigator.resetTo({
              component: Login,
              name: 'login'
         });
       });
     }


  componentWillMount(){
    //console.log(this.props.OTPVerificationResponse.data,'this.props.OTPVerificationResponse.data.role');
    var params ={
      role:this.props.OTPVerificationResponse.data.role,
      id:this.props.OTPVerificationResponse.data.id,
      ps_id:this.props.OTPVerificationResponse.data.ps_id,
      district_id:this.props.OTPVerificationResponse.data.district_id
    };
    //console.log(params,'params');
    this.props.dispatch(faceActions.loadUserPersonList({params:params}))
  }
  //
  // componentWillReceiveProps(nextProps){
  //   console.log(nextProps.userPersonList,'userPersonList');
  // }
  //
  //
    _renderdata(){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      if(this.state.isOpen==true){
    return <ListView
        dataSource={ds.cloneWithRows(this.props.userPersonList)}
        enableEmptySections={true}
        ref={ref => this.listView = ref}
              onContentSizeChange={() => {
              this.listView.scrollTo({y: 0})
               }}
        style={{}}
        renderRow={(rowData) =>
          <TouchableOpacity onPress={this.onProfileSubmit.bind(this,rowData)}>
            <Text style={{paddingLeft:48,paddingTop:14,color:'#fff',fontSize:16}} numberOfLines={1}>{rowData.title}</Text>
          </TouchableOpacity>
        }/>
      }else{
        return <View/>
      }


  }

  _renderDetectListdata(){

    if(this.state.isDetectOpen==true){
  return <View>
            <Text onPress={this.onPressTotalMatched.bind(this)} style={{paddingLeft:48,paddingTop:14,color:'#fff',fontSize:16}} numberOfLines={1}>Total Detect List Page</Text>
            <Text onPress={this.onPressFacebookTotalMatched.bind(this)} style={{paddingLeft:48,paddingTop:14,color:'#fff',fontSize:16}} >Total Facebook Detect List Page</Text>
        </View>
    }else{
      return <View/>
    }


  }

  _renderSearchListdata(){

    if(this.state.isSearchOpen==true){
  return <View>
            <Text onPress={this.onPressSearchMatched.bind(this)} style={{paddingLeft:48,paddingTop:14,color:'#fff',fontSize:16}} numberOfLines={1}>Total Search List Page</Text>
            <Text onPress={this.onPressFacebookTotalSearched.bind(this)} style={{paddingLeft:48,paddingTop:14,color:'#fff',fontSize:16}} >Total Facebook Search List Page</Text>
        </View>
    }else{
      return <View/>
    }


  }



  componentDidMount(){
  
    this.props.dispatch(dropdownActions.getAllLanguages({}));
    this.props.dispatch(dropdownActions.getStates({}));

    this.props.dispatch(dropdownActions.getNationality({}));
    var params={
      user_id:this.props.OTPVerificationResponse.data.id
    }
    this.props.dispatch(dropdownActions.getAllStates({params:params}));
    var params={
      id:this.props.OTPVerificationResponse.data.id
    }
    this.props.dispatch(faceActions.caseTypes({params:params}));
    //this.props.dispatch(faceActions.caseCategory({params:params}));

    var params={
      state_id:this.props.OTPVerificationResponse.data.state_id
    }
    this.props.dispatch(dropdownActions.idbasedDistrict({params:params}));
    this.props.dispatch(dropdownActions.resucueDistrict({params:params}));


    var params={
      district_id:this.props.OTPVerificationResponse.data.district_id
    }
    this.props.dispatch(dropdownActions.districtIdBasedSubDivision({params:params}));

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  toggleDetect() {
    this.setState({
      isDetectOpen: !this.state.isDetectOpen,
    })
  }

  toggleSearch() {
    this.setState({
      isSearchOpen: !this.state.isSearchOpen,
    })
  }


  onProfileSubmit(profile_id){
    var params ={
      title:profile_id.title,
      case_type_id:profile_id.case_type_id
    };
    //console.log(profile_id,'person_id');
    this.props.dispatch(faceActions.setCaseId(params:params));
    this.props.navigator.resetTo({
      component:PersonsList,
      name:'persons-list'
    });
  }


onPressDetect(){
  this.props.navigator.replace({
    component:FaceRecognition,
    name:'face-recognition'
  });
}

onPressTotalMatched(){
  this.props.navigator.replace({
    component:TotalMatchedListPage,
    name:'total-matched-list-page'
  });
}

onPressSearchMatched(){
  this.props.navigator.resetTo({
    component:TotalSearchListPage,
    name:'total-search-list-page'
  });
}

onPressFacebookTotalMatched(){
  this.props.navigator.replace({
    component:FaceBookTotalMatchedListPage,
    name:'facebook-total-matched-list-page'
  });
}

onPressFacebookTotalSearched(){
  this.props.navigator.replace({
    component:FaceBookTotalSearchListPage,
    name:'facebook-total-search-list-page'
  });
}

onPressEnrol(){
  this.props.navigator.replace({
    component:EnrolFaceDetection,
    name:'enrol-face-detection'
  });
}
onPressDashboard(){
  this.props.navigator.replace({
    component:DashBoard,
    name:'dash-board'
  });
}

onPressFacebook(){
  this.props.navigator.replace({
    component:FaceBookDetect,
    name:'face-book-detect'
  });
}

onPressAddUser(){
  this.props.navigator.replace({
    component:AddUser,
    name:'add-user'
  });
}

  render(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return(
      <Image source={require("../../images/sidemenu_background.jpg")} style={{flex:1,width:width/1.5,height:height}}>
          <ScrollView style={{paddingLeft:20,paddingRight:20,marginTop:30}}>
          <View style={{flexDirection:'row',height:50,borderColor:'#fff',borderWidth:1}}>
          <View style={{flex:0.8,justifyContent:'center'}}>
            <Text  style={{paddingLeft:15,color:'#fff',fontSize:height/40}} numberOfLines={1}>{this.props.OTPVerificationResponse.data.name}</Text>
            </View>
          <View style={{marginLeft:10,flex:0.2,alignItems:'flex-start',justifyContent:'center'}}>
          <TouchableOpacity onPress={this.logout.bind(this)} style={{padding:5,alignItems:'center'}} >
              <Image source={require("../../images/FR-TSP-Logout_icon.png")} style={{paddingLeft:10,height:22,width:20,alignItems:'center'}} />
          </TouchableOpacity>
          </View>
            </View>
            <TouchableOpacity onPress={this.onPressDashboard.bind(this)} style={{flexDirection:'row'}}>
            <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
            <Image source={require("../../images/dashboard.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
            </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
              <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>DASHBOARD</Text>
              </View>
            </TouchableOpacity >

            <TouchableOpacity onPress={this.onPressEnrol.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/enrol_person.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>ENROLL</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressDetect.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/person_detect.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>DETECT</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressFacebook.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/facebook_detect.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>FACEBOOK DETECT</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.toggle.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/list_menu.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.6,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>LIST</Text>
              </View>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                {(this.state.isOpen==true)?<Image source={require("../../images/list_minus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />:<Image source={require("../../images/FR-TSP-Logo-plus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />}
              </View>

            </TouchableOpacity>
            <View>{this._renderdata()}</View>
            <TouchableOpacity onPress={this.onPressSearchMatched.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/Detect.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>PERSON SEARCH HISTORY</Text>
              </View>
              {/*<View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                {(this.state.isDetectOpen==true)?<Image source={require("../../images/list_minus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />:<Image source={require("../../images/FR-TSP-Logo-plus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />}
              </View>*/}

            </TouchableOpacity>
            <View>{/*this._renderDetectListdata()*/}</View>
            {/*<TouchableOpacity onPress={this.toggleSearch.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/FR-TSP-Search-7.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.6,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>SEARCH LIST</Text>
              </View>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                {(this.state.isSearchOpen==true)?<Image source={require("../../images/list_minus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />:<Image source={require("../../images/FR-TSP-Logo-plus.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />}
              </View>

            </TouchableOpacity>
            <View>{this._renderSearchListdata()}</View>*/}


            {(this.props.OTPVerificationResponse.data.role=='Admin'|| this.props.OTPVerificationResponse.data.role=='admin')?<TouchableOpacity onPress={this.onPressAddUser.bind(this)} style={{flexDirection:'row'}}>
              <View style={{flex:0.2,marginTop:5,paddingVertical:5}}>
                <Image source={require("../../images/add_user.png")} style={{height:30,width:30,alignItems:'flex-end',justifyContent:'center'}} />
              </View>
              <View style={[styles.noSelected,{flex:0.8,justifyContent:'center'}]}>
                <Text style={{color:'#fff',fontSize:14,fontWeight:'600'}}>ADD USER</Text>
              </View>
            </TouchableOpacity>:null}
          </ScrollView>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 5,
    marginTop:5,
    paddingLeft:25,
  },
  itemSelected : {
  borderLeftWidth:5,
  borderColor:'#0093DD'
  },
  noSelected: {
    paddingVertical:5,
    marginTop: 5,
    paddingLeft:5,
  }
});


const mapStateToProps = (state) => {
  debugger;
      return {
        OTPVerificationResponse: faceSelectors.getOTPVerificationResponse(state),
        userPersonList:faceSelectors.getUserPersonListView(state),
  };
}

export default connect(mapStateToProps)(Menu);
