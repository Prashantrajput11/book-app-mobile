import React, { createContext, useState, useContext, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Or use expo-secure-store for production

// Define the shape of your context data
const AuthContext = createContext(null);

// This is the provider component that will wrap your app
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	console.log("userji", user);
	console.log("tokenji", token);

	// This effect runs once when the app starts to check for a stored token
	// This effect runs once when the app starts to check for stored auth state
	useEffect(() => {
		const checkAuth = async () => {
			try {
				// 1. Get both the token and the user string from storage
				const storedToken = await AsyncStorage.getItem("token");
				const storedUserJSON = await AsyncStorage.getItem("user"); // <-- FIX #1: Use the correct key "user"

				// 2. If both exist, update the state
				if (storedToken && storedUserJSON) {
					setToken(storedToken);
					setUser(JSON.parse(storedUserJSON)); // <-- FIX #2: Parse and set the user object
				}
			} catch (e) {
				console.error("Failed to load auth state from storage", e);
			} finally {
				// This is important to hide the splash screen
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []); // The empty array `[]` ensures this runs only once

	// Login function
	const login = async (email, password) => {
		setIsLoading(true);

		try {
			const response = await fetch("http://localhost:8000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Something went wrong");

			await AsyncStorage.setItem("user", JSON.stringify(data.user));
			await AsyncStorage.setItem("token", data.token);

			setToken(data.token);
			setUser(data.user);

			return { success: true };
		} catch (error) {
			setIsLoading(false);
			return { success: false, error: error.message };
		}
	};

	// Logout function
	const logout = async () => {
		setToken(null);
		setUser(null);
		await AsyncStorage.removeItem("user");
		await AsyncStorage.removeItem("token");
		router.replace("/login"); // Navigate back to the login screen
	};

	const register = async (username, email, password) => {
		try {
			// Replace with your actual API endpoint
			const response = await fetch("http://localhost:8000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Something went wrong");

			setToken(data.token);
			setUser(data.user);
			await AsyncStorage.setItem("token", data.token);
			await AsyncStorage.setItem("user", JSON.stringify(data.user));

			return { success: true };
		} catch (error) {
			console.error(error);
			setIsLoading(false);
			return { success: false, error: error.message };
			// Handle registration error (e.g., show an alert)
		}
	};

	// const checkAuth = async () => {
	// 	try {
	// 		const token = await AsyncStorage.getItem("token");
	// 		const userJson = await AsyncStorage.getItem("user");
	// 		const user = userJson ? JSON.parse(userJson) : null;

	// 		setUser(user);
	// 		setToken(token);
	// 	} catch (error) {
	// 		console.log("Auth check failed", error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

	// The value provided to the rest of the app
	const value = {
		user,
		token,
		isLoading,
		register,
		login,
		logout,

		// Add a register function here as well
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily access the context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
