# 📚 Library Management System (LMS)

A full-stack Library Management System built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Role-Based Access Control (RBAC)**, JWT authentication via `httpOnly` cookies, Cloudinary image uploads, and support for student services like penalty payment and book extension requests.


You can check the full running website on
**https://lms-frontend-jade-three.vercel.app/**

---

## 🚀 Features

### ✅ Authentication & Authorization
- Secure JWT Authentication (httpOnly cookies)
- `/verifyToken` route for session validation
- Dual login via **URN** or **Username**
- Role-Based Access Control (RBAC)
- Role stored in `useState`
### 🎭 User Roles
- **Admin**
  - Manage books
  - View users
  - Monitor extension and penalty requests
- **Student**
  - Email Notifications for due dates
  - View issued books
  - Request due date extensions
  - Pay penalties using RazorPay API (test mode)

### 🖼️ File Uploads
- Integrated with **Cloudinary** for book cover uploads
- `FormData` API used for handling file data
- Separate `useState` for `coverPhoto`

### 📈 Optimized API Calls
- Parallel API fetching with `Promise.all`
- Efficient use of token-based user identification (`userId` from token)

### 📱 Frontend
- Built using **React.js**
- Responsive design and modern UI with animations
- React Context API used for global state (LMSState)
- React Router v6 for navigation

### 🛠️ Backend
- Built with **Express.js**
- MongoDB for database
- Organized with dotenv (`./Data/config.env`)
- Role-based middleware for protected routes

### 🌐 Deployment
- Frontend deployed to **Vercel**
- Backend deployed to **Render**
- CORS configured with frontend URL
- Vercel’s `vercel.json` used for route rewrites
- Performance monitored via **Vercel Speed Insights**

---

## 🌟 Upcoming Features
- 📖 **AI-based Book Recommendation System** (content-based / collaborative filtering)
- 📊 Admin Dashboard Analytics

---

## 🧠 Tech Stack

| Frontend      | Backend     | Database | Auth       | Deployment       | Tools         |
|---------------|-------------|----------|------------|------------------|---------------|
| React.js      | Express.js  | MongoDB  | JWT (cookie-based) | Vercel (Frontend) <br> Render (Backend) | Cloudinary, Axios, dotenv, CORS |

---

## 🧪 Project Setup

### ⚙️ Backend
For backend use LMS_API
https://github.com/TheDevMonarch/LMS_API


### 💻 Frontend
```bash
cd LMS_Frontend
npm install
npm run dev
```

- Configure `vite.config.js` to proxy API if needed.
- API base URL should use `withCredentials: true`.

---

# Frontend Environment Variables

# Base URL of your backend API
VITE_API_URL= LOCAL_LMS_API_LINK or DEPLOYED_LMS_API_LINK

# Razorpay public key (used on the client-side)
VITE_RAZORPAY_KEY=your_razorpay_key_here

---

## 📁 Folder Structure

```
├── LMS_Frontend/         # React frontend
│   ├── components/
│   ├── pages/
│   ├── context/LMSState.jsx
│   └── App.jsx
```

---

## 🤝 Author

**Aakash Rane**  
👨‍🎓 B.Tech CSE 
📬 aakashrane15@gmail.com  
🌐 www.linkedin.com/in/aakash-maruti-rane-2b94382b1

---

## 📜 License

This project is licensed under the MIT License.

---

## 📝 Notes

- Use `http://localhost:5173` during local frontend testing.
- Admin creation script is available in the backend (`/utils/adminCreate.js`)
- Don't forget to update CORS and environment variables during deployment.