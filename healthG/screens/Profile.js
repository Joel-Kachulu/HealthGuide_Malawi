import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { images, FONTS, COLORS, SIZES } from '../constants';
import CommonNavigationBar from "../components/CommonNavigation";

const Profile = ({ navigation }) => {
  // Example state for profile photo and personal information
  const [profilePhoto, setProfilePhoto] = useState(''); // Profile photo URI
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('30');
  // Add more personal information as needed

  // Function to handle editing profile photo
  const editProfilePhoto = () => {
    // Implement logic to edit profile photo
  };

  // Function to handle editing name
  const editName = () => {
    // Implement logic to edit name
  };

  // Function to handle editing age
  const editAge = () => {
    // Implement logic to edit age
  };

  return (
    <ImageBackground 
      source={images.background}
      style={styles.background}>
      <View style={styles.container}>
        {/* Profile photo section */}
        <TouchableOpacity onPress={editProfilePhoto} style={styles.profilePhotoContainer}>
          <Icon name="user" size={150} color={COLORS.white} />
        </TouchableOpacity>

        {/* Personal information section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Info</Text>
          <TouchableOpacity onPress={editName}>
            <Text style={styles.infoText}>Name: {name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={editAge}>
            <Text style={styles.infoText}>Age: {age}</Text>
          </TouchableOpacity>
          {/* Add more personal info fields here */}
        </View>

        {/* Privacy section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          {/* Privacy settings here */}
        </View>

        {/* Records section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Records</Text>
          {/* Records of symptoms and reports */}
        </View>
        <CommonNavigationBar navigation={navigation} /> 
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
  profilePhotoContainer: {
    marginBottom: 20,
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

export default Profile;
