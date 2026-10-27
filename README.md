# QuickKart 🛒

QuickKart is a student quick-commerce web application inspired by the Blinkit business model. It provides a grocery and daily-essentials shopping experience built with a React (Vite) frontend and a Node.js + Express backend.

> **Academic Project Note:** QuickKart uses original branding, UI, and placeholder assets. It is designed for educational purposes and Web Development viva demonstrations.

---

## Tech Stack

- **Frontend (`client/`):** React 19, Vite, Tailwind CSS v4, JavaScript (ES6+ / JSX)
- **Backend (`server/`):** Node.js v24, Express, ES Modules (`import`/`export`), CORS, Dotenv
- **API Standard:** RESTful JSON endpoints
- **Testing & Quality:** ESLint, Node smoke tests, Fetch API

---

## Repository Structure

```text
QuickCart/
├── client/                 # React frontend application (Vite + Tailwind CSS)
│   ├── public/             # Static public assets
│   ├── src/                # React source code (components, pages, styles)
│   ├── package.json        # Frontend scripts and dependencies
│   └── vite.config.js      # Vite build configuration
├── server/                 # Express REST API backend (ES Modules)
│   ├── src/
│   │   ├── config/         # Environment configuration
│   │   ├── middleware/     # 404 and central error handling middleware
│   │   ├── routes/         # Express API route modules
│   │   └── app.js          # Express app configuration & middleware pipeline
│   ├── smokeTest.js        # Automated API health smoke test
│   ├── server.js           # Server entry point
│   ├── .env.example        # Environment variables template
│   └── package.json        # Backend scripts and dependencies
├── PLAN.md                 # Project implementation roadmap and viva syllabus mapping
├── AGENTS.md               # AI coding guidelines and boundaries
├── .gitignore              # Git exclusions for dependencies, builds, and secrets
└── README.md               # Project documentation and quickstart guide
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18 or newer recommended, tested on v24)
- **npm** (v9 or newer)
- **Git**

### Installation

Install dependencies for both frontend and backend:

```bash
# Option 1: Using root convenience script
npm run install:all

# Option 2: Independent installation
cd client && npm install
cd ../server && npm install
```

---

## Running the Application

### 1. Start the Backend API
```bash
cd server
npm run dev
```
The server will start at `http://localhost:5000`.  
Verify API health: `GET http://localhost:5000/api/health`

### 2. Start the Frontend Dev Server
```bash
cd client
npm run dev
```
The client will start at `http://localhost:5173`.

---

## Verification & Tests

- **Run Server Smoke Test:**
  ```bash
  cd server && npm test
  ```
- **Lint Frontend Code:**
  ```bash
  cd client && npm run lint
  ```
- **Build Frontend for Production:**
  ```bash
  cd client && npm run build
  ```

---

## Implementation Roadmap (Phases)

- [x] **Phase 0 — Environment and Repository Setup** *(Completed)*
- [ ] **Phase 1 — Static React UI** (Storefront layout, product cards, categories, responsive design)
- [ ] **Phase 2 — JavaScript & Cart Behavior** (Search, category filtering, cart state, subtotal)
- [ ] **Phase 3 — Node.js Fundamentals** (Viva-focused core module demonstrations)
- [ ] **Phase 4 — Express REST API** (Product listing, filtering, order placement with server validation)
- [ ] **Phase 5 — React / API Integration** (Full client-server data flow via Fetch API)
- [ ] **Phase 6 — Debugging, Testing & Polish** (Accessibility, error states, cross-device responsiveness)
- [ ] **Phase 7 — Viva Notes & Documentation** (Viva interview defense preparation and API docs)
