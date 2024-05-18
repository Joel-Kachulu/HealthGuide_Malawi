import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import CommonNavigationBar from "../components/CommonNavigation";
import { images } from '../constants';

// Dummy data for demonstration
const dummyArticles = [
  { id: 1, title: '5 Tips for Healthy Living', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: 'February 15, 2024' },
  { id: 2, title: 'Benefits of Drinking Water', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: 'February 14, 2024' },
  { id: 3, title: '10 Foods to Boost Your Immune System', summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: 'February 13, 2024' },
];

const Notifications = ({ navigation }) => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from an API or other source
  useEffect(() => {
    // For demonstration, using dummy data
    setArticles(dummyArticles);
  }, []);

  return (
    <ImageBackground 
      source={images.background}
      style={styles.background}>
      
        <Text style={styles.title}>Notifications</Text>
        
        
      
      <CommonNavigationBar navigation={navigation}  /> 
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
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  articleContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 16,
    marginBottom: 8,
  },
  articleDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notifications;
