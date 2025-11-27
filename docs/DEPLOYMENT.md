# Deployment Instructions & How It Works

## 🚀 How to Deploy

Run this single command in your terminal:

```bash
npm run deploy
```

## 🧠 How It Works (The Magic Behind the Scenes)

You might wonder: *How does running a command on my local computer update a website on the internet?*

It works thanks to the **`gh-pages`** package we installed. Here is the process:

1.  **Build**: First, the script runs `npm run build`. This compiles your React code into standard HTML, CSS, and JavaScript and puts it all into a **`dist`** folder.
2.  **Branch Magic**: The `gh-pages` tool takes that `dist` folder and pushes it to a special branch on your GitHub repository called **`gh-pages`**.
3.  **Publish**: GitHub detects an update to the `gh-pages` branch and automatically updates the live website to match it.

**In short:** You work on the `main` branch, but your website lives on the `gh-pages` branch. The deploy command handles copying the files between them.

## 🔧 Critical Configuration (Already Done)

**Issue:** The first deployment resulted in a **blank page**.
**Fix:** We changed the `base` path in `vite.config.ts` from `/dharmeshim.github.io/` to `/`.

```typescript
// vite.config.ts
export default defineConfig({
  base: "/", // <--- CRITICAL for username.github.io sites
  // ...
});
```

## 📝 Routine Deployment Steps

1.  **Make Changes**: Edit your code.
2.  **Commit**: Save your changes to git.
    ```bash
    git add .
    git commit -m "Update profile"
    ```
3.  **Deploy**:
    ```bash
    npm run deploy
    ```
4.  **Verify**: Wait ~2 mins and check [https://dharmeshim.github.io](https://dharmeshim.github.io).
