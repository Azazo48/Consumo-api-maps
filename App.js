import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import * as Location from 'expo-location'
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env';

const AmImage = require('./assets/images/Among.png')

export default function App() {

  const[origin, setOrigin] = React.useState({
    latitude: 32.48006252330885, 
    longitude: -114.7800769302125
  })
  const [destination, setDestination] = React.useState({
    latitude: 32.47214597832794, 
    longitude: -114.77859760690366
  });


  React.useEffect(() =>{
    getLocationPermision();
  }, [])


  async  function getLocationPermision() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if(status !== 'granted'){
    alert('Permiso no');
    return;
  }
  let location = await Location.getCurrentPositionAsync({});
  const current = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }
  setOrigin(current);
}

  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
        }}>
          <Marker
          draggable
          coordinate={origin}
          image={AmImage}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
          />
          <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
          />
          <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor='blue'
          strokeWidth={5}
          />
          {/*
          <Polyline
          coordinates={[origin,destination]}
          strokeColor='blue'
          strokeWidth={5}
          />*/}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
