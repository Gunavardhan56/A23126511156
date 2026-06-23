# Stage 1

## Core API Endpoints

**GET /api/notifications**
Headers: `Authorization: Bearer <token>`
Query params: `page`, `limit`, `notification_type`

Response:
```json
{
  "notifications": [
    { "ID": "uuid", "Type": "Placement", "Message": "Amazon Hiring", "Timestamp": "2026-04-22 17:51:30" }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

---

**GET /api/notifications/:id**
Headers: `Authorization: Bearer <token>`

Response:
```json
{ "ID": "uuid", "Type": "Result", "Message": "mid-sem", "Timestamp": "2026-04-22 17:51:30" }
```

---

**PATCH /api/notifications/:id/read**
Headers: `Authorization: Bearer <token>`

Response: `{ "success": true }`

---

**PATCH /api/notifications/read-all**
Headers: `Authorization: Bearer <token>`

Response: `{ "success": true }`

---

**GET /api/notifications/unread-count**
Headers: `Authorization: Bearer <token>`

Response: `{ "count": 12 }`

---

**GET /api/notifications/priority?limit=10**
Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "notifications": [
    { "ID": "uuid", "Type": "Placement", "Message": "CSX Corporation hiring", "Timestamp": "2026-04-22 17:51:18" }
  ]
}
```

---

## Real-Time Mechanism

Using **Server-Sent Events (SSE)**. Client opens a persistent connection to `GET /api/notifications/stream`. Server pushes events when new notifications arrive. Chosen over WebSockets because notifications are server → client only. SSE is simpler, uses plain HTTP, and auto-reconnects.

---

# Stage 2

## Database: PostgreSQL

Chosen because notifications have a fixed schema, we need indexed queries, and ACID guarantees ensure no notification is lost or duplicated. NoSQL isn't needed here since schema flexibility isn't required.

## Schema

```sql
CREATE TYPE notification_type AS ENUM ('Placement', 'Result', 'Event');

CREATE TABLE students (
  id    INT PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id INT NOT NULL REFERENCES students(id),
  type       notification_type NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Scaling Problems and Solutions

As data grows to 5M+ rows: full table scans get slow, `SELECT *` wastes memory, single table becomes a bottleneck.

Fixes:
- Add composite index on `(student_id, is_read, created_at)`
- Partition table by month on `created_at`
- Archive notifications older than 6 months

## Queries

Fetch paginated:
```sql
SELECT id, type, message, is_read, created_at FROM notifications
WHERE student_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;
```

Filter by type:
```sql
SELECT id, type, message, created_at FROM notifications
WHERE student_id = $1 AND type = $2 ORDER BY created_at DESC LIMIT $3 OFFSET $4;
```

Mark as read: `UPDATE notifications SET is_read = TRUE WHERE id = $1;`

Mark all read: `UPDATE notifications SET is_read = TRUE WHERE student_id = $1;`

Unread count: `SELECT COUNT(*) FROM notifications WHERE student_id = $1 AND is_read = FALSE;`
