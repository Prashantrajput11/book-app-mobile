import React, { createContext, useState, useContext, useEffect } from "react";
import { router } from "expo-router";
import BASE_URL from "../config.js";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Or use expo-secure-store for production

// Define the shape of your context data
const AuthContext = createContext(null);

// This is the provider component that will wrap your app
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("token");
				const storedUserJSON = await AsyncStorage.getItem("user");

				// 2. If both exist, update the state
				if (storedToken && storedUserJSON) {
					setToken(storedToken);
					setUser(JSON.parse(storedUserJSON));
				}
			} catch (e) {
				console.error("Failed to load auth state from storage", e);
			} finally {
				// This is important to hide the splash screen
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const register = async (username, email, password) => {
		try {
			// Replace with your actual API endpoint
			const response = await fetch(`${BASE_URL}/api/auth/register`, {
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

	// Login function
	const login = async (email, password) => {
		setIsLoading(true);

		try {
			const response = await fetch(`${BASE_URL}/api/auth/login`, {
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

			setIsLoading(false);

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

	const value = {
		user,
		token,
		isLoading,
		register,
		login,
		logout,
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
