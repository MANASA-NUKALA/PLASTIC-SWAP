```
# 🌍 PlasticSwap

PlasticSwap is a community-driven platform that helps users recycle and exchange plastic waste. Users can post items, browse items posted by others, and earn points for participating in recycling activities.  

---

## Features
- User authentication (signup/login)  
- Post plastic items with image, description, contact, and location  
- Browse items posted by other users  
- Track points, recycled plastics, and user rank  
- Delete posted items  
- Dashboard to see recent activities and stats  

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT (JSON Web Tokens)  
- **Image Uploads:** Multer (local storage)  

---

## Installation

### Backend
1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the root:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
4. Start the server:

   ```bash
   node server.js
   ```
5. Backend will run at `http://localhost:5000`

### Frontend

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Update API URLs in frontend code to point to your backend.
4. Start the frontend:

   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

---

## Usage

1. Sign up or log in
2. Post your plastic items for exchange
3. Browse items posted by others
4. Track your points and recycled plastics on the dashboard
5. Delete items if needed

---

## Folder Structure

```
/backend
  ├── models
  ├── routes
  ├── middleware
  └── server.js

/frontend
  ├── src
      ├── components
      ├── pages
      └── App.js
```

---

## Contributing

1. Fork the repository
2. Create a new branch `git checkout -b feature/your-feature`
3. Commit changes `git commit -m "Add feature"`
4. Push to branch `git push origin feature/your-feature`
5. Create a Pull Request

---
