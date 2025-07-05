# Creative Designer Portfolio

## Overview

This is a modern, full-stack React application built for showcasing a creative designer's portfolio. The application features a stunning frontend with smooth animations, responsive design, and professional presentation of design work. The backend is structured to support future user management and content administration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and developer experience
- **Styling**: Tailwind CSS with a custom design system based on shadcn/ui components
- **Animations**: GSAP (GreenSock) for professional-grade animations and smooth transitions
- **State Management**: React Query for server state management and built-in React hooks for local state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Build Tool**: Vite for development and production builds
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development**: Full-stack development environment with hot reloading

## Key Components

### Frontend Components
1. **Hero Section**: Eye-catching landing area with animated text and call-to-action buttons
2. **Navigation**: Responsive navigation with smooth scroll tracking and mobile menu
3. **Projects Section**: Portfolio showcase with project cards and filtering capabilities
4. **About Section**: Professional background with skill visualizations
5. **Contact Section**: Contact form with validation and social media links
6. **Theme System**: Dark/light mode toggle with smooth transitions

### UI Component Library
- Comprehensive component library based on Radix UI primitives
- Consistent design tokens through CSS custom properties
- Accessible components following ARIA guidelines
- Responsive design patterns for all screen sizes

### Animation System
- GSAP-powered animations for scroll-triggered effects
- Custom hooks for animation management
- Performance-optimized animations with proper cleanup
- Smooth page transitions and micro-interactions

## Data Flow

1. **Static Content**: Portfolio content is currently hardcoded but structured for easy migration to a CMS
2. **User Interactions**: Form submissions and navigation are handled client-side with plans for server integration
3. **Theme Management**: Theme preferences are persisted in localStorage with system preference detection

## External Dependencies

### Core Dependencies
- React ecosystem (React, React DOM, React Query)
- Styling: Tailwind CSS, class-variance-authority, clsx
- Animation: GSAP with ScrollTrigger and TextPlugin
- UI Components: Radix UI primitives
- Forms: React Hook Form with Zod validation
- Database: Drizzle ORM with Neon Database serverless driver

### Development Tools
- TypeScript for static type checking
- Vite for fast development and optimized builds
- ESBuild for production server bundling
- PostCSS for CSS processing

## Deployment Strategy

### Development
- Vite development server with hot module replacement
- Concurrent frontend and backend development
- Environment-based configuration

### Production
- Static asset generation through Vite build process
- Express server bundled with ESBuild
- Database migrations through Drizzle Kit
- Environment variable configuration for database connections

The application is designed to be deployed on platforms like Replit, Vercel, or traditional hosting providers with minimal configuration changes.

## Changelog
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.