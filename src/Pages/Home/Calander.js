import React from 'react'
import { Calendar, Text,RangeCalendar, Layout } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../utils/scalling';
import * as APIService from '../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment/moment';

const CalanderComp = (props) => {
  
    var startDate=new Date("2023-03-25");
    startDate.setDate(startDate.getDate()-1);
    var startDate = startDate.toISOString().split('T')[0];
    
    var endDate = new Date("2023-03-25");
    endDate.setDate(endDate.getDate() + 5);
    var dateString = endDate.toISOString().split('T')[0];

    
    const [range, setRange] = useState({startDate:new Date(startDate),endDate:new Date(""+dateString)});
    
    var ovulationDate=new Date("2023-03-25");
    ovulationDate.setDate(ovulationDate.getDate()+28);
    var ovulationDate = ovulationDate.toISOString().split('T')[0];
    
    const renderDay = ({ date, style }) => {
      const curentDate=moment(date).format("YYYY-MM-DD");

      const isHighlighted =date > range.startDate && date < range.endDate;
      let dayStyleText = isHighlighted? { ...style,color:'white'}:style;
      let dayStyleBG = isHighlighted? {backgroundColor:'#0B4E98'}:style;

      const ovulationDateNew=moment(ovulationDate).format("YYYY-MM-DD");
      if(ovulationDateNew==curentDate){
        dayStyleBG={backgroundColor:'#CB1C8D'};
        dayStyleText = { ...style,color:'white'}
      }
    
      return (
        <View style={{height:verticalScale(43),justifyContent:'center',...dayStyleBG}}>
          <Text style={{textAlign:'center',...dayStyleText}}>{`${date.getDate()}`}</Text>
        </View>
      );
    };
    

  return (
    <View style={styles.mainBody}>
      <Text category='h6' style={{marginBottom:scale(10),marginLeft:scale(15)}}>
        Activity Calander
      </Text>
      <Layout style={styles.container} level='1'>
        <RangeCalendar
          style={{ width: '95%' }}
          range={range}
          renderDay={renderDay}
        />
      </Layout>
      <View style={{flexDirection:'row',marginTop:scale(10),marginBottom:scale(50),marginLeft:scale(15)}}>
        <View style={{height:verticalScale(50),width:moderateScale(140)}}>
          <Text>Period Length: 5</Text>
          <View style={{height:verticalScale(50),width:moderateScale(50),backgroundColor:"#0B4E98",marginTop:scale(10)}}></View>
        </View>
        <View style={{height:verticalScale(50),width:moderateScale(140),marginLeft:scale(50)}}>
          <Text>Cycle Length: 28</Text>
          <View style={{height:verticalScale(50),width:moderateScale(50),backgroundColor:"#CB1C8D",marginTop:scale(10)}}></View>
        </View>
      </View>
    </View>
  )
}

export default CalanderComp

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
    container:{
      marginLeft:scale(15)
    }
});