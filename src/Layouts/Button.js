import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import {  useTheme, useThemedStyles, typography } from '../utils';

const Button = ({ width, height, buttonStyle, buttonTextStyle, customClick, title, }, props) => {
  
    // const theme = useTheme();
    // const style = useThemedStyles(styles);

  const styles = useMemo(() =>
    StyleSheet.create({
      button: {
        width: width,
        height: height,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9312FF',
        color: '#ffffff',
        ...buttonStyle
      },
     
      text: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize:18,
        lineHeight: 18,
        ...buttonTextStyle
      }
    }),
    [width, height, buttonStyle, buttonTextStyle]);


  return (
    <TouchableOpacity style={styles.button} onPress={customClick}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;