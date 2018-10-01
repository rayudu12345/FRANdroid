import React, { Component } from 'react';
import { View, Text,Alert } from 'react-native';

class NewFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gps: false,
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          gps: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(position);
      },
      (error) => this.setState({ error: error.message,gps:false }),

      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },

    );

  }
  onPressSubmit(){
    if(this.state.gps==true){
        Alert.alert('Turn Off your GPS location service.');
    }else{
    Alert.alert('Turn ON your GPS location service.');
    }
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Text onPress={this.onPressSubmit.bind(this)}>GPS CHeck</Text>
      </View>
    );
  }
}

export default NewFile;
