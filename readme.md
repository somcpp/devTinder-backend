
# DevTinder: Hackathon Teammate Finder Backend

DevTinder is a backend API service designed to help developers find and connect with potential hackathon teammates. Built with Node.js, Express, and MongoDB, it provides user authentication, profile management, connection requests, and a user feed to discover new teammates.

## Features
- User registration and authentication (JWT-based)
- Profile creation, viewing, and editing
- Send and review connection requests (interested, ignored, accepted, rejected)
- View pending requests and existing connections
- User feed to discover new users
- Secure endpoints with authentication middleware

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for cookie management

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your MongoDB connection in `src/config/database.js`
4. Start the server: `npm run dev`

## API Endpoints

### Auth
#### POST `/auth/signup`
Register a new user.
**Body:**
```
{
	"firstName": "John",
	"lastName": "Doe",
	"emailId": "john@example.com",
  "about": "",
  "photoURL": "",
	"password": "yourpassword",
	"gender": "male|female",
	"skills": ["JavaScript", "React"]
}
```
**Response:** `user created successfully` or error message.

#### POST `/auth/login`
Login user and receive JWT token in a cookie.
**Body:**
```
{
	"emailId": "john@example.com",
	"password": "yourpassword"
}
```
**Response:** Sets `token` cookie, returns user info.

#### POST `/auth/logout`
Logout user (clears token cookie).

---

### Profile
> All profile routes require authentication (token cookie).

#### GET `/profile/view`
Get the logged-in user's profile.

#### POST `/profile/edit`
Edit the logged-in user's profile.
**Body:**
```
{
	"about": "New about info",
	"skills": ["Node.js", "MongoDB"]
}
```

---

### Connection Requests
> All request routes require authentication.

#### POST `/request/send/:status/:toUserId`
Send a connection request to another user.
- `status`: `intrested` or `ignored`
- `toUserId`: MongoDB ObjectId of the user to connect with

#### POST `/request/review/:status/:requestId`
Review a received connection request.
- `status`: `accepted` or `rejected`
- `requestId`: ID of the connection request

---

### User
> All user routes require authentication.

#### GET `/user/requests/pending`
Get all pending ("intrested") connection requests received by the logged-in user.

#### GET `/user/connections`
Get all users with whom the logged-in user has an accepted connection.

#### GET `/user/feed`
Get a paginated list of users the logged-in user has not interacted with.
- Query params: `page` (default 1), `limit` (default 10, max 50)

---

## Models

### User
- firstName, lastName, emailId, about, PhotoURL, gender, skills, password

### ConnectionRequest
- fromUserId, toUserId, status (`intrested`, `ignored`, `accepted`, `rejected`)

---

## Authentication
All protected routes require a valid JWT token sent as a cookie named `token`.

## License
ISC