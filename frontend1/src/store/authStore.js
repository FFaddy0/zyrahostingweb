import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,


    signup: async (email, password,username) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {name:username,email, password});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response?.data?.message || "An error occurred", isLoading:false});
            throw error;
        }
    },

    verifyEmail: async (verificationCode) => {
        set({isLoading:true, error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code: verificationCode});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response?.data?.message || "An error occurred", isLoading:false});
            throw error;
        }
    },

    checkAuth: async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        set({isCheckingAuth:true, error:null});
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user:response.data.user, isAuthenticated:true, isCheckingAuth:false});
        } catch (error) {
            set({error:error.response?.data?.message || "An error occurred", isCheckingAuth:false});
            throw error;
        }
    },

    login: async (identifier, password) => {
        set({isLoading:true, error:null});
        try {
            // Check if identifier is email or username
            const isEmail = identifier.includes('@');
            const payload = {
                email: isEmail ? identifier : "",
                name: !isEmail ? identifier : "",
                password
            };
                
            const response = await axios.post(`${API_URL}/login`, payload);
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response?.data?.message || "An error occurred", isLoading:false});
            throw error;
        }
    },

    logout: () => {
        set({user:null, isAuthenticated:false, isLoading:false});
    }
}))
