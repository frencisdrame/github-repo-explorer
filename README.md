# GitHub Repo Explorer (Angular)

A modern Angular app to explore GitHub repositories and commits.  
It includes:

- 🔍 Search for repositories or issues by keyword  
- 📋 View repositories and explore their commits  
- 🧭 Filter results (Repositories / Issues)  
- 💡 Standalone components, Signals, PrimeNG, and modern Angular patterns  
- ⚙️ DevContainer support for consistent local development  

---

## 🚀 Getting Started

### Option 1 – Use VS Code with Dev Container (Recommended)

1. Make sure you have:
   - [Docker](https://www.docker.com/)
   - [Visual Studio Code](https://code.visualstudio.com/)
   - The **Dev Containers** extension installed from the VS Code marketplace

2. Clone the project:

   ```bash
   git clone https://github.com/frencisdrame/github-repo-explorer.git
   cd github-repo-explorer
   ```

3. Open the folder in VS Code:

Launch Visual Studio Code

Go to File > Open Folder... and select the cloned github-repo-explorer folder

When prompted by VS Code, click “Reopen in Container”
(or press F1 and run: Dev Containers: Reopen in Container)

⚠️ The first time, this step might take a few minutes as it downloads and builds the container.

4. Run the app:

   ```bash
   npm install
   npm start
   ```

---

### 🛡️ GitHub Token Setup

To authenticate GitHub API requests and avoid rate limiting, create a personal access token:

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a fine-grained token with `public_repo` access
3. Copy the token and use it in the app configuration

#### ✅ Environment configuration

This project uses Angular’s built-in `environment.ts` system.  
Create a file:

```bash
src/environments/environment.local.ts
```

With the following content:

```ts
export const environment = {
  production: false,
  githubToken: 'your_github_token_here'
};
```

> ✅ This file is already referenced in `angular.json` via `fileReplacements`, so it will override `environment.ts` in development mode.

---

## 🧪 Development Notes

- Uses **Angular 17+ standalone components**
- Built with **Signals**, **inject()**, and **modern DI patterns**
- UI built with **PrimeNG** and **PrimeIcons**
- DevContainer uses **Node 20** and Angular CLI
- No `.env` file or dotenv system is used – only `environment.ts`

---

## 📁 Project Structure

```plaintext
src/
├── app/
│   ├── features/
│   │   ├── repos/       → repository list + search
│   │   └── commits/     → commit list for a selected repo
│   ├── core/            → services & global state
│   └── shared/          → reusable components (search bar, title, filter menu)
├── environments/        → environment config files
```

---

## 🛠️ Scripts

```bash
npm start        # Run the app with Vite
npm run build    # Production build
npm run lint     # Lint the project
```

---

## 📦 Dependencies

- Angular
- PrimeNG + PrimeIcons
- RxJS
- Vite (via Angular CLI 17+)
- Signals, Standalone Components

---

## 🤝 License

MIT
