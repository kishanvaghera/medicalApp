import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { scale } from '../../utils/scalling'
import { RFPercentage } from 'react-native-responsive-fontsize'
import images from '../../../assets'
import RoutName from '../../Routes/RoutName'

const SubscribeScreen = (props) => {

  return (
    <View style={styles.box}>
      <TouchableOpacity onPress={() => props.navigation.navigate(RoutName.SubscribeSelc)} elevation={0.9}>
        <Text style={styles.subTxt}>Subscribe</Text>
        <Text style={styles.paragraphText}>
          વૈદિક અને વૈજ્ઞાનિક પદ્ધતિ દ્વારા ગર્ભ સંસ્કાર વધુ સારી રીતે સમજો.
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default SubscribeScreen

const styles = StyleSheet.create({
  box: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: scale(20),
    alignSelf: 'center',
    marginTop: scale(10),
    paddingVertical: scale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  subTxt: {
    color: "#0B4E98",
    fontSize: RFPercentage(2),
    fontFamily: 'Lato_700Bold',
    alignSelf: 'center'
  },
  paragraphText: {
    color: "black",
    fontSize: RFPercentage(2),
    fontFamily: 'Lato_400Regular',
    marginTop: scale(15),
    alignSelf: 'center',
    textAlign: 'center',
    width:wp('80%')
  }
})