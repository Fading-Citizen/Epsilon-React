# Epsilon Academy - React Application

A modern educational platform built with React, Vite, and styled-components.

## 🚀 Live Preview

The application is automatically deployed to GitHub Pages at: **https://fading-citizen.github.io/Epsilon-React/**

## 📋 Features

- **Student Dashboard**: View courses, take simulacros, manage profile
- **Teacher Dashboard**: Create courses, manage students, build quizzes and evaluations
- **Admin Panel**: Comprehensive system administration
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Profile Management**: Complete student profile system with photo upload, personal info, and settings

## 🛠️ Development

### Prerequisites
- Node.js 20.x or higher
- npm

### Local Development
```bash
cd epsilon-academy
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

### Manual Deployment to GitHub Pages
```bash
npm run deploy
```

## 🔄 Automatic Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

### Deployment Process:
1. Push changes to the `main` branch
2. GitHub Actions automatically builds the project
3. Built files are deployed to the `gh-pages` branch
4. Changes are live at the GitHub Pages URL within a few minutes

## 📁 Project Structure

```
epsilon-academy/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel components
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Shared components
│   │   ├── student/        # Student dashboard components
│   │   └── teacher/        # Teacher dashboard components
│   ├── themes/             # Theme context and colors
│   ├── utils/              # Utility functions
│   └── pages/              # Route components
├── public/
│   └── assets/
│       └── images/         # Logo and image assets
└── dist/                   # Built files (generated)
```

## 🎨 Key Components

### Student Features
- **Dashboard**: Overview of courses and progress
- **Oferta Académica**: Browse available courses
- **Mis Cursos**: Manage enrolled courses
- **Simulacros**: Take practice evaluations
- **Profile**: Complete profile management system

### Teacher Features
- **Course Management**: Create and edit courses
- **Student Management**: View and manage student progress
- **Quiz Builder**: Create quizzes, exams, and simulacros
- **Group Management**: Organize students into groups
- **Statistics**: View performance analytics

### Admin Features
- **User Management**: Manage all users
- **Course Administration**: Oversee all courses
- **System Settings**: Configure platform settings

## 🔧 Configuration

### GitHub Pages Setup
The application is configured for GitHub Pages deployment with:
- Base path: `/Epsilon-React/`
- Asset path resolution for production
- Automatic deployment via GitHub Actions

### Environment Variables
- `VITE_BASE_URL`: Base URL for the application (auto-configured)
- Theme settings are managed via React Context

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Client Preview

This deployment serves as a client preview showcasing:
- Modern educational platform interface
- Complete user management system
- Course and evaluation management
- Responsive design across all devices
- Dark/light theme functionality
- Comprehensive profile management

Perfect for demonstrating the platform's capabilities to stakeholders and getting feedback before production deployment.
