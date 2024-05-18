import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { images, FONTS, COLORS } from '../constants';
import CommonNavigationBar from "../components/CommonNavigation";
import Input from "../components/Input";
import Button from "../components/Button";
import InputScreen from '../components/symptomtracker';

const Home = ({ navigation }) => {

  return (
    <ImageBackground 
      source={images.background}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>HealthGuide</Text>
        <Text style={styles.subtitle}>Select your symptoms:</Text>
        <View style={styles.symptomsContainer}>
        
         <InputScreen />
        </View>

       
        <CommonNavigationBar navigation={navigation} /> 
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.white,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  symptomButton: {
    width: '48%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  inputField: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    color: '#fff',
  },
});

export default Home;
