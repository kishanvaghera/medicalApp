import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Header } from '../../../../Layouts';
import { useSelector, useDispatch } from 'react-redux'
import { LogOut } from '../../../../Redux/reducer';

const Profile = () => {
  const dispatch = useDispatch()

  const Logout=()=>{
    dispatch(LogOut({}));
  }

  return (
    <View style={styles.body}>
      <Header iconName={'menu'} title={'Profile'} />
      <TouchableOpacity onPress={Logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
});