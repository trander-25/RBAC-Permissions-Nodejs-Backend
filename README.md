# RBAC Permissions Node.js Backend

A robust Node.js backend implementing Role-Based Access Control (RBAC) across multiple levels of complexity. This project demonstrates different approaches to RBAC, from basic single-role enforcement to hierarchical multi-role permissions, suitable for various real-world applications.

---

## Table of Contents
- [Features](#features)
- [RBAC Levels](#rbac-levels)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- **Three RBAC Implementations:**  
  - Level 1: Single role per user.
  - Level 2: Permission-based roles.
  - Level 3: Multiple roles per user with hierarchical inheritance.
- JWT authentication middleware.
- Modular route and middleware structure.
- Example APIs protected at different RBAC levels.
- Mocked role/permission databases for demonstration.
- ES6+ syntax with Babel transpilation.

---

## RBAC Levels

### Level 1: Single Role Per User
Each user is assigned a single role (e.g., Admin, Moderator). Access to routes is controlled by checking if the user's role matches allowed roles.

### Level 2: Permission-Based Roles
Roles are defined by a set of permissions. The middleware verifies that a user’s role includes all required permissions for the requested action.

### Level 3: Multiple Roles & Hierarchical Inheritance
Users can have multiple roles. Each role may inherit permissions from others, supporting complex enterprise scenarios. Access is granted if a user’s cumulative permissions satisfy the required permissions.

---

## Technology Stack

- **Node.js** (>=20.x)
- **Express.js**
- **JWT (jsonwebtoken)**
- **Babel** (for ES6+ compatibility)
- **ESLint** (code quality)
- **Nodemon** (development)
- **http-status-codes** (standard status responses)
- **cookie-parser**, **cors**

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/trander-25/RBAC-Permissions-Nodejs-Backend.git
   cd RBAC-Permissions-Nodejs-Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm run production
   ```

---

## Usage

- APIs are located under `/src/routes/v1/`.
- Authentication is handled via JWT; ensure the `authMiddleware` is applied.
- To protect a route, use the appropriate RBAC middleware:
  ```js
  rbacMiddleware_Level_1.isValidPermission(['ADMIN'])
  rbacMiddleware_Level_2.isValidPermission(['read_messages'])
  rbacMiddleware_Level_3.isValidPermission(['read_messages'])
  ```
- Example protected routes:
  - `/messages`: Requires `read_messages` permission.
  - `/admin-tools`: Requires `read_admin_tools` permission.

---

## Scripts

- `npm run dev` — Start development server with auto-reload.
- `npm run build` — Transpile code to `/build`.
- `npm run production` — Run production build.
- `npm run lint` — Lint source code.

---

## Project Structure

```
src/
  middlewares/
    rbacMiddleware-Level-1.js
    rbacMiddleware-Level-2.js
    rbacMiddleware-Level-3.js
    authMiddleware.js
  models/
    mockDatabase-Level-1.js
    mockDatabase-Level-2.js
    mockDatabase-Level-3.js
  routes/
    v1/
      dashboardRoute.js
  controllers/
    dashboardController.js
  utils/
    rbacUtils.js
  server.js
package.json
```

---

## License

This project does not currently specify a license.

---

> **Note:** This README is based on the latest available code and may not cover all repository files. For details, visit the [GitHub repository](https://github.com/trander-25/RBAC-Permissions-Nodejs-Backend).
