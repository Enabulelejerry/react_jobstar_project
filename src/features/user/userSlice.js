import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import customFetch   from '../../utils/axios'
import { addUserToLocalStorage, getUserFromLocalStorage,removeUserFromLocalStorage } from "../../utils/localStorage";
import { clearStoreThunk, loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

const initialState = {
    isLoading:false,
    isSidebarOpen:true,
    user:getUserFromLocalStorage(),
}


export const registerUser = createAsyncThunk('user/register',
async(user,thunkApi)=>{
   return registerUserThunk('auth/register',user,thunkApi)
})

export const loginUser = createAsyncThunk('user/loginUser',async(user,thunkApi)=>{
   return loginUserThunk('/auth/login',user,thunkApi)
  })


 export const updateUser = createAsyncThunk(
   'user/updateUser',async(user,thunkApi)=>{
      return updateUserThunk('/auth/updateUser',user,thunkApi);
   }
 )



export const clearStore = createAsyncThunk('user/clearStore',clearStoreThunk)

const userSlice = createSlice({
    name:'user',
    initialState,

    reducers:{
       toggleSidebar:(state) =>{
        state.isSidebarOpen = !state.isSidebarOpen
       },

       logoutUser:(state,{payload})=>{
        state.user = null;
        state.isSidebarOpen = false;
        removeUserFromLocalStorage();
        if(payload){
         toast.success(payload);
        }
       }
    },
    extraReducers:{
        [registerUser.pending]: (state)=>{
           state.isLoading = true;
        },

        [registerUser.fulfilled]: (state,{payload})=>{
            const {user} = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`)
           
         },

         [registerUser.rejected]: (state,{payload})=>{
            state.isLoading = false;
            toast.error(payload)
         },


         [loginUser.pending]: (state)=>{
            state.isLoading = true;
         },
 
         [loginUser.fulfilled]: (state,{payload})=>{
             const {user} = payload;
             state.isLoading = false;
             state.user = user;
             addUserToLocalStorage(user)
             toast.success(`Welcome Back ${user.name}`)
            
          },

          
 
          [updateUser.rejected]: (state,{payload})=>{
             state.isLoading = false;
             toast.error(payload)
          },

        
          [updateUser.pending]: (state)=>{
            state.isLoading = true;
         },
 
         [updateUser.fulfilled]: (state,{payload})=>{
             const {user} = payload;
             state.isLoading = false;
             state.user = user;
             addUserToLocalStorage(user)
             toast.success(`User Updated ${user.name}`)
            
          },
 
          [updateUser.rejected]: (state,{payload})=>{
             state.isLoading = false;
             toast.error(payload)
          },

          [clearStore.rejected]:()=>{
            toast.error('There was an error..')
          }



    }
})


export const {toggleSidebar,logoutUser} = userSlice.actions;
export default userSlice.reducer;