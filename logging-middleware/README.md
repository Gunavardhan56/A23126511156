# Logging Middleware

A shared logging utility used across the notification platform (backend and frontend).

## Usage

```js
const Log = require('./logger');

await Log(stack, level, package, message);
```

## Parameters

| Param   | Description                            | Example          |
|---------|----------------------------------------|------------------|
| stack   | Layer where the log originates         | `"backend"`      |
| level   | Severity level                         | `"info"` / `"error"` |
| package | Module or file name                    | `"service"`      |
| message | Human-readable description of the event | `"Fetched notifications"` |

## Notes

- Uses `console.log` is **not allowed** anywhere in the project — use this logger instead.
- All logs are sent to the evaluation service API via HTTP POST with the Bearer token.
