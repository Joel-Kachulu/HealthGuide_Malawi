import React, { useState, useEffect } from 'react';

import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const InputScreen = () => {
  const [symptomText, setSymptomText] = useState('');
  const [locationData, setLocationData] = useState(null);

  const requestLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant location permission to proceed.');
      return;
      
    }
  };

  const trackLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocationData({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      sendLocationDataToServer(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error tracking location:', error);
     // Alert.alert('Error', 'Error tracking location. Please try again.');
    } 
  };

  const sendLocationDataToServer = async (latitude, longitude) => {
    try {
      const response = await fetch('http://192.168.42.104:3000/track-location/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude
        }),
      });

      const data = await response.json();
      console.log('Location data sent:', data.location_name);
    } catch (error) {
        console.error('Error sending location data:', error);
      //Alert.alert('Error', 'Error sending location data. Please try again.');
    }
  };

  const sendSymptomAndLocationDataToServer = async () => {
    if (!locationData) {
      Alert.alert('Location Required', 'Please allow access to location.');
      return;
    }

    if (!symptomText.trim()) {
      Alert.alert('Symptom Required', 'Please enter your symptoms.');
      return;
    }

    try {
      const response = await fetch('http://192.168.42.104:3000/location/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          symptomName: symptomText.trim(),
        }),
      });

      const data = await response.json();

      // Update locationData with server-provided location name (optional)
      setLocationData({ ...locationData, locationName: data.location_name });

      console.log('Data sent successfully! Location name:', data.location_name, 'Symptom:', data.symptomName);
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('Error', 'Error sending data. Please try again.');
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      requestLocationPermissions()
      trackLocation();
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.container}>
      {/* Input for symptoms */}
      <TextInput
        style={styles.input}
        placeholder="Enter your symptoms (e.g., fever, cough)"
        multiline={true}
        onChangeText={setSymptomText}
        value={symptomText}
      />

      {/* Button to send data */}
      <Button title="Send Data" onPress={sendSymptomAndLocationDataToServer} />

       <Text>Latitude: {locationData?.latitude}</Text>
       <Text>Longitude: {locationData?.longitude}</Text>
       </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  }
  });

export default InputScreen