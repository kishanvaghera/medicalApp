import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import images from './../../../../../assets'
import { Header } from '../../../../Layouts';

const Music = () => {

  const [selectedTab, setSelectedTab] = useState('1');

  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Music'} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 5
        }} >
        <KeyboardAvoidingView enabled>
          <SafeAreaView style={styles.container}>
            <View style={styles.tabView}>
              <View style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '1' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Prayer</Text>
              </View>
              <View style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '2' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Pregnancy</Text>
              </View>
              <View style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '3' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Poem</Text>
              </View>
              <View style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '4' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Ras-Garba</Text>
              </View>
            </View>
            <View>
              <View style={styles.tabContainer}>
                <TouchableOpacity style={{
                  width: wp(40),
                  height: 55,
                  backgroundColor: 'grat'
                }}>
                 
                </TouchableOpacity>
              </View>

            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>

    </View >
  )
}

export default Music;
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
    paddingHorizontal: wp(2.5),
    alignItems: 'center',
    marginTop: 10
  },
  tabView: {
    width: wp(80),
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  tabBtnView: {
    width: wp(17),
    alignItems: 'center'
  },
  roundBtn: {
    width: 25,
    height: 25,
    backgroundColor: 'gray',
    borderRadius: 25 / 2,
    borderColor: 'black'
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tabContainer: {
    width: wp(80),
    alignItems: 'center',
    marginTop: 10
  }
});