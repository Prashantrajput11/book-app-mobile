import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/authContext";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack>
				{/* Hide the header for the entire protected section */}
				<Stack.Screen name="(protected)" options={{ headerShown: false }} />

				{/* Your auth screens probably don't need a header either */}
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack>
		</AuthProvider>
	);
}
