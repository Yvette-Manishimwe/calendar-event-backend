##  Backend (calendar-event-backend)

# Calendar Event – Backend

A **NestJS + TypeORM** REST API for managing events, bookings, and users.  
This is the backend for the [frontend app](https://github.com/Yvette-Manishimwe/calendar-event).


## Setup Instructions

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/Yvette-Manishimwe/calendar-event-backend.git
cd calendar-event-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env   # Update DB credentials

# Run migrations (if any)
npm run migration:run

# Start development server
npm run start:dev

##**Tech Choices**

NestJS → Scalable TypeScript backend framework.

TypeORM → ORM for PostgreSQL with entity mapping.

PostgreSQL → Relational DB for events, bookings, users.

JWT Auth + Guards → Authentication & role-based authorization.

Class-Validator + DTOs → Data validation.

## **Architecture Decisions**

Entities & Relations

User ←→ Booking ←→ Event

Bookings include status (pending, confirmed, cancelled) for history.

Role-based Access Control

Users: book & cancel

Admins: manage events, approve bookings

Soft Delete (status change)

Cancelled bookings are marked as cancelled, not deleted, for audit purposes.

Guards & Decorators

AuthGuard for JWT validation

@Roles('ADMIN') decorator for restricting routes
