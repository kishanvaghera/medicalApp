import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiUrls from './apiUrls';


export async function apiAction(formData, urlKey) {
    const apiUrl = apiUrls.BASE_URL;
  
        const postData = {
            ...formData,
        };
       
        let resStatus = "";
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
       

}