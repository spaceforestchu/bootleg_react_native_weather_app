import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Api from './src/api';

export default class boot_leg_weather_react_native extends Component {

  constructor(props){
    super(props);
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  onRegionChangeComplete = (region) => {
    console.log(region);
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude:  region.latitude
      }
    });
    Api(region.latitude, region.longitude)
      .then( (data) => {
        console.log(data);
        this.setState(data);
      })
      .catch( (e) => console.log('error with request', e))
  }



  render() {
    return (

        <MapView
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}
          >

          <MapView.Marker
               coordinate={{
               latitude: this.state.pin.latitude,
               longitude: this.state.pin.longitude
             }}
            />
          <View style={[styles.container, styles.textWrapper]}>
            <Text style={styles.text}>{this.state.city}</Text>
            <Text style={styles.text}>{this.state.temperature}</Text>
            <Text style={styles.text}>{this.state.description}</Text>
          </View>
        </MapView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 1,
    marginTop: 30
  },
  textWrapper: {
    flex: 0,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('boot_leg_weather_react_native', () => boot_leg_weather_react_native);
