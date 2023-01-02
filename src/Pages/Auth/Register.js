import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';

import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';


const Register = ({ navigation }) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.body}>
      <View style={styles.backBtbView}>
        <AntDesign name="left" size={22} color="black" />
      </View>
      <View style={styles.formContaner}>
        <Text style={styles.boldText}>Register</Text>
        <Text style={styles.lableText}>Create your new account</Text>
        <View style={styles.dropDownView}>
          <Text style={styles.dropDownText}>Select Plan</Text>
        </View>
        <Input
          placeholder={'Full Name'}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
        />
        <Input
          placeholder={'Email'}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType={'email-address'}
          multiline={false}
          returnKeyType={'next'}
        />
        <Input
          placeholder={'Mobile Number'}
          onChangeText={(text) => setMobileNo(text)}
          value={mobileNo}
          keyboardType={'phone-pad'}
          multiline={false}
          returnKeyType={'next'}
        />
        <Input
          placeholder={'Password'}
          onChangeText={(text) => setPassword(text)}
          value={password}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          autoComplete={'password'}
          secureTextEntry={true}
        />
        <Input
          placeholder={'Confirm Password'}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          keyboardType={'text'}
          multiline={false}
          returnKeyType={'next'}
          autoComplete={'password'}
          secureTextEntry={true}
        />
       
        <Button
          width={wp(75)}
          height={40}
          title={'Next'}
          buttonStyle={{ marginTop: 20 }}
          customClick={() => navigation.navigate(RoutName.OTHER_DETILS)} />

        <Text style={[styles.lableText, { marginTop: 5, fontSize: 15 }]}>By Signing you agree to team of use</Text>
        <Text style={[styles.lableText, { fontSize: 15 }]}>and privacy notic</Text>
      </View>
    </View>
  )
}

export default Register;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  formContaner: {
    width: '100%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    marginTop: '10%'
  },
  boldText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  lableText: {
    fontSize: 20,
    fontWeight: '400'
  },
  backBtbView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '5%',
    backgroundColor: '#D3D3D3'
  },
  dropDownView: {
    width: wp(80),
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: '#808080',
    borderRadius: 10,
    paddingLeft: 5,
  },
  dropDownText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  lableBtn: {
    alignSelf: 'flex-end',
    marginTop: 5
  }
});