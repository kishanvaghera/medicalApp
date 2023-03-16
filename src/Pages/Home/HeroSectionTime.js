import React from 'react';
import {View,StyleSheet} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Text,Card } from '@ui-kitten/components';
import Icon from '../../utils/Icon';
import * as Progress from 'react-native-progress';

const HeroSectionTime = () => {
  return (
    <Card style={styles.card}>
        <View style={styles.mainBody}>
            <View style={styles.dateFirst}>
                <Icon IconName='calendar' LibraryName='FontAwesome' IconSize={22} IconColor={'#6B728E'}/>
                <Text style={styles.dateFirstText} category='h6'>16 March 2023</Text>
            </View>
            <View style={styles.secondSection}>
                <Text style={styles.lightText} category='p2'>My pregnancy term:</Text>
                <Text style={styles.dayDisp} category='h6'>Trimester 2: 15 weeks, 5 days</Text>
            </View>

            <View style={styles.secondSection}>
                <Progress.Bar color={'#FB2576'} unfilledColor={'#fcacca'} borderWidth={2} borderRadius={scale(15)} height={verticalScale(20)} progress={0.3} width={moderateScale(320)} />
                <Text style={{...styles.lightText,marginTop:scale(10)}} category='p2'>170 days left (EDD 30/04/23)</Text>
            </View>
        </View>
    </Card>
  )
}

export default HeroSectionTime

const styles = StyleSheet.create({
    mainBody:{
        width:moderateScale(305),
    },
    card:{
        width:'100%',
        shadowColor: "#000",
        borderWidth:0,
        borderBottomLeftRadius:scale(20),
        borderBottomRightRadius:scale(20),
        shadowOffset:{
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },
    dateFirst:{
        width:moderateScale(305),
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    dateFirstText:{
        fontSize:scale(22),
        marginLeft:scale(10),
        color:"#474E68"
    },
    secondSection:{
        width:moderateScale(305),
        justifyContent:'center',
        alignItems:'center',
        marginTop:scale(10)
    },
    lightText:{
        fontSize:scale(20),
        marginLeft:scale(10),
        color:"#6B728E"
    },
    dayDisp:{
        fontSize:scale(22),
        marginLeft:scale(10),
        color:"#474E68",
        marginTop:scale(5)
    }
})