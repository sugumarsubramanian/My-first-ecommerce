import { createSlice } from "@reduxjs/toolkit";

const authSlice =createSlice({
    name: "auth",
    initialState:{
        isAuthenticated: false,
        user:null,
        loading:true,
        authToken:null
    },
    reducers:{
        loadAuth: (state) => {
            const storedUser = localStorage.getItem("user");
            const storedAuthToken = localStorage.getItem("authToken");
            
            if(storedUser && storedAuthToken){
                try{
                    state.user = JSON.parse(storedUser);
                    state.isAuthenticated = true;
                    state.authToken = storedAuthToken;
                }catch (error){
                    console.log("Error parsing stored  user:", error);
                    localStorage.removeItem("user");
                    localStorage.removeItem("authToken");   
                }
            }
            state.loading = false;
        },
        login: (state, action) => {
            state.user = action.payload.user;
            state.authToken = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.authToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("authToken"); 
        }
    }
});

export const { loadAuth, login, logout } = authSlice.actions;
export default authSlice.reducer;