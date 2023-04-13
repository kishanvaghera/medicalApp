import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale } from '../utils/scalling'
import { heightPercentageToDP } from 'react-native-responsive-screen'

const Main = (props) => {
  return (
    <View style={{backgroundColor:'#f1f8ff',height:heightPercentageToDP('100%')}}>
      <View style={props.topMargin?styles.mainTop2:styles.mainTop}>
        {props.children}
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  mainTop:{
    // marginTop:scale(10),
    // paddingBottom:scale(50)
  },
  mainTop2:{
    // paddingBottom:scale(50)
  },
})