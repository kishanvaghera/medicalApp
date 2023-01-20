import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
    name: 'userLoggedData',
    initialState: {
        isLogin:false,
        isLoggedId:1,
    },
    reducers: {
      LoginSuccess(state, action) {
        return {...state,isLogin:true,isLoggedId:action.payload.userLoggedId}
      },
      LogOut(state, action){
        return {...state,isLogin:false,isLoggedId:0}
      }
    }
  })
  
  export const { LoginSuccess, LogOut } = todosSlice.actions
  export default todosSlice.reducer