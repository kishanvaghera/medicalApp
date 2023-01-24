import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Header } from '../../../../Layouts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RoutName from '../../../../Routes/RoutName';


const ProductList = ({ navigation, props, route }) => {

    // let pageTitle = props.pageTitle;
    const [pageTitle, setPageTitle] = useState('');
    useEffect(() => {
        setPageTitle(route.params.pageTitle);
        return () => { }
    }, [pageTitle])


    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
            icon: 'yoga'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
            icon: 'yoga'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
            icon: 'yoga'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6',
            title: 'Second Item',
            icon: 'yoga'
        },
        {
            id: '58694a0f-3da1-471f-bd96-14557129d72',
            title: 'Third Item',
            icon: 'yoga'
        },
        {
            id: '3ac68afc-c605-48d3-a48-fbd91aa97f63',
            title: 'Second Item',
            icon: 'yoga'
        },
        {
            id: '58694a0f-3da1-71f-bd96-145571e29d72',
            title: 'Third Item',
            icon: 'yoga'
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemContainer}
                onPress={() => navigation.navigate(RoutName.PRODUCT_DETAIL, { pageTitle: item.title })}>
                <MaterialCommunityIcons name={item.icon} size={30} color="black" />
                <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={pageTitle} />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ marginTop: 10 }}
                />
            </SafeAreaView>
        </View>
    )
}

export default ProductList;
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
        height: wp(15),
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