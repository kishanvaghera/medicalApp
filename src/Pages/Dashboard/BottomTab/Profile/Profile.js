import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://example.com/profile-image.png' }}
      />
      <Text style={styles.profileName}>John Doe</Text>
      <Text style={styles.profileBio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <View style={styles.profileInterests}>
        <Text style={styles.interestsTitle}>Interests</Text>
        <Text style={styles.interestsText}>Hiking, Photography, Travel</Text>
      </View>
      <Button title="Edit Profile" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    marginBottom: 20,
  },
  profileInterests: {
    alignItems: 'center',
    marginBottom: 20,
  },
  interestsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  interestsText: {
    fontSize: 16,
  },
});

export default ProfilePage;
