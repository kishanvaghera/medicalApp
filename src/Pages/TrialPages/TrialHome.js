import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import SliderScreen from './SliderScreen';
import TrialWelcomeScr from './TrialWelcomeScr';
import TrialActivity from './TrialActivity';
import SubscribeScreen from './SubscribeScreen';

export default function TrialHome(props) {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.body}>
            <Loader loading={loading} />
            <SafeAreaView>
                <Header iconName={'menu'} title={'Home'} />
            </SafeAreaView>
            <Main>
                <View style={styles.container}>
                    <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:scale(80),paddingTop:scale(10)}} >
                        <SliderScreen />
                        <TrialWelcomeScr />
                        <TrialActivity />
                        <SubscribeScreen navigation={props.navigation}/>
                    </ScrollView>
                </View>
            </Main>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
      backgroundColor: '#fff',
    },
    container: {
      backgroundColor:'#f1f8ff',
      paddingBottom:scale(30)
    },
});