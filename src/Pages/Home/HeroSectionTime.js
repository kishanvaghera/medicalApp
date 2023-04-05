import React, { useEffect,useState } from 'react';
import {View,StyleSheet, TouchableOpacity,Text} from 'react-native'
import { scale, verticalScale, moderateScale } from '../../utils/scalling';
import { Card,Calendar,Button,Modal } from '@ui-kitten/components';
import Icon from '../../utils/Icon';
import * as Progress from 'react-native-progress';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import moment from 'moment';
import { RFPercentage } from 'react-native-responsive-fontsize';
import images from '../../../assets';
import { Image } from 'react-native';

const HeroSectionTime = (props) => {

    const [date, setDate] = useState(new Date(""));
    const [visible, setVisible] = useState(false);

    console.log("date",date)

    const [TrimsterData,setTrimsterData]=useState({
        CurrentMonth:"",
        CurrentWeek:"",
        CurrentDays:"",
        DaysLeft:"",
        EDDDate:"",
        Percentage:1,
    });

    useEffect(()=>{
        if(props.PregStartDate && props.PregStartDate!="" && props.PregStartDate!=null){
            setDate(new Date(""+props.PregStartDate));
            const dd=props.UserData;

            setTrimsterData(prevState=>{
                return{
                    ...prevState,
                    CurrentMonth:dd.vCurrPregMonth,
                    CurrentWeek:dd.vCurrPregWeek,
                    CurrentDays:dd.vCurrPregDay,
                    DaysLeft:dd.EDDDaysLeft,
                    EDDDate:dd.EDDDate,
                    Percentage:dd.Percentage,
                }
            });
        }
    },[props.PregStartDate,props.UserData])

    const toggleDatePicker = () => {
        setVisible(!visible);
    };

    const [isChangeDate,setisChangeDate]=useState(false);
    const handleSelectDate=(date)=>{
        setDate(date);
        setVisible(!visible);
        setisChangeDate(true);
    }

    useEffect(() => {
        if(isChangeDate){
            const postData={action:"getTrimsterData",date:moment(date).format('YYYY-MM-DD')}
            APIService.apiAction(postData, apiUrls.general).then(res => {
                if(res.status==200){
                    const dd=res.data;
                    props.handleChangeBabyData(dd);
                    setTrimsterData(prevState=>{
                        return{
                            ...prevState,
                            CurrentMonth:dd.MonthCurr,
                            CurrentWeek:dd.WeekCurr,
                            CurrentDays:dd.DaysCurr,
                            DaysLeft:dd.EDDDaysLeft,
                            EDDDate:dd.EDDDate,
                            Percentage:dd.Percentage,
                        }
                    });
                }
            })
            setisChangeDate(false);
        }
      return () => {}
    }, [date])

    const CurrentDayTime=()=>{
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            return 'Good morning';
        } else if (curHr < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    }

    
  return (
    <Card style={styles.bg}>
        <View>
            <View style={{marginLeft:scale(-10)}}>
                <Text style={styles.msg}>{CurrentDayTime()} {props?.UserData?.vFirstName}!</Text>
                <View style={styles.DatePicker}>
                    <Button onPress={toggleDatePicker} appearance='ghost'>
                        <Icon IconName='calendar' LibraryName='FontAwesome' IconSize={22} IconColor={'#6B728E'}/>
                    </Button>
                    <Text style={styles.pregStartDate}>{moment(date).format('DD MMMM YYYY')}</Text>
                </View>
                <Modal
                    visible={visible}
                    backdropStyle={styles.backdrop}
                    onBackdropPress={() => setVisible(false)}>
                        <Calendar
                            style={{backgroundColor:'white',width:scale(310)}}
                            date={date}
                            onSelect={nextDate => handleSelectDate(nextDate)}
                        />
                </Modal>
            </View>
            <View style={{marginLeft:scale(-10)}}>
                <Text style={styles.term}>My pregnancy term:</Text>
                <Text style={styles.leftCalc}>
                    {
                        TrimsterData.CurrentMonth==0 && TrimsterData.CurrentWeek==0?"Baby is Loading.":<>
                        {TrimsterData.CurrentMonth>0?TrimsterData.CurrentMonth+" Month, ":""}{TrimsterData.CurrentWeek>0?TrimsterData.CurrentWeek+" weeks":""}{TrimsterData.CurrentDays>0?", "+TrimsterData.CurrentDays+" days":""} 
                        </>
                    }
                    </Text>
            </View>
            {
             TrimsterData.CurrentMonth==0 && TrimsterData.CurrentWeek==0?"":
                <View style={{marginLeft:scale(-10)}}>
                    <Progress.Bar style={styles.progressbar} color={'#FB2576'} unfilledColor={'#fcacca'} borderWidth={2} borderRadius={scale(15)} height={verticalScale(15)} progress={TrimsterData.Percentage} width={moderateScale(170)} />
                    <Text style={styles.daysLeft}>{TrimsterData.DaysLeft} days left (EDD {TrimsterData.EDDDate})</Text>
                </View>
            }

            <Image
            style={{...styles.image,height:TrimsterData.CurrentMonth==0 && TrimsterData.CurrentWeek==0?verticalScale(190):verticalScale(250)}}
            source={images.heroHome}
            resizeMode={'stretch'} />
        </View>
    </Card>
  )
}

export default HeroSectionTime

const styles = StyleSheet.create({
    bg:{
        marginTop:scale(15),
        width:moderateScale(320),
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius:scale(20),
    },
    msg:{
        fontFamily:'Lato_400Regular',
        fontSize:RFPercentage(2.5)
    },
    DatePicker:{
        flexDirection:'row',
        marginLeft:scale(-10)
    },
    pregStartDate:{
        fontFamily:'Lato_700Bold',
        fontSize:RFPercentage(3),
        color:"#FB2576",
        marginTop:scale(12)
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    term:{
        fontFamily:'Lato_700Bold',
        fontSize:RFPercentage(2.5),
    },
    leftCalc:{
        fontFamily:'Lato_700Bold',
        fontSize:RFPercentage(2.5),
        marginTop:scale(10),
        color:"#FB2576",
    },
    progressbar:{
        marginTop:scale(10)
    },
    daysLeft:{
        fontFamily:'Lato_400Regular',
        fontSize:RFPercentage(2),
        marginTop:scale(10)
    },
    image:{
        width:moderateScale(130),
        height:verticalScale(250),
        position:'absolute',
        right:-50,
        top:-50,
        zIndex:-1,
        transform: [
            { scaleX: -1 }
        ],
    }
})