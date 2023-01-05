import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import images from '../../../assets';
import { PrivateRouters } from '../../Routes';
import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';


const Login = ({ navigation }) => {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.body}>
      <Image
        style={styles.image}
        source={images.img_space}
        resizeMode={'stretch'} />

      <View style={styles.formContaner}>
        <Text style={styles.boldText}>WelCome back</Text>
        <Text style={styles.lableText}>Login to yout account</Text>

        <Input
          placeholder={'Username'}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          keyboardType={'text'}
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
        <Button
          width={'75%'}
          height={40}
          title={'Sign in'}
          buttonStyle={{ marginTop: 20 }}
          customClick={() => navigation.navigate('homeScreenStack')} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text style={[styles.lableText, {}]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(RoutName.REGIDTER)}><Text style={[styles.lableText, { fontWeight: '600' }]} > Sign up</Text></TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default Login;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '35%'
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
  }
});