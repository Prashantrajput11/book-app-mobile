// This file defines the core data models for your entire application.
// This is the single source of truth for what a "Book" is.

export type IUser = {
	_id: string;
	profileImage: string;
	username: string;
	// email: string;
};

export type Book = {
	_id: string;
	title: string;
	caption: string;
	image: string;
	rating: number;
	user: IUser;
	createdAt: string;
};
