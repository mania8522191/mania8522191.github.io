-- The message board's tables (worker/src/index.js). Made with
--   npx wrangler d1 execute board --remote --file schema.sql   (--local: the copy `npm run dev` uses)
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  at INTEGER NOT NULL,            -- when it was sent (ms since 1970)
  name TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  lang TEXT NOT NULL DEFAULT 'zh',
  state TEXT NOT NULL,            -- 'wait': waiting for review; 'shown': accepted, on the board
  shown_at INTEGER,
  reply TEXT,                     -- the owner's reply
  reply_at INTEGER
);
CREATE INDEX IF NOT EXISTS posts_state_at ON posts (state, at);

CREATE TABLE IF NOT EXISTS pics (
  id TEXT PRIMARY KEY,            -- in KV: <id>/o as sent, <id>/s the small copy for the board
  post TEXT NOT NULL,
  who TEXT NOT NULL,              -- 'guest': the visitor's; 'reply': the owner's
  n INTEGER NOT NULL,             -- its place among them
  type TEXT NOT NULL, w INTEGER NOT NULL, h INTEGER NOT NULL,      -- as sent
  stype TEXT NOT NULL, sw INTEGER NOT NULL, sh INTEGER NOT NULL    -- the small copy
);
CREATE INDEX IF NOT EXISTS pics_post ON pics (post);

-- recent posts and wrong passwords by address (hashed), to slow down floods; kept two days
CREATE TABLE IF NOT EXISTS hits (ip TEXT NOT NULL, kind TEXT NOT NULL, at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS hits_ip ON hits (ip, kind, at);
