# Simple JWT Express Authentication with MySQL

This project is a simple implementation of JWT (JSON Web Tokens) authentication using Express.js and MySQL database. It provides a straightforward authentication system with token-based authentication for securing endpoints.

## Installation

1. Make sure you have MySQL & NodeJs installed on your system.

2. Clone the repository:

   ```bash
   git clone https://github.com/Bope142/simple-jwt-express-auth-mysql.git
   ```

3. Navigate into the project directory:

   ```bash
   cd simple-jwt-express-auth-mysql
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Set up environment variables:

   Create a `.env` file in the root directory and provide the following variables:

   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_mysql_database_name
   JWT_SECRET=your_jwt_secret_key
   ```

## Usage

To run the project:

```bash
npm start
```

For development with auto-reloading using Nodemon:

```bash
npm run dev
```

## Routes

##### User Routes

- [ ] GET /: Get all users (protected route, requires authentication).
- [ ] GET /profile: Get user profile (protected route, requires authentication).
- [ ] GET /:email: Get user by email (protected route, requires authentication).
- [ ] POST /register: Register a new user.
- [ ] POST /login: Log in user (prevent access if already logged in).
- [ ] PUT /:id: Update user information (protected route, requires authentication).
- [ ] DELETE /:id: Delete user (protected route, requires authentication).

## Dependencies

- bcryptjs: For password hashing and comparison.
- cookie-parser: For parsing cookie headers.
- cors: For enabling CORS (Cross-Origin Resource Sharing) middleware.
- debug: For debugging messages.
- dotenv: For loading environment variables from a .env file.
- express: Web framework for Node.js.
- jsonwebtoken: For generating and verifying JWTs.
- morgan: HTTP request logger middleware.
- mysql2: MySQL client for Node.js.
- sequelize: Promise-based Node.js ORM for MySQL.

Feel free to contribute, report issues, or suggest improvements!👋

## Author

Norbert Yemuang 🚀
