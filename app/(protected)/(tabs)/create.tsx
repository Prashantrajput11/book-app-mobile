import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import api from "@/lib/axios";
// Import your axios instance

const CreateScreen = () => {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	// Form validation
	const isFormValid = title.trim().length > 0 && summary.trim().length > 0;

	// Handle form submission
	const handleSubmit = async () => {
		if (!isFormValid) {
			Alert.alert(
				"Validation Error",
				"Please fill in both title and summary fields."
			);
			return;
		}

		setLoading(true);

		try {
			const response = await api.post("/api/ideas", {
				title: title.trim(),
				summary: summary.trim(),
				description: description.trim(),
			});

			// Success feedback
			Alert.alert("Success! 🎉", "Your idea has been saved successfully!", [
				{
					text: "Create Another",
					onPress: () => {
						setTitle("");
						setSummary("");
					},
				},
				{
					text: "View Ideas",
					onPress: () => {
						// Navigate back to home or ideas list
						// If using React Navigation: navigation.navigate('Home')
					},
				},
			]);

			// Clear form
			setTitle("");
			setSummary("");
			setDescription("");
		} catch (error) {
			console.error("Error creating idea:", error);

			Alert.alert(
				"Error",
				error.response?.data?.message ||
					"Failed to create idea. Please try again.",
				[{ text: "OK" }]
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.keyboardView}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					{/* Header */}
					<View style={styles.header}>
						<Text style={styles.pageTitle}>✨ New Idea</Text>
						<Text style={styles.subtitle}>Capture your brilliant thoughts</Text>
					</View>

					{/* Form */}
					<View style={styles.form}>
						{/* Title Input */}
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Title</Text>
							<TextInput
								style={[
									styles.input,
									styles.titleInput,
									title.length > 0 && styles.inputFocused,
								]}
								placeholder="What's your idea about?"
								placeholderTextColor="#a0aec0"
								value={title}
								onChangeText={setTitle}
								multiline={false}
								maxLength={100}
							/>
							<Text style={styles.charCount}>{title.length}/100</Text>
						</View>

						{/* Summary Input */}
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Summary</Text>
							<TextInput
								style={[
									styles.input,
									styles.summaryInput,
									summary.length > 0 && styles.inputFocused,
								]}
								placeholder="Describe your idea in detail..."
								placeholderTextColor="#a0aec0"
								value={summary}
								onChangeText={setSummary}
								multiline={true}
								textAlignVertical="top"
								maxLength={500}
							/>
							<Text style={styles.charCount}>{summary.length}/500</Text>
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>Description</Text>
							<TextInput
								style={[
									styles.input,
									styles.summaryInput,
									summary.length > 0 && styles.inputFocused,
								]}
								placeholder="Describe your idea in detail..."
								placeholderTextColor="#a0aec0"
								value={description}
								onChangeText={setDescription}
								multiline={true}
								textAlignVertical="top"
								maxLength={500}
							/>
							<Text style={styles.charCount}>{summary.length}/500</Text>
						</View>

						{/* Submit Button */}
						<TouchableOpacity
							style={[
								styles.submitButton,
								!isFormValid && styles.submitButtonDisabled,
							]}
							onPress={handleSubmit}
							disabled={!isFormValid || loading}
							activeOpacity={0.8}
						>
							{loading ? (
								<View style={styles.loadingContainer}>
									<ActivityIndicator color="#ffffff" size="small" />
									<Text style={styles.submitButtonText}>Creating...</Text>
								</View>
							) : (
								<Text style={styles.submitButtonText}>💡 Save Idea</Text>
							)}
						</TouchableOpacity>

						{/* Form Tips */}
						<View style={styles.tipsContainer}>
							<Text style={styles.tipsTitle}>💡 Tips:</Text>
							<Text style={styles.tipText}>
								• Keep your title short and descriptive
							</Text>
							<Text style={styles.tipText}>
								• Add details in the summary to remember later
							</Text>
							<Text style={styles.tipText}>
								• Dont worry about perfection - just capture it!
							</Text>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default CreateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8faff",
	},
	keyboardView: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingBottom: 30,
	},
	header: {
		paddingTop: 20,
		paddingBottom: 32,
	},
	pageTitle: {
		fontSize: 32,
		fontWeight: "800",
		color: "#1a202c",
		marginBottom: 8,
		letterSpacing: -0.5,
	},
	subtitle: {
		fontSize: 16,
		color: "#718096",
		fontWeight: "500",
	},
	form: {
		flex: 1,
	},
	inputContainer: {
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#2d3748",
		marginBottom: 8,
	},
	input: {
		backgroundColor: "#ffffff",
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
		color: "#2d3748",
		borderWidth: 2,
		borderColor: "#e2e8f0",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	inputFocused: {
		borderColor: "#667eea",
		shadowOpacity: 0.1,
		elevation: 4,
	},
	titleInput: {
		height: 56,
	},
	summaryInput: {
		height: 120,
		textAlignVertical: "top",
	},
	charCount: {
		fontSize: 12,
		color: "#a0aec0",
		textAlign: "right",
		marginTop: 4,
	},
	submitButton: {
		backgroundColor: "#667eea",
		borderRadius: 12,
		paddingVertical: 16,
		paddingHorizontal: 24,
		alignItems: "center",
		marginTop: 16,
		shadowColor: "#667eea",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	submitButtonDisabled: {
		backgroundColor: "#cbd5e0",
		shadowOpacity: 0,
		elevation: 0,
	},
	submitButtonText: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	tipsContainer: {
		marginTop: 32,
		padding: 20,
		backgroundColor: "#ffffff",
		borderRadius: 12,
		borderLeftWidth: 4,
		borderLeftColor: "#667eea",
	},
	tipsTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#2d3748",
		marginBottom: 12,
	},
	tipText: {
		fontSize: 14,
		color: "#4a5568",
		marginBottom: 6,
		lineHeight: 20,
	},
});
