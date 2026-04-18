# Dharmesh Prasad - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing software engineering skills, projects, and experience.

## 🚀 Live Demo

Visit the live portfolio at: [https://dharmeshim.github.io](https://dharmeshim.github.io)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **UI Components**: Radix UI, Lucide React Icons

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn-style base UI elements (Badge, Button, etc.)
│   └── shared/         # Common layout components
├── config/             # Site configuration and profile data
├── hooks/              # Custom React hooks
├── lib/                # Utility functions, constants, and types
└── sections/           # Individual page sections (Home, Projects, etc.)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: version 18.0.0 or higher
- **npm**: version 8.0.0 or higher

### Installation & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dharmeshim/dharmeshim.github.io.git
   cd dharmeshim.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 Deployment

This portfolio is hosted on **GitHub Pages**.

### Automatic Deployment
The site is configured with a GitHub Action that automatically builds and deploys when changes are pushed to the `main` branch.

### Manual Deployment
If you need to deploy manually from your local machine:
```bash
npm run deploy
```
*Note: This runs `npm run build` and then uses the `gh-pages` package to push the `dist` folder to the `gh-pages` branch.*

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dharmesh Prasad** - Software Engineer & Full-Stack Developer

- GitHub: [@dharmeshim](https://github.com/dharmeshim)
- Portfolio: [https://dharmeshim.github.io](https://dharmeshim.github.io)
