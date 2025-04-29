# 📝 Note‑Share App

A simple yet powerful web application for writing, storing and sharing notes. Built with **Vite + React + TypeScript**, styled with **Tailwind CSS** & **shadcn/ui**, and powered by **Supabase** for authentication, real‑time sync, and Postgres storage.

---

## ✨ Features

| Feature                          | Details                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Create / Edit / Delete notes** | Rich‑text Markdown editor with autosave to local cache & cloud.                                              |
| **Offline‑first**                | Works without a network connection thanks to localStorage; automatically re‑syncs when you come back online. |
| **Authentication**               | Email‑link sign‑in via Supabase.                                                                             |
| **Sharing**                      | Opt‑in share‑by‑link with configurable read/edit permissions.                                                |
| **Real‑time collaboration**      | See who’s editing and watch changes appear live (Supabase Realtime).                                         |
| **Search & filter**              | Full‑text search on titles and content.                                                                      |
| **Dark mode**                    | Respects system preference and offers a toggle.                                                              |

---

## 🏗️ Tech Stack

- **Frontend:** Vite, React 18, TypeScript 5
- **UI / Styling:** Tailwind CSS, shadcn/ui, lucide‑react icons
- **State:** React Context + useReducer (client cache), TanStack Query (remote)
- **Backend‑as‑a‑Service:** Supabase (Auth, Postgres, Storage, Realtime)
- **Testing:** Vitest + React Testing Library
- **Tooling:** pnpm, ESLint, Prettier, Husky, GitHub Actions CI

---

## 📂 Project Structure

```
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI pieces (Button, NoteCard …)
│   ├── features/
│   │   └── notes/     # Note CRUD hooks, context & pages
│   ├── integrations/
│   │   └── supabase/  # Supabase client & helpers
│   ├── routes/        # Route definitions (React‑Router v6)
│   ├── App.tsx        # App shell
│   └── main.tsx       # Entry point
├── .github/workflows/ # CI definition
├── .env.example       # Sample env vars
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone & install

```bash
pnpm install
```

### 2. Configure environment variables

Copy the template and add your own Supabase project keys:

```bash
cp .env.example .env
```

```ini
VITE_SUPABASE_URL=<your‑project‑url>
VITE_SUPABASE_ANON_KEY=<your‑anon‑public‑key>
```

> **Tip:** Never commit your real keys—`/.env*` is already ignored by Git.

### 3. Run in development

```bash
pnpm dev
```

The app will be served at `http://localhost:5173`.

### 4. Test

```bash
pnpm test
```

### 5. Build for production

```bash
pnpm build
```

Static files go to `dist/` (ready to deploy on Netlify, Vercel, Supabase Storage, etc.).

---

## 🗄️ Supabase Setup

1. **Create a new project** at <https://app.supabase.com>.
2. **Notes table** (`notes`):

   | column      | type        | constraints                     |
   | ----------- | ----------- | ------------------------------- |
   | id          | uuid        | PK, default `gen_random_uuid()` |
   | user_id     | uuid        | FK → auth.users.id              |
   | title       | text        | not null                        |
   | content     | text        | not null                        |
   | updated_at  | timestamptz | default `now()`, index          |

3. **Row‑Level Security**: enable and add policies so that users can only read/write their own rows.
4. **Storage bucket** (optional) for image uploads.

Full SQL migration scripts live in `supabase/migrations`.

---

## 🧪 Testing philosophy

- **Unit:** Pure functions & utilities.
- **Component:** Render and user‑interaction tests with Testing Library.
- **E2E (roadmap):** Playwright to verify critical flows (login → create → share).

Run the suite with `pnpm test` (watch mode by default).

---

## 🤝 Contributing

1. Fork the repo & create a new branch: `git checkout -b feature/my‑feature`.
2. Commit your changes following Conventional Commits.
3. Push & open a Pull Request.
4. All PRs run the CI pipeline (lint, type‑check, unit tests).

Need help setting up Supabase locally? Open an issue and we’ll sort it out. 💬


---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> Built with ❤️ by Valentina Samboni.
