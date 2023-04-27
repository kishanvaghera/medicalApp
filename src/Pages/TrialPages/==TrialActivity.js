import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { scale, verticalScale } from '../../utils/scalling'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Icon from '../../utils/Icon'
import images from '../../../assets'
import RoutName from '../../Routes/RoutName'

const TrialActivity = (props) => {
  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.box} onPress={()=>props.navigation.navigate(RoutName.FreeData)}>
        <Image source={images.BasicVector} style={styles.img} resizeMode='cover' />
        <Text style={styles.comTextHead}>Basic</Text>
        <Text style={styles.comText}>Yoga, Music</Text>
        <View style={styles.freeBadge}>
          <Text style={styles.comTextFree}>FREE</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.box}>
        <Image source={images.BasicVector} style={styles.img} resizeMode='cover' />
        <Text style={styles.comTextHead}>Basic</Text>
        <Text style={styles.comText}>Yoga, Music</Text>
        <View style={styles.freeBadgeLock}>
          <Icon LibraryName="FontAwesome" IconName="lock" IconSize={20} IconColor="#fba820" />
        </View>
      </View>
      <View style={styles.box}>
        <Image source={images.BasicVector} style={styles.img} resizeMode='cover' />
        <Text style={styles.comTextHead}>Premium</Text>
        <Text style={styles.comText}>Diet</Text>
        <View style={styles.freeBadgeLock}>
          <Icon LibraryName="FontAwesome" IconName="lock" IconSize={20} IconColor="#fba820" />
        </View>
      </View>
      <View style={styles.box}>
        <Image source={images.BasicVector} style={styles.img} resizeMode='cover' />
        <Text style={styles.comTextHead}>Premium</Text>
        <Text style={styles.comText}>Activity</Text>
        <View style={styles.freeBadgeLock}>
          <Icon LibraryName="FontAwesome" IconName="lock" IconSize={20} IconColor="#fba820" />
        </View>
      </View>
    </View>
  )
}

export default TrialActivity

const styles = StyleSheet.create({
  body: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginTop: scale(10),
    flexWrap: 'wrap',
  },
  box: {
    width: wp('43%'),
    height: hp('22%'),
    backgroundColor: 'white',
    borderRadius: scale(10),
    marginBottom: scale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  comTextHead: {
    fontSize: RFPercentage(2.3),
    fontFamily: 'Lato_700Bold',
    marginTop: scale(10),
    marginLeft: scale(15)
  },
  comText: {
    fontSize: RFPercentage(2.3),
    fontFamily: 'Lato_400Regular',
    marginTop: scale(5),
    marginLeft: scale(15)
  },
  comTextFree: {
    fontSize: RFPercentage(2),
    fontFamily: 'Lato_400Regular',
    textAlign: 'center',
    color: 'white'
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
  freeBadgeLock: {
    position: 'absolute',
    right: 5,
    top: scale(5),
    paddingHorizontal: scale(12),
    paddingVertical: scale(5),
    borderRadius: scale(20)
  },
  img: {
    width: wp('43%'),
    height: hp('22%'),
    position: 'absolute',
    borderRadius: scale(10),
    bottom: 0,
  }
})