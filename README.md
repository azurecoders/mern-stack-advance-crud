# Advanced MERN Stack CRUD System

Welcome to the Advanced MERN Stack CRUD System project! This project leverages the power of MongoDB, Express, React, and Node.js to build a feature-rich application with responsive design, file uploads to Cloudinary, authentication, and seamless API testing using Insomnia. Our goal is to create an efficient and robust CRUD system that will be deployed on Vercel or Render.com.

## Day 1: Initial Backend Setup

Today, we have laid the foundation of our backend API. We have set up the project structure and created a test API to ensure everything is working correctly.

### Project Structure

api
├── controllers
├── models
├── routes
├── index.js
└── package.json

### Test API Endpoint

We have created a simple test endpoint to verify our backend setup.

- **Endpoint:** `http://localhost:5000/api/test`
- **Method:** `GET`
- **Reponse:**

```json
{
  "message": "Api is working"
}
```

### Testing with Insomnia

- Open Insomnia.

- Create a new request.

- Set the method to `GET`.

- Set the URL to `http://localhost:5000/api/test`.

- Send the request and you should see the following response:

```json
{
  "message": "Api is working"
}
```

## Getting Started

1. **Clone the Repository:**

```bash
git clone https://github.com/azurecoders/mern-stack-advance-crud
cd mern-stack-advance-crud
```

2. **Backend Setup:**
   Navigate to the `api` folder and install dependencies:

```bash
cd api
npm install
```

Start the backend server:

```bash
npm run dev # for development with nodemon
npm start   # for production
```

## Future Plans

In the upcoming days, we will:

- Set up the frontend with React and Tailwind CSS.
- Implement advanced CRUD operations.
- Integrate React Router DOM for navigation.
- Set up authentication.
- Handle file uploads to Cloudinary using Multer.
- Ensure responsive design.
- Deploy the application to Vercel or Render.com.

## Deployment

When ready to deploy, follow these steps:

1. **Build the project:**

```bash
npm run build
```

2. **Deploy to your preferred platform (e.g., Vercel, Render.com):**

```bash
# Example for Vercel
vercel deploy
```

## Stay Tuned

Stay tuned for more updates as we continue to enhance this advanced CRUD system. Your contributions and feedback are always welcome!

---

**Made with ❤️ by [Muzammil](https://github.com/azurecoders/)**
