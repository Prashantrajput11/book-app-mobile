import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	SafeAreaView,
	Image,
	Pressable,
} from "react-native";
import React from "react";

import { useBooks } from "@/hooks/useBooks";
import BookCard from "@/components/Book/BookCard";
import COLORS from "@/constants/Colors";
import commonStyles from "@/constants/commonStyles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TopRatedBook from "@/components/Book/TopRatedBook";

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
			<View style={[commonStyles.p_12, commonStyles.m_b_10]}>
				<Text style={styles.headerTitle}>Book Recommendations</Text>
				<View style={styles.underline}></View>
			</View>

			<View
				style={[
					{ backgroundColor: COLORS.backgroundDarkShade_1, borderRadius: 6 },
					commonStyles.p_14,
					commonStyles.m_h_14,
					commonStyles.m_b_34,
					commonStyles.flex_row,
					commonStyles.justify_space_between,
					commonStyles.a_i_center,
				]}
			>
				<View style={[commonStyles.flex_row, commonStyles.a_i_center]}>
					<Image
						source={require("../../../assets/images/goal_set.jpg")}
						style={{ width: 20, height: 20, borderRadius: 10 }}
					/>
					<View style={[commonStyles.m_l_14]}>
						<Text style={styles.goalSetText}>Set a weekly learning goal</Text>
						<Text style={styles.goalSetText}>Make personal growth a habit</Text>
					</View>
				</View>

				<Pressable>
					<FontAwesome6 name="greater-than" size={20} color="#fff" />
				</Pressable>
			</View>

			{/* Top rated book card */}

			<FlatList
				data={books}
				renderItem={({ item }) => <BookCard item={item} />}
				keyExtractor={(item) => item._id}
				contentContainerStyle={styles.list}
				ListHeaderComponent={<TopRatedBook />}
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
		backgroundColor: COLORS.backgroundDark,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
	},
	underline: {
		height: 3, // The thickness of the line
		width: "15%", // **The line will be 25% of the titleContainer's width**
		backgroundColor: COLORS.accent,
		marginTop: 4, // Space between the text and the line
	},
	goalSetBanner: {
		// backgroundColor: "#003049E6",
		backgroundColor: "#33596d",
		padding: 12,
		marginHorizontal: 12,
		borderRadius: 6,
	},

	goalSetText: {
		color: COLORS.backgroundLight,
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
