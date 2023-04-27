import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import images from '../../../assets';
import { RFPercentage } from 'react-native-responsive-fontsize';
import RoutName from '../../Routes/RoutName';
import { Button, Calendar } from '@ui-kitten/components';
import moment from 'moment';
import Icon from '../../utils/Icon';

const SubscribeSelect = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [isSelectPlan,setisSelectPlan]=useState("");
    const [LMPDate, setLMPDate] = useState("");
    const [EDDDate, setEDDDate] = useState("");

    const [visible, setVisible] = useState(false);

    const [selectedDate,setselectedDate]=useState(new Date());
    const [isFieldName,setisFieldName]=useState("");
    const handleSelectDate=(date)=>{
        if(isFieldName=="LMPDate"){
            setLMPDate(date);

            if(date!=""){
                const newDate = new Date(date);
                newDate.setDate(date.getDate() + 280);
                setEDDDate(newDate);
            }
        }
        setVisible(!visible);
    }

    const isOpenModal=(name)=>{
        if(name=="LMPDate"){
            setselectedDate(LMPDate);
        }
        setisFieldName(name);
        setVisible(!visible);
    }

    const TextArr=`=> ગર્ભ સંસ્કાર એટલે શું ? ( વૈદિક પરંપરા અનુસાર ) => યમ અને નિયમ ( મન શુદ્ધિ ) => બીજ અને શરીર શુદ્ધિ => બ્રહ્મચર્ય => ફર્ટિલિટી યોગા અને પ્રાણાયામ => ફર્ટીલિટી ડાયટ ચાર્ટ => ડ્રીમ બેબી ચાર્ટ => ગર્ભાધાન માટે શ્રેષ્ઠ તેમજ ઉચિત સમય અને વાતાવરણ => ગર્ભાધાન મંત્ર અને પ્રાર્થના => દિવ્ય આત્માને આવાહન => હકારાત્મક સૂચનો`;

    const TextArr2=`=> *Fixed activity => યોગ પ્રાણાયામ કસરત => નિત્ય પ્રાર્થના => શ્લોક,મંત્ર અને સ્તોત્ર => હાલરડુ => રાગ => સંગીત => ગર્ભ સંવાદ => Monthly diet chart => *Daily activity => સુવિચાર મંથન => સંસ્કૃત સ્તવન => બૌદ્ધિક વાર્તા => ગર્ભ સત્સંગ => Right brain activity => Left brain activity => 5 scence activity => હકારાત્મક સૂચનો => *Workshop ( lecture)=> Dream baby chart => 4Q development => 5 scence development => Book reading => Diet and lifestyle => યોગા અને પ્રાણાયામ => ગર્ભ સંવાદ`;

    const StringToArr = new String(TextArr).split("=>");
    const StringToArr2 = new String(TextArr2).split("=>");

    return (
        <View style={styles.body}>
            <Loader loading={loading} />
            <SafeAreaView>
                <Header title={'Subscribe'} />
            </SafeAreaView>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                    <Calendar
                        style={{backgroundColor:'white',width:wp('90%'),marginTop:hp('25%'),marginLeft:wp('5%')}}
                        date={selectedDate}
                        onSelect={nextDate => handleSelectDate(nextDate)}
                    />
            </Modal>
            <Main>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                <View style={styles.mainHeadBox}>
                    <Text style={styles.mainText}>Select Plan</Text>
                </View>
                <View style={{ alignItems: 'center',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('90%'),alignContent:'center',alignSelf:'center' }}>
                    <View style={{...styles.box,...isSelectPlan===0?{borderColor:'#0B4E98',borderWidth:2}:{}}}>
                        <TouchableOpacity style={styles.button} onPress={()=>setisSelectPlan(0)}>
                            <Image source={images.PrePlan} style={styles.imageStyle} resizeMode='contain' />
                            <View style={styles.boxPlan}>
                                <Text style={styles.PlanText}>Planning</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{...styles.box,...isSelectPlan===1?{borderColor:'#0B4E98',borderWidth:2}:{}}}>
                        <TouchableOpacity style={styles.button} onPress={()=>setisSelectPlan(1)}>
                            <Image source={images.PregnantPlan} style={styles.imageStyle} resizeMode='contain' />
                            <View style={styles.boxPlan}>
                                <Text style={styles.PlanText}>Pregnant</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    isSelectPlan===0?
                    <View style={{marginTop:scale(20)}}>
                        <Text style={styles.textVBoxFoot}>આપના છેલ્લા માસિકના પ્રથમ દિવસની તારીખ અહીં ભરો.</Text>
                        <TouchableOpacity style={styles.TextInpBox} onPress={()=>isOpenModal('LMPDate')}>
                            <Text style={styles.TextInpSty}>{LMPDate==""?"LMP ( Last Menstrual Perio...)":moment(LMPDate).format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>

                        <Text style={styles.textVBoxFoot}>આપના સંતાનના જન્મની સંભવિત તારીખ.</Text>
                        <View style={styles.TextInpBox}>
                            <Text style={styles.TextInpSty}>{EDDDate==""?"EDD (Estimated Due Date)":moment(EDDDate).format('DD/MM/YYYY')}</Text>
                        </View>
                    </View>
                    :""
                }

                {
                    isSelectPlan===0?
                    <View style={styles.planBox}>
                        <Text style={styles.planContt}>Plan Content:</Text>
                        {
                            StringToArr.map((curEle,index)=>{
                                return  curEle!=""?<View style={{flexDirection:'row',marginBottom:scale(10)}} key={index}>
                                            <View style={styles.IconBox}>
                                                <Icon LibraryName='FontAwesome' IconName='check' IconSize={12} IconColor={"white"}/>
                                            </View>
                                            <View style={styles.TextBox}>
                                                <Text style={styles.pgText}>{curEle}</Text>
                                            </View>
                                        </View>:""
                            })
                        }
                    </View>:""
                }

                {
                    isSelectPlan===1?
                    <View style={styles.planBox}>
                        <Text style={styles.planContt}>Plan Content:</Text>
                        {
                            StringToArr2.map((curEle,index)=>{
                                const isStringHeader=new String(curEle).includes("*");
                                let newString=curEle;
                                if(isStringHeader){
                                    newString=curEle.replace('*','');
                                }
                                return  curEle!=""?<View style={{flexDirection:'row',marginBottom:scale(10)}} key={index}>
                                            {
                                                !isStringHeader?
                                                <View style={styles.IconBox}>
                                                    <Icon LibraryName='FontAwesome' IconName='check' IconSize={12} IconColor={"white"}/>
                                                </View>
                                                :""
                                            }
                                            <View style={{...styles.TextBox,...isStringHeader?{marginLeft:scale(0)}:{}}}>
                                                <Text style={{...styles.pgText,...isStringHeader?{fontSize: RFPercentage(2),fontFamily: 'Lato_700Bold'}:{}}}>{newString}</Text>
                                            </View>
                                        </View>:""
                            })
                        }
                    </View>:""
                }

                {
                    isSelectPlan===0 || isSelectPlan===1?
                    <View style={styles.payBtn}>
                        <Button style={styles.buttonPay} status='success' accessoryRight={<Icon LibraryName='FontAwesome' IconName='send' IconSize={15} IconColor={"white"}/>} >
                            PAY
                        </Button>
                    </View>
                    :""
                }
            </ScrollView>

            </Main>
        </View>
    )
}

