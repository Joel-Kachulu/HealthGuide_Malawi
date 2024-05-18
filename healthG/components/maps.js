import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';

const MapPage = () => {
  // Dummy hot zones data, replace this with your actual data
  const hotZones = [
    {
      id: 1,
      coordinates: [
        { latitude: 37.78825, longitude: -122.4324 },
        { latitude: 37.78825, longitude: -122.4224 },
        { latitude: 37.79825, longitude: -122.4224 },
        { latitude: 37.79825, longitude: -122.4324 },
      ],
    },
    // Add more hot zones as needed
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Render hot zones */}
        {hotZones.map(zone => (
          <Polygon
            key={zone.id}
            coordinates={zone.coordinates}
            fillColor="rgba(255, 0, 0, 0.5)" // Red with 50% opacity
            strokeWidth={2}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapPage;
