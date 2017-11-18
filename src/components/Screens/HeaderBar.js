import React from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class HeaderBar extends React.Component {

  constructor(props) {
      super(props);
      debugger;
  }

  render() {
    return (
      <View style={{backgroundColor:'#0C303F'}}>
        <Text style={{ textAlign:'center',width:width ,color:'#ffffff', paddingTop:10, paddingBottom:10, marginLeft:20, marginRight:20, fontSize:20}}>{this.props.title}</Text>
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
