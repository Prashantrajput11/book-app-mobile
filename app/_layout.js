import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Stack>
					{/* Hide the header for the entire protected section */}
					<Stack.Screen name="(protected)" options={{ headerShown: false }} />

					{/* Your auth screens probably don't need a header either */}
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</AuthProvider>
		</QueryClientProvider>
	);
}
