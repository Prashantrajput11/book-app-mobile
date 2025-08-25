import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import BASE_URL from "@/config";

// Component for the user info header
const UserInfoHeader = ({ user }) => (
	<View style={styles.headerContainer}>
		<Image
			source={{
				uri:
					user.profileImage ||
					`https://api.dicebear.com/5.x/initials/svg?seed=${user.username}`,
			}}
			style={styles.profileImage}
		/>
		<Text style={styles.username}>{user.username}</Text>
		<Text style={styles.email}>{user.email}</Text>
		<Text style={styles.headerTitle}>My Recommendations</Text>
	</View>
);

// Component for a single book item in the list
const BookListItem = ({ item }) => (
	<View style={styles.bookItem}>
		<Image source={{ uri: item.image }} style={styles.bookImage} />
		<View style={styles.bookInfo}>
			<Text style={styles.bookTitle}>{item.title}</Text>
			<View style={styles.ratingContainer}>
				{[...Array(5)].map((_, i) => (
					<Text key={i} style={styles.star}>
						{i < item.rating ? "★" : "☆"}
					</Text>
				))}
			</View>
		</View>
	</View>
);

const Profile = () => {
	const { user, token } = useAuth();
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	const getRecommendedBooksByUser = async () => {
		if (!user || !token) {
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(`${BASE_URL}/api/books/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				throw new Error("Failed to fetch user's books");
			}

			const data = await res.json();
			setBooks(data);
		} catch (error) {
			console.error("Error fetching user's books:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getRecommendedBooksByUser();
	}, [user, token]);

	// Show a loading spinner while fetching data
	if (loading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="#007bff" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={books}
				renderItem={({ item }) => <BookListItem item={item} />}
				keyExtractor={(item) => item._id}
				// Using ListHeaderComponent to show user info above the list
				ListHeaderComponent={<UserInfoHeader user={user} />}
				// Using ListEmptyComponent for a nice message when there's no data
				ListEmptyComponent={
					<Text style={styles.emptyText}>
						You haven't recommended any books yet.
					</Text>
				}
				contentContainerStyle={styles.listContainer}
			/>
		</SafeAreaView>
	);
};

export default Profile;

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
	listContainer: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	// Header styles
	headerContainer: {
		alignItems: "center",
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		marginBottom: 10,
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 12,
	},
	username: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
	},
	email: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		alignSelf: "flex-start",
	},
	// Book item styles
	bookItem: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	bookImage: {
		width: 60,
		height: 90,
		borderRadius: 4,
		marginRight: 16,
	},
	bookInfo: {
		flex: 1,
	},
	bookTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#444",
	},
	ratingContainer: {
		flexDirection: "row",
		marginTop: 4,
	},
	star: {
		fontSize: 16,
		color: "#f4b400",
	},
	emptyText: {
		textAlign: "center",
		marginTop: 30,
		fontSize: 16,
		color: "#888",
	},
});
