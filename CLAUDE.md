# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3-based speedrun leaderboard application for Sub3 Seeds Speedrun, designed as an SRC-like website. The application uses Discord OAuth for authentication and PostgreSQL (via Neon) for data storage.

## Common Commands

```bash
# Development
pnpm dev              # Start development server on http://localhost:3000
pnpm install          # Install dependencies

# Production
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm generate         # Generate static site

# Package management
pnpm add <package>    # Add dependency
```

## Architecture Overview

### Directory Structure
- `app/` - Main application code (Nuxt 3 app directory)
  - `pages/` - Vue pages/routes
  - `layouts/` - Layout components
  - `middleware/` - Route middleware (including global auth middleware)
  - `plugins/` - Vue/Nuxt plugins (Vuetify setup)
  - `assets/` - SCSS styles and static assets
- `server/` - Server-side API routes
  - `api/auth/` - Discord OAuth authentication endpoints
  - `api/db/` - Database API endpoints
- `shared/` - Shared utilities
  - `utils/auth-utils.ts` - Discord role-based authentication utilities

### Key Technologies
- **Frontend**: Nuxt 3, Vue 3, Vuetify 3 (Material Design)
- **Backend**: Nuxt server API routes, Neon PostgreSQL
- **Authentication**: nuxt-auth-utils with Discord OAuth
- **Styling**: SCSS, Vuetify components
- **Package Manager**: pnpm (required - specified in packageManager field)

### Authentication System
- Discord OAuth integration via nuxt-auth-utils
- Role-based authorization using Discord roles (VERIFIER_ROLE, RUNNER_ROLE)
- Auth utilities in `shared/utils/auth-utils.ts` handle role checking
- Global auth middleware at `app/middleware/auth.global.ts`

### Database Schema
According to REQUIREMENTS.md, uses PostgreSQL with tables for:
- Seeds (ID, SEED, NAME, VERSION, STATUS)
- Records/Times (ID, AUTHOR, TIME, COMMENTS, SEED_ID, VOD, IS_FASTEST, STATUS, VERIFIER, timestamps)

### Configuration
- Uses SPA mode (ssr: false) in nuxt.config.ts
- Vuetify configured as Vite plugin with auto-import
- Database connection via NUXT_DATABASE_URL environment variable
- Font Awesome icons integrated

### Development Notes
- Uses TypeScript throughout
- Vuetify styles handled via CSS imports and plugin configuration
- Asset transforms configured for Vuetify compatibility
- No test framework currently configured