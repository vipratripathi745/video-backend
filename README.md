# 🎥 VideoTube Backend

A scalable RESTful backend for a YouTube-like video sharing platform built using **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary**. It provides secure JWT authentication, media uploads, user management, video management, comments, likes, playlists, subscriptions, tweets, and dashboard analytics.

---

# 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Refresh Token Authentication
- Logout
- Change Password
- Update Account Details
- Get Current User

### 👤 User Management
- Update Avatar
- Update Cover Image
- User Profile Management

### 🎥 Video Management
- Upload Videos
- Upload Thumbnails
- Update Video
- Delete Video
- Toggle Publish Status
- Get All Published Videos
- Get Video by ID

### 💬 Comment System
- Add Comment
- Update Comment
- Delete Comment
- Fetch Video Comments

### ❤️ Like System
- Like / Unlike Videos
- Like / Unlike Comments
- Like / Unlike Tweets
- Fetch Liked Videos

### 📂 Playlist
- Create Playlist
- Update Playlist
- Delete Playlist
- Add Video to Playlist
- Remove Video from Playlist
- Get Playlist
- Get User Playlists

### 🔔 Subscription
- Subscribe Channel
- Unsubscribe Channel

### 🐦 Tweet Module
- Create Tweet
- Update Tweet
- Delete Tweet
- Fetch User Tweets

### 📊 Dashboard
- Total Videos
- Subscriber Count
- Subscribed Channels Count
- Channel Videos

### ☁️ Cloudinary
- Video Upload
- Thumbnail Upload
- Avatar Upload
- Cover Image Upload

### 🛡 Security
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- HTTP Only Cookies
- Refresh Token Rotation

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Cloudinary
- Cookie Parser
- CORS

---

# 📁 Project Structure

```
src
│
├── controllers
├── models
├── routes
├── middleware
├── utils
├── db
├── public
├── app.js
├── index.js
└── env.js
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/vipratripathi745/video-backend.git
```

Move to project directory

```bash
cd video-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add your environment variables.

Start the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

```env
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

CORS_ORIGIN=
```

---

# 📌 API Modules

- Authentication APIs
- User APIs
- Video APIs
- Comment APIs
- Like APIs
- Playlist APIs
- Subscription APIs
- Tweet APIs
- Dashboard APIs

---

# 📚 REST APIs

| Method | Endpoint |
|---------|----------|
| POST | /users/register |
| POST | /users/login |
| POST | /users/logout |
| GET | /videos |
| POST | /videos/publish |
| PATCH | /videos/:videoId |
| DELETE | /videos/:videoId |
| POST | /comments/:videoId |
| POST | /likes/toggle/v/:videoId |
| POST | /likes/toggle/c/:commentId |
| POST | /likes/toggle/t/:tweetId |
| POST | /playlists |
| POST | /subscriptions/c/:channelId |
| POST | /tweets |

---

# 🚀 Future Improvements

- Search API
- Video Recommendation System
- Watch Later Feature
- Notifications
- Live Streaming
- Video Categories
- Admin Dashboard
- Unit Testing
- Docker Support

---

# 👨‍💻 Author

**Vipra Tripathi**

GitHub: https://github.com/vipratripathi745
