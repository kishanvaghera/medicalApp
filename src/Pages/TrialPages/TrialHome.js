import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Linking, Share} from 'react-native'
import { scale } from '../../utils/scalling';
import { Loader } from '../../Components';
import { Header, Main } from '../../Layouts'
import SliderScreen from './SliderScreen';
import TrialWelcomeScr from './TrialWelcomeScr';
import SubscribeScreen from './SubscribeScreen';
import images from '../../../assets';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function TrialHome(props) {
    const [loading, setLoading] = useState(false);

    const message = `Greetings to India's Premier Online Garbhsanskar Community!

    Introducing the Revolutionary Geeta Garbhsanskar App - Your Ultimate Companion for Achieving a Divine and Dynamic Child. Our Mobile App offers a comprehensive daily activity-based online Garbhsanskar Guidance for Pregnant Ladies, with access to 25 enjoyable activities, Vedic and Scientific Workshops, and Unique Weekly Classes spanning 9 Months. Join us on this transformative journey towards nurturing a healthy and blessed child.

    I'm on Instagram as @shreegeetagarbhsanskar. Install the app to follow my photos and videos. https://www.instagram.com/invites/contact/?i=f0sn250yd1ef&utm_content=q6entgf
    
    Youtube (FREE Video) : https://www.youtube.com/@shreegeetagarbhsanskar

    Helpline : https://wa.me/7043381554
    
    Fonders:
    Dr. Jay Kapadiya
    Dr. Krupali Kapadiya`;

    const youtubeUrl = 'https://www.youtube.com/@shreegeetagarbhsanskar';
    const instagramUrl = 'https://www.instagram.com/invites/contact/?i=f0sn250yd1ef&utm_content=q6entgf';
    const facebookUrl = 'https://www.facebook.com/';
    const googleUrl = 'https://www.google.com/';
    const whatsappUrl=`whatsapp://send?text=Hi, I have downloaded your app, I would like to learn more about your App&phone=7043381554`;
    const openLink = (platForm) => {
        if(platForm=='y'){
        Linking.openURL(youtubeUrl);
        }else if(platForm=='i'){
        Linking.openURL(instagramUrl);
        }else if(platForm=='f'){
        Linking.openURL(facebookUrl);
        }else if(platForm=='we'){
        Linking.openURL(googleUrl);
        }else if(platForm=='wa'){
        Linking.openURL(whatsappUrl);
        }
    }

    const onShareApp = async () => {
        try {
        const result = await Share.share({
            message:message,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
        } catch (error) {
        alert(error.message);
        }
    };

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
                        <TrialWelcomeScr navigation={props.navigation}/>
                        <SubscribeScreen navigation={props.navigation}/>

                        <TouchableOpacity onPress={onShareApp}>
                            <Image source={images.shareApp} style={{width:wp('90%'),height:hp('20%'),alignSelf:'center',marginTop:scale(20),borderRadius:scale(10)}} resizeMode={'stretch'}/>
                        </TouchableOpacity>

                        <View style={{width:wp('90%'),flexDirection:'row',justifyContent:'space-around',alignSelf:'center',marginTop:scale(20)}}>
                            <TouchableOpacity onPress={()=>openLink('we')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                                <Image source={images.website} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openLink('y')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                            <Image source={images.youtube} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openLink('f')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                            <Image source={images.facebook} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openLink('i')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                            <Image source={images.instagram} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>openLink('wa')} style={{borderColor:'#c0d6ef',borderWidth:1,padding:scale(10),borderRadius:scale(100)}}>
                            <Image source={images.whatsapp} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                        </View>
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