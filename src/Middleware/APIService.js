import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrls from './apiUrls';


export async function apiAction(formData, urlKey) {
    const apiUrl = apiUrls.BASE_URL;
  
        const postData = {
            ...formData,
        };
       
        let resStatus = "";
<<<<<<< HEAD

        const data = axios.post(apiUrl +  urlKey,formData);
        await data.then(val => { resStatus = val  });

         if (resStatus.data.status == 412) {
            return false;
        } else {
            return resStatus.data;
        }
    // } else {
    //     const token = await AsyncStorage.getItem('token').then(val => val);
    //     if (token) {
    //         const postData = {
    //             ...formData,
    //             Vauthtoken: token,
    //             version: configuration.apiVersion
    //         };
    //         let resStatus = "";

    //         const data = axios.post(apiUrl + "/" + urlKey, postData);
    //         await data.then(val => { resStatus = val });
    //         if (resStatus.data.status == 412) {
    //             return false;
    //         } else {
    //             return resStatus.data;
    //         }
    //     } else {

    //         return false;
    //     }
    // }
=======
        console.log('object', apiUrl +  urlKey, postData)
        const data = axios.post(apiUrl +  urlKey,postData);
        await data.then(val => { resStatus = val  });
        if (resStatus.data.status == 402) {
           console.log('object res ', resStatus.data.status , resStatus.data) 
            return false;
        }else {
            //console.log('object res ', resStatus.data.status) 
            return resStatus.data
        }
       
>>>>>>> mkishan

}