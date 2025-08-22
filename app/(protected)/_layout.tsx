import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAuth } from "../../contexts/authContext";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { Text } from "react-native";

export default function ProtectedLayout() {
	const { token, user, isLoading } = useAuth();

	console.log("token in pl", token);
	console.log("user in pl", user);

	if (isLoading) {
		// You can return a loading spinner here if you want
		return <Text>Loading...</Text>;
	}

	const isLoggedIn = !!(token && user);

	console.log("isloggedin", isLoggedIn);

	if (!isLoggedIn) {
		return <Redirect href="/(auth)/login" />;
	}
	// const colorScheme = useColorScheme();
	// const [loaded] = useFonts({
	// 	SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	// });

	// if (!loaded) {
	// 	// Async font loading only occurs in development.
	// 	return null;
	// }

	return (
		<>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
