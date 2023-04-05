import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { AntDesign, Entypo, EvilIcons, Fontisto, Feather, MaterialIcons, Foundation } from '@expo/vector-icons';
import { Header, Main } from '../../../../Layouts';
import { RFPercentage } from 'react-native-responsive-fontsize';



const MusicPlayer = () => {


  const [sound, setSound] = useState('');
  const [sTime, setSTime] = useState('00:00');
  const [eTime, setETime] = useState('00:00');
  const [isPlay, setIsPlay] = useState(false);
  const [playback, setPlayback] = useState({
    isAlreadyPlay: false,
    isLoaded: true,
    sound: '',
    positionMillis: '',
    durationMillis: '',
    isPlaying: '',
    isLooping: '',
    isMuted: '',
  });
 

  async function getSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' });
    setSound(sound);
    sound.getStatusAsync()
      .then(function (result) {
        msToTime(result.durationMillis)

      })
      .catch(e => console.log('sond cach',e));
  }

  
  async function playSound() {
    await sound.playAsync();
    setIsPlay(true);
  }

  async function pauseSound() {
    await sound.pauseSound();
    setIsPlay(false);
  }

  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000))
      , seconds = parseInt((duration / 1000) % 60)
      , minutes = parseInt((duration / (1000 * 60)) % 60)
      , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    let time = minutes + ":" + seconds;
    setETime(time);
    return minutes + ":" + seconds + "." + milliseconds;
    //return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  React.useEffect(() => {
    getSound();
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);



  return (
    <View style={styles.body}>
      <Header iconName={'left'} title={'Music Player'} />
      <Main>
        <SafeAreaView style={styles.container}>
          <View style={{ width: wp(90), justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.thumblineView} />
            <Text style={styles.boldText}>Morning</Text>
          </View>
          <View>
            <View style={{ width: wp(90), justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, alignSelf: 'center' }}>
              <Entypo name="ccw" size={24} color="black" />
              <EvilIcons name="heart" size={30} color="black" />
              {/* <Fontisto name="heart" size={24} color="black" /> */}
            </View>
            <View style={{ width: wp(90), justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
              <Text style={styles.normalText}>00:00</Text>
              <Slider
                style={{ width: wp(70), height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="tomato"
                maximumTrackTintColor="#000000"
              />
              <Text style={styles.normalText}>{eTime}</Text>
            </View>
            <View style={{ width: wp(90), justifyContent: 'space-between', flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
              <MaterialIcons name="queue-music" size={24} color="black" />
              <Foundation name="previous" size={24} color="black" />
              <TouchableOpacity
                onPress={() => isPlay ? pauseSound() : playSound()}
                style={{
                  width: 50,
                  height: 50,
                }}>
                <AntDesign name={isPlay ? 'pausecircle' : 'play'} size={50} color="black" />
                {/* <AntDesign name="pausecircle" size={50} color="black" /> */}
              </TouchableOpacity>
              <Foundation name="next" size={24} color="black" />
              <Feather name="thumbs-up" size={24} color="black" />
              {/* <Fontisto name="heart" size={24} color="black" /> */}
            </View>
          </View>


        </SafeAreaView>
      </Main>
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
    fontSize: RFPercentage(3),
    fontFamily:'Lato_400Regular',
    color: 'black',
    marginTop: 10
  },
  normalText: {
    fontSize: RFPercentage(3),
    fontFamily:'Lato_400Regular',
    textAlign: 'center',
  },
});