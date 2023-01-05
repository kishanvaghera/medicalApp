import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Header } from '../../../../Layouts';


const Live = () => {
  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Live'} />

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
});