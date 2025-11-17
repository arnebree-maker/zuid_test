# Sint-Rembert Portaal - Digitale Didactiek

## Overview
This is the Sint-Rembert educational portal for ICT and AI support in education. The portal provides teachers and staff with quick access to support resources, AI tools, and educational guidance.

**Project Type:** React Single Page Application (SPA)  
**Framework:** Create React App  
**Styling:** Tailwind CSS  
**Current Status:** Running in development mode on Replit

## Purpose
The portal serves as a central hub for:
- ICT support via chatbot and ticketing system
- AI tools and resources for classroom use
- Educational examples and best practices
- Team contact information and resources

## Project Architecture

### Tech Stack
- **React 19.2.0** - Frontend framework
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Create React App** - Build tooling and development server

### Directory Structure
```
/
├── public/              # Static assets
│   ├── media/          # Images and videos
│   └── index.html      # HTML template
├── src/                # React source code
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── .env                # Environment configuration (PORT=5000, HOST=0.0.0.0)
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Dependencies and scripts
```

### Key Features
1. **Responsive Design** - Mobile-first design with gradient backgrounds
2. **AI Tools Section** - Quick links to ChatGPT, Gemini, NotebookLM, etc.
3. **Support Resources** - Chatbot Zuid integration and TopDesk ticketing
4. **Educational Examples** - Modal with NotebookLM and Lovable use cases
5. **Team Information** - Technical and pedagogical team contacts

## Development

### Environment Configuration
The app is configured to run on **port 5000** (required for Replit webview) with host checking disabled to work with Replit's proxy system.

Environment variables in `.env`:
- `PORT=5000` - Development server port
- `HOST=0.0.0.0` - Bind to all network interfaces
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Allow proxy connections
- `WDS_SOCKET_PORT=0` - WebSocket configuration for HMR

### Running the Application
The "React Dev Server" workflow automatically runs `npm start` which:
1. Starts the webpack dev server on port 5000
2. Enables hot module replacement (HMR)
3. Serves the application through Replit's webview

### Available Scripts
- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## Deployment
This application can be published using Replit's deployment feature. The deployment will use a production build of the React application.

## Teams
**Technical Team:** Mieke Verbeerst, Barbara Van Hecke, Arne Breemeersch  
**Pedagogical Team:** Jasper Gerits, Glenn Van de Voorde

## External Links
- Chatbot Zuid: https://chatgpt.com/g/g-68ee3d6afa348191a579bac4aa7c14da-ict-zuid
- TopDesk Support: https://sint-rembert.topdesk.net/
- Shared Ideas Drive: https://drive.google.com/drive/folders/12hkdkdgrNgK8W3b5qXjJvcPaKsinLEuj

## Recent Changes
- **November 17, 2024**: Initial Replit setup
  - Configured dev server for port 5000 with host checking disabled
  - Updated HTML meta tags and title
  - Set up workflow for React Dev Server
  - Created project documentation
