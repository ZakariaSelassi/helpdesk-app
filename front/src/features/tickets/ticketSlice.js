import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import ticketService from './ticketService'

const initialState = {
    loading : false,
    tickets : [], // multiple
    ticket: {}, // single
    error :''
}


export const createTicket = createAsyncThunk('ticket/create', async(ticket,thunkAPI) =>{
    try {

        // a way to get the user token from thunkAPI getState()
        const token = thunkAPI.getState().auth.user.token
        // to create a ticket we need a ticket data and the current user loggedIn
        return await ticketService.createTicket(ticket,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const AllTicket = createAsyncThunk('ticket/all', async(_,thunkAPI) => {
    try {
        // a way to get the user token from thunkAPI getState()
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getAllTickets(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const getTicket = createAsyncThunk('ticket/single', async(id,thunkAPI) => {
    try {
        // a way to get the user token from thunkAPI getState()
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getSingleTickets(id,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const closeTicket = createAsyncThunk('ticket/close', async(id,thunkAPI) => {
    try {
        // a way to get the user token from thunkAPI getState()
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicket(id,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) =>{
        builder
            // CreateTicket
            .addCase(createTicket.pending, (state)  => {
                state.loading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.loading = false
                state.ticket = action.payload
            })
              // rejected
            .addCase(createTicket.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload    
            })  
            // All Ticket           
            .addCase(AllTicket.pending, (state)  => {
                state.loading = true;
            })
            .addCase(AllTicket.fulfilled, (state, action) => {
                state.loading = false
                state.tickets = action.payload
               
            })
              // rejected
            .addCase(AllTicket.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload    
            }) 
            // Get Ticket           
            .addCase(getTicket.pending, (state)  => {
                state.loading = true;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.loading = false
                state.ticket = action.payload
                
            })
                // rejected
            .addCase(getTicket.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload    
            }) 


               // Close Ticket           
               .addCase(closeTicket.pending, (state)  => {
                state.loading = true;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.loading = false
                state.tickets.map((ticket) => 
               
                    ticket._id === action.payload._id ? (ticket.status = 'closed') : ticket
                )
                
            })
                // rejected
            .addCase(closeTicket.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload    
            }) 
    }
})

export const {reset} = ticketSlice.actions

export default ticketSlice.reducer