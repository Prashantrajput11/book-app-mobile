import { useMemo } from "react";
import { useAuth } from "@/contexts/authContext";
import {
	fetchAllBooksByUser,
	sortMyBooksByRating,
} from "@/services/bookService";
import { useQuery } from "@tanstack/react-query";

export const useMyBooks = () => {
	const { user } = useAuth();

	const {
		data: rawBooks,
		isLoading,
		error,
		refetch,
	} = useQuery({
		queryKey: ["myBooks", user?._id],
		queryFn: fetchAllBooksByUser,
		enabled: !!user,
	});

	const books = useMemo(() => {
		if (!rawBooks) return [];
		return sortMyBooksByRating(rawBooks);
	}, [rawBooks]);

	return {
		// Data
		myBooks: books,
		user,

		// UI state
		loading: isLoading,
		error,

		// Actions
		refetchBooks: refetch,
	};
};
