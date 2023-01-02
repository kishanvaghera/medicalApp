import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Header } from '../../../../Layouts';

const Music = () => {
  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Music'} />
    </View>
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
});