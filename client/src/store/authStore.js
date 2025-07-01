import {create} from 'zustand';
import axios from 'axios';

const serverApi = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Instead of letting the error propagate and log, just reject silently
      return Promise.reject({ ...error, silent: true });
    }
    return Promise.reject(error);
  }
);

export const useAuthStore = create((set) => ({
    user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
    
    signup: async (name, email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/auth/signup`, { name, email, password });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},

	login: async (email, password) => {
		set({isLoading: true, error: null});
		try {
			const response = await axios.post(`${serverApi}/auth/login`, {email, password});
			set({ user: response.data.user, isAuthenticated: true, isLoading: false })
		} catch (error) {
			set({ error: error.response.data.message || "Error Login", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({isLoading: true, error: null});
		try {
			const response = await axios.post(`${serverApi}/logout`);
			set({ user: response.data.user, isAuthenticated: false, isLoading: false, error: null })
		} catch (error) {
			set({ error: error.response.data.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

    verifyEmail: async (code) => {
        try {
            const response = await axios.post(`${serverApi}/auth/verify-email`, {code});
            set({ user: response.data.user, isAuthenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email"});
            throw error;
        }
    },

	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null});
		try {
			const response = await axios.get(`${serverApi}/auth/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false,})
		} catch (error) {
			set({error: null, isCheckingAuth: false, isAuthenticated: false })
		}
	},
	forgetPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/forget-password`, {email});
			set({ user: response.data.user, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || 'error forgeting password', isLoading: false })
			throw error ;
		}
	},

	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${serverApi}/reset-password/${token}`, {password});
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || 'error reseting password', isLoading: false })
			throw error ;
		}
	}
})
)