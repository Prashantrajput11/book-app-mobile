// your-api-setup-file.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
	// baseURL: "http://localhost:8000",
	baseURL: "https://book-app-api-qfkz.onrender.com/",

	headers: {
		"Content-Type": "application/json",
	},
});

// This is the interceptor!
api.interceptors.request.use(
	async (config) => {
		// 1. Get the token from storage (e.g., localStorage, AsyncStorage)
		const token = await AsyncStorage.getItem("token");

		// 2. If the token exists, add it to the request headers
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// 3. IMPORTANT: You must return the config object, or the request will be blocked
		return config;
	},
	(error) => {
		// This function handles errors that occur before the request is sent
		return Promise.reject(error);
	}
);

// This interceptor runs for any response that has an error (e.g., status 4xx or 5xx)
api.interceptors.response.use(
	(response) => {
		// If the request was successful, just return the response
		return response;
	},
	(error) => {
		// If there's an error, you can log it here globally
		console.error("API Error:", error.response?.data?.message || error.message);

		// It's important to still reject the promise so the calling component knows about the error
		return Promise.reject(error);
	}
);

export default api;
