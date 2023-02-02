import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import { Loader } from '../../../../Components';
import { Header } from '../../../../Layouts'
import RoutName from '../../../../Routes/RoutName';
import images from '../../../../../assets/index'

const Home = ({ navigation }) => {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLoggedData.isUserData);
  const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  // const [listDate, setListDate] = useState([{
  //   id: 1,
  //   title: 'Good Book',
  //   list: [{ idItem: 1, name: 'one' },
  //   { idItem: 2, name: 'two' },
  //   { idItem: 3, name: 'three' },
  //   { idItem: 4, name: 'four' },],
  // }, {
  //   id: 2,
  //   title: 'Dite',
  //   list: [{ idItem: 1, name: 'one' },
  //   { idItem: 2, name: 'two' },
  //   { idItem: 3, name: 'three' },
  //   { idItem: 4, name: 'four' },],
  // }, {
  //   id: 3,
  //   title: 'Happy',
  //   list: [{ idItem: 1, name: 'one' },
  //   { idItem: 2, name: 'two' },
  //   { idItem: 3, name: 'three' },
  //   { idItem: 4, name: 'four' },]
  // }
  // ]);

  useEffect(() => {
    if (uToken != undefined && uToken != null) {
      getCalagotyList();
    }
    return () => { }
  }, [uToken])


  const getCalagotyList = () => {
    setLoading(true);
    const postData = {
      //   action: 'getCategoryList',
      action: 'categoryViseData',
      vAuthToken: uToken,
      iCategoryId: '1'
    };
    // console.log('getCategoryList postData', postData)
    APIService.apiAction(postData, apiUrls.category).then(res => {
      setLoading(false);
      // console.log('getCategoryList', res.data)
      if (res) {
        if (res.status == 200) {
          let newDataArr = [];
          Object.keys(res.data).map((key, ind) => {
            res.data[key].map((curEle, index) => {
              newDataArr.push(curEle);
            })
          })

          setListData([...newDataArr])
        }
      }
    })
  }


  const renderItem = ({ item, index }) => {
    //   console.log('renderItem ==>', item)

    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.titleText}>{item.iCategoryName + ''}</Text>

        <TouchableOpacity style={styles.itemBox}
          onPress={() => navigation.navigate(RoutName.PRODUCT_LIST, { pageTitle: item.item.name })}>
          <Image source={{ uri: item.tImage }}
            style={{ width: 80, height: 80, borderRadius: wp(2) }}
            resizeMode={'contain'} />
        </TouchableOpacity>

      </View>
    )
  };

  const bg_image = { uri: images.bg };

  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Home'} />
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
          }} >
          <KeyboardAvoidingView enabled>
            <View style={styles.listContainer}>


              {
                listData && listData.length ?
                  listData.map((item, ind) => {
                    console.log('listData', item)
                    return (
                      <View style={{ marginTop: 15 }}>
                        <Text style={styles.titleText}>{item.iCategoryName + ''}</Text>
                        <TouchableOpacity style={styles.itemBox}
                          onPress={() => navigation.navigate(RoutName.PRODUCT_LIST, { pageTitle: item.item.name })}>
                          <Image source={{ uri: item.tImage }}
                            style={{ width: 80, height: 80, borderRadius: wp(2) }}
                            resizeMode={'contain'} />
                        </TouchableOpacity>
                      </View>
                    )
                  })
                  : <></>
              }
              {/* <FlatList
                data={listData}
                renderItem={item => renderItem(item)}
                keyExtractor={kry => kry.id}
              /> */}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  )
}

export default Home;




const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: hp(2)

  },
  listContainer: {
    alignContent: 'flex-start',
    marginTop: 10,
    width: wp(92)
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  itemBox: {
    marginHorizontal: 5,
    paddingTop: wp(1),
  }
});