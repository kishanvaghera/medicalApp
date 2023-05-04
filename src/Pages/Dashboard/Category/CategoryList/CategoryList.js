import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import { Header, Main } from '../../../../Layouts';
import { Loader } from '../../../../Components';
import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import RoutName from '../../../../Routes/RoutName';
import { Colors as theme } from '../../../../utils/useTheme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const CategorytList = ({ navigation, props, route }) => {

    const dispatch = useDispatch();
    const [pageTitle, setPageTitle] = useState('');
    const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);


    const [loading, setLoading] = useState(false);
    const [categorytList, setCategorytList] = useState([]);

    useEffect(() => {
        getCalagotyList();
        return () => { }
    }, [])

    const getCalagotyList = () => {
        setLoading(true);
        const postData = {
            action: 'getCategoryList',
            vAuthToken: uToken,
        };
        APIService.apiAction(postData, apiUrls.category).then(res => {
            setLoading(false);
            if (res) {
                if (res.status == 200) {
                    setCategorytList([...res.data])
                }
            }
        })
    }

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
                onPress={() => navigation.navigate(RoutName.USER_CATEGORY_DETAIL, { pageTitle: item.title })}>
                <MaterialCommunityIcons name={item.icon} size={30} color="black" />
                <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={'Category List'} />
            <Loader loading={loading} />
            <Main>
                <SafeAreaView style={styles.container}>
                    {
                        categorytList && categorytList.length ?
                            categorytList.map((curEle, index) => {
                                return (
                                    <TouchableOpacity style={styles.itemContainer}
                                        onPress={() => navigation.navigate(RoutName.SUB_CATAGORY_LIST, { itemData: curEle })}>
                                        <MaterialCommunityIcons name={'yoga'} size={30} color="black" />
                                        <Text style={styles.titleText}>{curEle.iCategoryName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            : <></>
                    }

                </SafeAreaView>
            </Main>
        </View>
    )
}

export default CategorytList;
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
        marginBottom: wp(3),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal: 8,
        backgroundColor: theme.BgWhite,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    titleText: {
        fontSize: RFPercentage(2),
        fontFamily:'Lato_400Regular',
        textAlign: 'left',
        paddingLeft: 8
    },
});