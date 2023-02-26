import {View,Text,StyleSheet,ScrollView,SafeAreaView,Image} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import Icon from '../../utils/Icon'

function DayWiseBox() {
  return (
    <View style={styles.body}>
        <View style={styles.rows}>
            <View style={styles.column1}>
                <Text style={{fontSize:moderateScale(60),color:"white",width:moderateScale(150),textAlign:'center'}}>14th <Text style={{fontSize:moderateScale(25)}}>Week</Text></Text>
            </View>
            <View style={{flexDirection:'column'}}>
                <View style={styles.column2}>
                    <Text style={{fontSize:moderateScale(20),color:"white",width:moderateScale(150),textAlign:'center'}}><Icon IconName='weight' LibraryName='FontAwesome5' IconSize={moderateScale(30)} IconColor={'white'}/> <Text>0.8g</Text></Text>
                </View>
                <View style={styles.column2}>
                    <Text style={{fontSize:moderateScale(20),color:"white",width:moderateScale(150),textAlign:'center'}}><Icon IconName='human-male-height' LibraryName='MaterialCommunityIcons' IconSize={moderateScale(30)} IconColor={'white'}/> <Text style={{marginLeft:scale(20)}}>13.0cm</Text></Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default DayWiseBox

const styles = StyleSheet.create({
    body: {
        marginHorizontal:scale(16),
        marginVertical:scale(10)
    },
    rows:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    column1:{
        width:moderateScale(150),
        height:verticalScale(140),
        backgroundColor:'#CB1C8D',
        borderRadius:moderateScale(15),
        justifyContent:'center',
        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    column2:{
        width:moderateScale(150),
        height:verticalScale(65),
        backgroundColor:'#CB1C8D',
        borderRadius:moderateScale(15),
        marginBottom:scale(10),
        justifyContent:'center',
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    }
});