import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './CategoryListStyle'
import Icon from '../../../utils/Icon'
import {Colors as theme}  from '../../adminTheme';

const CategoryList = () => {
  return (
    <View style={styles.mainScreen}>
      <Text style={styles.mainTitle}>CategoryList</Text>
      <ScrollView contentContainerStyle={{paddingBottom:50}}>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
        <BoxRows/>
      </ScrollView>
    </View>
  )
}

export default CategoryList

const BoxRows=()=>{
  const string='is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry';
  return <View style={styles.boxRows}>
            <View style={styles.boxCard}>
                <Text style={styles.boxEditButton}>
                  <Icon LibraryName='FontAwesome' IconName='pencil-square-o' IconSize={25} IconColor={theme.primaryDark}/>
                </Text>
                <View style={styles.boxInner}>
                  <View style={styles.boxImage}>
                  </View>
                  <View style={styles.boxHead}>
                    <Text style={styles.boxHeadTitle}>Yoga</Text>
                    <Text style={styles.boxHeadDesc}>{string.substring(0,70)}......</Text>
                  </View>
                </View>
            </View>
          </View>
}