import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Login from '../../pages/Login';
import authService from './authService';

// user from localStorage 

const user = JSON.parse(localStorage.getItem('user'))
// Set initial state
const initialState = {
    loading: false,
    user : user ? user : null,
    error: '',
}

export const register = createAsyncThunk('auth/register', async(user,thunkAPI) =>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login',async(user,thunkAPI) =>{
    try{
        return await authService.login(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout();
}) 
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers : {
        reset: (state) => {
            state.error =''
            state.loading = false
            state.user = null
        },
    },
    extraReducers: (builder) => {
        // pending
        builder
            .addCase(register.pending, (state) => {
            state.loading = true;
        })
         // fulfilled
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            
        })
          // rejected
        .addCase(register.rejected, (state, action) => {
            state.loading = false
            state.user = null
            console.log(action.payload)
            state.error = action.payload    
        })  
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
         // fulfilled
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            
        })
          // rejected
        .addCase(login.rejected, (state, action) => {
            state.loading = false
            state.user = null
           
            state.error = action.payload    
        })
        
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
    }
});

export const {reset} = authSlice.actions
export default authSlice.reducer;