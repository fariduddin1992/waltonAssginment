
import {createSlice} from "@reduxjs/toolkit"


export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        phone: "",
        data: ""
    },
    reducers: {
        
        setLogin: (state, action) => {
            state.isAuth = true;
            state.phone = action.payload
        },
        setLogout: (state, action) => {
            state.isAuth = false;
            state.phone = ""
            state.data = ""
        },
        setData: (state, action) => {
            alert();
            console.log('action', action);
            console.log('state', state);
            state.data = action.payload
        }
    }
})

console.log("authSlice", authSlice)