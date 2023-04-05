import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { Header, Main } from '../../Layouts';


const Live = () => {

  let sessionList = [
    { idItem: 1, name: ' Session one', date: '12 jan, 12:30 pm' },
    { idItem: 2, name: ' Session two', date: '12 jan, 12:30 pm' },
    { idItem: 3, name: ' Session three', date: '12 jan, 12:30 pm' },
    { idItem: 4, name: ' Session four', date: '12 jan, 12:30 pm' },
    { idItem: 5, name: ' Session five', date: '12 jan, 12:30 pm' },
    { idItem: 6, name: ' Session six', date: '12 jan, 12:30 pm' },
    { idItem: 7, name: ' Session seven', date: '12 jan, 12:30 pm' },
    { idItem: 8, name: ' Session eight', date: '12 jan, 12:30 pm' }]

  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Live'} />
      <Main>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={sessionList}
            renderItem={({ item }) => (
              <View
                style={{
                  width: wp(42),
                  height: hp(12),
                  borderRadius: 10,
                  marginBottom: 15,
                  marginHorizontal: wp(1.5),
                  backgroundColor: 'gray',
                  alignItems: 'flex-start',
                  padding: wp(1.5),
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}>
                <View style={{ width: wp(15), height: hp(10), backgroundColor: '#fff', borderRadius: 10, }} />
                <View>
                  <Text style={styles.titleText}>{item.name}</Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    marginLeft: wp(1),
                  }}>{item.date}</Text>
                </View>
              </View>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 15, width: wp(90) }}
          />
        </SafeAreaView>
      </Main>
    </View>
  )
}

export default Live;
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
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: wp(1),
    marginTop: hp(1.5)
  },
});