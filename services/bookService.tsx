import api from "../lib/axios.js";

export const createBookAPI = async (bookData) => {
	const response = await api.post("/api/books", bookData);
	return response.data;
};

export const fetchAllBooks = async (pageNum) => {
	try {
		const response = await api.get("/api/books", {
			params: {
				page: pageNum,
				limit: 5,
			},
		});

		// With axios, the actual response data is in the 'data' property
		return response.data;
	} catch (error) {
		// Axios automatically throws an error for non-2xx status codes,
		// so we can just catch it and re-throw it for the component.
		console.error("Failed to fetch books:", error);
		throw error;
	}
};

export const fetchAllBooksByUser = async () => {
	const response = await api.get("api/books/user");

	console.log("booksbyme", response.data);

	return response.data;
};

export const deleteBookByUser = async (bookId) => {
	const response = await api.delete(`api/books/${bookId}`);

	return response.data;
};

// Data sorting
export const sortMyBooksByRating = (myBooks) => {
	return [...myBooks].sort((a, b) => {
		return b.rating - a.rating;
	});
};
