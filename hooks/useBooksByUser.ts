import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/authContext";
import {
	fetchAllBooksByUser,
	sortMyBooksByRating,
} from "@/services/bookService";

export const useBooksByUser = () => {
	const { user } = useAuth();
	// State for the original, unsorted data from the API
	const [rawBooks, setRawBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// useEffect is only for fetching the raw data
	useEffect(() => {
		const getRecommendedBooksByUser = async () => {
			if (!user) {
				setLoading(false);
				return;
			}
			setLoading(true);
			setError(null);
			try {
				const data = await fetchAllBooksByUser();
				setRawBooks(data); // Set the original, unsorted data
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		getRecommendedBooksByUser();
	}, [user]);

	const books = useMemo(() => {
		return sortMyBooksByRating(rawBooks);
	}, [rawBooks]);

	// Return the final, sorted books array to the UI
	return {
		// Data
		myBooks: books,
		user,

		// UI state
		loading,
		error,
	};
};
