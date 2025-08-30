import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookAPI } from "@/services/bookService";

export const useCreateBook = () => {
	// Get the query client instance
	const queryClient = useQueryClient();

	// useMutation handles the API call and its state
	return useMutation({
		mutationFn: createBookAPI, // The function that performs the API call

		onSuccess: () => {
			// When a new book is created successfully, tell React Query that any
			// queries with these keys are now out-of-date.
			// This will automatically trigger a refetch for them.
			queryClient.invalidateQueries({ queryKey: ["allBooks"] });
			queryClient.invalidateQueries({ queryKey: ["myBooks"] });
		},
	});
};
