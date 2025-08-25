![Uploading image.png…]()
📚 BookHub – Your Personal Book Recommendation API

A simple backend service built with Node.js, Express, and MongoDB to manage users, books, and personalized recommendations.

🚀 Features

👤 User Management – register, login, authenticate via JWT.

📖 Book Management – add, update, delete, and fetch books.

🎯 Personalized Recommendations – fetch books recommended by other users or system.

🔍 Search & Filter – query books by title, author, or tags.

🌐 Deployed on Render – production-ready with MongoDB Atlas.

🛠️ Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose ORM)

Auth: JWT Authentication & bcrypt for password hashing

Hosting: Render


bookhub-backend/
│── src/
│   ├── controllers/    # Business logic (users, books, recommendations)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── middlewares/    # Auth & validation
│   ├── utils/          # Helper functions
│   └── server.js       # Entry point
│
├── .env                # Environment variables
├── package.json
└── README.md

