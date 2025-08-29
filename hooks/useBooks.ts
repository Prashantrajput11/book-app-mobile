import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/authContext";
import { fetchAllBooks } from "@/services/bookService";

export const useBooks = () => {
	const { user } = useAuth();

	const {
		data,
		isLoading,
		isError,
		error,
		fetchNextPage, // Function to fetch the next page
		hasNextPage, // Boolean, true if there are more pages
		isFetchingNextPage, // Boolean for the footer loading spinner
	} = useInfiniteQuery({
		// A unique key for this paginated data
		queryKey: ["allBooks"],

		// The function that fetches the data. It receives an object with a `pageParam`.
		queryFn: ({ pageParam = 1 }) => fetchAllBooks(pageParam),
		initialPageParam: 1, // The initial page number to fetch

		// This crucial function tells React Query how to get the *next* page number
		// from the data of the *last* successful fetch.
		getNextPageParam: (lastPage) => {
			if (lastPage.currentPage < lastPage.totalPages) {
				return lastPage.currentPage + 1;
			}
			// If there are no more pages, return undefined
			return undefined;
		},

		// Only run this query if the token exists
		enabled: !!user,
	});

	// `useInfiniteQuery` returns data as an object with a `pages` array.
	// We use `useMemo` to flatten this into a single array of books for the FlatList.
	const books = useMemo(() => {
		return data?.pages.flatMap((page) => page.books) ?? [];
	}, [data]);

	return {
		// Data
		books,

		// UI state
		loading: isLoading,
		error,

		// helpers
		loadingMore: isFetchingNextPage,
		handleLoadMore: () => {
			if (hasNextPage) {
				fetchNextPage();
			}
		},
	};
};
