import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

import { Input, Button } from '../../Layouts';
import RoutName from '../../Routes/RoutName';
import { Loader } from '../../Components';
import * as APIService from './../../Middleware/APIService';
import apiUrls from '../../Middleware/apiUrls';

const OtherDetails = ({ route, navigation }) => {

    const { userId } = route.params;
    const [loading, setLoading] = useState(false);

    const [mainForm, setMainForm] = useState({
        brithDate: new Date(),
        hight: '',
        weight: '',
        pDouDate: new Date(),
        pWeek: '',
    })

    const [hight, setHight] = useState('');
    const [weight, setWeight] = useState('');
    const [pWeek, setPWeek] = useState('');

    const [dateType, setDateType] = useState('');

    const [show, setShow] = useState(false);

    const oprnDataPiker = (type) => {
        setDateType(type);
        setShow(true);
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        if (dateType == 'DOB') {
            setMainForm(prevState => {
                return {
                    ...prevState,
                    brithDate: Moment(currentDate).format('DD-MM-YYYY')
                }
            })
        } else if (dateType == 'pDouDate') {
            setMainForm(prevState => {
                return {
                    ...prevState,
                    pDouDate: Moment(currentDate).format('DD-MM-YYYY')
                }
            })
        }
    };

    const handleChange = (e, name) => {
        setMainForm(prevState => {
            return {
                ...prevState,
                [name]: e
            }
        })
    }

    const handleSubmit = (isSkip) => {
        setLoading(true);
        const postData = {
            action: 'addUser',
            iUserId: userId,
            step: '2',
            skip: isSkip,
            vDateOfBirth: mainForm['brithDate'],
            vHeight: mainForm['hight'],
            vWeight: mainForm['weight'],
            vPregDueDate: mainForm['pDouDate'],
            vPregWeek: mainForm['pWeek']
        };
        APIService.apiAction(postData, apiUrls.auth).then(res => {
          setLoading(false);
          if (res) {
            if (res.status == 200) {
              navigation.navigate(RoutName.LOGIN);
            }
          }
        })
    }

    return (
        <View style={styles.body}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    alignItems: 'center'
                }}
                style={{ flex: 1 }}>
                <KeyboardAvoidingView enabled>
                <View style={styles.formContaner}>
                    <Text style={[styles.boldText, { marginTop: 20 }]}>Other Detils</Text>
                    <Text style={styles.lableText}>This Information is not required,</Text>
                    <Text style={styles.lableText}>you may skip also.</Text>

                    <TouchableOpacity
                        onPress={() => oprnDataPiker('DOB')}
                        style={styles.dropDownView}>
                        <Text style={styles.dropDownText}>{mainForm['brithDate'] == '' ? 'Data of Brith' : '' + mainForm['brithDate']}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={'date'}
                            is24Hour={true}
                            format="DD-MM-YYYY"
                            onChange={onChange}
                        />
                    )}
                    <Input
                        placeholder={'Hight'}
                        onChangeText={(text) => handleChange(text, 'hight')}
                        value={mainForm.hight}
                        keyboardType={'numeric'}
                        multiline={false}
                        maxLength={3}
                        returnKeyType={'next'}
                    />
                    <Input
                        placeholder={'Weight'}
                        onChangeText={(text) => handleChange(text, 'weight')}
                        value={mainForm.weight}
                        keyboardType={'numeric'}
                        multiline={false}
                        maxLength={3}
                        returnKeyType={'next'}
                    />
                    <TouchableOpacity
                        onPress={() => oprnDataPiker('pDouDate')}
                        style={styles.dropDownView}>
                        <Text style={styles.dropDownText}>{mainForm['pDouDate'] == '' ? 'Add Your Dou Date' : '' + mainForm['pDouDate']}</Text>
                    </TouchableOpacity>
                    {/* <View style={styles.dropDownView}>
                    <Text style={styles.dropDownText}>Add Your Dou Date</Text>
                </View> */}
                    <Input
                        placeholder={'Add Your Pregnancy Week'}
                        onChangeText={(text) => handleChange(text, 'pWeek')}
                        value={mainForm.pWeek}
                        keyboardType={'numeric'}
                        multiline={false}
                        maxLength={3}
                        returnKeyType={'next'}
                    />

                    <Button
                        width={wp(55)}
                        height={40}
                        title={'Submit'}
                        buttonStyle={{ marginTop: 30 }}
                        customClick={() => handleSubmit('0')} />

                    <TouchableOpacity style={{ marginTop: 15 }}
                        onPress={() => handleSubmit('1')}>
                        <Text style={[styles.boldText, { fontSize: 15 }]}>SKIP</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
        </View>
    );
}
export default OtherDetails;
const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center'
    },
    formContaner: {
        width: '100%',
        paddingHorizontal: '10%',
        alignItems: 'center',
        marginTop: '10%'
    },
    boldText: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    lableText: {
        fontSize: 20,
        fontWeight: '400'
    },
    dropDownView: {
        width: wp(80),
        height: 40,
        marginTop: 20,
        justifyContent: 'center',
        borderWidth: 0.8,
        borderColor: '#808080',
        borderRadius: 10,
        paddingLeft: 5,
    },
    dropDownText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
    },
});