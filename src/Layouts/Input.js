import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Input = ({ inputContainerStyle, inputStyle, placeholder, keyboardType, onChangeText, returnKeyType, numberOfLines, multiline, maxLength, onSubmitEditing, value, isIcon, iconSource, autoComplete, secureTextEntry,clickHandle }, props) => {

  const styles = useMemo(() =>
    StyleSheet.create({
      inputView: {
        width: wp(80),
        height: 40,
        marginTop: 20,
        justifyContent : 'center',
        borderWidth: 0.8,
        borderColor: '#808080',
        borderRadius: 10,
        paddingLeft: 5,
        ...inputContainerStyle

      },
      input: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        ...inputStyle

      },
      iconSearch: {
        width: 20,
        height: 20,
        marginVertical : hp(1.5),
        marginLeft : 5,
        tintColor: '#bcbcbc',
      }
    }),
    [inputStyle, inputContainerStyle]);


  return (
    <View style={styles.inputView}
    >
      {isIcon ?
        <>
          <Image source={iconSource} style={styles.iconSearch} resizeMode={'stretch'} />
        </> : <></>}
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor="#000000"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        maxLength={maxLength}
        textAlignVertical="top"
        textAlign="left"
        autoComplete={autoComplete}
        onSubmitEditing={onSubmitEditing}
        style={styles.input}
        blurOnSubmit={false}
        value={value}
        secureTextEntry={secureTextEntry}
        onPressIn={clickHandle}
      />
    </View>
  );


};

export default Input;