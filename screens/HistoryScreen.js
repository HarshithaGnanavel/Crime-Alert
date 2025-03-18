import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  // Dummy Data - Replace with API Data if Needed
  const crimeHistory = [
    { id: '1', time: '10:30 AM, Feb 24', location: 'Market Street', type: 'Theft', confidence: '75%' },
    { id: '2', time: '8:15 PM, Feb 22', location: 'Park Avenue', type: 'Vandalism', confidence: '82%' },
    { id: '3', time: '6:45 AM, Feb 20', location: 'City Mall', type: 'Assault', confidence: '89%' },
    { id: '4', time: '3:30 PM, Feb 18', location: 'Downtown', type: 'Robbery', confidence: '93%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Screen Title */}
      <Text style={styles.heading}>Crime History</Text>

      {/* Crime History List */}
      <FlatList
        data={crimeHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.crimeCard}>
            <Text style={styles.crimeType}>{item.type}</Text>
            <Text style={styles.detailText}>📅 {item.time}</Text>
            <Text style={styles.detailText}>📍 {item.location}</Text>
            <Text style={styles.detailText}>🔍 Confidence: {item.confidence}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  crimeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  crimeType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 2,
  },
});
