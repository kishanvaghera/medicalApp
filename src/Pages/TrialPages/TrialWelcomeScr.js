import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { scale } from '../../utils/scalling'
import { RFPercentage } from 'react-native-responsive-fontsize'
import images from '../../../assets'

const TrialWelcomeScr = () => {
  return (
    <View>
      <View style={styles.box}>
        <Text style={styles.welc}>Welcome</Text>
        <Text style={styles.name}>Abc</Text>
        <Text style={styles.text}>ચાલો જાણીએ દિવ્ય સંતાનની સર્જન યાત્રાનું પહેલું પગલું </Text>
        <Text style={styles.clickText}>Tap here</Text>
        <Image source={images.welcomeBg} style={styles.img} resizeMode='stretch' />
      </View>
    </View>
  )
}

export default TrialWelcomeScr

const styles = StyleSheet.create({
    box:{
        width:wp('90%'),
        height:hp('25%'),
        backgroundColor:'white',
        borderRadius:scale(20),
        alignSelf:'center',
        marginTop:scale(10),
        justifyContent:'center',
        paddingLeft:scale(15),
        shadowColor: "#000",
        shadowOffset:{
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    welc:{
        color:"black",
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10)
    },
    name:{
        color:"black",
        fontSize: RFPercentage(2.5),
        fontFamily: 'Lato_700Bold',
        marginTop:scale(10)
    },
    text:{
        color:"black",
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10),
        width:wp('50%')
    },
    clickText:{
        color:"black",
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10),
    },
    img:{
      width:wp('40%'),
      height:hp('25%'),
      position:'absolute',
      borderRadius:scale(10),
      right:0,
  }
})