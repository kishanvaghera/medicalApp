import axios from 'axios';
import apiUrls from './apiUrls';


export async function apiAction(formData, urlKey) {
    const apiUrl = apiUrls.BASE_URL;
   // if (formData.isLogin) {
        const postData = {
            ...formData,
        };
       
        let resStatus = "";

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

}