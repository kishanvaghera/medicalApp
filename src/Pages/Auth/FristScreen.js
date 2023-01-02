import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, 
  heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Container from '../../Layouts/Container'
import { useTheme, useThemedStyles, colors } from './../../utils';
import { Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';

const FristScreen = ({ navigation }) => {

  // const theme = useTheme();
  // const style = useThemedStyles(styles);

  return (
    <View style={styles.body}>
      <View style={styles.logoView}>
        <Text style={styles.textStyle}>Your Slogan</Text>
        <Text style={styles.textStyle}>For App</Text>
      </View>
      <View style={styles.burronView}>
        <Button
          width={wp(75)}
          height={40}
          title={'Sign up'} 
          customClick={()=> navigation.navigate(RoutName.REGIDTER)}/>

        <Button
          width={wp(75)}
          height={40}
          title={'Sign in'}
          buttonStyle={{ marginTop: 20 }}
          customClick={()=> navigation.navigate(RoutName.LOGIN)} />
      </View>
    </View>
  )
}



export default FristScreen;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'

  },
  logoView: {
    width: wp(70),
    marginTop: hp(20),
    marginHorizontal: wp(15)
     
  },
  textStyle: {
    fontSize : 25,
    fontWeight: '700'
  },
  burronView: {
    alignItems: 'center',
    alignContent:'center',
    marginTop: hp(30)
  }

});