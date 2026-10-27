# QuickKart — Project Plan and Implementation Roadmap

## 1. Project Overview

**Project name:** QuickKart  
**Project type:** Blinkit-inspired quick-commerce web application  
**Primary goal:** Build a working grocery and daily-essentials shopping experience using React, Node.js, and Express, while demonstrating the topics in the Web Development viva syllabus.

QuickKart is an academic project inspired by the quick-commerce model. Use original branding, UI, copy, and assets; do not copy Blinkit's proprietary branding or claim affiliation.

## 2. Primary Objectives

- Create a responsive storefront for browsing groceries and daily essentials.
- Let users search and filter products, manage a shopping cart, and place a demo order.
- Build a Node.js/Express REST API for products and orders.
- Practice the syllabus topics in the context of real project features.
- Keep the code understandable enough to explain confidently in a viva.
- Use Git/GitHub, readable commits, validation, debugging, and documentation throughout development.

## 3. Technology Decisions

### Frontend
- React with Vite
- JavaScript (ES6+), JSX
- React hooks: `useState`, `useEffect`, and context only when useful
- React Router for page navigation
- CSS modules or organized plain CSS at first; Tailwind CSS is optional later
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- CommonJS or ES Modules: choose one convention for the server and use it consistently
- REST endpoints returning JSON
- JSON seed data for the first local prototype

### Development and quality
- Git and GitHub
- Browser DevTools and Node.js logging
- ESLint
- API testing with Postman or curl
- Automated tests for important routes and user flows when the MVP is working

### Data persistence decision
Start with seed product data and a simple development-only order store. Clearly document that in-memory order data resets when the server restarts. If persistent storage is required, add a database in a later phase. Do not treat a JSON file as a safe concurrent production database.

## 4. MVP Scope — Build These First

### Customer experience
1. Responsive home page with QuickKart branding.
2. Header/navigation with delivery-location placeholder, search, and cart count.
3. Product categories.
4. Product cards with image, name, unit, price, and add/increment/decrement controls.
5. Product search and category filtering.
6. Cart page with quantity editing, item removal, subtotal, and clear empty-cart state.
7. Checkout form with basic client-side validation.
8. Order confirmation and demo order status/history.

### Backend
1. Health-check endpoint.
2. Product list and product detail endpoints.
3. Search/category query parameters.
4. Order creation endpoint with server-side validation.
5. Order lookup/list endpoint for demo orders.
6. Consistent JSON errors and correct HTTP status codes.

### Engineering quality
- Loading, empty, and error states.
- Responsive layout for mobile and desktop.
- No broken navigation or console errors.
- `.gitignore` excludes `node_modules`, build output, logs, and secrets.
- README with setup, scripts, endpoints, limitations, and screenshots.
- No real payment processing, live GPS tracking, or claim of real delivery-time guarantees in MVP.

## 5. Suggested Repository Structure

```text
quickkart/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── products/
│   │   │   │   ├── CategoryList.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ProductGrid.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── CartSummary.jsx
│   │   │   └── common/
│   │   │       ├── Loader.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       └── EmptyState.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   └── OrdersPage.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── data/
│   │   │   └── fallbackProducts.js
│   │   ├── utils/
│   │   │   └── currency.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js
│   │   ├── data/
│   │   │   ├── products.js
│   │   │   └── ordersStore.js
│   │   ├── routes/
│   │   │   ├── healthRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   ├── notFound.js
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── validateOrder.js
│   │   └── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── API.md
│   └── VIVA_NOTES.md
├── .gitignore
├── PLAN.md
└── README.md
```

Create files incrementally when needed; do not generate every file as a large, untested batch.

## 6. Development Phases and Exit Criteria

### Phase 0 — Environment and repository
- Verify Node.js, npm, and Git.
- Create the Vite React app in `client/`.
- Create the Express server in `server/`.
- Add root `.gitignore`, scripts, and initial README.
- Make the first Git commit.

**Done when:** both frontend and backend can start, and the API health route responds.

### Phase 1 — Static React UI
- Build Navbar, category list, product card/grid, and footer.
- Use local sample product data first.
- Make the page responsive.
- Use reusable components and props.

**Done when:** product cards render consistently at mobile and desktop widths.

### Phase 2 — JavaScript and cart behavior
- Add search and category filters.
- Add cart quantity controls and item removal.
- Calculate subtotal from cart state.
- Add empty-cart and invalid-input states.
- Keep state in React; avoid direct DOM manipulation for normal UI updates.

**Done when:** a user can search products and manage a cart without refreshes.

