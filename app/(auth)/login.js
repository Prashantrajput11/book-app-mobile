// screens/LoginScreen.js
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { router } from "expo-router";
import { useAuth } from "../../contexts/authContext";

const LoginScreen = ({ navigation }) => {
	const { login, isCheckingAuth, isLoading } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleLogin = async () => {
		// 1. Call the async login function from your context
		const result = await login(formData.email, formData.password);

		// 2. Check if the login was successful
		if (result?.success) {
			// 3. If successful, navigate the user.
			router.replace("/"); // The logic from your screenshot goes here!
		} else {
			// If it failed, show the error
			Alert.alert("Login Failed", result.error);
		}
	};

	if (isCheckingAuth) return null;

	const navigateToSignup = () => {
		router.push("/signup");
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardAvoidingView}
			>
				<View style={styles.content}>
					<View style={styles.formContainer}>
						<Text style={styles.title}>Login</Text>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Email</Text>
							<TextInput
								style={styles.input}
								value={formData.email}
								onChangeText={(text) =>
									setFormData({ ...formData, email: text })
								}
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Password</Text>
							<TextInput
								style={styles.input}
								value={formData.password}
								onChangeText={(text) =>
									setFormData({ ...formData, password: text })
								}
								placeholder="Enter your password"
								secureTextEntry
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

						<TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
							<Text style={styles.submitButtonText}>Login</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.toggleButton}
							onPress={navigateToSignup}
						>
							<Text style={styles.toggleButtonText}>
								Dont have an account? Sign up
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	content: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	formContainer: {
		backgroundColor: "white",
		padding: 30,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 24,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 30,
		color: "#333",
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 14,
		color: "#555",
		marginBottom: 5,
		fontWeight: "500",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 16,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	submitButton: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 10,
	},
	submitButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	toggleButton: {
		marginTop: 20,
		alignItems: "center",
	},
	toggleButtonText: {
		color: "#007bff",
		fontSize: 14,
	},
});

export default LoginScreen;
