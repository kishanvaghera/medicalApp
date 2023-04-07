import React,{ useState,useEffect } from 'react'
import { Calendar, Text,Layout,Input,Button  } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import Icon from '../../utils/Icon';
import apiUrls from '../../Middleware/apiUrls';
import * as APIService from '../../Middleware/APIService';
import {ToastMessage} from '../../utils/ToastMessage'
import moment from 'moment';
import RoutName from '../../Routes/RoutName';

const SetCalanderData = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [StartDate,setStartDate]=useState(null);
  const [EndDate,setEndDate]=useState(null);
  const [PeridsLength,setPeridsLength]=useState('21');
  const [CycleLength,setCycleLength]=useState('2');

  const handleSelectDate = (newDate) => {
    setStartDate(newDate);
    setEndDate(null);
  };

  useEffect(() => {
    if (StartDate != null) {
      const endDate = new Date(StartDate.getTime());
      endDate.setDate(endDate.getDate() + Number(PeridsLength));
      setEndDate(endDate);
    }
  }, [StartDate,PeridsLength]);
  
  const renderDay = ({ date, style }) => {
    let isHighlighted = false;
    if(StartDate!=null){
      const startDateNew = new Date(StartDate.getTime());
      startDateNew.setDate(startDateNew.getDate()-1);
      isHighlighted = date > startDateNew && date < EndDate;
    }

    let dayStyleText = isHighlighted? { ...style,color:'white'}:style;
    let dayStyleBG = isHighlighted? {backgroundColor:'#9f5fea'}:style;

    return (
      <TouchableOpacity onPress={()=>handleSelectDate(date)}>
        <View style={{height:verticalScale(43),justifyContent:'center',...dayStyleBG}}>
          <Text style={{textAlign:'center',...dayStyleText}}>{`${date.getDate()}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleBlurPeriods=()=>{
    if (Number(PeridsLength) >= 21 && Number(PeridsLength) <= 35) {
      setPeridsLength(''+PeridsLength);
    }else{
      setPeridsLength('21');
    }
  }

  const changePerLen=(type)=>{
    if(type=="plus"){
      let NewPeriodLen=Number(PeridsLength)+1;
      if (Number(NewPeriodLen) >= 21 && Number(NewPeriodLen) <= 35) {
        setPeridsLength(''+NewPeriodLen);
      }
    }else{
      let NewPeriodLen=Number(PeridsLength)-1;
      if (Number(NewPeriodLen) >= 21 && Number(NewPeriodLen) <= 35) {
        setPeridsLength(''+NewPeriodLen);
      }
    }
  }

  const handleBlurCycle=()=>{
    if (Number(CycleLength) >= 2 && Number(CycleLength) <= 8) {
      setCycleLength(''+CycleLength);
    }else{
      setCycleLength('2');
    }
  }

  const changeCycLen=(type)=>{
    if(type=="plus"){
      let NewPeriodLen=Number(CycleLength)+1;
      if (Number(NewPeriodLen) >= 2 && Number(NewPeriodLen) <= 8) {
        setCycleLength(''+NewPeriodLen);
      }
    }else{
      let NewPeriodLen=Number(CycleLength)-1;
      if (Number(NewPeriodLen) >= 2 && Number(NewPeriodLen) <= 8) {
        setCycleLength(''+NewPeriodLen);
      }
    }
  }
  
  const saveData=()=>{
    if(StartDate==null || EndDate==null){
      ToastMessage(0,"Please select period start date.");
    }else{
      setLoading(true);
      const endDateNew = new Date(EndDate.getTime());
      endDateNew.setDate(endDateNew.getDate()-1);
  
      const postData={action:"CalanderDataStore",dPregStartDate:moment(StartDate).format("YYYY-MM-DD"),dPregEndDate:moment(endDateNew).format("YYYY-MM-DD"),vPeriodLength:PeridsLength,vCycleLength:CycleLength};
      APIService.apiAction(postData, apiUrls.auth).then(res => {
        setLoading(false);
        if (res) {
          if (res.status == 200) {
            ToastMessage(1,res.message);
            navigation.navigate(RoutName.CALANDER_VIEW);
          }else{
            ToastMessage(0,"Network Error!");
          }
        }
      })
    }
  }

  useEffect(()=>{
    setLoading(true);
    const postData={action:"getPeriodCalData"}
    APIService.apiAction(postData, apiUrls.auth).then(res => {
      setLoading(false);
      if (res) {
        if (res.status == 200) {
          const dd=res.data;
          if(dd['vPeriodLength']=="" || dd['vCycleLength']==""){
            setStartDate(null);
            setEndDate(null);
            setPeridsLength('21');
            setCycleLength('2');
          }else{
            const ddStartDate=new Date(dd.dPregStartDate);
            const startDateNew = new Date(ddStartDate.getTime());
            startDateNew.setDate(startDateNew.getDate()-1);
            setStartDate(startDateNew);
            setPeridsLength(''+dd.vPeriodLength);
            setCycleLength(''+dd.vCycleLength);
          }
        }else{
          setStartDate(null);
          setEndDate(null);
          setPeridsLength('21');
          setCycleLength('2');
        }
      }
    })
  },[])

  return (
    <View style={styles.body}>
      <Loader loading={loading} />
      <SafeAreaView>
          <Header iconName={'menu'} title={'Calendar'} backScreenName={RoutName.CALANDER_VIEW} />
      </SafeAreaView>
      <Main>
        <View style={styles.container}>
          <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
            <View style={styles.mainBody}>
              
              <Text style={styles.InpHeadTitle}>Period Length</Text>
              <View style={{flexDirection:'row',marginBottom:scale(15),marginLeft:scale(5)}}>
                  <Input
                    style={{ width: moderateScale(60),borderColor:'#9f5fea' }}
                    keyboardType='numeric'
                    value={PeridsLength}
                    onChangeText={(nextValue)=>setPeridsLength(nextValue)}
                    onBlur={handleBlurPeriods}
                  />
                  <View style={styles.styleTextButton}>
                    <Text style={{fontSize:scale(18),color:'white'}}>Days</Text>
                  </View>

                  <TouchableOpacity onPress={()=>changePerLen("plus")} style={{...styles.styleTextButton,marginLeft:scale(72)}}>
                    <Icon IconName='plus' LibraryName='FontAwesome5' IconSize={22} IconColor={'white'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>changePerLen("minus")} style={{...styles.styleTextButton,marginLeft:scale(5)}}>
                    <Icon IconName='minus' LibraryName='FontAwesome5' IconSize={22} IconColor={'white'}/>
                  </TouchableOpacity>
              </View>

              <Text style={styles.InpHeadTitle}>Cycle Length</Text>
              <View style={{flexDirection:'row',marginBottom:scale(15),marginLeft:scale(5)}}>
                  <Input
                    style={{ width: moderateScale(60),borderColor:'#9f5fea' }}
                    keyboardType='numeric'
                    value={CycleLength}
                    onChangeText={(nextValue)=>setCycleLength(nextValue)}
                    onBlur={handleBlurCycle}
                  />
                  <View style={styles.styleTextButton}>
                    <Text style={{fontSize:scale(18),color:'white'}}>Days</Text>
                  </View>

                  <TouchableOpacity onPress={()=>changeCycLen("plus")} style={{...styles.styleTextButton,marginLeft:scale(72)}}>
                    <Icon IconName='plus' LibraryName='FontAwesome5' IconSize={22} IconColor={'white'}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>changeCycLen("minus")} style={{...styles.styleTextButton,marginLeft:scale(5)}}>
                    <Icon IconName='minus' LibraryName='FontAwesome5' IconSize={22} IconColor={'white'}/>
                  </TouchableOpacity>
              </View>


              <Layout style={{marginLeft:scale(5)}} level='1'>
                <Calendar 
                renderDay={renderDay}
                style={{ width: '100%' }}
                date={EndDate}
                />
              
                <Button style={{marginTop:scale(10),width:moderateScale(150),alignSelf:'center'}} onPress={saveData}>
                  Save Data
                </Button>

              </Layout>

            </View>
          </ScrollView>
        </View>
      </Main>
    </View>
  )
}

export default SetCalanderData

const styles = StyleSheet.create({
  mainBody:{
    width:moderateScale(320)
  },
  dayContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
  },
  value: {
      fontSize: 12,
      fontWeight: '400',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
  },
  styleTextButton:{
    backgroundColor: '#9f5fea',
    borderRadius: scale(5),
    paddingLeft: scale(15), 
    paddingRight: scale(15), 
    marginLeft: scale(5),
    justifyContent: 'center'
  },
  InpHeadTitle:{
    fontSize:scale(18),
    fontWeight:'800',
    marginLeft:scale(5),
    marginBottom:scale(10)
  }
});