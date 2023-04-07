import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale } from '../utils/scalling'

const Main = (props) => {
  return (
    <View>
      <View style={props.topMargin?styles.mainTop2:styles.mainTop}>
        {props.children}
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  mainTop:{
    marginTop:scale(10),
    // paddingBottom:scale(50)
  },
  mainTop2:{
    marginTop:scale(0),
    // paddingBottom:scale(50)
  },
})