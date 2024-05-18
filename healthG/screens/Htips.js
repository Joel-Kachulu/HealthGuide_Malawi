import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, FlatList } from 'react-native';
import CommonNavigationBar from "../components/CommonNavigation";
import { images, FONTS, SIZES, COLORS } from '../constants';
import {Card} from 'react-native-paper'


const HealthTips = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const[loading, setIsLoading] = useState(true)

  const loadData = () => {
    fetch('http://192.168.42.104:3000/get', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article=> {
        setArticles(article);
        setIsLoading(false)
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
    loadData()
  
  }, []);



  const renderData = (item) => {
    return(
      <Card style = {styles.cardstyle}>
        <Text style = {{fontSize:20}}>{item.title}</Text>
        <Text>{item.body}</Text>
        <Text style = {styles.articleDate}>{item.date}</Text>
      </Card>
    )
  }



  return (
    <ImageBackground 
      source={images.background}
      style={styles.background}>
      <View style = {styles.container}>
       <Text style={styles.title}>Health Tips</Text>
        <FlatList
        data = {articles}
        renderItem={({item}) => {
          return renderData(item)
        }}
        onRefresh={() => loadData()}
        refreshing = {loading}
        keyExtractor = {item => `${item.id}`}
        />
      </View>
      <CommonNavigationBar navigation={navigation}  /> 
    </ImageBackground>
  );
  };
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flexGrow: 1,
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff',
    },
    cardstyle: {
      margin: 10,
      padding: 10,
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
  export default HealthTips;