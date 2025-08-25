import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
	SafeAreaView,
	Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import BASE_URL from "@/config";

const BookCard = ({ item }) => (
	<View style={styles.card}>
		{/* Header with user info */}
		<View style={styles.cardHeader}>
			<Image
				source={{ uri: item.user.profileImage }}
				style={styles.profileImage}
			/>
			<Text style={styles.username}>{item.user?.username || "Unknown"}</Text>
		</View>

		{/* Book image - main focal point */}
		<Image source={{ uri: item.image }} style={styles.cardImage} />

		{/* Book details below image */}
		<View style={styles.cardContent}>
			<Text style={styles.cardTitle}>{item.title}</Text>
			<View style={styles.ratingContainer}>
				{[...Array(5)].map((_, i) => (
					<Text key={i} style={styles.star}>
						{i < item.rating ? "★" : "☆"}
					</Text>
				))}
			</View>
			<Text style={styles.cardCaption}>{item.caption}</Text>
		</View>
	</View>
);

const Index = () => {
	const { token, logout } = useAuth();

	// State for pagination
	const [books, setBooks] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);

	const fetchBooks = async (pageNum = 1) => {
		if (!token) {
			setLoading(false);
			return;
		}

		// Determine which loading indicator to show
		if (pageNum === 1) {
			setLoading(true);
		} else {
			setLoadingMore(true);
		}

		try {
			const response = await fetch(
				`${BASE_URL}/api/books?page=${pageNum}&limit=5`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) throw new Error("Failed to fetch books");

			const json = await response.json();

			console.log("json-->", json);

			// If it's the first page, replace the books. Otherwise, add to the list.
			if (pageNum === 1) {
				setBooks(json.books);
			} else {
				setBooks((prevBooks) => [...prevBooks, ...json.books]);
			}
			setPage(json.currentPage);
			setTotalPages(json.totalPages);
		} catch (error) {
			console.log("error fetching books", error.message);
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, [token]);

	// Called when the list is scrolled to the bottom
	const handleLoadMore = () => {
		// Don't fetch more if we're already loading or have reached the last page
		if (loadingMore || page >= totalPages) {
			return;
		}
		fetchBooks(page + 1);
	};

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
				<Pressable onPress={logout} style={styles.logoutButton}>
					<Text style={styles.logoutText}>Logout</Text>
				</Pressable>
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
