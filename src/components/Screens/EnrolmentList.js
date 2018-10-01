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
  TextInput,
  Alert,
  Dimensions,
  ListView,
  Platform
} from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import HomePage from './HomePage';

import BottomBar from './BottomBar';
import HeaderBar from './HeaderBar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import BusyIndicator from 'react-native-busy-indicator';

export class EnrolmentList extends Component {

      constructor(props){
        super(props);
        this.state={
          enrol_list:[
            {
              name:'aaaa',
              fle_srn:'4654654646546546546'
            },
            {
              name:'bbbb',
              fle_srn:'4654654646546546546'
            },
            {
              name:'ccc',
              fle_srn:'4654654646546546546'
            },

          ]
        }
      }
    render(){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return(
        <Container>
            <Content>
            <Text style={{textAlign:'center'}}>Enrolment List</Text>
            <ListView
                dataSource={ds.cloneWithRows(this.state.enrol_list)}
                enableEmptySections={true}
                ref={ref => this.listView = ref}
                      onContentSizeChange={() => {
                      this.listView.scrollTo({y: 0})
                       }}
                style={Platform.select({
                  ios:{paddingLeft:30, paddingRight:30},
                  android:{paddingLeft:30,paddingRight:30,marginBottom:100}
                })}
                renderRow={(rowData) =>

                    <View style={{justifyContent:'center',flex:1,paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#e6e6e6'}}>

                              <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                                <Text style={{fontSize:16,flex:0.5}}>Name</Text>
                                <Text style={{fontSize:14,flex:0.5}}>{rowData.name}</Text>
                            </View>
                            <View style={{marginTop:3,flexDirection:'row',flex:1}}>
                              <Text style={{fontSize:16,flex:0.5}}>FBID</Text>
                              <Text style={{fontSize:14,flex:0.5}}>{rowData.fle_srn}</Text>
                          </View>
                          <View style={{marginTop:3,flexDirection:'row',flex:1}}>

                          <View style={{flex:0.5}}>
                            <Image source={{uri:`http://183.82.109.71/fr/public/fr_images/facebook-search-history/` + rowData.source_image}} style={{height:50,width:50}} />
                          </View>
                      </View>



                        </View>
                  }
                />
            </Content>
        </Container>
      )
    }
}

const mapStateToProps = (state) => {
  debugger;
  return state;
}

export default connect(mapStateToProps)(EnrolmentList);
