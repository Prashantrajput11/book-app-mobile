import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useAuth } from "../../contexts/authContext";

import { ActivityIndicator, View } from "react-native";

export default function ProtectedLayout() {
	const { token, user, isLoading } = useAuth();

	if (isLoading) {
		// You can return a loading spinner here if you want
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} color={"green"} />
			</View>
		);
	}

	const isLoggedIn = !!(token && user);

	console.log("isloggedin", __DEV__ && isLoggedIn);

	if (!isLoggedIn) {
		return <Redirect href="/(auth)/login" />;
	}

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					// tabBarButton: HapticTab,
					// tabBarBackground: TabBarBackground,
					// tabBarStyle: Platform.select({
					// 	ios: {
					// 		// Use a transparent background on iOS to show the blur effect
					// 		position: "absolute",
					// 	},
					// 	default: {},
					// }),
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</>
	);
}
