# Book Management System

## Description
This project is a **Book Management System** built with **Node.js** and **Express.js**. It provides a backend API for managing books, authors, genres, publishers, reviews, and user authentication. The system includes role-based access control (RBAC) to restrict certain actions to specific user roles (e.g., admin, author). The project uses **MongoDB** as the database and follows a modular structure for scalability and maintainability.

## Frontend
A frontend for this project is available at: [baigiamasis-FE](https://github.com/airidabu/baigiamasis-FE)

### Features
- User registration and login with JWT-based authentication.
- Role-based access control (admin, author, user).
- CRUD operations for books, genres, publishers, and reviews.
- Book status management (pending, approved, rejected) for admin review.
- Middleware for authentication and role validation.

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt.js** for password hashing
- **dotenv** for environment variable management
- **ESLint** for code linting

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A MongoDB connection string (e.g., from [MongoDB Atlas](https://www.mongodb.com/atlas)).

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. The server will run at `http://localhost:3000`.

## API Endpoints

### Users
- `POST /users/register` - Register a new user.
- `POST /users/login` - Login and get a JWT token.

### Books
- `GET /books` - Get all approved books.
- `GET /books/pending` - Get all books with pending status (admin only).
- `POST /books` - Create a new book (author/admin only).
- `PUT /books/:id` - Update a book (author/admin only).
- `DELETE /books/:id` - Delete a book (author/admin only).

### Genres
- `GET /genres` - Get all genres.
- `POST /genres` - Create a new genre (admin only).

### Publishers
- `GET /publishers` - Get all publishers.
- `POST /publishers` - Create a new publisher (admin only).

### Reviews
- `POST /reviews` - Add a review for a book.

### Status
- `PATCH /status/:bookId` - Update the status of a book (admin only).

## Project Structure
```
.
├── api/
│   ├── bookEndpoints.js
│   ├── genreEndpoints.js
│   ├── publisherEndpoints.js
│   ├── reviewEndpoints.js
│   ├── statusEndpoints.js
│   └── userEndpoints.js
├── controllers/
│   ├── bookController.js
│   ├── genreController.js
│   ├── publisherController.js
│   ├── reviewController.js
│   ├── statusController.js
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── bookModel.js
│   ├── genreModel.js
│   ├── publisherModel.js
│   ├── reviewModel.js
│   ├── statusModel.js
│   └── userModel.js
├── db.js
├── server.js
├── package.json
└── .env
```

## License
This project is licensed under the MIT License.