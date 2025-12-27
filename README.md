# LendRehab – Web Systems Laboratory Project

LendRehab is a prototype web system for managing the lending of rehabilitation devices.
It was developed as part of a university laboratory assignment for web systems.

The system allows citizens to request rehabilitation devices and staff members to manage devices and reservations.

---

## Features

### Public
- View available rehabilitation devices
- View device details
- Submit a reservation request
- Upload an optional referral file

### Staff
- Authentication via login endpoint
- Create, edit and delete devices
- View all reservations
- Approve or decline reservation requests
- Protected API endpoints using Bearer token

---

## Tech Stack

- **Frontend**: Nuxt 3 (Vue 3, Composition API)
- **Backend**: Nitro / h3 (Nuxt server API)
- **Database**: Prisma ORM
- **Validation**: Joi
- **Styling**: Tailwind CSS
- **API Documentation**: OpenAPI (YAML)

---

## Project Structure



# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
