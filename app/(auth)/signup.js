// screens/SignupScreen.js
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
import { useAuth } from "../../contexts/authContext";
import { router } from "expo-router";

const Signup = ({ navigation }) => {
	const { token, register } = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleSignup = async () => {
		const result = await register(
			formData.username,
			formData.email,
			formData.password
		);

		if (!result.success) {
			Alert.alert("Error", result.error);
		}
	};

	const navigateToLogin = () => {
		router.push("/login");
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
						<Text style={styles.title}>Sign Up</Text>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Username</Text>
							<TextInput
								style={styles.input}
								value={formData.username}
								onChangeText={(text) =>
									setFormData({ ...formData, username: text })
								}
								placeholder="Enter your username"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>

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

						<TouchableOpacity
							style={styles.submitButton}
							onPress={handleSignup}
						>
							<Text style={styles.submitButtonText}>Sign Up</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.toggleButton}
							onPress={navigateToLogin}
						>
							<Text style={styles.toggleButtonText}>
								Already have an account? Login
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

export default Signup;
