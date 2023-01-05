import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme, useThemedStyles  } from '../utils'

const Container = () => {

    const theme = useTheme();
   const style = useThemedStyles(styles);

  return (
    <View style={{
      flex: 1,
      backgroundColor:  theme.colors.BACKGROUND
    }}>
    
    </View>
  )
}

const styles = theme =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor:  theme.colors.BACKGROUND
    },
});

export default Container