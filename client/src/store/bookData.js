import {createSlice,configureStore} from '@reduxjs/toolkit'


const bookSlice=createSlice({
    name:"books",
    initialState:[],
    reducers:{
        add_data(state,action){
            
            state=[...action.payload]
            
            console.log(state)
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

