import React from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
} from 'react-native';

import {
         scale,
         verticalScale,
         moderateScale} from '../styles/common';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class HeaderBar extends React.Component {

  constructor(props) {
      super(props);
      debugger;
  }

onPressBack(){
  this.props.navigator.pop();
  console.log(this.props.navigator.pop(),'this.props.navigator.pop();');
}
  render() {
    return (
      <View style={{alignItems:'center',justifyContent:'center',height:70,backgroundColor:'#01487d'}}>

        <View style={{alignItems:'center',paddingTop:5,flexDirection:'row',paddingBottom:5}}>
              <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}} >
              <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.props.toggle()}>
                  <Image source={require("../../images/FR-TSP-List-menu_icon.png")} style={{height:20,width:23}} />
              </TouchableOpacity>
              </View>
            <View style={{flex:0.5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>

              <Image source={require("../../images/FR-TSP-Logo-3.png")} style={{paddingTop:7,height:35,width:35}} />

                <Text style={{ width:width ,color:'#fff', paddingLeft:15,paddingTop:10, paddingBottom:10,  fontSize:moderateScale(14,0.5)}}>FACE RECOGNITION</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.props.back()} style={{flex:0.3,alignItems:'center',justifyContent:'center'}} >
              <Text style={[{paddingLeft:10,paddingRight:10},this.props.backButtonStyle]}>{this.props.backText}</Text>
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchFavListButton:{
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center'
  }
});
