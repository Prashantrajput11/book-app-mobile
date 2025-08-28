import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Rating from "../ui/Rating";
import { deleteBookByUser } from "@/services/bookService";

const MyBooksCrad = ({ item }) => {
	console.log("item", item);

	const handleDeletePress = () => {
		// Ask for confirmation before deleting
		Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "OK", onPress: () => handleDeleteBook() },
		]);
	};

	const handleDeleteBook = async () => {
		try {
			await deleteBookByUser(item._id);
			Alert.alert("Success", "Book deleted successfully.");
			// Call the onDelete function passed from the parent to refresh the list
		} catch (error) {
			// Add error handling
			Alert.alert("Error", "Failed to delete the book.");
			console.error(error);
		}
	};
	return (
		<View style={styles.myBookCardContainer}>
			<View style={styles.image}>
				<Image
					source={{ uri: item.image }}
					style={{ width: 100, height: 100, borderRadius: 10 }}
				/>
			</View>
			<View style={styles.bookDetailsContainer}>
				<Text style={styles.bookTitle}>Title of the book</Text>

				<Rating rating={item.rating} />

				<Text style={styles.bookDescription}>
					this book is surely amazing ....
				</Text>
				<Text style={styles.bookDate}>3/09/2025</Text>
			</View>

			<Pressable onPress={handleDeletePress}>
				<FontAwesome name="trash" size={24} color="#adb5bd" />
			</Pressable>
		</View>
	);
};

export default MyBooksCrad;

const styles = StyleSheet.create({
	myBookCardContainer: {
		borderWidth: 1,
		borderColor: "#C0C0C0",
		marginVertical: 12,
		flexDirection: "row",
		padding: 12,
		alignItems: "center",
	},

	bookDetailsContainer: {
		marginHorizontal: 12,
	},

	iconContainer: {
		backgroundColor: "#2b7ec6",
		height: 30,
		width: 30,
		borderRadius: 20,
		// padding: 12,
		alignItems: "center",
		justifyContent: "center",
	},

	bookTitle: {
		color: "#006d77",
		fontSize: 24,
		fontWeight: "bold",
	},
	bookDescription: {
		color: "#6c757d",
		fontSize: 14,
	},

	bookDate: {
		color: "#adb5bd",
		fontSize: 14,
	},
});
