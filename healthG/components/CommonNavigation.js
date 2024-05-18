// CommonNavigationBar.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants';

const CommonNavigationBar = ({ navigation}) => {
  return (
    <View style={[styles.bottomNav]}>
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={20} color={COLORS.white} />
        <Text style={[styles.navButtonText, { color: COLORS.white }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Htips')}>
        <Icon name="lightbulb-o" size={20} color={COLORS.white} />
        <Text style={[styles.navButtonText, {color: COLORS.white }]}>Health Tips</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Notifications')}>
        <Icon name="bell" size={20} color={COLORS.white} />
        <Text style={[styles.navButtonText, { color: COLORS.white }]}>Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Statistics')}>
        <Icon name="bar-chart" size={20} color={COLORS.red} />
        <Text style={[styles.navButtonText, { color: COLORS.white }]}>Risk Areas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}>
        <Icon name="user" size={20} color={COLORS.white} />
        <Text style={[styles.navButtonText, { color: COLORS.white }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 20,
    backgroundColor: COLORS.black,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12
  },
});

export default CommonNavigationBar;
