import React from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import HomePage from './HomePage';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class BottomBar extends React.Component {

    constructor(props) {
        super(props);
        debugger;
        this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton() {
        this.props.navigator.resetTo({
          component:HomePage,
          name:'home-page'
        });
    }


  render() {
    return <View style={{alignItems:'center',justifyContent:'center',borderTopWidth:1, zIndex:10, backgroundColor:'#ffffff', height:60, paddingLeft:20, paddingRight:20, position:'absolute', width:width, bottom :0, flex:1, flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableOpacity onPress={() => {this.props.navigator.pop()}} style={{width:50, height:50}} >
            <Image source={require('../../images/cc-icon-list-back_100x100px.png')} style={{height:35,width:35}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressButton} style={{width:50, height:50}}>
            <Image source={require('../../images/cc-icon-list-home_100x100px.png')} style={{height:40,width:40}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{width:50, height:50}}>

        </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  searchFavListButton:{
    justifyContent: 'center',
    flexDirection:'row',
    alignItems: 'center'
  }
});
