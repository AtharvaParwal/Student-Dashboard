```markdown
# Micro HTTP Service - Student Data Visualizer

This is a full-stack MERN application built as part of an internship assignment at **Eraah**. It fetches student details from a provided mock API, stores and processes them securely in a backend service, and displays the data in a React frontend along with visual charts and graphs.

---

## 📁 Project Structure

```
.
├── backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── server.js
│   └── .env
└── frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── styles/
    │   ├── App.js
    │   └── index.js
    └── .env
```

---

## 🌐 Mock API

- **Endpoint:** `https://67ebf57baa794fb3222c4652.mockapi.io/eraah/students`
- **Method:** `GET`
- **Response Format:**

```json
{
  "id": 1,
  "name": "Aisha Patel",
  "age": 20,
  "course": "Computer Science",
  "active": true
}
```

---

## 🛠️ Features

### Backend (Node.js + Express + MongoDB)

- Fetches and stores student data from the mock API.
- Adds a `last_updated` timestamp to each student record.
- Provides a secure endpoint (`GET /students`) to serve processed data.
- Uses JWT for authentication.
- MongoDB integration for persistent storage.

### Frontend (React + Recharts)

- Authenticates and fetches student data from the backend.
- Displays student data in a table.
- Processes data to:
  - Count active students
  - Calculate average age
  - Group by course
- Visualizes data using:
  - 📊 Bar chart (students per course)
  - 🥧 Pie chart (active vs inactive students)
- Includes:
  - Toggle filter to show only active students
  - Dark mode toggle (optional)

---

## 🔐 Environment Variables

### Backend - `backend/.env`

```env
MOCK_API_URL=https://67ebf57baa794fb3222c4652.mockapi.io/eraah/students
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.hjmnybz.mongodb.net/
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Frontend - `frontend/.env`

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/micro-http-service.git
cd micro-http-service
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env  # Fill in your details
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env  # Fill in your backend URL
npm start
```

---

## 🧪 Testing & Visualization

### Backend

- Test API using Postman:
  - `POST /login` - get JWT token
  - `GET /students` - attach JWT token in headers

### Frontend

- View student data table.
- View processed data insights via bar and pie charts.
- Use toggles for filtering and theme switching.

---

## 🖼️ Frontend Output: 
![Screenshot 2025-04-13 12 59 31](https://github.com/user-attachments/assets/b9a0cced-edaf-4bf8-86a9-6f9fbe32b68f)

![Screenshot 2025-04-13 12 55 19](https://github.com/user-attachments/assets/5d32534a-a9a5-443e-b127-0cfd3cb7f5fb)

[Click here to watch the demo video of Dashboard](https://drive.google.com/file/d/1sqa8HDM_9t5z1s7lhqQ_8mkazCblb9h8/view?usp=drive_link)

## 🖼️ Backend Testing on Postman: 
![Screenshot 2025-04-13 13 12 53](https://github.com/user-attachments/assets/5c347a4a-280a-48d2-8d6e-1235982d4b94)

![Screenshot 2025-04-13 13 12 53](https://github.com/user-attachments/assets/acd876de-c460-4857-8a15-98c847525596)

![Screenshot 2025-04-13 13 12 53](https://github.com/user-attachments/assets/248c380e-9487-4c66-995a-5f3030d481c4)

![Screenshot 2025-04-13 13 12 53](https://github.com/user-attachments/assets/a1bc3227-65b7-4cc1-bc42-2060cd14b248)


Recommended:
- ✅ Table view of student data
- ✅ Bar chart (Students per course)
- ✅ Pie chart (Active vs Inactive)
- ✅ Postman screenshot (with JWT request)

---

## 📌 Note

This project was developed as part of a technical assignment for Eraah to demonstrate skills in the MERN stack, backend API design, secure authentication, and frontend data visualization.

```
