import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Set initial state

const initialState = {
    loading: false,
    user : 'null',
    error: '',
}

export const register = createAsyncThunk('auth/register', async(user) =>{
    console.log(user)
})

export const login = createAsyncThunk('auth/login',async(user) =>{
    console.log(user)
})
export const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: (builder) => {
        // pending
       /*  builder.addCase() */

        // fulfilled

        // rejected
    }
});

export default authSlice.reducer;