### Phase 3 — Node.js fundamentals mapped to practice
- Study NPM and `package.json` scripts.
- Demonstrate CommonJS vs ES Modules in small isolated examples.
- Practice `fs`, `path`, buffers, streams, HTTP, events, and error handling.
- Understand the event loop and asynchronous execution.
- Use Node HTTP concepts to understand what Express abstracts.

**Done when:** the learner can explain each syllabus concept and point to a small example. Do not force every core module into production application code if it has no legitimate use.

### Phase 4 — Express REST API
- Implement `GET /api/health`.
- Implement `GET /api/products` with optional `q` and `category` filters.
- Implement `GET /api/products/:id`.
- Implement `POST /api/orders`.
- Implement `GET /api/orders/:id` and, if useful, `GET /api/orders`.
- Validate request bodies and return consistent errors/status codes.
- Add 404 and central error middleware.

**Done when:** endpoints work in Postman/curl and handle invalid inputs predictably.

### Phase 5 — React/API integration
- Add a centralized `services/api.js`.
- Load products with `fetch` and `async/await`.
- Add loading, empty, and error states.
- Use the backend as the source of truth for products.
- Submit orders to the API and show the returned order ID/status.
- Handle API failures without crashing the UI.

**Done when:** the main customer journey works through React and Express end-to-end.

### Phase 6 — Debugging, testing, and polish
- Use browser DevTools Network/Console.
- Add ESLint and fix actionable issues.
- Add API tests and basic UI-flow checks.
- Test empty cart, unavailable product, invalid checkout, server error, and mobile layout.
- Check accessibility basics: labels, semantic elements, keyboard focus, alt text.
- Verify no secrets or `node_modules` are committed.

**Done when:** the main flow passes a manual test checklist and there are no known critical errors.

### Phase 7 — Viva and documentation
- Document setup commands and environment variables.
- Document each API endpoint and example request/response.
- Add screenshots and architecture diagram.
- Prepare explanations of React state/props, event loop, promises, Fetch, modules, middleware, REST, CRUD, and status codes.
- Practice explaining one feature end-to-end.

**Done when:** a new person can run the project from the README and the student can explain the implementation.

## 7. API Contract (initial target)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Confirm API is running |
| GET | `/api/products` | List products; optional `q` and `category` filters |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/orders` | Validate and create a demo order |
| GET | `/api/orders/:id` | Get a demo order by ID |
| GET | `/api/orders` | List demo orders if useful for the project |

Use appropriate status codes, such as `200`, `201`, `400`, `404`, and `500`. Do not trust client-submitted prices or totals: the server must calculate order totals from its own product data.

## 8. Initial Product Data Shape

```json
{
  "id": "milk-001",
  "name": "Fresh Milk",
  "category": "Dairy",
  "price": 32,
  "unit": "500 ml",
  "image": "/images/milk.png",
  "inStock": true
}
```

Use original, legally usable images or placeholder assets. Avoid hotlinking unstable product image URLs.

## 9. Non-Goals for MVP

Do not build these before the core customer journey works:
- Real payment gateway
- Live GPS tracking
- Real delivery-partner operations
- Complex authentication/authorization
- Production inventory synchronization
- AI recommendations
- Microservices or premature deployment complexity

These can be future extensions if time and evaluation requirements permit.

## 10. Rules for AI-assisted implementation (Antigravity)

1. Read this `PLAN.md` before making changes.
2. Work on only one phase or small task at a time.
3. Inspect existing files before editing; preserve working code.
4. Do not overwrite the whole project or create duplicate components without a reason.
5. Explain the purpose of files and important code decisions.
6. Implement the smallest complete feature, then run checks.
7. Do not claim a feature works unless it has been run or tested.
8. Report changed files, commands run, test results, known issues, and the next recommended task.
9. Do not add dependencies without explaining why they are needed.
10. Keep the code suitable for a student viva: clear names, manageable abstractions, and no unnecessary complexity.
11. Never place API keys, passwords, or secrets in source control.
12. Do not implement payment or authentication as a fake production feature; clearly label any demo behavior.

## 11. Immediate Next Task

Start with **Phase 0 only**:
- Inspect the current workspace.
- If empty, scaffold `client/` using Vite's React template.
- Create a minimal `server/` Express app with `GET /api/health`.
- Add appropriate `.gitignore` and root README.
- Ensure frontend and backend have independent install/start scripts.
- Run both services and verify the health endpoint.
- Stop and report results before starting Phase 1.

Do not build the complete storefront in the same step. The project will be developed iteratively and checked against this plan.
