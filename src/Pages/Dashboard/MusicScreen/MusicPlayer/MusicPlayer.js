import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
import { AntDesign, Entypo, EvilIcons, Fontisto  } from '@expo/vector-icons';
import { Header } from '../../../../Layouts';


const MusicPlayer = () => {


  const [sound, setSound] = React.useState();
  // const { audio } = '';

  async function getSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' });
    setSound(sound);
    console.log(sound);
  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' });
    // console.log(sound);



    console.log('Playing Sound', sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function pauseSound() {
    await sound.pauseSound();
  }

  return (
    <View style={styles.body}>
      <Header iconName={'left'} title={'Music Player'} />
      <SafeAreaView style={styles.container}>
        <View style={{ width: wp(90), justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.thumblineView} />
          <Text style={styles.boldText}>Morning</Text>
        </View>
        <View>
          <View style={{ width: wp(90), justifyContent: 'space-between', flexDirection:'row', marginTop: 10, alignSelf: 'center' }}>
            <Entypo name="ccw" size={24} color="black" />
            <EvilIcons name="heart" size={30} color="black" />
            {/* <Fontisto name="heart" size={24} color="black" /> */}
          </View>
        </View>
        {/* <TouchableOpacity 
        onPress={playSound}
        style={{
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <AntDesign name="play" size={50} color="black" />
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={pauseSound}
        style={{
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <AntDesign name="pausecircle" size={50} color="black" />
        </TouchableOpacity> */}
      </SafeAreaView>
    </View>
  )
}

export default MusicPlayer;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    width: wp(100),
    paddingHorizontal: wp(2.5)
  },
  thumblineView: {
    width: wp(50),
    height: wp(50),
    backgroundColor: 'gray',
    marginTop: wp(10),
    borderRadius: wp(50) / 2
  },
  boldText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10
  }
});