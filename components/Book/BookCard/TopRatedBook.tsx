import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import commonStyles from "@/constants/commonStyles";
import COLORS from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";

const TopRatedBook = () => {
	return (
		<View style={[commonStyles.m_h_10]}>
			<View>
				<Text
					style={[
						commonStyles.m_h_6,
						{ color: COLORS.backgroundLight, fontSize: 28 },
					]}
				>
					Top Rated Book of the Day
				</Text>
				<Text
					style={[
						commonStyles.m_h_16,
						commonStyles.m_b_12,
						{ color: COLORS.backgroundLight },
					]}
				>
					Selected by our Readers
				</Text>
			</View>
			<Image
				source={{
					uri: "https://img.freepik.com/free-vector/bike-guy-wattpad-book-cover_23-2149452163.jpg?semt=ais_hybrid&w=740&q=80",
				}}
				style={{ height: 300, width: "100%" }}
			/>

			<View
				style={[
					commonStyles.flex_row,
					commonStyles.justify_space_between,
					commonStyles.m_t_12,
				]}
			>
				<View>
					<Text style={{ color: COLORS.backgroundLight, fontSize: 18 }}>
						The bike Guy
					</Text>
					<Text style={{ color: COLORS.backgroundLight, fontSize: 12 }}>
						Enmoy Mayers
					</Text>
				</View>

				<Pressable>
					<Entypo name="share-alternative" size={24} color="#fff" />
				</Pressable>
			</View>
		</View>
	);
};

export default TopRatedBook;

const styles = StyleSheet.create({});
