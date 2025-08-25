import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	SafeAreaView,
} from "react-native";
import React from "react";

import { useBooks } from "@/hooks/useBooks";
import BookCard from "@/components/Book/BookCard";

const Index = () => {
	const { books, loading, loadingMore, handleLoadMore } = useBooks();

	const renderFooter = () => {
		if (!loadingMore) return null;
		return (
			<ActivityIndicator style={{ padding: 20 }} size="large" color="#007bff" />
		);
	};

	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#007bff" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Book Recommendations</Text>
			</View>
			<FlatList
				data={books}
				renderItem={({ item }) => <BookCard item={item} />}
				keyExtractor={(item) => item._id}
				contentContainerStyle={styles.list}
				ListEmptyComponent={
					<Text style={styles.emptyText}>No books found.</Text>
				}
				// Pagination props
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={renderFooter}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
	},
	logoutButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: "#ff4444",
		borderRadius: 6,
	},
	logoutText: {
		color: "white",
		fontSize: 12,
		fontWeight: "600",
	},
	list: {
		padding: 16,
	},
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
	emptyText: {
		textAlign: "center",
		marginTop: 50,
		fontSize: 16,
		color: "#666",
	},
});
