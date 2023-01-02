import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Header } from '../../../../Layouts';

const Meditation = () => {
  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Meditation'} />
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
});