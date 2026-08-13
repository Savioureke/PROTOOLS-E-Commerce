# PROTOOLS E-Commerce

A modern, dark-themed React single-page e-commerce application for power tools. Built using React, Vite, React Router, Context API, and Vanilla CSS.

## Getting Started

### 1. Preview locally

If you have Node.js installed globally:
```bash
cd protools-react
npm run dev
```

If you want to use the included portable Node.js environment:
```bash
# From the project root directory
.\.node\node-v20.17.0-win-x64\npm.cmd --prefix protools-react run dev
```

The app will run at **`http://localhost:5173/`**.

---

### 2. Build for Production

If you have Node.js installed globally:
```bash
cd protools-react
npm run build
```

If using the included portable Node.js environment:
```bash
.\.node\node-v20.17.0-win-x64\npm.cmd --prefix protools-react run build
```

The production bundle will be generated in `protools-react/dist/`.

---

## Git & GitHub Deployment

To push this repository to GitHub and make it public, run the following commands in your command prompt (`cmd` or PowerShell) at the root folder:

```bash
# 1. Initialize git repository
git init

# 2. Add all files (the .gitignore will automatically skip node_modules and portable runtimes)
git add .

# 3. Create initial commit
git commit -m "feat: complete protools react e-commerce application"

# 4. Rename default branch to main
git branch -M main

# 5. Add your remote GitHub repository URL (replace with your actual GitHub username)
git remote add origin https://github.com/Savioureke/PROTOOLS-E-Commerce.git

# 6. Push code to the repository
git push -u origin main
```
