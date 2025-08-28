import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Rating = ({ rating }) => {
	return (
		<View style={styles.ratingContainer}>
			{[...Array(5)].map((_, i) => (
				<Text key={i} style={styles.star}>
					{i < rating ? "★" : "☆"}
				</Text>
			))}
		</View>
	);
};

export default Rating;

const styles = StyleSheet.create({
	ratingContainer: {
		flexDirection: "row",
		marginBottom: 8,
	},
	star: {
		fontSize: 16,
		color: "#FFD700",
		marginRight: 2,
	},
});
