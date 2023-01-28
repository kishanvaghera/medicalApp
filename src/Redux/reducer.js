import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'userLoggedData',
    initialState: {
        isLogin:false,
        isLoggedId:1,
        isUserData:'',
        isRole:'',
    },
    reducers: {
      LoginSuccess(state, action) {
        return {...state,isLogin:true,isLoggedId:action.payload.userLoggedId}
      },
      LogOut(state, action){
        return {...state,isLogin:false,isLoggedId:0}
      },
      UserDataStor(state, action){
        return {...state,isLogin:true,isUserData:action.payload.isUserData}
      },
      AdminLogin(state, action){
        return {...state,isLogin:true,isRole:1}
      },
    }
  })
  
  export const { LoginSuccess, LogOut, UserDataStor,AdminLogin  } = todosSlice.actions
  export default todosSlice.reducer