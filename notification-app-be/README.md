# Notification App — Backend

Express.js backend for the campus notification platform.

## Endpoints

| Method | Route                       | Description                     |
|--------|-----------------------------|---------------------------------|
| GET    | /api/notifications/priority | Get top N priority notifications |

## Setup

```bash
npm install
node index.js
```

Server runs on `http://localhost:5000`.

## Notes

- All logging uses the shared `logging-middleware/logger.js` — no `console.log` allowed.
- Notifications are fetched from the evaluation service API using a Bearer token.
- Priority is determined by type weight: Placement > Result > Event, then by recency.
