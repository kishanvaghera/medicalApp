import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlanHome from './PlanHome'
import TrialHome from '../TrialPages/TrialHome'
import { useSelector } from 'react-redux'

const Home = ({navigation}) => {
  const loggedData = useSelector((state) => state.userLoggedData.isUserData );

  console.log("loggedData?.iPlanId",loggedData?.iPlanId)
  return (
    <View>
      {
        loggedData?.iPlanId && loggedData?.iPlanId>0?<PlanHome navigation={navigation}/>:<TrialHome navigation={navigation}/>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})