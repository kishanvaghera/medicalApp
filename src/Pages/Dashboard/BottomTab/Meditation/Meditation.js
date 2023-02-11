import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from '../../../../Layouts';
import { Loader } from '../../../../Components';
import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import RoutName from '../../../../Routes/RoutName';
import { Colors as theme } from '../../../../utils/useTheme';


const Meditation = ({ navigation }) => {

  const dispatch = useDispatch();
  const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);
  const [loading, setLoading] = useState(false);
  const [yogaList, setYogatList] = useState([]);

  useEffect(() => {
    getYogaList();
    return () => { }
  }, [])

  const getYogaList = () => {
    setLoading(true);
    const postData = {
      action: 'getYogaCategory',
      vAuthToken: uToken,
    };
    APIService.apiAction(postData, apiUrls.yoga).then(res => {
      setLoading(false);
      if (res) {
        if (res.status == 200) {
          setYogatList([...res.data])
        }
      }
    })
  }

  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Meditation'} />
      <Loader loading={loading} />
      <SafeAreaView style={styles.container}>
        {
          yogaList && yogaList.length ?
            yogaList.map((curEle, index) => {
              return (
                <TouchableOpacity style={styles.itemContainer}
                  onPress={() => navigation.navigate(RoutName.SUB_YOGA_LIST, { itemData: curEle })}>
                  <MaterialCommunityIcons name={'yoga'} size={30} color="black" />
                  <Text style={styles.titleText}>{curEle.vYogaCategoryName}</Text>
                </TouchableOpacity>
              )
            })
            : <></>
        }
      </SafeAreaView>

    </View>
  )
}

export default Meditation;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
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