# Library Service Requests – Activity 7 (Backend)

Node.js + Express + PostgreSQL REST API (CommonJS). Routes: `GET /`, `GET /health`, `GET/POST /api/records`, `GET/PUT/DELETE /api/records/:id`.

## Files
| File | Purpose |
|---|---|
| `server.js` | Express app, API guide page (`GET /`), health route, error handlers. **Edit the 3 lines at the top** |
| `routes/records.js` | The five record routes with validation |
| `db.js` | Database connection pool |
| `schema.sql` / `seed.sql` | Creates the table / adds 9 made-up records once |
| `setup-db.js` | Runs both SQL files: `npm run setup-db` |
| `.env` | Local settings (never upload to GitHub) |
| `postman_collection.json` | Import into Postman to run all tests |

## Run locally
1. Edit `.env`: paste your Render **External Database URL** after `DATABASE_URL=`.
2. Edit the 3 lines at the top of `server.js` (project name, your name, student number).
3. In a terminal inside this folder:
```
npm install
npm run setup-db
npm start
```
4. Open http://localhost:3000 (guide) and http://localhost:3000/health.
On Windows PowerShell, if `npm` is blocked, use `npm.cmd` instead.

## Settings to change later
| Setting | Where | Value |
|---|---|---|
| `DATABASE_URL` | `.env` (local) and Render Environment (hosted) | External URL locally. **Internal** URL on Render |
| `CLIENT_ORIGINS` | `.env` and Render Environment | Your frontend links, comma separated, no trailing `/`, e.g. `https://libraryhelp-desk.netlify.app` |

## Deploy
Upload these files to a GitHub repository (include `package.json` and `package-lock.json`; exclude `node_modules` and `.env`), then create a Render Web Service: Build `npm install`, Start `npm start`, plus the two environment variables above.
