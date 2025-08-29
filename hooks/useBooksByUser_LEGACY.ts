// import { useState, useEffect, useMemo } from "react";
// import { useAuth } from "@/contexts/authContext";
// import {
// 	fetchAllBooksByUser,
// 	sortMyBooksByRating,
// } from "@/services/bookService";
/**
 * =============================================================================
 * NOTE FOR DEVELOPERS:
 *
 * This file demonstrates a manual approach to data fetching and state management
 * using fundamental React hooks like useState, useEffect, and useCallback.
 *
 * While this pattern is a great way to understand the underlying mechanics of
 * asynchronous state in React, it involves a lot of boilerplate for handling

 * loading states, error states, and providing a stable refetch function.
 *
 * The current, preferred implementation in this project uses TanStack Query
 * (React Query), which simplifies this entire hook into a few declarative
 * lines and adds powerful features like caching and automatic background
 * refetching out of the box.
 *
 * This file is preserved for educational and historical context. Please refer
 * to the new React Query implementation for the current best practice.
 * =============================================================================
 */
// export const useBooksByUser = () => {
// 	const { user } = useAuth();
// 	// State for the original, unsorted data from the API
// 	const [rawBooks, setRawBooks] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	// useEffect is only for fetching the raw data
// 	useEffect(() => {
// 		const getRecommendedBooksByUser = async () => {
// 			if (!user) {
// 				setLoading(false);
// 				return;
// 			}
// 			setLoading(true);
// 			setError(null);
// 			try {
// 				const data = await fetchAllBooksByUser();
// 				setRawBooks(data); // Set the original, unsorted data
// 			} catch (err) {
// 				setError(err);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		getRecommendedBooksByUser();
// 	}, [user]);

// 	const books = useMemo(() => {
// 		return sortMyBooksByRating(rawBooks);
// 	}, [rawBooks]);

// 	// Return the final, sorted books array to the UI
// 	return {
// 		// Data
// 		myBooks: books,
// 		user,

// 		// UI state
// 		loading,
// 		error,
// 	};
// };
