import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from './DashboardStyle'
import RoutName from '../../Routes/RoutName'

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.mainScreen}>
         <Text style={styles.mainTitle}>Dashboard</Text>
          <ScrollView contentContainerStyle={{paddingBottom:50,paddingLeft:5,paddingRight:5}}>
          <View style={styles.boxRows}>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_CATEGORY_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Category</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_CATEGORY_DET_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Category Detail</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_YOGA_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Yoga</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_YOGA_DET_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Yoga Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_MUSIC_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_MUSIC_DET_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Music Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_ACTIVITY_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_ACTIVITY_DET_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Activity Detail</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
    </View>
  )
}

export default Dashboard