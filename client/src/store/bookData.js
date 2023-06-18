import {createSlice,configureStore} from '@reduxjs/toolkit'


const bookSlice=createSlice({
    name:"books",
    initialState:{books:[]},
    reducers:{
        add_data(state,action){
            
            state.books=action.payload
            
            
        },
        get_book(state,action){
            return state
        }
    }
})


export const store=configureStore({
    reducer:bookSlice.reducer
})

export const bookActions= bookSlice.actions

