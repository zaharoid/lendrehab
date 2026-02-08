# LendRehab

**Modern Rehabilitation Equipment Lending Platform**

A full-stack web application for managing the lending of rehabilitation medical devices. Citizens can browse available equipment and submit reservation requests, while staff members can manage inventory and process requests.

**[Live Demo](https://lendrehab.vercel.app)**

---

## Features

- **Browse and Filter Devices** — Search rehabilitation equipment by category, availability, and keywords
- **Device Details** — View comprehensive information including specifications and availability status
- **Submit Reservations** — Request equipment with optional medical referral file upload
- **Staff Authentication** — Secure login with Bearer token for administrative access
- **Device Management** — Full CRUD operations for staff to manage equipment inventory
- **Reservation Processing** — Staff can approve or decline reservation requests
- **Analytics Dashboard** — Visual statistics with interactive Chart.js graphs
- **Interactive API Docs** — Built-in Swagger UI for exploring the REST API

---

## Tech Highlights

| Feature | Implementation |
|---------|---------------|
| **Server-Side Rendering** | Nuxt 3 SSR with Nitro server engine |
| **Authentication** | Bearer token auth with protected API endpoints |
| **Database** | PostgreSQL with Prisma ORM (type-safe queries) |
| **API Specification** | OpenAPI 3.0 with Swagger UI documentation |
| **Validation** | Joi schema validation on all endpoints |
| **File Uploads** | Multipart form handling for referral documents |

---

## Run Locally

### Prerequisites

- **Node.js** 18.x or higher
- **PostgreSQL** database (or use [Neon](https://neon.tech), [Supabase](https://supabase.com))

### Quick Start

```bash
# Clone and install
git clone https://github.com/zaharoid/lendrehab.git
cd lendrehab
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### .env.example

```env
DATABASE_URL=postgresql://user:password@localhost:5432/lendrehab
STAFF_EMAIL=staff@example.com
STAFF_PASSWORD=your-secure-password
STAFF_TOKEN=your-secret-token
```

---

## API Documentation

Interactive API documentation is available at `/docs` when running the application.

### Key Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/devices` | List all devices | No |
| `GET` | `/api/devices/:id` | Get device details | No |
| `POST` | `/api/devices` | Create a new device | Yes |
| `PATCH` | `/api/devices/:id` | Update a device | Yes |
| `DELETE` | `/api/devices/:id` | Delete a device | Yes |
| `GET` | `/api/reservations` | List all reservations | Yes |
| `POST` | `/api/reservations` | Create a reservation | No |
| `PATCH` | `/api/reservations/:id/status` | Update reservation status | Yes |
| `POST` | `/api/auth/login` | Staff authentication | No |

> **Yes** = Requires `Authorization: Bearer <token>` header

---

## License

This project is developed for educational purposes as part of a university web systems course.
