# DriveNow

A monorepo project for the DriveNow startup, built with Node.js and npm workspaces.

## Project Structure

- `apps/`: Frontend applications
  - `admin-web/`: Admin web interface
  - `driver-app/`: Driver mobile app
  - `hirer-app/`: Hirer mobile app
- `backend/`: Backend services
  - `packages/shared/`: Shared backend packages
  - `services/`: Microservices
    - `admin-service/`
    - `auth-service/`
    - `booking-service/`
    - `location-service/`
    - `notification-service/`
    - `payment-service/`
- `packages/`: Shared packages
- `docs/`: Documentation

## Getting Started

1. Install dependencies: `npm install`
2. Build the project: `npm run build` (if scripts are added)
3. Run services as needed

## Workspaces

This project uses npm workspaces to manage multiple packages. The workspaces are configured in the root `package.json`.