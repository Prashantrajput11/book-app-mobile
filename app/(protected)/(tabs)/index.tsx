import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/authContext";

const Index = () => {
	const { logout, user } = useAuth();
	return (
		<View>
			<Text>hello {user?.username}</Text>

			<Image
				source={{ uri: "https://api.dicebear.com/5.x/initials/png?seed=user3" }}
				style={{ width: 50, height: 50 }}
			/>

			<Pressable onPress={logout}>
				<Text>Logout</Text>
			</Pressable>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({});
