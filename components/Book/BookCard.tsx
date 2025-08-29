import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Rating from "../ui/Rating";

const BookCard = ({ item, isMyBook, onDeleteSuccess }) => (
	<View style={styles.card}>
		{/* Header with user info */}
		<View style={styles.cardHeader}>
			<Image
				source={{ uri: item.user.profileImage }}
				style={styles.profileImage}
			/>
			{!isMyBook && (
				<Text style={styles.username}>{item.user?.username || "Unknown"}</Text>
			)}
		</View>

		{/* Book image - main focal point */}
		<Image source={{ uri: item.image }} style={styles.cardImage} />

		{/* Book details below image */}
		<View style={styles.cardContent}>
			<Text style={styles.cardTitle}>{item.title}</Text>

			<Rating rating={item.rating} />
			<Text style={styles.cardCaption}>{item.caption}</Text>
		</View>
	</View>
);

export default BookCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 12,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		paddingBottom: 0,
	},
	profileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	username: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	cardImage: {
		width: "100%",
		height: 250,
		marginTop: 12,
	},
	cardContent: {
		padding: 16,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
	},
	ratingContainer: {
		flexDirection: "row",
		marginBottom: 8,
	},
	star: {
		fontSize: 16,
		color: "#FFD700",
		marginRight: 2,
	},
	cardCaption: {
		fontSize: 14,
		color: "#666",
		lineHeight: 20,
	},
});
