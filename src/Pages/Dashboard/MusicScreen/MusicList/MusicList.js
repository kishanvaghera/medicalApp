import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,TouchableOpacity
} from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../../../Layouts';
import RoutName from '../../../../Routes/RoutName';


const MusicList = ({ navigation }) => {

    let musicList = [
        {
            id: 1,
            name: 'prayer 1'
        },
        {
            id: 2,
            name: 'prayer 2'
        },
        {
            id: 3,
            name: 'prayer 3'
        },
        {
            id: 4,
            name: 'prayer 4'
        },
        {
            id: 5,
            name: 'prayer 5'
        },
        {
            id: 6,
            name: 'prayer 6'
        },
        {
            id: 7,
            name: 'prayer 7'
        },
        {
            id: 8,
            name: 'prayer 8'
        },
        {
            id: 9,
            name: 'prayer 9'
        }]

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                onPress={() => navigation.navigate(RoutName.MUSIC_PLAYER)}>
                <Ionicons name={'musical-note-outline'} size={24} color="black" />
                <Text style={styles.titleText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={'Music List'} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={musicList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ marginTop: 10 }}
                />
            </SafeAreaView>
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
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'left',
        paddingLeft: 8
    },
});