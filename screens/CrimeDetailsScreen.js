import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function CrimeDetailsScreen() {
  const navigation = useNavigation();

  // Show Pop-up Alert when "Noted" is pressed
  const handleNotedPress = () => {
    Alert.alert("Notification Sent", "The crime has been notified by the police.");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Exit App Button */}
      <TouchableOpacity onPress={() => BackHandler.exitApp()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Glass Effect Container */}
      <View style={styles.glassContainer}>
        {/* Heading */}
        <Text style={styles.heading}>Crime Details</Text>

        {/* Crime Image */}
        <Image source={require('../assets/images/crime_scene.webp')} style={styles.crimeImage} resizeMode="cover" />

        {/* Crime Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>📅 Time: <Text style={styles.detailHighlight}>12:45 PM, 27th Feb 2025</Text></Text>
          <Text style={styles.detailText}>📍 Location: <Text style={styles.detailHighlight}>Downtown Street, NY</Text></Text>
          <Text style={styles.detailText}>🔍 Confidence Rate: <Text style={styles.detailHighlight}>87%</Text></Text>
          <Text style={styles.detailText}>🚔 Crime Type: <Text style={styles.detailHighlight}>Armed Robbery</Text></Text>
        </View>

        {/* Noted Button */}
        <TouchableOpacity style={styles.notedButton} onPress={handleNotedPress}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}>Noted</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <Feather name="user" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HistoryScreen')}>
          <MaterialIcons name="history" size={24} color="white" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('LiveSurveillance')}>
          <MaterialIcons name="videocam" size={24} color="white" />
          <Text style={styles.navText}>Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'hsla(0, 0.00%, 100.00%, 0.20)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  crimeImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  detailHighlight: {
    color: 'white',
    fontWeight: 'bold',
  },
  notedButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 80, // Space for bottom nav bar
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 15,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});
