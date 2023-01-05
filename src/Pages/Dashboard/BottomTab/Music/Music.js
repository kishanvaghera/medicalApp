import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  FlatList
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import images from './../../../../../assets'
import { Header } from '../../../../Layouts';
import RoutName from '../../../../Routes/RoutName';

const Music = ({ navigation }) => {

  const [selectedTab, setSelectedTab] = useState('1');
  let month = [
    {
      id: 1,
      name: 'One'
    },
    {
      id: 2,
      name: 'Two'
    },
    {
      id: 3,
      name: 'Three'
    },
    {
      id: 4,
      name: 'Fore'
    },
    {
      id: 5,
      name: 'Five'
    },
    {
      id: 6,
      name: 'Six'
    },
    {
      id: 7,
      name: 'Seven'
    },
    {
      id: 8,
      name: 'Eight'
    },
    {
      id: 9,
      name: 'Nine'
    }]
  let poemList = [
    {
      id: 1,
      name: 'poem 1'
    },
    {
      id: 2,
      name: 'poem 2'
    },
    {
      id: 3,
      name: 'poem 3'
    },
    {
      id: 4,
      name: 'poem 4'
    },
    {
      id: 5,
      name: 'poem 5'
    },
    {
      id: 6,
      name: 'poem 6'
    },
    {
      id: 7,
      name: 'poem 7'
    },
    {
      id: 8,
      name: 'poem 8'
    },
    {
      id: 9,
      name: 'poem 9'
    }]

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
              <TouchableOpacity onPress={() => setSelectedTab('1')}
                style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '1' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Prayer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('2')}
                style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '2' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Pregnancy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('3')}
                style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '3' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Poem</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedTab('4')}
                style={styles.tabBtnView}>
                <View style={[styles.roundBtn, { borderWidth: selectedTab == '4' ? 2 : 0 }]} />
                <Text style={styles.titleText}>Ras-Garba</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.tabContainer}>
                {
                  selectedTab == '1' ?
                    <View>
                      <TouchableOpacity onPress={() => navigation.navigate(RoutName.MUSIC_LIST)}
                      style={styles.btnView1}>
                        <Text style={styles.boldText}>Morning</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btnView1}>
                        <Text style={styles.boldText}>Evening</Text>
                      </TouchableOpacity>
                    </View>
                    : <></>
                }
                {
                  selectedTab == '2' || selectedTab == '4' ?
                    <FlatList
                      data={month}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            width: wp(30),
                            height: hp(15),
                            borderRadius: 10,
                            marginBottom: 15,
                            marginHorizontal: wp(5),
                            backgroundColor: 'gray',
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center'
                          }}>
                          <Text>{item.name}</Text>
                        </View>
                      )}
                      //Setting the number of column
                      numColumns={2}
                      keyExtractor={(item, index) => index.toString()}
                      style={{ marginTop: 15 }}
                    />
                    : <></>
                }
                {
                  selectedTab == '3' ?
                    <FlatList
                      data={poemList}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            width: wp(35),
                            height: hp(18),
                            borderRadius: 10,
                            marginBottom: 15,
                            marginHorizontal: wp(5),
                            backgroundColor: 'gray',
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center'
                          }}>
                          <Text>{item.name}</Text>
                        </View>
                      )}
                      //Setting the number of column
                      numColumns={2}
                      keyExtractor={(item, index) => index.toString()}
                      style={{ marginTop: 15 }}
                    />
                    : <></>
                }
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
    width: wp(90),
    height: hp(75),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnView1: {
    width: wp(60),
    height: hp(20),
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold'
  }
});