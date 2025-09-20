# Frontend - Assignment Management System

## 📋 Overview

This is the frontend application for the Assignment Management System built with Vite-React, JavaScript, and Tailwind CSS. It provides a responsive user interface for both teachers and students to manage assignments.

## 🛠 Tech Stack

- **Framework**: React
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API / React Hooks
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Authentication**: JWT tokens
- **UI Components**: Custom components

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PranavRaj16/Assignment-Management-client.git
   cd Assignment-Management-client
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will start on `http://localhost:5173` and automatically open in your browser.

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📱 Key Features

### User Roles

- **Teachers**: Create and manage assignments and view submissions
- **Students**: Submit assignments

## 👤 User Registration and Authentication

### Register a New User

To create a new user account, make a POST request to the following endpoint:

```http
POST http://localhost:8081/api/auth/register
```

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "Your Name",
  "role": "student" // or "teacher"
}
```

All fields are required:

- `email`: Valid email address
- `password`: User's password
- `name`: User's full name
- `role`: Must be either "teacher" or "student"

After successful registration, you can use the same credentials to login to the website.
