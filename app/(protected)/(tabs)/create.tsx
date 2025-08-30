import { useState } from "react";
import {
	View,
	Text,
	Platform,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Alert,
	Image,
	ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImageManipulator from "expo-image-manipulator";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../assets/styles/create.styles";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import COLORS from "@/constants/Colors";
import { useCreateBook } from "@/hooks/useCreateBook";

export default function Create() {
	const [title, setTitle] = useState("");
	const [caption, setCaption] = useState("");
	const [rating, setRating] = useState(3);
	const [image, setImage] = useState(null); // to display the selected image

	const { mutate: createBook, isPending } = useCreateBook();

	const router = useRouter();

	const pickImage = async () => {
		// request permission if needed
		console.log("picker");

		if (Platform.OS !== "web") {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			console.log("status", status);

			if (status !== "granted") {
				Alert.alert(
					"Permission Denied",
					"We need camera roll permissions to upload an image"
				);
				return;
			}
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: "images",
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1, // You can use higher quality now
		});

		console.log("result", result);

		if (!result.canceled) {
			// You only need to set the image URI
			setImage(result.assets[0].uri);
		}
	};

	const handleSubmit = async () => {
		if (!title || !caption || !image || !rating) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		// 1. Create a FormData object
		const formData = new FormData();

		// 2. Append the text fields
		formData.append("title", title);
		formData.append("caption", caption);
		formData.append("rating", rating.toString());

		// 3. Append the image file itself.
		// The name 'image' MUST match what your backend expects (e.g., multer's .single('image')).
		formData.append("image", {
			uri: image, // The URI from ImagePicker
			name: `photo.${image.split(".").pop()}`, // Create a filename, e.g., 'photo.jpg'
			type: `image/${image.split(".").pop()}`, // Create the MIME type, e.g., 'image/jpeg'
		});

		// Call the mutate function
		createBook(formData, {
			onSuccess: () => {
				Alert.alert("Success", "Your book has been posted!");
				router.push("/"); // Navigate home
			},
			onError: (error) => {
				Alert.alert("Error", error.message || "Something went wrong");
			},
		});
	};

	const renderRatingPicker = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<TouchableOpacity
					key={i}
					onPress={() => setRating(i)}
					style={styles.starButton}
				>
					<Ionicons
						name={i <= rating ? "star" : "star-outline"}
						size={32}
						color={i <= rating ? "#f4b400" : COLORS.textSecondary}
					/>
				</TouchableOpacity>
			);
		}
		return <View style={styles.ratingContainer}>{stars}</View>;
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView
				contentContainerStyle={styles.container}
				style={styles.scrollViewStyle}
			>
				<View style={styles.card}>
					{/* HEADER */}
					<View style={styles.header}>
						<Text style={styles.title}>Add Book Recommendation</Text>
						<Text style={styles.subtitle}>
							Share your favorite reads with others
						</Text>
					</View>

					<View style={styles.form}>
						{/* BOOK TITLE */}
						<View style={styles.formGroup}>
							<Text style={styles.label}>Book Title</Text>
							<View style={styles.inputContainer}>
								<Ionicons
									name="book-outline"
									size={20}
									color={COLORS.textSecondary}
									style={styles.inputIcon}
								/>
								<TextInput
									style={styles.input}
									placeholder="Enter book title"
									placeholderTextColor={COLORS.placeholderText}
									value={title}
									onChangeText={setTitle}
								/>
							</View>
						</View>

						{/* RATING */}
						<View style={styles.formGroup}>
							<Text style={styles.label}>Your Rating</Text>
							{renderRatingPicker()}
						</View>

						{/* IMAGE */}
						<View style={styles.formGroup}>
							<Text style={styles.label}>Book Image</Text>
							<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
								{image ? (
									<Image source={{ uri: image }} style={styles.previewImage} />
								) : (
									<View style={styles.placeholderContainer}>
										<Ionicons
											name="image-outline"
											size={40}
											color={COLORS.textSecondary}
										/>
										<Text style={styles.placeholderText}>
											Tap to select image
										</Text>
									</View>
								)}
							</TouchableOpacity>
						</View>

						{/* CAPTION */}
						<View style={styles.formGroup}>
							<Text style={styles.label}>Caption</Text>
							<TextInput
								style={styles.textArea}
								placeholder="Write your review or thoughts about this book..."
								placeholderTextColor={COLORS.placeholderText}
								value={caption}
								onChangeText={setCaption}
								multiline
							/>
						</View>

						<TouchableOpacity
							style={styles.button}
							onPress={handleSubmit}
							disabled={isPending}
						>
							{isPending ? (
								<ActivityIndicator color={COLORS.white} />
							) : (
								<>
									<Ionicons
										name="cloud-upload-outline"
										size={20}
										color={COLORS.white}
										style={styles.buttonIcon}
									/>
									<Text style={styles.buttonText}>Share</Text>
								</>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
