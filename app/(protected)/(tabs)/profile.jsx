import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	ActivityIndicator,
	Image,
	Pressable,
	Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { useBooksByUser } from "@/hooks/useBooksByUser_LEGACY";
import BookCard from "@/components/Book/BookCard/BookCard";
import MyBooksCard from "@/components/Book/MyBookCard/MyBooksCard";
import { useMyBooks } from "@/hooks/useMyBooks";

const { width } = Dimensions.get("window");

const UserInfoHeader = ({ user }) => (
	<View style={styles.headerContainer}>
		<View style={styles.profileSection}>
			<View style={styles.profileImageContainer}>
				<Image
					source={{
						uri:
							user.profileImage ||
							"https://via.placeholder.com/100x100/4A90E2/FFFFFF?text=User",
					}}
					style={styles.profileImage}
				/>
				<View style={styles.profileBadge}>
					<Text style={styles.badgeText}>📚</Text>
				</View>
			</View>
			<View style={styles.userDetails}>
				<Text style={styles.username}>{user.username}</Text>
				<Text style={styles.email}>{user.email}</Text>
			</View>
		</View>
		<View style={styles.headerTitleSection}>
			<View style={styles.titleContainer}>
				<Text style={styles.headerTitle}>My Recommendations</Text>
				<View style={styles.titleUnderline} />
			</View>
		</View>
	</View>
);

const Profile = () => {
	const { myBooks, error, isError, isLoading, refetchBooks } = useMyBooks();
	const { logout, user } = useAuth();

	// Show a loading spinner while fetching data
	if (isLoading) {
		return (
			<View style={styles.center}>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#4A90E2" />
					<Text style={styles.loadingText}>Loading your books...</Text>
				</View>
			</View>
		);
	}

	if (isError)
		return (
			<View style={styles.center}>
				<View style={styles.errorContainer}>
					<Text style={styles.errorIcon}>😕</Text>
					<Text style={styles.errorTitle}>Oops! Something went wrong</Text>
					<Text style={styles.errorMessage}>
						Sorry, we could not load your books.
					</Text>
					<Text style={styles.errorDetails}>{error.message}</Text>
				</View>
			</View>
		);

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={myBooks}
				renderItem={({ item, index }) => (
					<MyBooksCard
						item={item}
						index={index}
						isMyBook={true}
						onDeleteSuccess={refetchBooks}
					/>
				)}
				keyExtractor={(item) => item._id}
				// numColumns={2}
				// columnWrapperStyle={styles.row}
				ListHeaderComponent={<UserInfoHeader user={user} />}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyIcon}>📚</Text>
						<Text style={styles.emptyTitle}>No recommendations yet</Text>
						<Text style={styles.emptyText}>
							You haven't recommended any books yet. Start building your reading
							list!
						</Text>
					</View>
				}
				ListFooterComponent={
					<View style={styles.logoutContainer}>
						<Pressable
							onPress={logout}
							style={({ pressed }) => [
								styles.logoutButton,
								{ opacity: pressed ? 0.8 : 1 },
							]}
						>
							<Text style={styles.logoutText}>🚪 Logout</Text>
						</Pressable>
					</View>
				}
				contentContainerStyle={styles.listContainer}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F9FA",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	loadingContainer: {
		alignItems: "center",
		backgroundColor: "white",
		padding: 30,
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: "#666",
		fontWeight: "500",
	},
	errorContainer: {
		alignItems: "center",
		backgroundColor: "white",
		padding: 30,
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		maxWidth: width - 40,
	},
	errorIcon: {
		fontSize: 48,
		marginBottom: 16,
	},
	errorTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
		textAlign: "center",
	},
	errorMessage: {
		fontSize: 16,
		color: "#666",
		marginBottom: 8,
		textAlign: "center",
	},
	errorDetails: {
		fontSize: 14,
		color: "#999",
		textAlign: "center",
	},
	listContainer: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	row: {
		justifyContent: "space-between",
	},

	// Header styles
	headerContainer: {
		backgroundColor: "white",
		borderRadius: 16,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		overflow: "hidden",
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#4A90E2",
	},
	profileImageContainer: {
		position: "relative",
		marginRight: 16,
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 3,
		borderColor: "white",
	},
	profileBadge: {
		position: "absolute",
		bottom: -2,
		right: -2,
		backgroundColor: "#FF6B6B",
		borderRadius: 12,
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "white",
	},
	badgeText: {
		fontSize: 10,
	},
	userDetails: {
		flex: 1,
	},
	username: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 4,
	},
	email: {
		fontSize: 16,
		color: "rgba(255, 255, 255, 0.8)",
	},
	headerTitleSection: {
		padding: 20,
		paddingTop: 16,
	},
	titleContainer: {
		alignItems: "flex-start",
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#333",
		marginBottom: 4,
	},
	titleUnderline: {
		width: 40,
		height: 3,
		backgroundColor: "#4A90E2",
		borderRadius: 2,
	},

	// Book item styles
	bookItem: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		// width: (width - 48) / 2, // Account for padding and gap
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
	},
	bookImageContainer: {
		position: "relative",
		alignSelf: "center",
		marginBottom: 12,
	},
	bookImage: {
		width: 70,
		height: 100,
		borderRadius: 8,
	},
	ratingBadge: {
		position: "absolute",
		top: -8,
		right: -8,
		backgroundColor: "#FF6B6B",
		borderRadius: 16,
		paddingHorizontal: 8,
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	ratingText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 12,
		marginRight: 2,
	},
	starIcon: {
		fontSize: 10,
	},
	bookInfo: {
		alignItems: "center",
	},
	bookTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		textAlign: "center",
		marginBottom: 8,
		minHeight: 36, // Ensures consistent spacing
	},
	ratingContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	star: {
		fontSize: 14,
		color: "#FFD700",
		marginHorizontal: 1,
	},

	// Empty state
	emptyContainer: {
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 16,
		padding: 40,
		marginTop: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 3,
	},
	emptyIcon: {
		fontSize: 64,
		marginBottom: 16,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
	},
	emptyText: {
		textAlign: "center",
		fontSize: 16,
		color: "#666",
		lineHeight: 24,
	},

	// Logout button
	logoutContainer: {
		padding: 16,
		paddingBottom: 8,
	},
	logoutButton: {
		backgroundColor: "#FF6B6B",
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#FF6B6B",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	logoutText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});
