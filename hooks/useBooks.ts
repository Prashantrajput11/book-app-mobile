import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { fetchAllBooks } from "@/services/bookService";

export const useBooks = () => {
	const { token } = useAuth();
	const [books, setBooks] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);

	const loadBooks = async (pageNum = 1) => {
		if (!token) {
			setLoading(false);
			return;
		}

		if (pageNum === 1) setLoading(true);
		else setLoadingMore(true);

		try {
			const data = await fetchAllBooks(pageNum, token);
			if (pageNum === 1) {
				setBooks(data.books);
			} else {
				setBooks((prevBooks) => [...prevBooks, ...data.books]);
			}
			setPage(data.currentPage);
			setTotalPages(data.totalPages);
		} catch (error) {
			console.log("error fetching books", error.message);
		} finally {
			setLoading(false);
			setLoadingMore(false);
		}
	};

	useEffect(() => {
		loadBooks();
	}, [token]);

	const handleLoadMore = () => {
		if (loadingMore || page >= totalPages) {
			return;
		}
		loadBooks(page + 1);
	};

	// Return everything the UI needs from this hook
	return { books, loading, loadingMore, handleLoadMore };
};
