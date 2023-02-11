import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import { Loader } from '../../../../Components';
import { Header } from '../../../../Layouts'
import RoutName from '../../../../Routes/RoutName';
import { Colors as theme } from '../../../../utils/useTheme';

const Music = ({ navigation }) => {

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('1');
  const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);
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


  const [loading, setLoading] = useState(false);
  const [mCategorytList, setMCategorytList] = useState([]);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    getMusicCategory();
    return () => { }
  }, []);

  const getMusicCategory = () => {
    setLoading(true);
    const postData = {
      action: 'getMusicCategory',
      vAuthToken: uToken,
    };
    APIService.apiAction(postData, apiUrls.music).then(res => {
      setLoading(false);
      if (res) {
        if (res.status == 200) {
          setMCategorytList([...res.data])
        }
      }
    })
  }

  // useEffect(() => {
  //   getMusicCategoryList(selectedTab);
  //   return () => { }
  // }, [selectedTab])

  // const getMusicCategoryList = (mTypeId) => {
  //   setLoading(true);
  //   const postData = {
  //     action: 'MusicData',
  //     vAuthToken: uToken,
  //     iMusicCategoryId: mTypeId
  //   };
  //   APIService.apiAction(postData, apiUrls.music).then(res => {
  //     setLoading(false);
  //     if (res) {
  //       if (res.status == 200) {
  //         let newDataArr = [];
  //         Object.keys(res.data).map((key, ind) => {
  //           res.data[key].map((curEle, index) => {
  //             newDataArr.push(curEle);
  //           })
  //         })
  //         setMusicList([...newDataArr])
  //       }
  //     }
  //   })
  // }



  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Music'} />
      <Loader loading={loading} />
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
              {
                mCategorytList && mCategorytList.length ?
                  mCategorytList.map((curEle, index) => {
                    return <TouchableOpacity onPress={() => setSelectedTab(curEle.iMusicCategoryId)}
                      style={styles.tabBtnView}>
                      <View style={[styles.roundBtn, { borderWidth: selectedTab == '1' ? 2 : 0 }]} />
                      <Text style={styles.titleText}>{curEle.vMusicCategoryName}</Text>
                    </TouchableOpacity>
                  })
                  : null
              }
            </View>
            <View>
              <View style={styles.tabContainer}>
                {/* {
                  musicList && musicList.length ?
                    musicList.map((curEle, index) => {
                      return <TouchableOpacity style={styles.itemContainer}
                        onPress={() => navigation.navigate(RoutName.SUB_CATAGORY_LIST, { itemData: curEle })}>
                        <Ionicons name={'musical-note-outline'} size={24} color="black" />
                        <Text style={styles.titleText}>{curEle.vMusicName}</Text>
                      </TouchableOpacity>
                    })

                    : null
                } */}
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
    justifyContent: 'flex-start',
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
    alignItems: 'center',
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
    justifyContent: 'flex-start',
    marginTop: 15,
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
  },
  itemContainer: {
    width: wp(95),
    height: wp(15),
    marginBottom: wp(3),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 8,
    backgroundColor: theme.BgWhite,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'left',
    paddingLeft: 8
  },
});