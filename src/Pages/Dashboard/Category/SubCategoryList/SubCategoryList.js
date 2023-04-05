import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';


import * as APIService from './../../../../Middleware/APIService';
import apiUrls from './../../../../Middleware/apiUrls';
import { Loader } from '../../../../Components';
import { Header, Main } from '../../../../Layouts'
import RoutName from '../../../../Routes/RoutName';
import { Colors as theme } from '../../../../utils/useTheme';

const SubCategoryList = ({ route, navigation }) => {

    const { itemData } = route.params;

    const [pageDatail, setPageDetail] = useState({
        categoryName: itemData.iCategoryName,
        iCategoryId: itemData.iCategoryId
    })


    const dispatch = useDispatch();
    const uToken = useSelector((state) => state.userLoggedData.isUserData.vAuthToken);
    const [loading, setLoading] = useState(false);
    const [subCategorytList, setSubCategorytList] = useState([]);

    useEffect(() => {
        getCalagotyList();
        return () => { }
    }, [pageDatail])

    const getCalagotyList = () => {
        setLoading(true);
        const postData = {
            action: 'categoryViseData',
            vAuthToken: uToken,
            //iCategoryId: pageDatail.iCategoryId
            iCategoryId: '1'

        };
        APIService.apiAction(postData, apiUrls.category).then(res => {
            setLoading(false);
            if (res) {
                if (res.status == 200) {
                    let newDataArr = [];
                    Object.keys(res.data).map((key, ind) => {
                        res.data[key].map((curEle, index) => {
                            newDataArr.push(curEle);
                        })
                    })
                    setSubCategorytList([...newDataArr])
                }
            }
        })
    }

    return (
        <View style={styles.body}>
            <Header iconName={'left'} title={pageDatail.categoryName} />
            <Loader loading={loading} />
            <Main>
                <SafeAreaView style={styles.container}>
                    <View style={{ marginTop: 5 }}>
                        <FlatList
                            data={subCategorytList}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(RoutName.USER_CATEGORY_DETAIL, { catData: item })}
                                        style={styles.gridView}>
                                        <Image
                                            style={styles.imageThumbnail}
                                            source={{ uri: item.tImage }}
                                        />
                                    </TouchableOpacity>
                                )
                            }


                            }
                            //Setting the number of column
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        {/* {
                            subCategorytList && subCategorytList.length ?
                                subCategorytList.map((curEle, index) => {
                                    return (
                                        <View style={styles.gridView}>
                                            <TouchableOpacity style={styles.cardView}>
                                                <Image source={{ uri: curEle.tImage }} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                                : <></>
                        } */}
                    </View>
                </SafeAreaView>
            </Main>
        </View>
    )
}

export default SubCategoryList;
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
    cardView: {
        width: wp(44),
        height: 50,
        marginHorizontal: wp(5),

    }
});