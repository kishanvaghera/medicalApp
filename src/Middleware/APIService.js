import axios from 'axios';
import apiUrls from './apiUrls';


export async function apiAction(formData, urlKey,isLogin=false) {
        const apiUrl = apiUrls.BASE_URL;
  
        let postData = {
            ...formData,
        };

        if(!isLogin){
            postData['vAuthToken']='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMiJ9.Jupm29TP2-0SUchv306onAVxIFo7lPEaDVOVDBn33mQ'
        }
       
        let resStatus = "";
        try {
            const data = axios.post(apiUrl +  urlKey,postData);
            await data.then(val => { resStatus = val  });
            if (resStatus.data.status == 402) {
                return false;
            }else {
                return resStatus.data
            }
        }catch (error) {
            console.error(error);
            // handle the error here
        }
       

}