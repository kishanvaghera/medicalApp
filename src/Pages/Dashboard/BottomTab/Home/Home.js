import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity
} from 'react-native'
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { Header } from '../../../../Layouts'
import RoutName from '../../../../Routes/RoutName';

const Home = ({ navigation }) => {

  const [listDate, setListDate] = useState([{
    id: 1,
    title: 'Good Book',
    list: [{ idItem: 1, name: 'one' },
    { idItem: 2, name: 'two' },
    { idItem: 3, name: 'three' },
    { idItem: 4, name: 'four' },
    { idItem: 5, name: 'five' },
    { idItem: 6, name: 'six' },
    { idItem: 7, name: 'seven' },
    { idItem: 8, name: 'eight' }],
  }, {
    id: 2,
    title: 'Dite',
    list: [{ idItem: 1, name: 'one' },
    { idItem: 2, name: 'two' },
    { idItem: 3, name: 'three' },
    { idItem: 4, name: 'four' },
    { idItem: 5, name: 'five' },
    { idItem: 6, name: 'six' },
    { idItem: 7, name: 'seven' },
    { idItem: 8, name: 'eight' }],
  }, {
    id: 3,
    title: 'Happy',
    list: [{ idItem: 1, name: 'one' },
    { idItem: 2, name: 'two' },
    { idItem: 3, name: 'three' },
    { idItem: 4, name: 'four' },
    { idItem: 5, name: 'five' },
    { idItem: 6, name: 'six' },
    { idItem: 7, name: 'seven' },
    { idItem: 8, name: 'eight' }]
  }
  ])

  const renderItem = ({ item }) => {

    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.titleText}>{item.title}</Text>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={item.list}
          renderItem={item => {
            // console.log('object', item.item)
            return (
              <TouchableOpacity style={styles.itemBox}
                onPress={() => navigation.navigate(RoutName.PRODUCT_LIST, { pageTitle: item.item.name })}>
                <Text style={{ alignSelf: 'center' }}>{item.item.name}</Text>
              </TouchableOpacity>
            )
          }}
          keyExtractor={kry => kry.id}
          style={{ marginTop: 5 }}
        />

      </View>
    )
  };

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
              <FlatList
                data={listDate}
                renderItem={item => renderItem(item)}
                keyExtractor={kry => kry.id}
              />
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
    width: 80,
    height: 75,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: 'gray'
  }
});