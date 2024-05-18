import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { images, FONTS, COLORS, SIZES } from '../constants';
import CommonNavigationBar from "../components/CommonNavigation";
import MapPage from "../components/maps";

const Statistics = ({ navigation }) => {
  // State to store location data
  const [locationData, setLocationData] = useState({});

  // Function to fetch location data from server
  const fetchLocationData = async () => {
    try {
      const response = await fetch('http://192.168.42.104:3000/symptoms/bylocation/');
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  // Fetch data upon component mount
  useEffect(() => {
    fetchLocationData();
  }, []);



  return (
    <ImageBackground 
      source={images.background}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Statistics</Text>
        {/*<MapPage /> */}
        <CommonNavigationBar navigation={navigation} /> 

        {/* Display location data if available */}
        {locationData && Object.keys(locationData).length > 0 && (
          <>
            {Object.entries(locationData).map(([locationName, symptoms]) => (
              <View key={locationName} style={styles.section}>
                <Text style={styles.sectionTitle}>{locationName}</Text>
                {Object.entries(symptoms).map(([symptomName, count]) => (
                  <Text key={symptomName} style={styles.infoText}>
                    {symptomName}: {count}
                  </Text>
                ))}
              </View>
            ))}
          </>
        )}

        {/* Display a message if no data is available */}
        {!locationData || Object.keys(locationData).length === 0 && (
          <Text style={styles.infoText}>No location data available.</Text>
        )}
        
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Statistics;
