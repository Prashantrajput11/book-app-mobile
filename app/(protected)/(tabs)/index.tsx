import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/authContext";

const Index = () => {
	const { logout } = useAuth();
	return (
		<View>
			<Text>index</Text>

			<Pressable onPress={logout}>
				<Text>Logout</Text>
			</Pressable>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({});
