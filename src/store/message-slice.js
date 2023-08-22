import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMessage: false,
  messages: {}
};

const messageSlice = createSlice({
    name : "global-messages",
    initialState,
    reducers:{
        showMessages: (state, action) => {
            state.showMessage = true
            state.messages = {...action.payload.message}
        },
        hideMessages: (state) => {
            state.showMessage = false
            state.messages = {}
        }
    }
})

export const showAndHideMessages = (message)=>{
    return (dispatch)=>{
        dispatch(messageSlice.actions.showMessages({message}))
        setTimeout(()=>{
            dispatch(messageSlice.actions.hideMessages())
        },5000)
    }
}

export const messageAction = messageSlice.actions

export default messageSlice.reducer