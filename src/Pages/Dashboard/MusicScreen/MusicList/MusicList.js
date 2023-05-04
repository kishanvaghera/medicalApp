import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView, TouchableOpacity
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import { Loader } from '../../../../Components';
import { Header, Main } from '../../../../Layouts'
import RoutName from '../../../../Routes/RoutName';
import { Colors as theme } from '../../../../utils/useTheme';
import { RFPercentage } from 'react-native-responsive-fontsize';


const MusicList = ({ route, navigation }) => {

    // let musicList = [
    //     {
    //         id: 1,
    //         name: 'prayer 1'
    //     },
    //     {
    //         id: 2,
    //         name: 'prayer 2'
    //     },
    //     {
    //         id: 3,
    //         name: 'prayer 3'
    //     },
    //     {
    //         id: 4,
    //         name: 'prayer 4'
    //     },
    //     {
    //         id: 5,
    //         name: 'prayer 5'
    //     },
    //     {
    //         id: 6,
    //         name: 'prayer 6'
    //     },
    //     {
    //         id: 7,
    //         name: 'prayer 7'
    //     },
    //     {
    //         id: 8,
    //         name: 'prayer 8'
    //     },
    //     {
    //         id: 9,
    //         name: 'prayer 9'
    //     }]
    const [loading, setLoading] = useState(false);
    const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);
    const [musicList, setMusicList] = useState([]);
   

    useEffect(() => {
        getMusicCategoryList('')
        return()=> {}
    },[])

    const getMusicCategoryList = (mTypeId) => {
        setLoading(true);
        const postData = {
            action: 'MusicData',
            vAuthToken: uToken,
            iMusicCategoryId: '1'
        };
        APIService.apiAction(postData, apiUrls.music).then(res => {
            setLoading(false);
            if (res) {
                if (res.status == 200) {
                    let newDataArr = [];
                    Object.keys(res.data).map((key, ind) => {
                        res.data[key].map((curEle, index) => {
                            newDataArr.push(curEle);
                        })
                    })
                    setMusicList([...newDataArr])
                }
            }
        })
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(RoutName.MUSIC_PLAYER, { musicData: item })}
                style={styles.gridView}>
                <Image
                    style={styles.imageThumbnail}
                    source={{ uri: item.tMusicFile }}
                />
            </TouchableOpacity>
            // <TouchableOpacity style={styles.itemContainer}
            //     onPress={() => navigation.navigate(RoutName.MUSIC_PLAYER)}>
            //     <Ionicons name={'musical-note-outline'} size={24} color="black" />
            //     <Text style={styles.titleText}>{item.name}</Text>
            // </TouchableOpacity>
        );
    }

    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={'Music List'} />
            <Loader loading={loading} />
            <Main>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={musicList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ marginTop: 10 }}
                    />
                </SafeAreaView>
            </Main>
        </View>
    )
}

export default MusicList;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        width: wp(100),
        paddingHorizontal: wp(2.5)
    },
    itemContainer: {
        width: wp(95),
        height: 40,
        marginBottom: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: '#C8C8C8',
        paddingHorizontal: 8
    },
    titleText: {
        fontSize: RFPercentage(2),
        fontFamily:'Lato_400Regular',
        textAlign: 'left',
        paddingLeft: 8
    },
    gridView: {
        width: wp(40),
        height: wp(35),
        marginTop: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        marginBottom: wp(5),
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: theme.BgWhite,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 5,
    },
    imageThumbnail: {
        width: '75%',
        height: '75%'
    },
});