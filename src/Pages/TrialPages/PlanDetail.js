import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Icon from '../../utils/Icon';
import { Button } from '@ui-kitten/components';

const PlanDetail = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const TextArr=`=> ગર્ભ સંસ્કાર એટલે શું ? ( વૈદિક પરંપરા અનુસાર ) => યમ અને નિયમ ( મન શુદ્ધિ ) => બીજ અને શરીર શુદ્ધિ => બ્રહ્મચર્ય => ફર્ટિલિટી યોગા અને પ્રાણાયામ => ફર્ટીલિટી ડાયટ ચાર્ટ => ડ્રીમ બેબી ચાર્ટ => ગર્ભાધાન માટે શ્રેષ્ઠ તેમજ ઉચિત સમય અને વાતાવરણ => ગર્ભાધાન મંત્ર અને પ્રાર્થના => દિવ્ય આત્માને આવાહન => હકારાત્મક સૂચનો`;

    const StringToArr = new String(TextArr).split("=>");

  return (
    <View style={styles.body}>
        <Loader loading={loading} />
        <SafeAreaView>
            <Header title={'Plan Detail'} />
        </SafeAreaView>
        <Main>
            <View style={styles.mainBox}>
                <Text style={styles.mainHeadTxt}>Planning Content</Text>

                {
                    StringToArr.map((curEle,index)=>{
                        return  curEle!=""?<View style={{flexDirection:'row',marginBottom:scale(10)}} key={index}>
                                    <View style={styles.IconBox}>
                                        <Icon LibraryName='FontAwesome' IconName='check' IconSize={15} IconColor={"white"}/>
                                    </View>
                                    <View style={styles.TextBox}>
                                        <Text style={styles.pgText}>{curEle}</Text>
                                    </View>
                                </View>:""
                    })
                }

                <View style={{marginTop:scale(10)}}>
                    <Text style={styles.plantext}>Plan Validity: <Text style={styles.planSubText}> 9 Month</Text></Text>
                    <Text style={styles.plantext}>Plan Price: <Text style={styles.planSubText}> <Icon LibraryName='FontAwesome' IconName='rupee' IconSize={15} IconColor={"#0B4E98"}/>1300</Text></Text>
                </View>
            </View>

            <View style={styles.payBtn}>
                <Button style={styles.button} status='success' accessoryRight={<Icon LibraryName='FontAwesome' IconName='send' IconSize={15} IconColor={"white"}/>} >
                    PAY
                </Button>
            </View>
        </Main>
    </View>
  )
}

export default PlanDetail

const styles = StyleSheet.create({
    mainBox:{
        width:wp('90%'),
        borderRadius:scale(10),
        backgroundColor:'white',
        alignSelf:'center',
        marginTop:scale(20),
        paddingVertical:scale(10),
        paddingHorizontal:scale(10),
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    IconBox:{
        backgroundColor:'#0B4E98',
        borderRadius:100,
        padding:scale(5),
        height:scale(25)
    },
    TextBox:{
        marginLeft:scale(10),
    },
    pgText:{
        width:wp('70%'),
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_400Regular',
        lineHeight:scale(20)
    },
    plantext:{
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_400Regular',
        lineHeight:scale(20),
        marginBottom:scale(10)
    },
    planSubText:{
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_700Bold',
        lineHeight:scale(20),
        color:'#0B4E98'
    },
    mainHeadTxt:{
        fontSize: RFPercentage(2.3),
        fontFamily: 'Lato_700Bold',
        lineHeight:scale(20),
        alignSelf:'center',
        marginBottom:scale(10),
        color:'#0B4E98',
        borderBottomWidth:scale(2),
        paddingBottom:scale(5),
        borderBottomColor:'#0B4E98'
    },
    payBtn:{
        width:wp('50%'),
        alignSelf:'center',
        marginTop:scale(20)
    },
    button:{
        backgroundColor:'#0B4E98',
        borderWidth:0
    }
})