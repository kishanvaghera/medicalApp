import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Image, SafeAreaView, ScrollView,Dimensions,TouchableOpacity,} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { Video , Audio } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Icon from '../../utils/Icon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import images from '../../../assets/'

const MomScreen = ({navigation,route}) => {
    const [loading, setLoading] = useState(false);

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header iconName={'menu'} title={'MOM'} />
        </SafeAreaView>

        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
            
            <Image style={{width:widthPercentageToDP('90%'),height:verticalScale(200),marginTop:scale(10),borderRadius:scale(10)}} source={images.pregnancyMom} />

            <Text style={styles.heading}>
              First Month advices from doctor.
            </Text>

            <Text style={styles.paragraph}>{`1. Schedule a prenatal appointment: Make an appointment with your healthcare provider as soon as possible to confirm your pregnancy and discuss any questions or concerns you may have.
              
2. Start taking prenatal vitamins: Your body needs extra nutrients during pregnancy, and prenatal vitamins can help ensure you and your baby are getting everything you need.

3. Eat a healthy diet: A well-balanced diet is essential during pregnancy to provide the necessary nutrients for both you and your baby. Make sure to eat a variety of fruits, vegetables, lean protein, and whole grains.

4. Stay hydrated: Drink plenty of water and other fluids to stay hydrated, especially as your body undergoes changes and your blood volume increases.

5. Get enough rest: Your body needs more rest during pregnancy, so aim for 7-8 hours of sleep per night, and take naps during the day if you need to.

6. Avoid harmful substances: It's important to avoid smoking, alcohol, and illegal drugs during pregnancy, as they can harm your baby's development.

7. Stay active: Regular exercise can help you maintain a healthy weight, reduce stress, and prepare your body for labor and delivery. Talk to your healthcare provider about safe exercise options during pregnancy.

8. Manage stress: Pregnancy can be a stressful time, so make sure to take care of yourself and find ways to manage stress, such as yoga, meditation, or deep breathing exercises.

Remember that every pregnancy is different, so don't hesitate to reach out to your healthcare provider with any questions or concerns you may have. Congratulations again, and enjoy this exciting time!`}
            </Text>
          </ScrollView>
        </View>
    </View>
  )
}

export default MomScreen


const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {

    },
    heading:{
      fontSize:RFPercentage(3),
      fontFamily:'Lato_400Regular',
      marginTop:scale(10),
      width:widthPercentageToDP('90%')
    },
    paragraph:{
      fontSize:RFPercentage(2.5),
      fontFamily:'Lato_400Regular',
      marginTop:scale(10),
      width:widthPercentageToDP('90%'),
      lineHeight:scale(25)
    }
  })