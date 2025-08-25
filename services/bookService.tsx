import BASE_URL from "@/config";

export const fetchAllBooks = async (pageNum, token) => {
	try {
		const response = await fetch(
			`${BASE_URL}/api/books?page=${pageNum}&limit=5`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) throw new Error("Failed to fetch books");

		const data = await response.json();

		return data;
	} catch (error) {
		// Re-throw the error so the component knows something went wrong
		throw error;
	}
};
