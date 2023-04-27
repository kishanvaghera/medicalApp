import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { scale } from '../../utils/scalling'
import { RFPercentage } from 'react-native-responsive-fontsize'
import images from '../../../assets'
import RoutName from '../../Routes/RoutName'
import { useSelector } from 'react-redux'

const TrialWelcomeScr = (props) => {
  const loggedData = useSelector((state) => state.userLoggedData.isUserData );

  console.log("loggedData",loggedData)
  return (
    <View>
        <TouchableOpacity style={styles.box} onPress={()=>props.navigation.navigate(RoutName.FreeData)}>
          <Text style={styles.welc}>Welcome</Text>
          <Text style={styles.name}>{loggedData.vFirstName} {loggedData.vLastName}</Text>
          <Text style={styles.text}>ચાલો જાણીએ દિવ્ય સંતાનની સર્જન યાત્રાનું પહેલું પગલું </Text>
          <Image source={images.welcomeBg} style={styles.img} resizeMode='stretch' />
            <View style={styles.freeBadge}>
              <Text style={styles.comTextFree}>FREE</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default TrialWelcomeScr

const styles = StyleSheet.create({
    box:{
        width:wp('90%'),
        height:hp('28%'),
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
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10)
    },
    name:{
        color:"black",
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_700Bold',
        marginTop:scale(10)
    },
    text:{
        color:"black",
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10),
        width:wp('50%')
    },
    clickText:{
        color:"black",
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        marginTop:scale(10),
    },
    img:{
      width:wp('40%'),
      height:hp('27%'),
      position:'absolute',
      borderRadius:scale(10),
      right:0,
  },
  freeBadge: {
    backgroundColor: '#004c99',
    position: 'absolute',
    right: 10,
    top: scale(5),
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderRadius: scale(20)
  },
  comTextFree: {
    fontSize: RFPercentage(1.8),
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    color: 'white'
  },
})