export default SubscribeSelect

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0B4E98',
        marginTop: scale(20),
    },
    mainHeadBox: {
        width: wp('90%'),
        backgroundColor: '#0B4E98',
        alignSelf: 'center',
        marginTop: scale(20),
        paddingVertical: scale(10),
        borderRadius: scale(5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    mainText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_700Bold',
    },
    box: {
        width: wp('42%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: scale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        borderRadius: scale(20)
    },
    PlanText: {
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_700Bold',
        color: '#0B4E98',
        alignSelf: 'center',
        height:20
    },
    boxPlan: {
        // backgroundColor: '#0B4E98',
        paddingVertical: scale(10),
        borderBottomLeftRadius: scale(10),
        borderBottomRightRadius: scale(10),
    },
    button: {
        elevation: 0,
        shadowColor: 'transparent',
        // backgroundColor: 'white'
    },
    imageStyle: {
        width: wp('35%'),
        height: hp('15%'),
        alignSelf: 'center'
    },
    textVBoxFoot:{
        marginLeft:scale(15),
        marginTop:scale(10),
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        color: '#0B4E98',
    },
    TextInpBox:{
        width:wp('90%'),
        backgroundColor:'white',
        padding:scale(10),
        marginTop:scale(10),
        alignSelf:'center',
        borderRadius:scale(10),
        borderWidth:1,
        borderColor:'#0B4E98'
    },
    TextInpSty:{
        fontSize: RFPercentage(1.8),
        fontFamily: 'Lato_400Regular',
        color: '#0B4E98',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_400Regular',
        lineHeight:scale(20)
    },
    planBox:{
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
    planContt:{
        fontSize: RFPercentage(2),
        fontFamily: 'Lato_700Bold',
        marginBottom:scale(15)
    },
    payBtn:{
        width:wp('50%'),
        alignSelf:'center',
        marginTop:scale(20)
    },
    buttonPay:{
        backgroundColor:'#0B4E98',
        borderWidth:0
    }
})