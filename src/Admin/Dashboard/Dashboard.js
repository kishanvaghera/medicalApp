import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './DashboardStyle'
import RoutName from '../../Routes/RoutName'

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.mainScreen}>
         <Text style={styles.mainTitle}>Dashboard</Text>
          <View style={styles.boxRows}>
            <TouchableOpacity onPress={()=>{navigation.navigate(RoutName.ADMIN_CATEGORY_LIST)}} style={styles.boxCard}>
              <Text style={styles.boxCardText}>Category</Text>
            </TouchableOpacity>
            <View style={styles.boxCard}>
              <Text style={styles.boxCardText}>Yoga</Text>
            </View>
            <View style={styles.boxCard}>
              <Text style={styles.boxCardText}>Music</Text>
            </View>
            <View style={styles.boxCard}>
              <Text style={styles.boxCardText}>Activity</Text>
            </View>
          </View>
    </View>
  )
}

export default Dashboard