import React from 'react'
import { Calendar, Text,RangeCalendar, Layout } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const DispCalanderData = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState({startDate:null,endDate:null});
    const [OvulationNewDate,setOvulationNewDate]=useState(null);
    const [PeriodLength,setPeriodLength]=useState(0);
    const [cycleLength,setCycleLength]=useState(0);

    const ApiCall=()=>{
      const postData={action:"getPeriodCalData"}
      APIService.apiAction(postData, apiUrls.auth).then(res => {
        setLoading(false);
        if (res) {
          if (res.status == 200) {
            const dd=res.data;

            if(dd.vPeriodLength!="" && dd.vCycleLength!=""){
              const ddStartDate=new Date(dd.dPregStartDate);
              const startDateNew = new Date(ddStartDate.getTime());
              startDateNew.setDate(startDateNew.getDate()-1);
  
              const ddEndDate=new Date(dd.dPregEndDate);
              const EndDateNew = new Date(ddEndDate.getTime());
              EndDateNew.setDate(EndDateNew.getDate()+1);
  
              setRange({startDate:startDateNew,endDate:ddEndDate});
  
              var ovulationDate=new Date(dd.dPregStartDate);
              const NewOvlDate = new Date(ovulationDate.getTime());
              NewOvlDate.setDate(NewOvlDate.getDate()+Number(dd.vCycleLength));
              setOvulationNewDate(NewOvlDate);
  
              setPeriodLength(dd.vPeriodLength);
              setCycleLength(dd.vCycleLength);
            }else{
              setRange({startDate:null,endDate:null});
              setOvulationNewDate(null);
              setPeriodLength(0);
              setCycleLength(0);
            }
            
          }
        }
      })
    }

    useFocusEffect(
      useCallback(()=>{
      ApiCall();
      },[navigation])
    )
    
    const renderDay = ({ date, style }) => {
      const curentDate=moment(date).format("YYYY-MM-DD");

      let isHighlighted = false;
      let dayStyleText=style;
      let dayStyleBG=style;
      if(range.startDate!=null){
        isHighlighted = date > range.startDate && date < range.endDate;
        dayStyleText = isHighlighted? { ...style,color:'white'}:style;
        dayStyleBG = isHighlighted? {backgroundColor:'#FB2576'}:style;
        
        const ovulationDateNew=moment(OvulationNewDate).format("YYYY-MM-DD");
        if(ovulationDateNew==curentDate){
          dayStyleBG={backgroundColor:'#CB1C8D'};
          dayStyleText = { ...style,color:'white'}
        }
      }

      return (
        <View style={{height:verticalScale(43),justifyContent:'center',...dayStyleBG}}>
          <Text style={{textAlign:'center',...dayStyleText}}>{`${date.getDate()}`}</Text>
        </View>
      );
    };
    

  return (
    <View style={styles.body}>
      <Loader loading={loading} />
      <SafeAreaView>
          <Header iconName={'menu'} title={'Calendar'} isCalanderAdd={true} />
      </SafeAreaView>
      <Main>
        <View style={styles.container}>
          <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{justifyContent: 'flex-start',alignContent: 'flex-start',paddingBottom:scale(80)}} >
            <View style={styles.mainBody}>
              <Layout style={{marginLeft:scale(15)}} level='1'>
                <RangeCalendar
                  disableMonthPicker={true}
                  disableYearPicker={true}
                  style={{ width: '95%' }}
                  range={range}
                  renderDay={renderDay}
                  date={OvulationNewDate}
                />
              </Layout>
              <View style={{flexDirection:'row',marginTop:scale(10),marginBottom:scale(50),marginLeft:scale(15)}}>
                <View style={{height:verticalScale(50),width:moderateScale(140)}}>
                  <Text>Period Length: {PeriodLength}</Text>
                  <View style={{height:verticalScale(50),width:moderateScale(50),backgroundColor:"#FB2576",marginTop:scale(10),borderRadius:scale(10)}}></View>
                </View>
                <View style={{height:verticalScale(50),width:moderateScale(140),marginLeft:scale(50)}}>
                  <Text>Cycle Length: {cycleLength}</Text>
                  <View style={{height:verticalScale(50),width:moderateScale(50),backgroundColor:"#CB1C8D",marginTop:scale(10),borderRadius:scale(10)}}></View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Main>
    </View>
  )
}

export default DispCalanderData

const styles = StyleSheet.create({
    mainBody:{
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
    // container:{
    //   marginLeft:scale(15)
    // }
});