# PetLove is a full-stack pet adoption and discovery platform built with React and TypeScript, featuring authentication, advanced pet search and filtering, favourites, viewed pets, profile management, responsive design and a REST API integration.

# 🐾 PetLove — Frontend

**PetLove is a modern, responsive pet adoption and discovery platform built with React and TypeScript.** The application provides a polished, user-friendly experience for discovering pets, filtering and searching listings, saving favourites, managing viewed pets, and creating and managing personal pet profiles.

This project was built as a full-stack application, with a dedicated REST API and database-backed authentication, giving me the opportunity to work across both frontend and backend development and build the application as a complete production-style product rather than simply a static interface.

## ✨ Features

- 🔐 **Authentication & protected routes** — registration, login, logout and authenticated user areas
- 🐶 **Pet discovery** — browse available pets with detailed information and responsive pet cards
- 🔎 **Advanced filtering & search** — filter by category, species, gender and location, with debounced search
- 📍 **Location filtering** — searchable city selection using asynchronous React Select options
- ↕️ **Sorting & pagination** — sort listings by popularity, price and other criteria while navigating through paginated results
- ❤️ **Favourite pets** — add and remove pets from a personal favourites collection
- 👀 **Recently viewed pets** — keep track of pets the user has viewed
- 🐾 **Personal pets** — authenticated users can add, view and delete their own pets
- 🖼️ **Image uploads** — user and pet avatars with client-side validation and image previews
- 👤 **Profile management** — edit personal information and update profile photos
- 📰 **News section** — searchable and paginated news content
- 📱 **Responsive design** — carefully adapted layouts and interactions for mobile, tablet and desktop
- ⚡ **Loading & error states** — loaders, error messages and toast notifications provide clear feedback throughout the application
- 🧩 **Reusable UI components** — buttons, modals, cards, forms, icons, pagination, search and other components are designed for reuse across the application

## 🛠️ Technologies

**Frontend**

- React
- TypeScript
- React Router
- TanStack Query / React Query
- React Hook Form
- Yup
- Axios
- React Select
- Zustand
- CSS Modules
- Vite

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Cloudinary

## 🧠 What I Practised

PetLove was a particularly valuable project because it required much more than building individual pages. I worked on the architecture and interaction between the frontend, backend, authentication layer and database.

Throughout the project I worked with:

- Type-safe API functions and response models
- REST API integration
- Server-side filtering, searching, sorting and pagination
- Authentication and protected application areas
- Global user state management
- Server-state management with TanStack Query
- Query invalidation and cache synchronisation
- Mutations and optimistic-feeling UI updates
- Form handling and schema validation
- Controlled and reusable form components
- Debounced search
- Asynchronous select inputs
- File uploads using `FormData`
- Cloudinary image storage
- Responsive and reusable component architecture
- Error handling and user feedback
- CORS and production deployment
- Environment configuration
- Debugging TypeScript and production build errors

## 🎨 User Experience

A major focus of PetLove was making the application feel like a **real product rather than a collection of pages**.

Interactions are designed to be intuitive and provide immediate feedback. Filters update the results naturally, search is debounced to avoid unnecessary requests, forms provide validation feedback, loading and error states are handled explicitly, and destructive actions are confirmed where appropriate.

The interface is fully responsive and designed around the user's journey through the application, making it easy to discover pets, inspect their details, save interesting listings and manage their own profile.

## 🚀 Deployment

The frontend is deployed with **Vercel**, while the backend is deployed separately and communicates with the React application through a REST API.

This project gave me experience taking a React/TypeScript application from development through to a deployed, working full-stack product.

---

### 💡 About the Project

PetLove represents a significant step beyond simple frontend exercises. It combines **UI development, application architecture, state management, asynchronous data fetching, form validation, authentication, API integration, database-backed functionality and deployment** into one cohesive application.

The goal was not only to make the website look good, but to make it **usable, maintainable, responsive and technically robust** while keeping the experience simple and enjoyable for the user.
